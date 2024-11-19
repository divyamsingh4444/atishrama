// pages/_app.js
import { SessionProvider,useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '@/styles/globals.css';
import { AuthProvider } from "@/contexts/AuthProvider";
import { EmployeeProvider } from "@/contexts/EmployeeContext";

export default function App({ Component,pageProps: { session,...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {/* <AuthProvider> */}
        <EmployeeProvider>
          <Component {...pageProps} />
        </EmployeeProvider>
      {/* </AuthProvider> */}
    </SessionProvider>
  );
  // const router = useRouter();

  // // Component to handle session redirection logic
  // const AuthenticatedComponent = (props) => {
  //   const { data: session,status } = useSession();

  //   useEffect(() => {
  //     if (status === 'unauthenticated') {
  //       router.push('/auth/signin'); // Redirect to sign-in page if no session
  //     }
  //   },[status,router]);

  //   // Display loading state while session is being checked
  //   if (status === 'loading') return <div>Loading...</div>;

  //   // Render page if authenticated
  //   return <Component {...props} />;
  // };

  // return (
  //   <SessionProvider session={session}>
  //     <AuthenticatedComponent {...pageProps} />
  //   </SessionProvider>
  // );
}