import React from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, EffectCoverflow } from "swiper";

import videoSrc from "../../assets/video/2.mp4";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';


// Import Img
import image1 from "../../assets/img/galleryImg/1.png"
import image2 from "../../assets/img/galleryImg/2.jpg"
import image3 from "../../assets/img/galleryImg/3.jpg"
import image4 from "../../assets/img/galleryImg/4.jpg"
import image5 from "../../assets/img/galleryImg/5.jpg"
import image6 from "../../assets/img/galleryImg/6.jpg"
import image7 from "../../assets/img/galleryImg/7.jpg"
import image8 from "../../assets/img/galleryImg/8.jpg"
import image9 from "../../assets/img/galleryImg/9.jpg"
import image10 from "../../assets/img/galleryImg/10.jpg"
import image11 from "../../assets/img/galleryImg/11.png"
import image12 from "../../assets/img/galleryImg/12.png"
import image13 from "../../assets/img/galleryImg/13.png"
import image14 from "../../assets/img/galleryImg/14.png"
import image15 from "../../assets/img/galleryImg/15.png"


SwiperCore.use([Autoplay, Pagination, EffectCoverflow])

const Gallery = () => {
    
    return (
        <div className="galleryContainer">
            <video
                autoPlay={true}
                playsInline={true}
                muted={true}
                
                loop={true}
                controls={false}
            >
                <source src={videoSrc}></source>
            </video>
            <div className='galleryContents'>
                    <Swiper
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        centeredSlides={true}
                        pagination={{ clickable: true }}

                        effect={"coverflow"}
                        slidesPerView={"auto"}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        navigation={true}
                        loop={true}

                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src={image1} alt="전시용 이미지1" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image2} alt="전시용 이미지2" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image3} alt="전시용 이미지3" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image4} alt="전시용 이미지4" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image5} alt="전시용 이미지4" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image6} alt="전시용 이미지4" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image7} alt="전시용 이미지4" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image8} alt="전시용 이미지4" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image9} alt="전시용 이미지4" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image10} alt="전시용 이미지4" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image11} alt="전시용 이미지4" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image12} alt="전시용 이미지4" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image13} alt="전시용 이미지4" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image14} alt="전시용 이미지4" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image15} alt="전시용 이미지4" />
                        </SwiperSlide>
                    </Swiper>
                </div>
        </div>
    );
};

export default Gallery;