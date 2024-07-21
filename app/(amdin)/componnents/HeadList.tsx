"use client"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeadlistProps {
    title: string,
    subtitle: string,
    link: string,
    buttonTitle: string,
    count: number,

}

const HeadList = ({ title, subtitle, link, buttonTitle, count }: HeadlistProps) => {
    const router = useRouter();
    return (
        <div className="flex justify-between content-between w-full items-center">
            <div>
                <h1 className="md:text-3xl text-xl font-bold">
                    {title} {count}
                    
                </h1>
                <p className="text-gray-600 text-[13px] ">
                    {subtitle}
                    
                </p>
            </div>

            <Button
                size={"sm"}
                className="bg-blue-600 flex space-x-2"
                onClick={() => {
                    router.push(link)
                }}
            >
                <h1>
                    {buttonTitle}
                    

                </h1>
                <UserPlus />

            </Button>
        </div>
    );
}
export default HeadList;