import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(localStorage.getItem("token"));

    const [user, setUser] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    
    const authorizationToken = `Bearer ${token}`;
    
    const storeTokenInLS = (serverToken)=>{
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    }

   var isLoggedIn = !!token;
    // Tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    // JWT Authentication to get the currently logged in user data

    const userAuthentication = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("http://localhost:5000/api/auth/user",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:authorizationToken
                },
            });

            if(response.ok){
                const data = await response.json();
                setUser(data.userData);
                setIsLoading(false);
            }else{
                setIsLoading(false);
                console.log("error fetching user data");
            }
        } catch (error) {
            console.error("Error fetching user data");
        }
    }


    


    useEffect(()=>{
        userAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user, authorizationToken, isLoading
    }}>
        {children}
    </AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = ()=>{

    const authContextValue = useContext(AuthContext);

    if(!authContextValue){
        throw new Error("useAuth must be used outside of the Provider");
    }
    return authContextValue;
}