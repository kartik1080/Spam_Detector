import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import EmailIcon from '@mui/icons-material/Email';
import SpamIcon from '@mui/icons-material/Report';
import PersonIcon from '@mui/icons-material/Person';

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <EmailIcon sx={{ mr: 1 }} />
                    AI Spam Filter
                </Typography>

                {isAuthenticated ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            component={RouterLink}
                            to="/"
                            sx={{ mr: 1 }}
                        >
                            <EmailIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            component={RouterLink}
                            to="/spam"
                            sx={{ mr: 1 }}
                        >
                            <SpamIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            component={RouterLink}
                            to="/profile"
                            sx={{ mr: 2 }}
                        >
                            <PersonIcon />
                        </IconButton>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Box>
                        <Button color="inherit" component={RouterLink} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/register">
                            Register
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar; 