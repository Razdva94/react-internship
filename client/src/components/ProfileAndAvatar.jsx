// import React from "react";
// import MenuIcon from './menu.svg'

// const ProfileAndAvatar = () => {
//     const [name, setName] = React.useState('');
//     const [avatar, setAvatar] = React.useState('');

//     const handleNameChange = (e) => {
//         setName(e.target.value);
//     };

//     const handleAvatarChange = (e) => {
//         setAvatar(e.target.value);

//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={handleNameChange}
//             />
//             <input
//                 type="text"
//                 placeholder="Enter avatar URL"
//                 value={avatar}
//                 onChange={handleAvatarChange}
//             />
//             <div>
//                 <h2>Name: {name}</h2>
//                 <img src={avatar} alt="Avatar" />
//             </div>
//         </div>
//     );
// };

// export default ProfileAndAvatar;
import React from "react";
import MenuIcon from './menu.svg';
import { useAuth } from "../hooks/auth.hook";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

const ProfileAndAvatar = () => {
    const navigate = useNavigate()
    const [name, setName] = React.useState('');
    const [avatar, setAvatar] = React.useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.value);
    };

    const handleLogout = () => {
        navigate("/")
        localStorage.removeItem("authProfileState")
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
            />
            <input
                type="text"
                placeholder="Enter avatar URL"
                value={avatar}
                onChange={handleAvatarChange}
            />
            <div>
                <h2>Name: {name}</h2>
                <img src={avatar} alt="Avatar" />
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ProfileAndAvatar;
