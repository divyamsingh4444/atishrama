// context/EmployeeContext.js
import React,{ createContext,useContext,useState,useEffect } from 'react';
import { useSession } from 'next-auth/react';
import supabase from '@/utils/connect';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const { data: session } = useSession();
    const [employeeDetails,setEmployeeDetails] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            if (session?.user?.email) {
                const { data,error } = await supabase
                    .from('employees')
                    .select('*')
                    .eq('email',session.user.email)
                    .single();

                if (error) {
                    console.error("Error fetching employee details:",error);
                } else {
                    setEmployeeDetails(data);
                }
            }
            setLoading(false);
        };

        fetchEmployeeDetails();
    },[session]);

    return (
        <EmployeeContext.Provider value={{ employeeDetails,loading }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployee = () => useContext(EmployeeContext);
