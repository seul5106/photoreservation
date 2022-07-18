import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Cookies } from 'react-cookie';

import { getTokenIsOK } from '../../Slices/ReadTokenSlice'
import { setTabShow } from '../../Slices/TabShowSlice'
import { SetTapItemValue } from '../../Slices/SetTapItemSlice'

import LoginModule from "../Modal/ModalFregment"
import img from "../../assets/img/pngwing.com.png"

const cookies = new Cookies();

const Hamberger = () => {
    const dispatch = useDispatch();
    const [contentshow, setContentshow] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

    const { TAB_SHOW } = useSelector((state) => state.TabShowData);
    const { rt } = useSelector((state) => state.ReadToken);
    const { setTabItem } = useSelector((state) => state.SetTapItemV);

    //페이지 스크롤의 위치에 따라 상태값을 저장
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
    });

    const ifAbout = (setTabItem) => {
        if (setTabItem === 0 && scrollPosition < 53) {
            return "original_hamberger"
        } else if (setTabItem === 0 && scrollPosition >= 53) {
            return "change_hamberger"
        } else if (setTabItem === 1) {
            return "original_hamberger"
        } else if (setTabItem === 2) {
            return "original_hamberger"
        } else if (setTabItem === 3) {
            return "original_hamberger"
        }
    }

    useEffect(() => {
        if (rt === 401 || rt === 419) {
            dispatch(setTabShow(true))
            dispatch(SetTapItemValue(0))
        } else {
            dispatch(setTabShow(false))
        }
        
        if(cookies.get("jwtToken")) {
            dispatch(getTokenIsOK())
        }
    }, [dispatch, rt])

    const clickhamberger = (props) => {
        if(props === 0){setContentshow(true)}
        else if(props === 1){setContentshow(false)}
    }

    

    //block_hamberger의 공간 클릭 시 햄버거버튼 닫힘
    const click_block_hamberger = ()=>{
        setContentshow(false)
    }

    return (
        <div className={ifAbout(setTabItem)}>
            <div className="show_hamberger">
                <img src={img} alt="햄버거 버튼" onClick={()=>clickhamberger(0)} />
            </div>
            <div className={contentshow === true ? "show_hambergerTabs" : "disable_hambergerTabs"}>
                <img src={img} alt="햄버거 버튼" onClick={()=>clickhamberger(1)} />
                <Link to="/" className={`${setTabItem === 0 ? 'active' : ''}`} onClick={() => dispatch(SetTapItemValue(0))}>YSL STUDIO</Link>
                <Link to="/About" className={`${setTabItem === 1 ? 'active' : ''}`} onClick={() => dispatch(SetTapItemValue(1))}>Location</Link>
                <Link to="/Gallery" className={`${setTabItem === 2 ? 'active' : ''}`} onClick={() => dispatch(SetTapItemValue(2))}>Gallery</Link>
                {TAB_SHOW === false ? <Link to="/Profile" className={`${setTabItem === 3 ? 'active' : ''}`}  onClick={() => dispatch(SetTapItemValue(3))}>Profile</Link> : <></>}
                <LoginModule/>
            </div>
            <div onClick={click_block_hamberger} className={contentshow === true ? "block_hamberger" : ""}>

            </div>
        </div>
    );
};

export default Hamberger;