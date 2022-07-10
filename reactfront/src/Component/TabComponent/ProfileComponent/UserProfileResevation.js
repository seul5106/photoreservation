import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Table } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";

import Swal from 'sweetalert2';


const UserProfileResevation = () => {
    //예약취소시 재랜더링을 위한 상태값
    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            await axios.post('http://192.168.55.95:5000/members/get').then(response => {
                setData(response.data.reserve)
            }).catch(error => {
                // const errorMsg = "[" + error.response.status + "] " + error.response.statusText;
                console.log(error);
                return;
            });
        })()
        
    }, [data])


    //예약취소 버튼
    const reserveCancle = (e) => {
        console.log(e.target.id)
        let longdate = e.target.value
        const reserve_date = longdate.substr(0, 10);
        const reserve_time = longdate.substr(10);
        Swal.fire({
            customClass: {
                container: 'my-swal'
            },
            text: "예약을 취소하시겠습니까?",
            icon: 'error',
            confirmButtonText: '확인',
            denyButtonText: `취소`
        }).then((result) => {
            if(result.isConfirmed){
                (async () => {
                    try {
                        await axios.post("/doReservation/deleteReserve", {
                            reserve_date: reserve_date,
                            reserve_time: reserve_time
                        })
                    } catch (error) {
                        const errorMsg = "[" + error.response.status + "] " + error.response.statusText;
                        console.log(errorMsg);
                        return;
                    }
                })()
            }else{
                
            }
        })
    }

    return (
        <div>
            {(data !== undefined)&&(data.length !== 0) ?
                <>
                    <p>예약내역</p>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>예약날짜</th>
                                <th>예약시간</th>
                                <th>인원수</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.reserve_date}</td>
                                    <td>{item.reserve_time}</td>
                                    <td>{item.reserve_headcount}</td>
                                    <td>
                                        <button id={index} value={item.reserve_date + item.reserve_time} onClick={reserveCancle}>예약취소</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
                : <p>예약은 홈페이지에서 Do Reservation을 클릭 해주세요!!</p>}
        </div>
    );
};

export default UserProfileResevation;