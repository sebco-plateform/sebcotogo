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
import {PlusCircle, Search} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {DropdownMenuGroup, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Api} from "@/api/Api";
import { useToast } from "@/components/ui/use-toast";
import {ArticleModel} from "@/app/models/Article";
import {DropdownMenuDemoAdmin} from "@/app/(amdin)/componnents/DropDwonMenuAdmin";


export default function Product() {
    const route = useRouter();
    const [articleData, setarticleData] = useState<ArticleModel[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ArticleModel[]>([]);
    const {toast} = useToast();

    useEffect(() => {
        Api.getAll('article/all').then((article) => {
            setarticleData(article);
        })
    }, []);

    const handleChange = (e: any) => {
        const searchTerm = e.target.value;
        if(searchTerm.trim() !== '') {
            setQuery(searchTerm);
            // Simulation d'une recherche avec un tableau de données statique
            const filteredResults = articleData.filter(item =>
                item.articleName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        }
        else  {
            setQuery('');
            setResults([]);
        }
 
    };

    const remove = async (id: string) => {
        const response =  await Api.remove(`article/delete/${id}`)
        if(response.ok){
         route.refresh()
         toast({
             title: 'Categorie suprimer avec succès'
         })
        }
     }

    const tableConstruction = (data: ArticleModel[]) => {
        return data.map((arts) => (
            <TableRow key={arts.id}>
                <TableCell className="font-medium">{arts.articleName}</TableCell>
                <TableCell>{arts.tax}</TableCell>
                <TableCell>{arts.price}</TableCell>
                <TableCell>{arts.description}</TableCell>
                {/*actions*/}
                <TableCell className="">
                    <DropdownMenuDemoAdmin childrens={

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                        size={"sm"}
                                        onClick={() => {
                                            route.push(`/admin/edit_product/${arts.id}`)
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

                            </DropdownMenuItem>

                        </DropdownMenuGroup>


                    }/>
                </TableCell>
            </TableRow>
        ))

    }
    return (
        <main className={'mt-20 px-20 '}>
            <div className={'flex justify-between content-between'}>
                <div className={'flex flex-col space-y-0'}>
                    <h1 className={'font-extrabold text-[30px]'}>Arcticles({articleData.length})</h1>
                    <p className={'text-gray-400'}>gestion des articles</p>
                </div>

                <Button size={'lg'}
                        className={'flex space-x-3'}
                        onClick={() => {
                            route.push("/admin/add_product");
                        }}
                >
                    <PlusCircle className={'h-[15px] w-[15px]'}/>
                    <h1>Ajouter une Article</h1>
                </Button>
            </div>

            <Separator className={'w-full my-5'}/>

            {/*search input*/}
            <div className={"flex space-x-3 mb-5  w-[550px] p-3 rounded-sm"}>
                <Input type={'text'}
                       placeholder={'Trouver une article'}
                       name={'article'}
                       className={'h-[50px]'}
                       value={query}
                       onChange={handleChange}
                />
                <Search className={'h-[40px] w-[40px]'}/>
            </div>

            {/*table*/}
            <Table>
                <TableCaption>Liste des Articles.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nom</TableHead>
                        <TableHead>Taxe</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead className="">description</TableHead>
                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        query == '' ? tableConstruction(articleData) : tableConstruction(results)
                    }
                </TableBody>
                <TableFooter>

                </TableFooter>
            </Table>
        </main>
    );
}