'use client'
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
interface CardInterface {
    name: string;
    price: string;
    description: string;
    image: string;
    id:number;
}

const CardArt1 = ({name,
    price,
   description,
   image,
   id,
}: CardInterface) => {
    const router = useRouter();

    return <div className={'flex flex-col md:flex-row md:space-x-5 md:p-3 p-1 w-[300px] md:w-[486px] h-auto bg-white rounded-[15px]'}>
            {/*image*/}
            <div className={"w-full items-center flex justify-center"}>
                <img
                    src={image}
                    alt={'image'}
                    className={'w-[250px] h-[200px] bg-center bg-cover bg-content self-center'}
                />
            </div>

            <div className={'w-full flex flex-col space-y-5 mt-3'}>
                {/*title*/}
                <h1 className={'font-bold text-[20px] text-center md:text-start'}>{name}</h1>

                {/*description*/}
                <div className={' text-center text-orange-600  md:text-start font-bold text-[20px] mt-5'}>
                    {price} <span className={'font-light text-[15px]'}>TTC</span>
                </div>

                <Button
                    onClick={() => {
                        router.push(`/products/${id}`)
                    }}
                    className={"bg-sky-500 mr-3 mb-2 md:mb-0"}>
                    Voire les détails.
                </Button>
            </div>
        </div>

}

export default CardArt1;