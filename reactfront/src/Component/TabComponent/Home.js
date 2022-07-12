//Home
import React, { useEffect, useLayoutEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getTokenIsOK } from './../../Slices/ReadTokenSlice'


import Showcase from "../HomeSwiper/Showcase";
import ReservationBtn from "../ReservationBtn";
import { Cookies } from "react-cookie";


const Home = () => {

  const { rt } = useSelector((state) => state.ReadToken);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getTokenIsOK());
  }, [dispatch, rt])

  
  return (
    <div className="HomeContainer">
      <Showcase />
      <ReservationBtn />
    </div>
  )
};

export default Home;
