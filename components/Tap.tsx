"use client"
import { Api } from '@/api/Api';
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'




export default function Tap({props} : Readonly<{
    props: React.ReactNode;
}>) {
    const [catId, setCatId] = useState(0);
    const [catName, setCatName] = useState('');
    const [categoriesData, setCategoriesData] = useState<any[]>([]);
    const [articleData, setArticleData] = useState<any[]>([]);
    const [imageUrls, setImageUrl] = useState('')

    useEffect(() => {
        Api.getAll('category/all').then((catData: any[]) => {
            setCategoriesData(catData)
        })
    }, []);
    return (
        <div className=" top-16 text-right w-auto">
            <Menu as="div" className=" absolute left-5 inline-block text-left">
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
                        <Menu.Items className="w-[300px]   md:w-[200px] mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                {
                                    categoriesData.map((cat, index) => {
                                        return <Menu.Item key={index}>
                                            { ({ active }) => {
                                                if(active) {


                                                    setCatId(cat.id) 
                                                     Api.getAll(`article/articleByCategoryId/${catId}`).then((articleData) => {
                                                       
                                                        setArticleData(articleData)
                                                    })
                                                    setCatName(cat.catName)
                                                }
                                               return <button
                                                    className={`${
                                                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}

                                                >
                                                    {active ? (
                                                        <img src='/images/ciment 2.png' alt={'cat'}
                                                            className="mr-2 h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <img src='/images/ciment 2.png' alt={'cat'}
                                                            className="mr-2 h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    )}
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

                        

                        <div className={'flex flex-col'}>
                            <h1 className={'text-black'}>{catName}</h1>
                            <div className={'flex mt-10 space-x-5 bg-primaryColors'}>
                                {
                                    articleData.map((prod, index) => {

                                        Api.getAll(`image/articleImage/${prod.article_id}`).then((imageData: {imageUrl: string}[]) => {
                                            imageData.forEach((urls) => {
                                                if(imageData.length == imageData.length) {
                                                setImageUrl(urls.imageUrl)
                                            }
                                            })
                                        });
                                            return <Link href={`/products/${prod.article_id}`}
                                            className={'flex  flex-col w-auto'} 
                                            key={index}>
                                                <div 
                                                     className={'w-[80px] h-[80px] rounded-full bg-gray-300 text-center '}>
                                                    <img src={imageUrls} alt={'product'}
                                                         className={'bg-center  bg-cover bg-no-repeat bg-containt'}/>
                                                </div>

                                                <h1 className={'text-center text-black'}>
                                                    {prod.article_articleName}
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

