"use client"
import {Button} from "@/components/ui/button";
import {PlusCircle, Search} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {DropdownMenuGroup, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/navigation";
import {Api} from "@/api/Api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import {DropdownMenuDemoAdmin} from "@/app/(amdin)/componnents/DropDwonMenuAdmin";
import {CategoryModel} from "@/app/models/Category";


export default  function Categories() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CategoryModel[]>([]);
    const [actif, setActif] = useState(false);

    const route = useRouter()
    const [categoryData, setCategoryData] = useState<CategoryModel[]>([]);
    const {toast} = useToast();
    useEffect(() => {
        Api.getAll('category/all').then((cats) => {
            setCategoryData(cats);
        })
    }, []);

    const handleChange = (e: any) => {
        const searchTerm = e.target.value;
        if(searchTerm.trim() !== '') {
            setActif(true)
            setQuery(searchTerm);
            // Simulation d'une recherche avec un tableau de données statique
            const filteredResults = categoryData.filter(item =>
                item.catName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        }
        else  {
            setActif(false)
            setQuery('');
            setResults([]);
        }

    };
    const remove = async (id: string) => {
        const response =  await Api.remove(`category/delete/${id}`)
        if(response.ok){
         route.refresh()
         toast({
             title: 'Categorie suprimer avec succès'
         })
        }
     }

    const tableConstruction  = (data: CategoryModel[]) => {
       return data.map((arts) => (
            <TableRow key={arts.id}>
                <TableCell>
                    <Image src={arts.imageUrl} alt={""} width={50} height={50} className={"object-cover bg-center"}/>
                </TableCell>
                <TableCell>{arts.catName}</TableCell>
                {/*actions*/}
                <TableCell className="">
                    <DropdownMenuDemoAdmin childrens={
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                        size={"sm"}
                                        onClick={() => {
                                            route.push(`/admin/edit_category/${arts.id}`)
                                        }}
                                        className={'self-center w-full'}
                                >
                                    Edite
                                </Button>
                            </DropdownMenuItem>

                            {/*delete Item*/}
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
                                    Desactivé
                                </Button>
                            </DropdownMenuItem>

                        </DropdownMenuGroup>

                    }/>
                </TableCell>
            </TableRow>
        ))
    }

    return (
        <main className={'mt-20 mx-20'}>

            {/* Same as */}
            <div className={'flex justify-between content-between'}>
                <div className={''}>
                    <h1 className={'font-extrabold text-[30px]'}>Categories({categoryData.length})</h1>
                    <h1 className={'text-gray-400'}>gestion des Categories</h1>
                </div>

                <Button size={'lg'}
                        className={'flex space-x-2'}
                        onClick={() => {
                            route.push('/admin/add_category');
                        }}
                >
                    <PlusCircle className={'h-[15px] w-[15px]'}/>
                    <h1>Ajouter une Catégorie</h1>
                </Button>
            </div>

            <Separator className={'w-full my-5'}/>

            {/*search input*/}
            <div className={"flex space-x-3 mb-5  w-[550px] p-3 rounded-sm"}>
                <Input type={'text'}
                       placeholder={'Trouver une categorie'}
                       name={'article'}
                       className={'h-[50px]'}
                       value={query}
                       onChange={handleChange}
                />
                <Search className={'h-[40px] w-[40px]'}/>
            </div>


            {/*table*/}
            <Table>
                <TableCaption>Liste des catégories.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead className="">Nom</TableHead>

                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>

                {/*table body*/}
                <TableBody>
                    {
                        query == '' ? tableConstruction(categoryData) : tableConstruction(results)
                    }
                </TableBody>
                </Table>
        </main>
    );
}