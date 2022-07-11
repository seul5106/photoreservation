import React, { useState } from 'react';
import KakaoAdress from './KakaoAdress';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2"

import { setSignInfo } from "../../Slices/SignInDataSlice"
import SigninButton from "./SigninButton"

import "../../assets/css/style.min.css"

const Signin = () => {


    //컴포넌트마다 상태값을 두는게 훨신 좋더라.....
    const { USER_POSTCODE, USER_ADDRESS, USER_DETAIL_ADDRESS } = useSelector((state) => state.SignInPostCode);
    const dispatch = useDispatch();
    const [info, getInfo] = useState({
        USER_ID: "",
        USER_EMAIL: "",
        USER_PASSWORD: "",
        USER_NAME: "",
        USER_TEL: "",
        USER_BIRTHDAY: ""
    })

    const getSignInfo = (e) => {
        getInfo({
            ...info,
            [e.target.name]: e.target.value,
        })
        dispatch(setSignInfo({
            ...info,
        }))
        
    }


    const onSubmit = () => {
        //유효성 검사
        
        (async () => {
            try {
                SigninButton();
                await axios.post(process.env.REACT_APP_LOCALHOST +'/members/signin',
                    {
                        member_id: info.USER_ID,
                        member_email: info.USER_EMAIL,
                        member_pw: info.USER_PASSWORD,
                        member_name: info.USER_NAME,
                        member_phone: info.USER_TEL,
                        member_postcode: USER_POSTCODE,
                        member_addr1: USER_ADDRESS,
                        member_addr2: USER_DETAIL_ADDRESS,
                        member_birth: info.USER_BIRTHDAY,
                    });
                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    text: "회원가입을 환영합니다!!",
                    icon: 'success',
                    confirmButtonText: '확인'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/"
                    }
                })
            } catch (e) {
                const rtmsg = JSON.parse(e.request.response).rtmsg

                if (rtmsg === "이미 사용중인 아이디 입니다.") {
                    Swal.fire({
                        customClass: {
                            container: 'my-swal'
                        },
                        text: rtmsg,
                        icon: 'error',
                        confirmButtonText: '확인'
                    })
                }

            }

        })();
        //유효성 검사가 끝나면 회원가입을 위한 MySQL연동 필요!!
        
    }

    return (
        <div className="join_form" >
            <h1>가입을 시작합니다</h1>

            {/* 아이디 */}
            <div className="form-group">
                <p className="ptag">아이디</p>
                <div className="input-100">
                    <input onChange={getSignInfo} type="text" name="USER_ID" id="user_id" className="form-control" placeholder="아이디 입력" />
                </div>
            </div>

            {/* 이메일 */}
            <div className="form-group">
                <p className="ptag">이메일</p>
                <div className="input-100">
                    <input onChange={getSignInfo} type="email" name="USER_EMAIL" id="email" className="form-control" placeholder="이메일 입력" />
                </div>
            </div>

            {/* 비밀번호 */}
            <div className="form-group">
                <p className="ptag">비밀번호</p>
                <div className="input-100">
                    <input onChange={getSignInfo} type="password" name="USER_PASSWORD" id="user_pw" className="form-control" placeholder="비밀번호 입력" />
                </div>
                <div className="input-100">
                    <input type="password" name="user_pw_re" id="user_pw_re" className="form-control" placeholder="비밀번호 재입력" />
                </div>
            </div>

            {/* 이름 */}
            <div className="form-group">
                <p className="ptag">이름</p>
                <div className="input-100">
                    <input onChange={getSignInfo} type="text" name="USER_NAME" id="user_name" className="form-control" placeholder="이름 입력" />
                </div>
            </div>

            {/* 연락처 */}
            <div className="form-group">
                <p className="ptag">연락처</p>
                <div className="input-100">
                    <input onChange={getSignInfo} type="tel" name="USER_TEL" id="tel" className="form-control" placeholder="010-0000-0000" />
                </div>
            </div>

            {/* 주소지 */}
            <KakaoAdress />

            {/* 생년월일 */}
            <div className="form-group">
                <p className="ptag">생년월일</p>
                <div className="input-100">
                    <input onChange={getSignInfo} type="date" name="USER_BIRTHDAY" id="user_date" className="form-control" />
                </div>
            </div>

            {/* 가입 버튼 */}
            <div className="form-group">
                <div className="text-center">
                    <button onClick={onSubmit} className="SigninBtn" type="submit">가입하기</button>
                </div>
            </div>
        </div>
    );
};

export default Signin;