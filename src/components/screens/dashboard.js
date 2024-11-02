// pages/dashboard.js
import React from 'react';
import { EmployeeProvider } from '@/contexts/EmployeeContext';
import DashboardStats from '@/components/dashboard/DashboardStats';

const Dashboard = () => (
    <EmployeeProvider>
        <div style={{ padding: '2rem' }}>
            <h2>Employee Dashboard</h2>
            <DashboardStats />
        </div>
    </EmployeeProvider>
);

export default Dashboard;
