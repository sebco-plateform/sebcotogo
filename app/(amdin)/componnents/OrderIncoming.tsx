"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Api} from "@/api/Api";
import {Select} from "antd";
import { OrderModel } from "@/models/OrderModel";
import { useToast } from "@/components/ui/use-toast";




const OrderIncoming =() => {
    const [orderData, setOrderData] = useState<any[]>([]);
    const route = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        Api.getAll("order/all").then((items: any[]) => {

            setOrderData(items)
        })
    }, []);

    //function appele si la valeur de select change
    const  handleChange = async (value: any, data: any) => {
        setLoading(true)
        const orderModel = new OrderModel(Number(data.totalPrice), value.status, Number(data.user.id), Number(data.delivery.id))
            const resp = await Api.update(orderModel, `order/update/${data.id}`);

            if(resp.ok) {
                toast({
                    title: `La status de la commande a été modifier`
                })
            }
            else {
                toast({
                    title: `Une erreur s'est produite lors de la modification`,
                    description: 'Réessayer!!',
                    variant: "destructive"
                });
                setLoading(false)
            }

            setLoading(false)
    };

    const tableConstruction = (data: any[]) => {

        return data.map((arts) => {

            return   <TableRow key={arts.id}>

                <TableCell>{String(arts.createdAt).slice(0, 10)}</TableCell>
                <TableCell>{String(arts.createdAt).slice(14, 19)}</TableCell>
                <TableCell>{arts.totalPrice}</TableCell>
                <TableCell>{arts.user.firstName} {arts.user.lastName}</TableCell>
                <TableCell>{arts.delivery.city} {arts.delivery.quarter}</TableCell>
                <TableCell>{arts.delivery.deliveryDate}</TableCell>
                <TableCell>{arts.delivery.deliveryHoures}</TableCell>
                {/*actions*/}
                <TableCell className="">
                <Select
                            defaultValue={arts.status}
                            onSelect={ async (value) => {
                                await handleChange(value, arts);
                            }}
                            loading={loading}
                            options={[
                                {
                                    label: "Passer",
                                    value: "PASS"
                                },
                                {
                                    label: "Délivrer",
                                    value: "DELIVERED"
                                },
                                {
                                    label: "En cours",
                                    value: "GOING"
                                },

                            ]}
                            className={arts.status == "passer" ? "text-blue-600 bg-white border-none h-[35px] w-[250px]" :  "bg-white border-none h-[35px] w-[250px] text-red-600"}
                        />

                        </TableCell>
            </TableRow>
        })

    }
    return(
        <div>
            {/*table*/}
            <Table>
                <TableCaption>Liste des Commandes.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Date de la commande</TableHead>
                        <TableHead className="">Heure de la commande</TableHead>
                        <TableHead>Prix total</TableHead>
                        <TableHead>Nom du client</TableHead>
                        <TableHead className="">Addresse de livraison</TableHead>
                        <TableHead className="">Date de livraison</TableHead>
                        <TableHead className="">Heure de livraison</TableHead>
                        <TableHead className="">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        tableConstruction(orderData)
                    }
                </TableBody>
                <TableFooter>

                </TableFooter>
            </Table>
        </div>
    );
}
export default OrderIncoming;