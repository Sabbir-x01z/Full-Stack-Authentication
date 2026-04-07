import { createContext, useState } from "react";
import { children } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const MyContext = createContext(); 

export const AppContextProvider = ({children}) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin, setIsloggedin] = useState(false);
    const [userData, setUserData] = useState(false);


    const getUserData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/user/data')
            data.success ? setUserData(data.User) : toast.error(data.message);
        } catch (error) {
            toast.error(data.message);
        }
    }
    const value = {
        backendUrl,
        isLoggedin, setIsloggedin,
        userData, setUserData,
        getUserData
    }
    return(
        <MyContext.Provider value={value}>
            {children} 
        </MyContext.Provider>
    )
}