import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTokenIsOK } from '../../Slices/ReadTokenSlice'

import Home from './Home';
import About from './About';
import Profile from "./profile";
import Gallery from "./Gallery";
import Hamberger from "./Hamberger"

import LoginModule from "../Modal/ModalFregment"
import DoReservation from "../DoReservation";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const Tab = () => {
    const [state, setState] = useState({ menu: 0 });
    const [scrollPosition, setScrollPosition] = useState(0);
    const [show, setShow] = useState(true);
    
    const { rt, rtmsg, data, loading } = useSelector((state) => state.ReadToken);
    const dispatch = useDispatch();

    //페이지 스크롤의 위치에 따라 상태값을 저장
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
    });

    useEffect(() => {
        if (rt === 401 || rt === 419) {
            
        } 
        
        if(cookies.get("jwtToken")) {
            dispatch(getTokenIsOK())
            setShow(false);
        }
    }, [dispatch, rt])

    const changeMenu = (menuIndex) => {
        setState({ menu: menuIndex });
    }

    // 첫번째 탭만 css를 적용하기 위한 함수
    const ifAbout = (state) => {
        if (window.location.pathname === "/doReservation") {
            return "original_header"
        } else if (state.menu === 0 && scrollPosition < 53) {
            return "original_header"
        } else if (state.menu === 0 && scrollPosition >= 53) {
            return "change_header"
        } else if (state.menu === 1) {
            return "original_header"
        } else if (state.menu === 2) {
            return "original_header"
        } else if (state.menu === 3) {
            return "original_header"
        }
    }

    return (
        <div className="wrap">
            <section className="header-center">
                <div className={ifAbout(state)}>
                    <ul className="tabs">
                        <Link to="/" className={`${state.menu === 0 ? 'active' : ''}`} onClick={() => changeMenu(0)}>YSL STUDIO</Link>
                        <Link to="/About" className={`${state.menu === 1 ? 'active' : ''}`} onClick={() => changeMenu(1)}>Location</Link>
                        <Link to="/Gallery" className={`${state.menu === 2 ? 'active' : ''}`} onClick={() => changeMenu(2)}>Gallery</Link>
                        {show === true ? <></> : <Link to="/Profile" className={`${state.menu === 3 ? 'active' : ''}`} id="profile" onClick={() => changeMenu(3)}>Profile</Link>}
                        <LoginModule />
                    </ul>
                </div>
                <Hamberger />
            </section>
            <div className="contentArea">
                <Routes>
                    <Route path="/" e element={<Home />} exact={true} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Gallery" element={<Gallery />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/doReservation" element={<DoReservation />} />
                </Routes>
            </div>
        </div>
    )
};

export default Tab;

