// context/AuthProvider.js
import { createContext,useContext,useEffect,useState } from "react";
import { useSession,signIn } from "next-auth/react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { data: session,status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn(); // Redirect to sign-in page if not logged in
        }
    },[status]);

    return (
        <AuthContext.Provider value={{ session,status }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// Higher-Order Component (HOC) for authenticated pages
export const withAuth = (Component) => {
    return function AuthenticatedComponent(props) {
        const { status } = useAuth();
        if (status === "loading") return <p>Loading...</p>;
        return status === "authenticated" ? <Component {...props} /> : null;
    };
};
