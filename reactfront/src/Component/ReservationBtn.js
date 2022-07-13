import React from 'react';
import {useNavigate} from "react-router-dom"
import { Cookies } from 'react-cookie';

import "../assets/css/style.min.css"
import Swal from 'sweetalert2';

// 쿠키값이랑 비교해서 로그인중인지를 확인하고
// 예약 페이지로 이동!!! Modal로 할 예정
const ReservationBtn = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    
    const doReservation = () => {
        if(cookies.get("jwtToken") !== undefined){
            navigate("/doReservation")
        }else{
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                text: "로그인 후 이용해주세요!!",
                icon: 'error',
                confirmButtonText: '확인'
            });
        }
    }

    return (
        <div className='reservationbanner'>
            <p>Self Photo Studio</p>
            <button onClick={doReservation} className="reservation_btn">
                Do Reservation
            </button>
        </div>
    );
};

export default ReservationBtn;