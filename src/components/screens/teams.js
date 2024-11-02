// pages/teams.js
import React from 'react';
import { Box,Typography } from '@mui/material';

const Teams = () => {
    return (
        <div>
            <Box sx={{ display: 'flex',flexDirection: 'column',alignItems: 'center',padding: 3,gap: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Shift Summary
                </Typography>
                <Typography variant="h4" color='white'>Teams Page</Typography>
                <Typography>Details about teams will go here.</Typography>
            </Box>
            
        </div>
    );
};

export default Teams;
