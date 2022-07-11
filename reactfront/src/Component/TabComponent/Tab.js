import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTokenIsOK } from '../../Slices/ReadTokenSlice'
import { setTabShow } from '../../Slices/TabShowSlice'
import { SetTapItemValue } from '../../Slices/SetTapItemSlice'

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
    const [scrollPosition, setScrollPosition] = useState(0);

    const { TAB_SHOW } = useSelector((state) => state.TabShowData);
    const { rt } = useSelector((state) => state.ReadToken);
    const { setTabItem } = useSelector((state) => state.SetTapItemV);

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
            dispatch(setTabShow(false))
            dispatch(SetTapItemValue(0))
        } else {
            dispatch(setTabShow(true))
        }

        if (cookies.get("jwtToken")) {
            dispatch(getTokenIsOK())
        }
    }, [dispatch, rt])


    // 첫번째 탭만 css를 적용하기 위한 함수
    const ifAbout = (setTapItem) => {
       
        if (window.location.pathname === "/doReservation") {
            return "original_header"
        } else if (setTapItem === 0 && scrollPosition < 53) {
            return "original_header"
        } else if (setTapItem === 0 && scrollPosition >= 53) {
            return "change_header"
        } else if (setTapItem === 1) {
            return "original_header"
        } else if (setTapItem === 2) {
            return "original_header"
        } else if (setTapItem === 3) {
            return "original_header"
        }
    }

    return (
        <div className="wrap">
            <section className="header-center">
                <div className={ifAbout(setTabItem)}>
                    <ul className="tabs">
                        <Link to="/" className={`${setTabItem === 0 ? 'active' : ''}`} onClick={() => dispatch(SetTapItemValue(0))}>YSL STUDIO</Link>
                        <Link to="/About" className={`${setTabItem === 1 ? 'active' : ''}`} onClick={() => dispatch(SetTapItemValue(1))}>Location</Link>
                        <Link to="/Gallery" className={`${setTabItem === 2 ? 'active' : ''}`} onClick={() => dispatch(SetTapItemValue(2))}>Gallery</Link>
                        {TAB_SHOW === false ? <></> : <Link to="/Profile" className={`${setTabItem === 3 ? 'active' : ''}`} id="profile" onClick={() => dispatch(SetTapItemValue(3))}>Profile</Link>}
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

