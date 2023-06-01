import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";
import { useDispatch, useSelector } from "react-redux";
import { outSignIn } from "../store/signInSlice";
import { setAuthProfile } from "../store/signInSlice";


function Bar({ setAuthenticated }) {
    const authProfileState = useSelector((state) => state.slide.authProfile);
    const dispatch = useDispatch();
    const signInState = useSelector((state) => state.slide.signIn);
    const { token, login, logout, userId } = useAuth();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goToProfile = () => {
        navigate('/profile')
        dispatch(setAuthProfile())
        console.log(authProfileState)
        localStorage.setItem("authProfileState", authProfileState)
    }

    const handleLogout = () => {
        logout();
        dispatch(outSignIn());
        localStorage.clear();
        setAuthenticated(false);
        navigate('/sign-in')
    };

    const goToHabits = () => {
        localStorage.setItem("authProfileState", '')
        navigate('/')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    onClick={goToHabits}
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}>
                    Habits
                </Typography>
                {auth && (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={goToProfile}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Bar;