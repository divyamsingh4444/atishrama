// pages/auth/signin.js
import { signIn } from 'next-auth/react';
import { Button,Box,Typography } from '@mui/material';
import { Container } from '@mui/material';

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

// export default SignIn;
const WelcomePage = () => {
    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography variant="h2" gutterBottom>
                Welcome to Atishrama
            </Typography>
            <Typography variant="body1" paragraph>
                Discover a world of opportunities and connect with like-minded individuals. Please sign in to continue.
            </Typography>
            <SignIn />
        </Container>
    );
};

export default WelcomePage;

// </Typography >;