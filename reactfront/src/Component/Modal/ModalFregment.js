import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Cookies, useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

import Modal from './Modal';
import Login from "../Users/Login"
import { getTokenIsOK } from '../../Slices/ReadTokenSlice'
import { setTabShow } from '../../Slices/TabShowSlice';

const cookies = new Cookies();


const ModalFregment = () => {
  const usenavigate = useNavigate();
  
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  // 로그아웃 버튼을 보여줄지 로그인 버튼을 보여줄지 결정하는 상태값

  const { rt } = useSelector((state) => state.ReadToken);
  const { TAB_SHOW } = useSelector((state) => state.TabShowData)
  const dispatch = useDispatch();

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [, , removeCookie] = useCookies("jwtToken");

  //세션값과 서버에서 호출한 세션값을 비교해서 검출
  useEffect(() => {
    if (rt === 401 || rt === 419) {
      cookies.remove("jwtToken")
    }

    if (cookies.get("jwtToken") === undefined) {
      //토큰이 존재하지 않는다면 로그인버튼 보이게
      dispatch(setTabShow(false))
    } else if (cookies.get("jwtToken") !== undefined) {
      //토큰이 존재한다면 로그아웃버튼 보이게
      dispatch(setTabShow(false))
    }
  }, [dispatch , TAB_SHOW, rt])



  const Logout = () => {
    removeCookie("jwtToken", { path: '/' })
    dispatch(getTokenIsOK())
    dispatch(setTabShow(false))
    usenavigate("/")		// 현재url을 변경해준다.
  }

  if (TAB_SHOW === false) {
    return (
      <React.Fragment>
        <button className={"loginButton"} onClick={openModal}>Login</button>

        <Modal open={modalOpen} close={closeModal} header="Login">
          <Login close={closeModal} />
        </Modal>
      </React.Fragment>
    );
  } else if (TAB_SHOW === true) {
    return (
      <React.Fragment>
        <button className={"loginButton"} onClick={Logout}>Logout</button>
      </React.Fragment>
    );
  }

};

export default ModalFregment;