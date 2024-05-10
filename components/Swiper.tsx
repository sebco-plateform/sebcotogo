"use client"
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide, SwiperSlideProps } from 'swiper/react';
import { isMobile } from 'mobile-device-detect';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper/modules';
import CardArt1 from "@/components/CardArt1";
import { Api } from '@/api/Api';
import { ArticleModel } from '@/app/models/ArticleModel';
import MobileDetect from 'mobile-detect';

interface DataInterface {
    name: string;
    price: string;
    description: string;
    articleId: string;
    imageUrl: string;
    imageId: string;
}
export default function Swipers() {
    const [articleData, setArticleData] = useState<ArticleModel[]>([])
    const [image, setImage] = useState<any[]>([]);
    const [data, setData] = useState<DataInterface[]>([]);

    const [isMobile, setIsMobile] = useState(false)





    useEffect(() => {
        const md = new MobileDetect(window.navigator.userAgent);

        setIsMobile(!!md.mobile());

        //declaration of thee variable who detecte the screen
        const fetchData = async () => {
            const dataArray: DataInterface[] = [];
            Api.getAll('article/all').then((articles: ArticleModel[]) => {
                articles.forEach((articleElement) => {
                    Api.getAll(`image/articleImage/${articleElement.id}`).then((imgData: any[]) => {
                        imgData.forEach((img) => {
                            if (img.article.id == articleElement.id) {
                                dataArray.push({
                                    name: articleElement.articleName,
                                    price: String(articleElement.price),
                                    description: articleElement.description,
                                    articleId: String(articleElement.id),
                                    imageUrl: img.imageUrl,
                                    imageId: String(img.id)
                                })
                            }

                        })
                    })
                })
                setData(dataArray);
            })

        }

        fetchData();



    }, [isMobile])
    return (
        <>
            <Swiper
                slidesPerView={isMobile ? 1 : 2}
                spaceBetween={5}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,

                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper flex items-center justify-center space-x-5"
            >
                {
                    data.map((articles, index) => {
                        if (index <= 4) {

                            return <SwiperSlide className={" relative left-[13%] md:left-[35%] md:right-[30%] flex self-center"} key={index}>

                                <CardArt1 name={articles.name} price={String(articles.price)} description={articles.description} image={articles.imageUrl} id={Number(articles.articleId)} />

                            </SwiperSlide>
                        }
                    })
                }




            </Swiper>
        </>
    );
}
