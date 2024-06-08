import {React, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InstagramIcon from '@mui/icons-material/Instagram';
import {Outlet, useNavigate} from 'react-router-dom'
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import FeedIcon from '@mui/icons-material/Feed';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Cookies from "js-cookie";
import {useAuth} from "../Authentication/auth";

const settings = ['Profile', 'Logout'];
const drawerWidth = 230;

function Home() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();
    const auth = useAuth();
    const user = JSON.parse(Cookies.get('user'));
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting) => {
        if (setting === 'Logout') {
            auth.logout();
        } else if (setting === 'Profile') {
            navigate("profile")
        }
        setAnchorElUser(null);
    };

    return (
        <div className="App">
            <Box sx={{ display: 'flex' }}>
                <CssBaseline/>
                <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                    <Toolbar>
                        <InstagramIcon fontSize="large" sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                flexGrow: 1,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            PostGram
                        </Typography>
                        <div>
                            <Tooltip title="User">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt={user?.firstname} src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
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
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                >
                    <Toolbar/>
                    <Divider/>
                    <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>navigate('feed')}>
                                <ListItemIcon sx={{pl: 2}}>
                                    <FeedIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Feed" sx={{pl: 2}}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>navigate('post')}>
                                <ListItemIcon sx={{pl: 2}}>
                                    <AutoAwesomeMotionIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Posts" sx={{pl: 2}}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    </Box>
                </Drawer>
                <Box
                    component="main"
                    sx={{flexGrow: 1, p: 5}}
                >
                    <Toolbar/>
                    <Outlet/>
                </Box>
            </Box>
            {/*<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>*/}
            {/*    <IconButton*/}
            {/*        size="large"*/}
            {/*        aria-label="account of current user"*/}
            {/*        aria-controls="menu-appbar"*/}
            {/*        aria-haspopup="true"*/}
            {/*        onClick={handleOpenNavMenu}*/}
            {/*        color="inherit"*/}
            {/*    >*/}
            {/*        <MenuIcon />*/}
            {/*    </IconButton>*/}
            {/*    <Menu*/}
            {/*        id="menu-appbar"*/}
            {/*        anchorEl={anchorElNav}*/}
            {/*        anchorOrigin={{*/}
            {/*            vertical: 'bottom',*/}
            {/*            horizontal: 'left',*/}
            {/*        }}*/}
            {/*        keepMounted*/}
            {/*        transformOrigin={{*/}
            {/*            vertical: 'top',*/}
            {/*            horizontal: 'left',*/}
            {/*        }}*/}
            {/*        open={Boolean(anchorElNav)}*/}
            {/*        onClose={handleCloseNavMenu}*/}
            {/*        sx={{*/}
            {/*            display: { xs: 'block', md: 'none' },*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        {pages.map((page) => (*/}
            {/*            <MenuItem key={page} onClick={handleCloseNavMenu}>*/}
            {/*                <Typography textAlign="center">{page}</Typography>*/}
            {/*            </MenuItem>*/}
            {/*        ))}*/}
            {/*    </Menu>*/}
            {/*</Box>*/}
            {/*<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>*/}
            {/*    {pages.map((page) => (*/}
            {/*        <Button*/}
            {/*            key={page}*/}
            {/*            onClick={handleCloseNavMenu}*/}
            {/*            sx={{ my: 2, color: 'white', display: 'block' }}*/}
            {/*        >*/}
            {/*            {page}*/}
            {/*        </Button>*/}
            {/*    ))}*/}
            {/*</Box>*/}
        </div>
    );
}

export default Home
