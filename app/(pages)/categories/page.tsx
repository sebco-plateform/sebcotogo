"use client"
import React, {useEffect, useState} from 'react';
import {Api} from "@/api/Api";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"
import {FaSearch} from "react-icons/fa";
import {ArticleModel} from "@/app/models/ArticleModel";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
interface DataIntef {
    catName: string;
    id: string;
    imageUrl: string;
}
export default  function Categories()  {
    const [data, setData] = useState<DataIntef[]>([])
    const [isLoading,setIsLoading] = useState(false)
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<DataIntef[]>([]);
    const [actif, setActif] = useState(false);

    useEffect(() => {

            setIsLoading(true)
        Api.getAll('category/all').then((catData: any[]) => {
            setData(catData);
        })
            setIsLoading(false)
    }, []);

    const handleChange = (e: any) => {
        const searchTerm = e.target.value;
        if(searchTerm.trim() !== '') {
            setActif(true)
            setQuery(searchTerm);
            // Simulation d'une recherche avec un tableau de données statique
            const filteredResults = data.filter(item =>
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

     const render = (datas: DataIntef[]) => {
         return datas.map((cat, index) => {
             return (
                 <Link href={`/articles/${cat.id}`} key={index}
                       className={"flex flex-col px-2  items-center justify-center space-y-3  w-[150px]  h-[150px] bg-purple-200 shadow-2xl rounded-xl "}>
                     <Image src={cat.imageUrl}
                            alt={"category"}
                            width={80}
                            height={80}
                            priority
                            className={"bg-center object-cover bg-cover bg-content "}
                     />

                     <h1 className={"text-center font-bold text-blue-800 "}>
                         {cat.catName}
                     </h1>
                 </Link>
             );

         })
     }

    return (
        <div className={'my-[25%] md:my-[10%] px-3 md:px-20 flex flex-col '}>
            <h1 className={"font-bold text-[35px]"}>Nos Catégories d'article</h1>

            <div className={"md:w-[700px] mt-3"}>
                <p className={"md:text-[18px]  font-light"}>
                    Votre destination en ligne pour des matériaux de
                    construction de qualité. Explorez notre gamme variée,
                    du béton aux revêtements, avec des conseils d'experts à
                    portée de clic.<span className={"text-blue-500"}> Nous garantissons qualité et satisfaction pour vos projets.
                </span>
                </p>
            </div>

            {/*seracher button*/}
            <div className={"self-center my-10 "}>
                <div className={'px-3 flex space-x-3 '}>
                    <form>
                        <Input
                            className={'md:w-[350px] h-[40px] rounded-xl border border-blue-800 border-2 '}
                            placeholder={'Trouver une catégorie. Entrer le nom du catégorie'}
                            type="text"
                            value={query}
                            onChange={handleChange}
                        />
                    </form>

                    <button className={"p-3 rounded-full bg-purple-200"}>
                        <Search />
                    </button>
                </div>
            </div>

            <div className={' w-auto self-center mt-10 grid grid-cols-2 md:flex md:space-x-5 gap-5'}>
                {isLoading ?
                    [1, 2, 3, 5,].map((el, index) => {
                        return <div className={""} key={index}>
                            <Skeleton className="h-[125px] w-auto md:w-[250px] rounded-xl"/>
                        </div>
                    })
                    :

                    data.length == 0 ? <div className={"flex flex-col    w-full "}>
                            <Image src={"/images/sammy-sailor-looking-through-telescope-off-the-mast.gif"}
                                   alt={"data empty"}
                                   priority
                                   width={500}
                                   height={500}
                                   className={"bg-center bg-cover w-full"}
                            />

                        <h1 className={"text-center font-regular text-blue-600 text-[25px]"}>Catégories non disponible</h1>
                    </div> : render(query == "" ? data: results)
                }
            </div>

        </div>
    );
}

