import React, { useEffect, useState } from 'react';

import axios from 'axios';

import AdminComponent from "./ProfileComponent/AdminComponent"
import UserProfile from "./ProfileComponent/UserProfile"
import { useNavigate } from 'react-router-dom';




const Profile = () => {
    
    const [show, setShow] = useState(false)
   
    const usenavigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post( process.env.REACT_APP_LOCALHOST + '/adminAuth')
                if(response.data.isAdmin === "Y"){
                    setShow(true)
                }
            } catch (error) {
                if(error.response.status===419 || error.response.status===401){
                    usenavigate("/")
                }
                const errorMsg = "[" + error.response.status + "] " + error.response.statusText;
                console.log(errorMsg);
                return;
            }
        })()
    }, [])
    return(
        show === true ? <AdminComponent /> : <UserProfile />
    )
    
};

export default Profile;