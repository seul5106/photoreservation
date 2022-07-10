import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, EffectFade } from "swiper";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';


// Import Img
import img1 from "../../assets/img/wallpaperbetter1.jpg"
import img2 from "../../assets/img/wallpaperbetter2.jpg"
import img3 from "../../assets/img/wallpaperbetter3.jpg"
import img4 from "../../assets/img/wallpaperbetter4.jpg"

SwiperCore.use([Autoplay, Pagination, EffectFade])

export default function Showcase() {

    return (
        <>
            <Swiper
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                centeredSlides={true}
                pagination={{ clickable: true }}

                effect={"fade"}
                navigation={true}
                loop={true}

                className="mySwiper"
            >
                <SwiperSlide className="">
                    <img src={img1} alt="전시용 이미지1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} alt="전시용 이미지2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} alt="전시용 이미지3" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} alt="전시용 이미지4" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
