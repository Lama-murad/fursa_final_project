import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getloginState, getRole, logOutUser } from '../../../app/reducer/userReducer';
import './navbar.scss'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Paper from '@mui/material/Paper';


function Navbar() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    return (
        <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 500 }} elevation={3}>

            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction value="home" label="Home" icon={<HomeIcon />} onClick={() => { navigate("/") }} />
                <BottomNavigationAction value="profile" label="Profile" icon={<PersonIcon />} onClick={() => { navigate("/profile") }} />
                <BottomNavigationAction value="chat" label="Chat" icon={<ChatIcon />} onClick={() => { navigate("/chat") }} />
                <BottomNavigationAction value="stories" label="Stories" icon={<MenuBookIcon />} onClick={() => { navigate("/stories") }} />
            </BottomNavigation>
        </Paper>
    );
}
export default Navbar