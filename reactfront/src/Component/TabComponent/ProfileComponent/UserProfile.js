import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Table } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";


import UserProfileResevation from './UserProfileResevation';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
    const [data, setData] = useState();
    const cookies = new Cookies();
    const usenavigate = useNavigate();
    useEffect(() => {
        if(cookies.get("jwtToken") === undefined){
            usenavigate("/")
        }
        (async () => {
            await axios.post(process.env.REACT_APP_LOCALHOST +'/members/get').then(response => {
                setData(response.data)

            }).catch(error => {
                // const errorMsg = "[" + error.response.status + "] " + error.response.statusText;
                console.log(error);
                return;
            });
        })()
    }, [])

    if (data !== undefined) {
        return (
            <div className="UserProfileContainer">
                <div className="UserProfileContainerItem">
                    <p>회원 프로필</p>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th></th>
                                <th >회원 정보</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>아이디</td>
                                <td >{data.info[0].user_id}</td>

                            </tr>
                            <tr>
                                <td>성함</td>
                                <td>{data.info[0].user_name}</td>
                            </tr>
                            <tr>
                                <td>연락처</td>
                                <td >{data.info[0].user_tel}</td>
                            </tr>
                            <tr>
                                <td>이메일</td>
                                <td >{data.info[0].user_email}</td>
                            </tr>
                            <tr>
                                <td>우편번호</td>
                                <td >{data.info[0].user_postcode}</td>
                            </tr>
                            <tr>
                                <td>주소</td>
                                <td >{data.info[0].user_addr1 + " " + data.info[0].user_addr2}</td>
                            </tr>
                            <tr>
                                <td>회원가입일</td>
                                <td >{data.info[0].reg_date}</td>
                            </tr>
                        </tbody>
                    </Table>

                    {/* 아래에 예약내역 추가하기 */}
                    {data.reserve.length !== 0 ?
                        <UserProfileResevation />
                        : <p>예약은 홈페이지에서 Do Reservation을 클릭 해주세요!!</p>}
                </div>
            </div>
        );
    } else {
        return (
            <></>
        )
    }

};

export default UserProfile;