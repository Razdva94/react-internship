const mongoose = require("mongoose");

const TemporaryRecordSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  verificationCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1h" },
});

const TemporaryRecord = mongoose.model("TemporaryRecord", TemporaryRecordSchema);

module.exports = TemporaryRecord;
