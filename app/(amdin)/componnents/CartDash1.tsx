import Image from "next/image";


interface CartInter {
    image: string,
    title: string,
    subtitle: string,
    price: string,
    color: string,
}
const CartDash1 = ({
                       image,
                       title,
                       subtitle,
                       price,
    color,
                   }: CartInter) => {

    return (
        <div
            className={"w-[300px] flex flex-col justify-between content-between p-5 h-[200px] bg-white shadow-sm rounded-md"}>
            <div className={"flex w-full items-center justify-between content-between  "}>
                <div>
                    <h1 className={"font-black"}>{title}</h1>
                    <h1 className={"font-light text-[12px]"}>(les 30 derniers jours)</h1>
                </div>

                <Image src={image}
                       alt={"img"}
                       width={30}
                       height={30}
                       className={"bg-cover bg-center object-cover "}
                />
            </div>

            <div>
                <h1 className={"font-light text-[18px]"}>{price}</h1>
                <h1 className={"font-light text-[12px]"}><span className={color}>{subtitle}</span> (les 30
                    jours)</h1>
            </div>

            <div className={"text-blue-600 font-bold"}>
                A jours
            </div>
        </div>
    );
}
export default CartDash1;