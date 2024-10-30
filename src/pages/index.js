// pages/index.js
import React,{ useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Box,Typography } from '@mui/material';

const HomePage = () => {
  const [open,setOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex',minHeight: '100vh' }}>
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          marginLeft: open ? '40px' : '60px', // Adjusts based on sidebar width
          transition: 'margin-left 0.3s',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Typography variant="body1">
          Your main content goes here. You can add more components or sections within this area as needed.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
