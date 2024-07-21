"use client"

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button, Input } from "antd";

interface HeaddetailProps {
    title: string,
    subtitle: string,

}


const HeadDetaill = ({title, subtitle}: HeaddetailProps) => {
    const router = useRouter();

    return (
        <div className="flex justify-between content-between w-full items-center">
            <div>
                <h1 className="md:text-3xl text-xl font-bold">
                {title}
                 
                </h1>
                <p className="text-gray-600 text-[13px] ">
                    {subtitle}
                    
                </p>
            </div>

            <Button
                size={"small"}
                className="bg-blue-600 flex space-x-2 text-white p-2"
                onClick={() => {
                    router.back();
                }}
            >
                <ArrowLeft />
            </Button>
        </div>
    );
}
export default HeadDetaill;