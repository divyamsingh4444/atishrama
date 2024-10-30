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

const Sidebar = ({ open,setOpen }) => {
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
                '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : 60,
                    boxSizing: 'border-box',
                    backgroundColor: '#1e2a38',
                    color: '#ffffff',
                    position: 'relative',
                    transition: 'width 0.3s',
                },
            }}
        >
            {/* Header with Logo and Title */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    height: '15%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    paddingX: 1,
                    justifyContent: open ? 'flex-start' : 'center',
                }}
            >
                <Toolbar disableGutters sx={{ width: '100%',paddingX: 1 }}>
                    {/* Logo and Title */}
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

            <Divider sx={{ position: 'absolute',top: '15%',width: '100%' }} />

            {/* User Profile Section */}
            {session && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '15%',
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

            <Divider sx={{ position: 'absolute',top: '40%',width: '100%' }} />

            {/* Navigation Links Section */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '40%',
                    bottom: '40px', // Allow space for the toggle button
                    width: '100%',
                    overflowY: 'auto', // Scroll if content overflows
                }}
            >
                <List>
                    {navigationItems.map((item) => (
                        (!item.role || item.role === session?.user?.role) && (
                            <ListItem button key={item.text} sx={{ justifyContent: open ? 'initial' : 'center' }}>
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
            <Box sx={{ position: 'absolute',bottom: 0,width: '100%',padding: 1,textAlign: 'center' }}>
                <IconButton onClick={() => setOpen(!open)} sx={{ color: '#ffffff' }}>
                    {open ? '<' : '>'}
                </IconButton>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
