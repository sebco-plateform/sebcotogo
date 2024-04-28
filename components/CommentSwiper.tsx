"use client"
import React, {useState, useEffect} from 'react';
import { Carousel } from 'antd';
import {Quote, User} from "lucide-react";
import {Api} from "@/api/Api";

const contentStyle: React.CSSProperties = {

};

const CommentSwiper = () => {
    const [data, setData]= useState<any[]>([]);

    useEffect(() => {
        Api.getAll("comment/all").then((values: any[]) => {
            setData(values);
        })

    }, []);


    return <Carousel autoplay className={"flex items-center justify-center"}>

        {
            data.map((items, index) => {
                return (
                    <div key={index} className={"w-full justify-center items-center"}>
                        <div className={"flex items-center justify-center w-full"}>
                            <div className={"w-[450px] h-[250px] p-5 flex flex-col  border-2 rounded-[50px] "}>

                                <div className={"flex items-center space-x-3 mb-3"}>
                                    <div
                                        className={"flex items-center justify-center p-3 rounded-full border-2 border-orange-600"}>
                                        <User className={"h-[25px] w-[25px] "}/>
                                    </div>

                                    <h1 className={"font-bold text-[20px]"}>{items.user.lastName}</h1>
                                </div>

                                <Quote className={"self-start"}/>
                                <h3 className={"text-center"}>
                                    {items.message}
                                </h3>
                                <Quote className={"self-end"}/>
                            </div>

                        </div>

                    </div>
                );
            })
        }


    </Carousel>
};

export default CommentSwiper;