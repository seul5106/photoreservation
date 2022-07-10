import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LoginModule from "../Modal/ModalFregment"
import img from "../../assets/img/pngwing.com.png"



const Hamberger = () => {
    const [contentshow, setContentshow] = useState(0);
    const [show, setShow] = useState(true);
    const [active, setActive] = useState({ menu: 0 });
    const [scrollPosition, setScrollPosition] = useState(0);

    //페이지 스크롤의 위치에 따라 상태값을 저장
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
    });

    const ifAbout = (state) => {
        if (state.menu === 0 && scrollPosition < 53) {
            return "original_hamberger"
        } else if (state.menu === 0 && scrollPosition >= 53) {
            return "change_hamberger"
        } else if (state.menu === 1) {
            return "original_hamberger"
        } else if (state.menu === 2) {
            return "original_hamberger"
        } else if (state.menu === 3) {
            return "original_hamberger"
        }
    }

    const getCookie = (name) => {
        // 쿠키 값을 가져옵니다.
        let value = "; " + document.cookie;
        // 키 값을 기준으로 파싱합니다.
        let parts = value.split("; " + name + "=");
        // value를 return!
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
    }; 

    useEffect(() => {
        if (getCookie("jwtToken") !== undefined) {
            setShow(false);
        }
    }, [])

    const clickhamberger = (props) => {
        if(props === 0){setContentshow(true)}
        else if(props === 1){setContentshow(false)}
    }

    const changeMenu = (menuIndex) => {
        setActive(
            {menu: menuIndex}
        )
    }

    //block_hamberger의 공간 클릭 시 햄버거버튼 닫힘
    const click_block_hamberger = ()=>{
        setContentshow(false)
    }

    return (
        <div className={ifAbout(active)}>
            <div className="show_hamberger">
                <img src={img} alt="햄버거 버튼" onClick={()=>clickhamberger(0)} />
            </div>
            <div className={contentshow === true ? "show_hambergerTabs" : "disable_hambergerTabs"}>
                <img src={img} alt="햄버거 버튼" onClick={()=>clickhamberger(1)} />
                <Link to="/" className={`${active.menu === 0 ? 'active' : ''}`} onClick={() => changeMenu(0)}>YSL STUDIO</Link>
                <Link to="/About" className={`${active.menu === 1 ? 'active' : ''}`} onClick={() => changeMenu(1)}>Location</Link>
                <Link to="/Gallery" className={`${active.menu === 2 ? 'active' : ''}`} onClick={() => changeMenu(2)}>Gallery</Link>
                {show === true ? <></> : <Link to="/Profile" className={`${active.menu === 3 ? 'active' : ''}`}  onClick={() => changeMenu(3)}>Profile</Link>}
                <LoginModule/>
            </div>
            <div onClick={click_block_hamberger} className={contentshow === true ? "block_hamberger" : ""}>

            </div>
        </div>
    );
};

export default Hamberger;