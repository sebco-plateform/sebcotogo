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
import {DropdownMenuGroup, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {DropdownMenuDemoAdmin} from "@/app/(amdin)/componnents/DropDwonMenuAdmin";



const OrderIncoming =() => {
    const [orderData, setOrderData] = useState<any[]>([]);
    const route = useRouter();
    useEffect(() => {

        Api.getAll("order/all").then((items: any[]) => {

            setOrderData(items)
        })
    }, []);

    const tableConstruction = (data: any[]) => {

        return data.map((arts) => {

            return   <TableRow key={arts.id}>

                <TableCell>{String(arts.createdAt).slice(0, 10)}</TableCell>
                <TableCell>{String(arts.createdAt).slice(14, 18)}</TableCell>
                <TableCell>{arts.totalPrice}</TableCell>
                <TableCell>{arts.user.firstName} {arts.user.lastName}</TableCell>
                <TableCell>{arts.delivery.city} {arts.delivery.quarter}</TableCell>
                <TableCell>{arts.delivery.deliveryDate}</TableCell>
                <TableCell>{arts.delivery.deliveryHoures}</TableCell>
                <TableCell
                    className={arts.status == "pass" ? "text-blue-600" : "text-red-600"}>{arts.status}</TableCell>
                {/*actions*/}
                <TableCell className="">
                    <DropdownMenuDemoAdmin childrens={

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                        size={"sm"}
                                        onClick={() => {
                                            route.push(`/admin/edit_order/${arts.id}`)
                                        }}
                                        className={'self-center w-full'}
                                >
                                    Editer
                                </Button>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Button type="button"
                                        variant={'destructive'}
                                        size={'sm'}
                                        onClick={ async () => {
                                            const confirmation: boolean = confirm("Voulez-vous suprimer cette commande?")

                                            if (confirmation) {
                                                const resp = await Api.remove(`order/delete/${arts.id}`)
                                            }
                                        }}

                                >
                                    Suprimer
                                </Button>

                            </DropdownMenuItem>

                        </DropdownMenuGroup>


                    }/>
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
                        <TableHead className="">Action</TableHead>
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