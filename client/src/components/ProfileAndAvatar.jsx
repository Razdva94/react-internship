import React from "react";
import MenuIcon from './menu.svg'

const Profile = () => {
    const [name, setName] = React.useState('');
    const [avatar, setAvatar] = React.useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAvatarChange = (e) => {
        setAvatar(e.target.value);

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
        </div>
    );
};

export default Profile;
