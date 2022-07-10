//Home
import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getTokenIsOK } from './../../Slices/ReadTokenSlice'


import Showcase from "../HomeSwiper/Showcase";
import ReservationBtn from "../ReservationBtn";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const Home = () => {

  const { rt } = useSelector((state) => state.ReadToken);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(rt);

    if(rt === 401 || rt === 419 || rt===null){
      
      dispatch(getTokenIsOK());
    }

  }, [dispatch, rt])

  
  return (
    <div className="HomeContainer">
      <Showcase />
      <ReservationBtn />
    </div>
  )
};

export default Home;
