import React, { useEffect, useState } from 'react';
import { Cookies, CookiesProvider } from 'react-cookie'
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import AdminComponent from "./ProfileComponent/AdminComponent"
import UserProfile from "./ProfileComponent/UserProfile"
import { useNavigate } from 'react-router-dom';
import {getTokenIsOK} from '../../Slices/ReadTokenSlice'



const Profile = () => {
    const cookies = new Cookies();
    const [show, setShow] = useState(false)
    const {rt, rtmsg, data, loading} = useSelector((state) => state.ReadToken);
    const dispatch = useDispatch();
    const usenavigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post('http://192.168.55.95:5000/adminAuth')
                if(response.data.isAdmin === "Y"){
                    setShow(true)
                }
            } catch (error) {
                if(error.response.status===419 || error.response.status===401){
                    
                    cookies.get("jwtToken");
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