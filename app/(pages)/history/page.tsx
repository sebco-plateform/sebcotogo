"use client"

import React, {useEffect, useState} from "react";
import {Api} from "@/api/Api";
import {Skeleton} from "@/components/ui/skeleton";
import Image from "next/image";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const History = () => {
    const [orders, setOrders] = useState<any[]>([])
    const uid = useSelector((state: RootState) => state.auth.value.uid)

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        Api.getAll(`order/findOrderByUser/${uid}`).then((values: any[]) => {
            setOrders(values)
        })

        setLoading(false)
    }, []);

    return(
        <div className={"px-3 mx-3 md:mx-20 mt-20 md:mt-28"}>
            <h1 className={"text-[35px] font-bold"}>Historique des commendes</h1>

            <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                {
                    loading ?
                        [1, 2, 3, 4, 5].map((items, index) => {
                            return <div>
                                <Skeleton className={"w-full  h-[150px]"}/>
                            </div>
                        })
                        :
                        orders.length == 0 ?
                            <div
                                className={"flex flex-col items-center justify-center  md:relative md:left-[70%] w-full"}>
                                <Image src={"/images/sammy-sailor-looking-through-telescope-off-the-mast.gif"}
                                       alt={"data empty"}
                                       priority
                                       width={400}
                                       height={400}
                                       className={"bg-center bg-cover"}
                                />

                                <h1 className={"text-center font-regular text-blue-600 text-[25px]"}>Pas d'article pour
                                    cette catégorie</h1>
                            </div> :
                            orders.map((items, index) => {
                                return (
                                    <div key={index}
                                         className={"bg-white p-2 flex items-center flex-col space-y-2 md:flex-row md:space-x-3 shadow-md w-full md:w-[450px]   md:h-[200px]"}>
                                        <Image src={"/images/acheter.png"}
                                               alt={"data empty"}
                                               priority
                                               width={120}
                                               height={120}
                                               className={" bg-center bg-cover"}
                                        />
                                        <div className={"flex space-x-2"}>
                                            <div>
                                                <h1>Date de la commande </h1>
                                                <h1>Status de la commende </h1>
                                                <h1>somme payer </h1>
                                                <h1>Lieu de livraison </h1>
                                                <h1>Date et heure de livraison </h1>
                                            </div>

                                            <div>
                                                <h1 className={"font-medium text-cyan-600"}>: {String(items.order_created_at).substring(0, 10)} </h1>
                                                <h1 className={"font-medium text-cyan-600"}>: {items.order_status} </h1>
                                                <h1 className={"font-medium text-cyan-600"}>: {items.order_totalPrice} TTC </h1>
                                                <h1 className={"font-medium text-cyan-600"}>: {items.delivery_city}, {items.delivery_quarter} </h1>
                                                <h1 className={"font-medium text-cyan-600"}>: {items.delivery_deliveryDate} {items.delivery_deliveryHoures} </h1>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                }
            </div>
        </div>
    );
}
export default History;