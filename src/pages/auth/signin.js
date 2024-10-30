// pages/auth/signin.js
import { signIn } from 'next-auth/react';
import { Button,Box,Typography } from '@mui/material';

const SignIn = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h4" marginBottom={2}>
                Sign In
            </Typography>
            <Button variant="contained" color="primary" onClick={() => signIn('google')}>
                Sign in with Google
            </Button>
        </Box>
    );
};

export default SignIn;
