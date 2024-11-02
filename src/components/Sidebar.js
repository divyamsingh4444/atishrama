// components/Sidebar.js
import React from 'react';
import { Drawer,List,ListItem,ListItemIcon,ListItemText,IconButton,Toolbar,Typography,Divider,Avatar,Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSession,signOut } from 'next-auth/react';
import Image from 'next/image';

const drawerWidth = 240;

const Sidebar = ({ open,setOpen,setActiveView }) => {
    const { data: session } = useSession();

    const navigationItems = [
        { text: 'Dashboard',icon: <DashboardIcon /> },
        { text: 'Teams',icon: <PeopleIcon /> },
        { text: 'Shift Requests',icon: <AssignmentIcon /> },
        { text: 'Admin Control',icon: <AdminPanelSettingsIcon />,role: 'IT Admin' },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: open ? drawerWidth : 60,
                flexShrink: 0,
                height: '100vh', // Make sure it takes the full height of the viewport
                position: 'fixed', // Sticks the sidebar to the left
                '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : 60,
                    boxSizing: 'border-box',
                    backgroundColor: '#1e2a38',
                    color: '#ffffff',
                    position: 'relative',
                    transition: 'width 0.3s',
                    height: '100vh', // Ensures drawer paper also stays full-height
                },
            }}
        >
            {/* Header with Logo and Title */}
            <Box
                sx={{
                    position: 'relative',
                    height: '15%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    paddingX: 1,
                    justifyContent: open ? 'flex-start' : 'center',
                }}
            >
                <Toolbar disableGutters sx={{ width: '100%',paddingX: 1 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Image src="/favicon.ico" alt="Logo" width={30} height={30} />
                        {open && (
                            <Typography variant="h6" noWrap component="div">
                                Atishrama
                            </Typography>
                        )}
                    </Box>
                </Toolbar>
            </Box>

            <Divider sx={{ width: '100%' }} />

            {/* User Profile Section */}
            {session && (
                <Box
                    sx={{
                        height: '25%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingY: 2,
                    }}
                >
                    <Avatar
                        src={session?.user?.image}
                        alt={session.user.name}
                        sx={{
                            width: open ? 60 : 40,
                            height: open ? 60 : 40,
                            marginBottom: 1,
                            transition: 'width 0.3s, height 0.3s',
                        }}
                    />
                    {open && (
                        <Typography variant="body1" component="div">
                            Welcome, {session.user.name}
                        </Typography>
                    )}
                    <IconButton onClick={() => signOut()} sx={{ color: '#ffffff',marginTop: 1 }}>
                        <LogoutIcon />
                        {open && <Typography variant="body2" sx={{ marginLeft: 1 }}>Sign Out</Typography>}
                    </IconButton>
                </Box>
            )}

            <Divider />

            {/* Navigation Links Section */}
            <Box sx={{ flexGrow: 1,overflowY: 'auto',width: '100%' }}>
                <List>
                    {navigationItems.map((item) => (
                        (!item.role || item.role === session?.user?.role) && (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => setActiveView(item.text)} // Set the active view on click
                                sx={{ justifyContent: open ? 'initial' : 'center' }}
                            >
                                <ListItemIcon sx={{ color: '#ffffff',minWidth: 0,marginRight: open ? 3 : 'auto' }}>
                                    {item.icon}
                                </ListItemIcon>
                                {open && <ListItemText primary={item.text} />}
                            </ListItem>
                        )
                    ))}
                </List>
            </Box>

            {/* Toggle Button at the Bottom */}
            <Box sx={{ width: '100%',padding: 1,textAlign: 'center' }}>
                <IconButton onClick={() => setOpen(!open)} sx={{ color: '#ffffff' }}>
                    {open ? '<' : '>'}
                </IconButton>
            </Box>
        </Drawer>
    );
};

export default Sidebar;