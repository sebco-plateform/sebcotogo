import React, { useRef, useState } from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide, SwiperSlideProps} from 'swiper/react';
import { isMobile } from 'mobile-device-detect';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//import './styles.css';

// import required modules
import {Autoplay, Pagination, Navigation, FreeMode} from 'swiper/modules';
import CardArt1 from "@/components/CardArt1";

export default function Swipers() {
    return (
        <>
            <Swiper
                slidesPerView={2}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,

                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <CardArt1 />
                </SwiperSlide>

                <SwiperSlide>
                    <CardArt1 />
                </SwiperSlide>

                <SwiperSlide>
                    <CardArt1 />
                </SwiperSlide>

                <SwiperSlide>
                    <CardArt1 />
                </SwiperSlide>

            </Swiper>
        </>
    );
}
