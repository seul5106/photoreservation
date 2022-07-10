import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from "moment"
import axios from 'axios';
import '../assets/css/style3.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';
import { Table } from "react-bootstrap"

const DoReservation = () => {
    const [value, onChange] = useState(new Date());
    const [date, getDate] = useState();
    const [time, setTime] = useState("09:00:00");
    const [headcount, setHeadcount] = useState();

    // 선택한 값이 바뀔때마다 컴포넌트를 재랜더링하고
    // 선택한 value값에 따라 해당하는 날짜의 데이터를 가져온다.
    useEffect(() => {
        (async () => {
            try {
                let parseDate = moment(value).format("YYYY-MM-DD")
                await axios.get("/doReservation/selectreservation" + parseDate).then(response => { getDate(response.data) })
            } catch (error) {
                // const errorMsg = "[" + error.response.status + "] " + error.response.statusText;
                console.log(error);
                return;
            }
        })()
    }, [value])

    //예약버튼 클릭 시 
    const compareDate = () => {
        const nowDate = parseInt(moment(new Date()).format("YYYYMMDD"))
        const selectDate = parseInt(moment(value).format("YYYYMMDD"))

        if (nowDate > selectDate) {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                text: "예약 할 수 있는 날짜가 아닙니다!!",
                icon: 'error',
                confirmButtonText: '확인'
            });
        } else if (headcount === undefined) {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                text: "예약 인원을 입력해주세요!!",
                icon: 'error',
                confirmButtonText: '확인'
            });
        } else {
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
                        }).then(response => { getDate(response.data) });
                    } catch (error) {
                        Swal.fire({
                            customClass: {
                                container: 'my-swal'
                            },
                            text: error.response.data.rtmsg,
                            icon: 'info',
                            confirmButtonText: '확인'
                        }).then((result) => { window.location.href = "/doReservation"; })
                        return;
                    }
                })()
            })

        }
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
                <p>예약하기</p>
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

                <div>
                    <p>예약 가능 시간은 09시 00분 ~ 17시 30분 입니다 (3시간 간격)</p>
                </div>

                <div>
                    <p>선택한 날짜</p>
                    <p>{moment(value).format("YYYY-MM-DD")}</p>
                </div>

                <select onChange={setReserveTime}>
                    <option value={"09:00:00"}>09시 00분</option>
                    <option value={"12:00:00"}>12시 00분</option>
                    <option value={"15:00:00"}>15시 00분</option>
                    <option value={"17:30:00"}>17시 30분</option>
                </select>

                <div>
                    <input onChange={setReserveHeadCount} type="text" placeholder="예약 인원수를 입력해주세요" />
                </div>

                <button onClick={compareDate} className="ReservationSubmitBtn">
                    예약하기
                </button>
            </div>
        </div>
    );
};

export default DoReservation;