"use client"
import { Api } from '@/api/Api';
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {DataInterface} from "@/lib/interfaces";
import { Skeleton } from './ui/skeleton';


export default function Tap({ props }: Readonly<{
    props: React.ReactNode;
}>) {
    const [catId, setCatId] = useState(0);
    const [catName, setCatName] = useState('');
    const [categoriesData, setCategoriesData] = useState<any[]>([]);
    const [data, setData] = useState<DataInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingArticle, setLoadingArticle] = useState(false);

    useEffect(() => {
        setLoading(true)
        Api.getAll('category/all').then((catData: any[]) => {
            setCategoriesData(catData)
        }).finally(() => {
            setLoading(false)
        })
    }, []);
    return (
        <div className=" top-16 text-right w-auto">
            <Menu as="div" className=" absolute left-5 inline-block text-left">
                {/*button props*/}
                <div>
                    <Menu.Button className="inline-flex w-auto justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:underline focus:underline-blue focus-visible:ring-2 focus-visible:ring-white/75">
                        {props}
                    </Menu.Button>
                </div>
                <Transition
                    as={"div"}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    className={"bg-white "}
                >
                    <div className={'p-3 md:h-[400px] md:w-[800px]  flex md:flex-row md:space-x-5 flex-col space-y-2 md:space-y-0'}>
                        <Menu.Items className="w-[300px]   md:w-[200px] mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black/5 focus:outline-none">
                            <div className="px-1 py-1 ">

                                {
                                    loading ?
                                    [1,2,3,4,5].map((items) => {
                                        return <div key={items} className={"flex space-x-3"}>
                                            <Skeleton className={"h-5 w-5 rounded-full"}/>
                                            <Skeleton className={"w-[150px] h-5"}/>
                                        </div>
                                    })
                                        :
                                        categoriesData.map((cat, index) => {
                                            return <Menu.Item key={index}>
                                                {({active}) => {
                                                    if (active) {

                                                    setCatId(cat.id)
                                                    //const dataArray: DataInterface[] = [];
                                                        setLoadingArticle(true)
                                                    const fetchData = async () => {

                                                        try {
                                                            const articles: any[] = await Api.getAll(`article/articleByCategoryId/${catId}`);
                                                            const dataArray: DataInterface[] = [];

                                                            for (const articleElement of articles) {
                                                                const imgData: any[] = await Api.getAll(`image/articleImage/${articleElement.article_id}`);
                                                                const relevantImages = imgData.filter(img => img.article.id == articleElement.article_id);

                                                                relevantImages.forEach(img => {
                                                                    dataArray.push({
                                                                        name: articleElement.article_articleName,
                                                                        price: String(articleElement.article_price),
                                                                        description: articleElement.article_description,
                                                                        articleId: String(articleElement.article_id),
                                                                        imageUrl: img.imageUrl,
                                                                        imageId: String(img.id)
                                                                    });
                                                                });
                                                            }

                                                            setData(dataArray);
                                                        } catch (error) {
                                                            console.error("Error fetching data:", error);
                                                            setLoadingArticle(false)
                                                        }
                                                    };

                                                    fetchData();
                                                    setCatName(cat.catName);
                                                        setLoadingArticle(false)
                                                }
                                                return <button
                                                    className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}

                                                >
                                                    {active ? (
                                                        <img src={String(cat.imageUrl)} alt={'cat'}
                                                            className="mr-2 h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <img src={String(cat.imageUrl)} alt={'cat'}
                                                            className="mr-2 h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    )
                                                    }
                                                    {
                                                        cat.catName
                                                    }
                                                </button>
                                            }}
                                        </Menu.Item>
                                    })
                                }
                            </div>

                        </Menu.Items>



                        <div className={'flex flex-col '}>
                            <h1 className={'text-black mt-3'}>{catName}</h1>
                            <div className={'grid  grid-cols-2 md:grid-cols-4 gap-4 '}>
                                {
                                    loadingArticle ?
                                        [1,2,3,4,5].map((items) => {
                                            return <div key={items} className={"flex flex-col space-y-3 items-center justify-center"}>
                                                <Skeleton className={"w-[50px] h-[50px] rounded-full"} />
                                                <Skeleton className={"w-[100px] h-5"} />
                                            </div>
                                        })
                                        :
                                    data.map((prod, index) => {

                                        return <Link href={`/products/${prod.articleId}`}
                                            className={'flex  flex-col items-center justify-center'}
                                            key={index}>
                                                <img src={prod.imageUrl} alt={'product'}
                                                    className={'bg-center flex items-center justify-center  bg-cover bg-no-repeat object-cover w-[50px] h-[50px] rounded-full'} />

                                            <h1 className={'text-center text-black font-bold '}>
                                                {prod.name}
                                            </h1>
                                        </Link>


                                    })
                                }

                            </div>
                        </div>
                    </div>

                </Transition>
            </Menu>
        </div>
    )
}

