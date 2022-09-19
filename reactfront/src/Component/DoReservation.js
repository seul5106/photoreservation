import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from "moment"
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Table } from "react-bootstrap"

import '../assets/css/style3.min.css';
import "bootstrap/dist/css/bootstrap.min.css";

import RegexHelper from "./Users/regex_helper"
import setAuthorizationToken from './Users/setAuthorizationToken';
import { SetTapItemValue } from '../Slices/SetTapItemSlice';
import { getTokenIsOK } from '../Slices/ReadTokenSlice';
import { setTabShow } from '../Slices/TabShowSlice';

const DoReservation = () => {
    const [value, onChange] = useState(new Date());
    const [date, getDate] = useState();
    const [time, setTime] = useState("09:00:00");
    const [headcount, setHeadcount] = useState();
    const cookies = new Cookies();
    const regexHelper = new RegexHelper();
    const dispatch = useDispatch();
    const usenavigate = useNavigate();
    setAuthorizationToken(cookies.get("jwtToken"))
    // 선택한 값이 바뀔때마다 컴포넌트를 재랜더링하고
    // 선택한 value값에 따라 해당하는 날짜의 데이터를 가져온다.
    useEffect(() => {
        (async () => {
            try {
                let parseDate = moment(value).format("YYYY-MM-DD")
                await axios.get(process.env.REACT_APP_LOCALHOST +"/doReservation/selectreservation?parseDate=" + parseDate).then(response => { getDate(response.data) })
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
                        dispatch(getTokenIsOK())
                        dispatch(setTabShow(true))
                        usenavigate("/")
                    })
                }
                const errorMsg = "[" + error.response.status + "] " + error.response.statusText;
                console.log(errorMsg);
                return;
            }
        })()
    }, [dispatch,usenavigate,value])

    //예약버튼 클릭 시 
    const compareDate = () => {
        const nowDate = parseInt(moment(new Date()).format("YYYYMMDD"))
        const selectDate = parseInt(moment(value).format("YYYYMMDD"))

        if (!regexHelper.isSameDate(nowDate, selectDate, "이전날짜는 선택할수 없습니다.")) {
            onChange(new Date())
            return false;
        }
        if (!regexHelper.value("#headCount", "예약 인원을 입력해주세요.")) { return false; }

        Swal.fire({
            customClass: {
                container: 'my-swal'
            },
            title: "다음 날짜로 예약을 \n하시겠습니까?",
            html: "<p>날짜: " + moment(value).format("YYYY-MM-DD") + "</p><p>시간: " + time.substr(0, 5) + " </p><p>인원수: " + headcount + "</p>",
            icon: 'info',
            confirmButtonText: '확인'
        }).then((result) => {
            (async () => {
                try {
                    await axios.post("/doReservation/reserve", {
                        reserve_date: moment(value).format("YYYY-MM-DD"),
                        reserve_time: time,
                        reserve_headcount: headcount
                    }).then(response => { getDate(response.data) 
                        console.log(response)
                    });
                } catch (error) {
                    console.log(error.response)
                    if (error.response.status === 401 || error.response.status === 419) {
                        Swal.fire({
                            customClass: {
                                container: 'my-swal'
                            },
                            text: error.response.data.rtmsg,
                            icon: 'error',
                            confirmButtonText: '확인'
                        }).then((result) => { usenavigate("/") })
                    }else{
                        Swal.fire({
                            customClass: {
                                container: 'my-swal'
                            },
                            text: error.response.data.rtmsg,
                            icon: 'info',
                            confirmButtonText: '확인'
                        }).then((result) => { usenavigate("/doReservation") })
                    }
                    return;
                }
            })()
        })


    }

    const setReserveTime = (e) => {
        setTime(e.target.value)
    };

    const setReserveHeadCount = (e) => {
        setHeadcount(e.target.value)
    }

    return (
        <div className='doREservationContainer'>
            <div className='doREservationContainerItem'>
                <p className="doREservationP">스튜디오 예약하기</p>
                <Calendar
                    onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
                    formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
                    value={value}
                    minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                    maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                    navigationLabel={null}
                    showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                    className="mx-auto w-full text-sm border-b"
                />

                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>예약되어있는 날짜</th>
                            <th>예약되어있는 시간</th>
                            <th>인원수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {date !== undefined && date.data.length !== 0 ?
                            date.data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.reserve_date}</td>
                                    <td>{item.reserve_time}</td>
                                    <td>{item.reserve_headcount}명</td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan={3}>예약된 날짜가 없습니다.</td>
                            </tr>}
                    </tbody>
                </Table>

                <div className="selectReservationContainer">
                    <p className='selectDateP'>선택한 날짜↓</p>
                    <Table striped bordered >
                        <thead>
                            <tr>
                                <th>연월일</th>
                                <th>시간</th>
                                <th className="headCountP">인원</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{moment(value).format("YYYY-MM-DD")}</td>
                                <td>
                                    <select onChange={setReserveTime}>
                                        <option value={"09:00:00"}>09시 00분</option>
                                        <option value={"12:00:00"}>12시 00분</option>
                                        <option value={"15:00:00"}>15시 00분</option>
                                        <option value={"17:30:00"}>17시 30분</option>
                                    </select>
                                </td>
                                <td>
                                    <input id="headCount" onChange={setReserveHeadCount} type="text" placeholder="0명" />
                                </td>
                            </tr>

                        </tbody>
                    </Table>
                    <p>예약 가능 시간은 09시 00분 ~ 17시 30분 입니다 (3시간 간격을 두고 예약 가능합니다)</p>
                </div>
                <div className="button-container">
                    <button onClick={compareDate} className="ReservationSubmitBtn">
                        예약하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoReservation;