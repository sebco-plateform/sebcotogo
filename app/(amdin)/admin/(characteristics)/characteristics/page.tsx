"use client"

import {Button} from "@/components/ui/button";
import {PlusCircle, Search} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {DropdownMenuGroup, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {Api} from "@/api/Api";
import { useToast } from "@/components/ui/use-toast";
import {CharacteristicModel} from "@/app/models/characteristic";
import {DropdownMenuDemoAdmin} from "@/app/(amdin)/componnents/DropDwonMenuAdmin";


export default  function Characteristics() {
    const route = useRouter()
    const [characteristicData, setCharacteristicData] = useState<CharacteristicModel[]>([])
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CharacteristicModel[]>([]);
    const {toast} =  useToast();

    useEffect(() => {
        Api.getAll('characteristic/all').then((characteristic) => {
            setCharacteristicData(characteristic);
        })

        
        
    }, [characteristicData]);

    const remove = async (id: string) => {
       const response =  await Api.remove(`characteristic/delete/${id}`)
       if(response.ok){
        route.refresh()
        toast({
            title: 'Characteristique suprimer avec succès'
        })
       }
    }

    const handleChange = (e: any) => {
        const searchTerm = e.target.value;
        if(searchTerm.trim() !== '') {
            setQuery(searchTerm);
            // Simulation d'une recherche avec un tableau de données statique
            const filteredResults = characteristicData.filter(item =>
                item.charactName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        }
        else  {
            setQuery('');
            setResults([]);
        }

    };

    const tableConstruction = (data: CharacteristicModel[]) => {
        return  data.map((arts) => (
            <TableRow key={arts.id}>
                <TableCell>{arts.charactName}</TableCell>
                <TableCell>{arts.value}</TableCell>
                {/*actions*/}
                <TableCell className="">
                    <DropdownMenuDemoAdmin childrens={
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                        size={"sm"}
                                        onClick={() => {
                                            route.push(`/edit_characteristic/${arts.id}`)
                                        }}
                                        className={'self-center w-full'}
                                >
                                    Edite
                                </Button>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Button type="button"
                                        variant={'destructive'}
                                        size={'sm'}
                                        onClick={() => {
                                            const confirmation: boolean = confirm("Voulez-vous suprimer cette article?")

                                            if(confirmation) {
                                                remove(String(arts.id))
                                            }
                                        }}
                                
                                >
                                    Suprimer
                                </Button>
                                {/*<DeleteModal />*/}
                            </DropdownMenuItem>

                        </DropdownMenuGroup>

                    }/>
                </TableCell>
            </TableRow>
        ))
    }


    return (
        <main className={'mt-20 mx-20'}>
            <div className={'flex justify-between content-between'}>
                <div className={''}>
                    <h1 className={'font-extrabold text-[30px]'}>Caractéristiques({characteristicData.length})</h1>
                    <h1 className={'text-gray-400'}>gestion des Caractéristiques</h1>
                </div>

                <Button size={'lg'}
                        className={'flex space-x-2'}
                        onClick={() => {
                            route.push('/add_characteristic')
                        }}
                >
                    <PlusCircle className={'h-[15px] w-[15px]'}/>
                    <h1>Ajouter une Caractéristiques</h1>
                </Button>
            </div>

            <Separator className={'w-full my-5'}/>

            {/*search input*/}
            <div className={"flex space-x-3 mb-5  w-[550px] p-3 rounded-sm"}>
                <Input type={'text'}
                       placeholder={'Trouver une caractérisique'}
                       name={'article'}
                       className={'h-[50px]'}
                       value={query}
                       onChange={handleChange}
                />
                <Search className={'h-[40px] w-[40px]'}/>
            </div>


            {/*table*/}
            <Table>
                <TableCaption>Liste des caractéristiques.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nom du caracteristique</TableHead>
                        <TableHead>value</TableHead>
                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>

                {/*table body*/}
                <TableBody>
                    {
                        query == '' ? tableConstruction(characteristicData) : tableConstruction(results)

                    }
                </TableBody>
            </Table>

        </main>
    );
}