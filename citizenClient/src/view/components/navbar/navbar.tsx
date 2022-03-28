import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getloginState, getRole, logOutUser } from '../../../app/reducer/userReducer';
import './navbar.scss'


function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const dispatch = useAppDispatch()
    const userRole = useAppSelector(getRole)
    const pages = ['Home', 'Info', 'Stories', 'Chat'];
    const navigate = useNavigate();


    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogOut = () => {
        setAnchorElUser(null);
        dispatch(logOutUser())
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <Link to="/">
                                <MenuItem key={"Home"} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Home</Typography>
                                </MenuItem>
                            </Link>
                            <Link to="/info">
                                <MenuItem key={"Info"} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">المعلومات</Typography>
                                </MenuItem>
                            </Link>
                            <Link to="/stories">
                                <MenuItem key={"Stories"} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">القصص</Typography>
                                </MenuItem>
                            </Link>
                            <Link to="/chat">
                                <MenuItem key={"Chat"} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">الدردشه</Typography>
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => { handleCloseNavMenu(); if (page == "Home") navigate(`/`); else navigate(`/${page}`) }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {userRole == "anonymous" ? (<div><Button variant="contained" style={{ marginRight: "1rem", backgroundColor: "#35b0d2" }} type="submit" onClick={() => { navigate('/signup') }}>Register</Button>
                        <Button variant="contained" style={{ backgroundColor: "#35b0d2" }} type="submit" onClick={() => { navigate('/login') }}>Log in</Button></div>) : (<div></div>)}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {userRole != "anonymous" ? (
                                <Link to="/profile">
                                    <MenuItem key="profile" onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">الصفحه الشخصيه</Typography>
                                    </MenuItem>
                                </Link>) : (<div></div>)
                            }
                            <Link to="/previousAccidents">
                                <MenuItem key="previousAccidents" onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">الحوادث السابقة</Typography>
                                </MenuItem>
                            </Link>
                            {userRole != "anonymous" ? (
                                <Link to="/">
                                    <MenuItem key="logout" onClick={handleLogOut}>
                                        <Typography textAlign="center">تسجيل الخروج</Typography>
                                    </MenuItem>
                                </Link>) : (<div></div>)
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar