// pages/index.js
import React,{ useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Box,Typography } from '@mui/material';
import Dashboard from '../components/features/dashboard';
import Teams from '../components/features/teams';

const HomePage = () => {
  const [open,setOpen] = useState(true);
  const [activeView,setActiveView] = useState('Dashboard');

  return (
    <Box sx={{ display: 'flex',minHeight: '100vh' }}>
      <Sidebar open={open} setOpen={setOpen} setActiveView={setActiveView} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          marginLeft: open ? '40px' : '60px', // Adjusts based on sidebar width
          transition: 'margin-left 0.3s',
        }}
      >
        {activeView === 'Dashboard' && <Dashboard />}
        {activeView === 'Teams' && <Teams />}
      </Box>
    </Box>
  );
};

export default HomePage;
