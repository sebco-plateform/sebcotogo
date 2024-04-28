import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import {IoIosNotifications} from "react-icons/io";

import Image from "next/image"

const NotificationDrawer = ({text_color} : {text_color: string}) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IoIosNotifications
                onClick={showDrawer}
                className={`h-[24px] w-[24px] ${text_color} `}/>
            <Drawer title="Notifications" onClose={onClose} open={open}>
                <h1 className={"font-bold text-2xl"}>Notifications</h1>

                <div className={"flex self-center flex-col space-y-5 items-center justify-center"}>
                    <Image src={"/images/cloche.gif"}
                           alt={""}
                           width={150}
                           height={150}
                           className={"bg-cover bg-center"}/>

                    <h1 className={"text-red-600 font-bold text-md"}>Pas de Notification!</h1>
                </div>
            </Drawer>
        </>
    );
};

export default NotificationDrawer;