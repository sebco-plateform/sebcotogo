"use client"
import CartDash1 from "@/app/(amdin)/componnents/CartDash1";
import Chart1 from "@/app/(amdin)/componnents/Chart1";
import Chart2 from "@/app/(amdin)/componnents/Chart2";
import OrderIncoming from "@/app/(amdin)/componnents/OrderIncoming";
import {useEffect, useState} from "react";
import {Api} from "@/api/Api";
import Chart3 from "@/app/(amdin)/componnents/Chart3";


export default  function DashbordPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [delivered, setDelivered] = useState<any[]>([])
    useEffect(() => {
        Api.getAll("user/findUserByRole/customer").then((values) => {
            setCustomers(values);
        });


        Api.getAll("order/all").then((items: any[]) => {

            setOrders(items)
            const newOrder: any[] = [];
            items.forEach((el: any) => {
                if(el.status =="deliver") {
                    newOrder.push(el);
                }
            })


            const newPrice: number[] = [];
            items.forEach((ele: any) => {
                newPrice.push(Number(ele.totalPrice));
            })
            setDelivered(newOrder);
            setTotalPrice(newPrice.reduce((somme, element) => somme + element, 0));
        })

    }, []);
    return (
        <div className={'my-10 px-5 flex flex-col space-y-[15px]'}>
            <h1 className={"text-[30px] font-black"}>Tableau de bord</h1>
            <section className={"w-full flex space-x-5 justify-between content-between items-center"}>
                <div
                    className={"bg-white shadow-sm rounded-md h-[400px] w-[450px] p-2 flex flex-col items-center justify-center"}>
                    <h1 className={"underline font-medium text-md text-cyan-600"}>Nombre total de commande par mois</h1>
                    <Chart1/>
                </div>
                <div
                    className={"bg-white p-2 flex flex-col  items-center justify-center shadow-sm rounded-md h-[400px]  w-full"}>
                    <h1 className={"underline font-medium text-md text-cyan-600"}>Les articles les plus commandés</h1>

                    <Chart2/>
                </div>
            </section>

            <div
                className={"bg-white p-2 flex flex-col  items-center justify-center shadow-sm rounded-md h-[400px]  w-full"}>
                <h1 className={"underline font-medium text-md text-cyan-600"}>les clients les plus fréquants</h1>

                <Chart3/>
            </div>

            <section className={"flex justify-between space-x-3 content-between"}>
                <CartDash1 color={"text-sky-600"} image={"/images/revenu.png"} price={`${totalPrice}  cfa`}
                           subtitle={"revenue up"} title={"Revenue total"}/>

                {/*card 2*/}
                <CartDash1 color={"text-sky-600"} image={"/images/telephone-intelligent.png"} price={`${orders.length}`}
                           subtitle={"commande up"} title={"commendes total"}/>

                {/*card 3*/}
                <CartDash1 color={"text-sky-600"} image={"/images/avis-client.png"} price={`${customers.length}`}
                           subtitle={"client up"} title={"client total"}/>

                {/* card 4*/}
                <CartDash1 color={"text-sky-600"} image={"/images/livreur.png"} price={`${delivered.length} `}
                           subtitle={"Livraison up"} title={"Livraison total"}/>
            </section>

            <section className={"flex flex-col space-y-5"}>
                <h1 className={"text-[25px] font-black"}>Liste des commandes</h1>

                <OrderIncoming/>
            </section>
        </div>
    );
}