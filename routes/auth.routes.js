const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const TemporaryRecord = require("../models/TemporaryRecord");
const router = Router();
const mailer = require("../nodemailer");
const crypto = require("crypto");

router.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Такой пользователь уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      console.log(email);
      const message = {
        from: "Mailer Test <razdva94@list.ru>",
        to: email,
        subject: "Congradulations! You are succesfuly registered on our site",
        text: `Поздравляем, Вы успешно зарегистрировались на нашем сайте!

        Данный вашей учетной записи:

        login: ${email}
        password: ${password}

        Данное письмо не требует ответа.`,
      };
      mailer(message);
      await user.save();

      res.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, поробуйте снова" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе в систему",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Неверный пароль, попробуйте снова" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, поробуйте снова" });
    }
  }
);

router.post(
  "/reset-email",
  [check("email", "Введите корректный email").normalizeEmail().isEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные ввода",
        });
      }

      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const verificationCode = crypto.randomBytes(3).toString("hex");

      const temporaryRecord = new TemporaryRecord({
        userID: user.id,
        verificationCode: verificationCode,
      });
      await temporaryRecord.save();

      const message = {
        from: "Mailer Test <razdva94@list.ru>",
        to: email,
        subject: "Password change",
        text: `Вы отправили запрос на смену пароля.
        Пройдите по ссылке: http://localhost:3000/reset?userID=${user.id}&code=${verificationCode}`,
      };
      mailer(message);
      res.status(201).json({ message: "Сообщение отправлено" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.post(
  "/reset-password",
  [
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const { userID, code, password } = req.body;
      const temporaryRecord = await TemporaryRecord.findOne({
        userID: userID,
        verificationCode: code,
      });
      if (!temporaryRecord) {
        return res.status(400).json({ message: "Некорректные данные" });
      }

<<<<<<< HEAD
      const user = await User.findById(userID);
=======

    const temporaryRecord = await TemporaryRecord.findOne({
      userID: userID,
      verificationCode: code,
    });
>>>>>>> 21ff3ebf8a187669058a45c017c9f9c1ad8defd0

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      user.password = hashedPassword;

      await user.save();


      res.status(200).json({ message: "Пароль успешно изменен" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
<<<<<<< HEAD
=======

    const user = await User.findById(userID);

    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;

    await user.save();


    await temporaryRecord.remove();

    res.status(200).json({ message: "Пароль успешно изменен" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
>>>>>>> 21ff3ebf8a187669058a45c017c9f9c1ad8defd0
  }
);

module.exports = router;
