// pages/dashboard.js
import React from 'react';
import { Box,Typography,Card,CardContent } from '@mui/material';
import { Doughnut,Bar } from 'react-chartjs-2';
import { Chart as ChartJS,ArcElement,Tooltip,Legend,BarElement,CategoryScale,LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement,Tooltip,Legend,BarElement,CategoryScale,LinearScale);

const Dashboard = () => {
    // Sample data for completed shifts
    const overtimeData = {
        labels: ['Overtime Shifts','Remaining'],
        datasets: [
            {
                data: [8,2], // Example data: 8 overtime shifts completed out of 10
                backgroundColor: ['#42A5F5','#BBDEFB'],
            },
        ],
    };

    const nightShiftData = {
        labels: ['Night Shifts'],
        datasets: [
            {
                label: 'Completed Night Shifts',
                data: [12], // Example data for night shifts
                backgroundColor: '#66BB6A',
            },
        ],
    };

    return (
        <Box sx={{ display: 'flex',flexDirection: 'column',alignItems: 'center',padding: 3,gap: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Shift Summary
            </Typography>

            {/* Overtime Shifts Card */}
            <Card sx={{ maxWidth: 400,padding: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Overtime Shifts
                    </Typography>
                    <Doughnut data={overtimeData} />
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center',marginTop: 2 }}>
                        You have completed 8 overtime shifts this month.
                    </Typography>
                </CardContent>
            </Card>

            {/* Night Shifts Card */}
            <Card sx={{ maxWidth: 400,padding: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Night Shifts
                    </Typography>
                    <Bar data={nightShiftData} options={{ scales: { y: { beginAtZero: true } } }} />
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center',marginTop: 2 }}>
                        12 night shifts completed successfully.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Dashboard;
