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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {DropdownMenuGroup, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {DropdownMenuDemoAdmin} from "@/app/(amdin)/componnents/DropDwonMenuAdmin";


export default  function Orders() {

    const route = useRouter();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [orderData, setOrderData] = useState<any[]>([]);

    useEffect(() => {

        Api.getAll("order/all").then((items: any[]) => {

            setOrderData(items)
        })
    }, []);

    const handleChange = (e: any) => {
        const searchTerm = e.target.value;
        if(searchTerm.trim() !== '') {
            setQuery(searchTerm);
            // Simulation d'une recherche avec un tableau de données statique
            const filteredResults = orderData.filter(item =>
                item.user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        }
        else  {
            setQuery('');
            setResults([]);
        }
 
    };

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


    return (
        <main className={'mt-20 px-20'}>
             <div className={'flex justify-between content-between'}>
                <div className={'flex flex-col space-y-0'}>
                    <h1 className={'font-extrabold text-[30px]'}>Commandes({orderData.length})</h1>
                    <p className={'text-gray-400'}>gestion des commandes</p>
                </div>

                
            </div>

            <Separator className={'w-full my-5'}/>

{/*search input*/}
<div className={"flex space-x-3 mb-5  w-[550px] p-3 rounded-sm"}>
    <Input type={'text'}
           placeholder={'Trouver une une commande en tapant le nom du client'}
           name={'article'}
           className={'h-[50px]'}
           value={query}
           onChange={handleChange}
    />
    <Search className={'h-[40px] w-[40px]'}/>
</div>

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
                        query == '' ? tableConstruction(orderData) : tableConstruction(results)
                    }
                </TableBody>
                <TableFooter>

                </TableFooter>
            </Table>
        </main>
    );
}