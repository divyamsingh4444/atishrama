// components/AuthGuard.js
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthGuard = ({ children }) => {
    const { data: session,status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin'); // Redirect to sign-in page
        }
    },[status,router]);

    if (status === 'loading') {
        return <div>Loading...</div>; // Optional: loading spinner while checking session
    }

    return <>{children}</>;
};

export default AuthGuard;
