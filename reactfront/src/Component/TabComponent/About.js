//cafe
import React from "react";

import "../../assets/css/style.min.css";
import KakaoMapScript from "../KaKaoMapScript";

import telIcon from "../../assets/img/telIcon.png"
import faxIcon from "../../assets/img/faxIcon.png"
import busIcon from "../../assets/img/busIcon.png"
import mapIcon from "../../assets/img/mapIcon.png"

const About = () => {


  return (
    <div className="AboutContainer">
      <div className="AboutContainerItem">
        <div className="kakaomapContainer">
          <p className="WhereCome">오시는 길</p>
          <hr className="topHr" />
          <div className="mapContainer">
            <KakaoMapScript />
          </div>
          <hr className="bottomHr" />
        </div>

        <div className="placeContainer">
          <div className="place">
            <img src={mapIcon} alt="" />
            <p>동해시 양지길 20-2 상가동 107호</p>
          </div>
          <div className="telContainer">
            <div className="tel">
              <img src={telIcon} alt="" />
              <div className="telP">
                <p>Tel</p>
                <p>00-0000-0000</p>
              </div>
            </div>
            <div className="fax">
              <img src={faxIcon} alt="" />
              <div className="faxP">
                <p>Fax</p>
                <p>00-0000-0000</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="centerHr" />

        <div className="transportContainer">
          <p className="tranportName">교통편</p>
          <div className="bus">
            <img src={busIcon} alt="" />
            <div className="busP">
              <p>버스</p>
              <p>동해 시외버스터미널에서 차량 5분거리</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;