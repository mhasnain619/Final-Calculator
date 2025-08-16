import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FaUser, FaCalculator, FaHome } from "react-icons/fa";
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import './Dashboard.css'
const drawerWidth = 240;

const pages = [
    { name: "Home", icon: <FaHome />, route: "/home" },
    { name: "About Us", icon: <FaCalculator />, route: "/about" },
    { name: "Contact Us", icon: <FaUser />, route: "/contact" },
    { name: "Privacy Policy", icon: <FaUser />, route: "/contact" },
    { name: "Terms", icon: <FaUser />, route: "/contact" },
    { name: "Blog", icon: <FaUser />, route: "/contact" },
];

function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ width: '100px' }}>
                <img height='100%' width='100%' src={logo} alt="" />
            </Box>
            {/* <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography> */}
            <Divider />
            <List>
                {pages.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate(item.route);
                                setMobileOpen(false); // close drawer
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Box className='logo-box'>
                        <img height='100%' width='100%' src={logo} alt="" />
                    </Box>
                    {/* <Typography
                        variant="h6"
                        component="div"
                        sx={{ display: { xs: 'block', sm: 'block' } }}
                    >
                        MUI
                    </Typography> */}

                    {/* Nav Items (large screens) */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 8 }}>
                        {pages.map((item) => (
                            <Button
                                key={item.name}
                                sx={{
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.2,
                                    textTransform: 'none', // Keep original case
                                    fontSize: '1rem'
                                }}
                                onClick={() => navigate(item.route)}
                            >
                                {item.icon}
                                {item.name}
                            </Button>
                        ))}
                    </Box>

                    {/* Menu Button (small screens) */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <nav>
                <Drawer
                    anchor="right"
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box
             className='main-box'
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet /> {/* Pages render here */}
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    window: PropTypes.func,
};

export default Dashboard;
