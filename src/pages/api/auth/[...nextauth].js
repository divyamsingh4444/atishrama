import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Define authOptions separately
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    // Any additional NextAuth options go here
};

// Export NextAuth with the authOptions
export default NextAuth(authOptions);