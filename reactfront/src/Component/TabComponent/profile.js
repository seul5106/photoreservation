import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import setAuthorizationToken from "../Users/setAuthorizationToken"
import AdminComponent from "./ProfileComponent/AdminComponent"
import UserProfile from "./ProfileComponent/UserProfile"
import { SetTapItemValue } from "../../Slices/SetTapItemSlice"
import { setTabShow } from "../../Slices/TabShowSlice"

const Profile = () => {

    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const usenavigate = useNavigate();
    const cookies = new Cookies();
    setAuthorizationToken(cookies.get("jwtToken"))
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.post(process.env.REACT_APP_LOCALHOST + '/adminAuth')
                if (response.data.isAdmin === "Y") {
                    setShow(true)
                }
            } catch (error) {
                if (error.response.status === 419 || error.response.status === 401) {
                    Swal.fire({
                        customClass: {
                            container: 'my-swal'
                        },
                        text: error.response.data.rtmsg,
                        icon: 'error',
                        confirmButtonText: '확인'
                    }).then((result) => {
                        dispatch(SetTapItemValue(0))
                        dispatch(setTabShow(false))
                        usenavigate("/")
                    })
                }
                const errorMsg = "[" + error.response.status + "] " + error.response.statusText;
                console.log(errorMsg);
                return;
            }
        })()
    }, [dispatch, usenavigate])
    return (
        show === true ? <AdminComponent /> : <UserProfile />
    )

};

export default Profile;