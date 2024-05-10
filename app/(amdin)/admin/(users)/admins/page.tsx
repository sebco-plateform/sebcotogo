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

import React, {useEffect, useState} from "react";
import {Api} from "@/api/Api";
import {DropdownMenuDemoAdmin} from "@/app/(amdin)/componnents/DropDwonMenuAdmin";
import {DropdownMenuGroup, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {PlusCircle, Search} from "lucide-react";

export default function Admin () {
    const [admins, setAdmins] = useState<any[]>([]);
    const route = useRouter();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        Api.getAll("user/findUserByRole/admin").then((values) => {
            setAdmins(values);
        })
    }, []);

    const handleChange = (e: any) => {
        const searchTerm = e.target.value;
        if(searchTerm.trim() !== '') {
            setQuery(searchTerm);
            // Simulation d'une recherche avec un tableau de données statique
            const filteredResults = admins.filter(item =>
                item.firstName.toLowerCase().includes(searchTerm.toLowerCase())
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

                <TableCell>{arts.firstName}</TableCell>
                <TableCell>{arts.lastName}</TableCell>
                <TableCell>{arts.phone} </TableCell>
                <TableCell>{arts.email}</TableCell>
                {/*actions*/}
                <TableCell className="">
                    <DropdownMenuDemoAdmin childrens={

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                        size={"sm"}
                                        onClick={() => {
                                            // route.push(`/admin/edit_order/${arts.id}`)
                                        }}
                                        className={'self-center w-full'}
                                >
                                    Activer
                                </Button>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Button type="button"
                                        variant={'destructive'}
                                        size={'sm'}
                                        onClick={ async () => {
                                            /*   const confirmation: boolean = confirm("Voulez-vous suprimer cette commande?")

                                               if (confirmation) {
                                                   const resp = await Api.remove(`order/delete/${arts.id}`)
                                               }*/
                                        }}

                                >
                                    Désactiver
                                </Button>

                            </DropdownMenuItem>

                        </DropdownMenuGroup>


                    }/>
                </TableCell>
            </TableRow>
        })

    }

    return (
        <div className={'mt-20 px-20'}>

            <div className={'flex justify-between content-between'}>
                <div className={'flex flex-col space-y-0'}>
                    <h1 className={'font-extrabold text-[30px]'}>Admins({admins.length})</h1>
                    <p className={'text-gray-400'}>gestion des Admins</p>
                </div>

                <Button size={'lg'}
                        className={'flex space-x-2'}
                        onClick={() => {
                            route.push('/admin/add_user');
                        }}
                >
                    <PlusCircle className={'h-[15px] w-[15px]'}/>
                    <h1>Ajouter un utilisateur</h1>
                </Button>
            </div>

            <Separator className={'w-full my-5'}/>

            {/*search input*/}
            <div className={"flex space-x-3 mb-5  w-[550px] p-3 rounded-sm"}>
                <Input type={'text'}
                       name={'article'}
                       className={'h-[50px]'}
                       value={query}
                       onChange={handleChange}
                />
                <Search className={'h-[40px] w-[40px]'}/>
            </div>

            {/*table*/}
            <Table>
                <TableCaption>Liste des Admins.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Prénom</TableHead>
                        <TableHead className="">Téléphone</TableHead>
                        <TableHead className="">Email</TableHead>
                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        query == '' ? tableConstruction(admins) : tableConstruction(results)
                    }
                </TableBody>
                <TableFooter>

                </TableFooter>
            </Table>
        </div>
    )
}