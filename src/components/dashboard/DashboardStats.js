// components/DashboardStats.js
import React,{ useEffect,useState } from 'react';
import { Card,CardContent,Typography,Grid } from '@mui/material';
import { useEmployee } from '@/contexts/EmployeeContext';

const DashboardStats = () => {
    const employee = useEmployee();
    const [stats,setStats] = useState({ completedShiftsCount: 0,overtimeShiftsCount: 0 });

    useEffect(() => {
        if (employee?.id) {
            const fetchStats = async () => {
                const res = await fetch(`/api/getShiftStats?employeeId=${employee.id}`);
                const data = await res.json();
                setStats(data);
            };
            fetchStats();
        }
    },[employee]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#1e88e5',color: '#fff' }}>
                    <CardContent>
                        <Typography variant="h5">Completed Shifts</Typography>
                        <Typography variant="h3" component="div">
                            {stats.completedShiftsCount}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#43a047',color: '#fff' }}>
                    <CardContent>
                        <Typography variant="h5">Overtime Shifts</Typography>
                        <Typography variant="h3" component="div">
                            {stats.overtimeShiftsCount}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default DashboardStats;
