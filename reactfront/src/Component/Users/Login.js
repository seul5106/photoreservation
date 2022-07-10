import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2"

import LoginImage from "../../assets/img/LoginImage.png"

import Modal from '../Modal/Modal';
import Signin from './Signin';


// import setAuthorizationToken from './setAuthorizationToken';
import {Cookies} from 'react-cookie'

const cookies = new Cookies();

const Login = (props) => {
    

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const { close } = props
    //글로벌 전역 상태값 setUser를 받아옴
    //로그인이 성공적으로 이루어지면 user에 상태값을 넣어줘야지 나중에 다른 컴포넌트에서도 user값을 이용하여 다른 것들을 할 수 있음
    const [account, setAccount] = useState({
        id: "",
        pwd: "",
    });


    const onChangeAccount = (e) => {
        //...을 이용하여 account의 복사본을 만들고
        //input에 지정한 네임 속성에 해당 value 값을 넣어 오버라이딩!
        //console.log(account)를 찍어보고 입력한 값들이 account에 출력되면 성공!!
        setAccount({
            ...account,
            [e.target.name]: e.target.value,
        });
    };

    const onClickSubmit = () => {
        //로그인   
        (async () => {
            try {
                const response = await axios.post('http://192.168.55.95:5000/members/login',
                    {
                        member_id: account.id,
                        member_pw: account.pwd
                    },{ withCredentials: true });
                const token = response.data.token;

                cookies.set("jwtToken", token)
                // setAuthorizationToken(token);
                
                close()
                window.location.href = "/";
            } catch (e) {
                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    text: JSON.parse(e.request.response).rtmsg,
                    icon: 'error',
                    confirmButtonText: '확인'
                })
            }
        })()
    }

    return (
        <div className="container">
            <p>LOGIN</p>
            <div className="flex-container">
                <img className="loginicon" src={LoginImage} alt="loginIcon" />
                <input onChange={onChangeAccount} name="id" placeholder="아이디" />
                <input onChange={onChangeAccount} name="pwd" type="password" placeholder="비밀번호" />
                <div className="btn-group">
                    <button className='Loginbutton' onClick={onClickSubmit}>LogIn</button>
                    <React.Fragment>
                        <button className='Loginbutton' onClick={openModal}>SignIn</button>
                        <Modal open={modalOpen} close={closeModal} header="SignIn">
                            <Signin close={closeModal} />
                        </Modal>
                    </React.Fragment>
                </div>
            </div>
        </div>
    );
};

export default Login;