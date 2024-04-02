"use client"
import React, {useEffect, useState} from 'react';
import {Api} from "@/api/Api";
import {ArticleModel} from "@/app/models/ArticleModel";
import Card2 from "@/components/Card2";
import {Skeleton} from "@/components/ui/skeleton";
import {DataInterface} from "@/lib/interfaces";
import Resources from "@/lib/resources";
import Image from "next/image";
import {useRouter} from "next/navigation";
interface DataIntef {
    catName: string;
    id: string;
    imageUrl: string;
}
export default  function Articles({params}: {params: {catId: string}})  {
    const [categories, setCategories] = useState<DataIntef[]>([])
    const [data, setData] = useState<DataInterface[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCat, setIsLoadingCat] = useState(false);

    const [catId, setCatId] = useState(params.catId);
    const route = useRouter()

    useEffect(() => {

        setIsLoading(true)
        setIsLoadingCat(true)
        const fetchData = async () => {
            try {
                const articles: any[] = await Api.getAll(`article/articleByCategoryId/${params.catId}`);
                const dataArray: DataInterface[] = [];

                for (const articleElement of articles) {
                    if(articleElement.id != 'NaN') {
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

                }

                setData(dataArray);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };

        fetchData();

        Api.getAll("category/all").then((cat) => {

            setCategories(cat)
        });
        setIsLoading(false);
        setIsLoadingCat(false)
    }, []);
    return (
        <div className={'my-[35%] md:my-[10%] px-3 md:px-20 flex flex-col'}>
            <h1 className={"font-bold text-[35px]"}>Nos Articles</h1>

            <div className={"flex md:space-x-10 md:flex-row flex-col space-y-2"}>
                {/*categories*/}
                <div className={" hidden md:flex flex-col space-y-3 h-auto w-[350px] rounded-xl  items-start  py-3"}>
                    {
                        isLoadingCat ?
                            [1, 2, 3, 4].map((el, index) => {
                                return <div>
                                    <Skeleton className="h-[12px] w-full rounded-xl"/>
                                </div>
                            })
                            :

                            categories.map((cats, index) => {

                                return <button key={index}
                                           onClick={() => {
                                               route.push(`/articles/${cats.id}`)
                                           }}
                                           className={ catId == cats.id ? "text-[20px] font-bold text-blue-600 px-3 flex space-x-3 border border-blue-600 bg-purple-100 rounded-md w-[350px] py-2 shadow-md" : " shadow-md  hover:bg-purple-100 py-2 rounded-md w-[350px] border border-blue-600 px-3 flex space-x-3 hover:accent-gray-400 text-[20px] font-regular"}
                                >
                                    <Image src={cats.imageUrl}
                                           alt={"category"}
                                           width={30}
                                           height={30}
                                           priority
                                           className={"bg-center object-cover bg-cover bg-content "}
                                    />
                                   <h1>{cats.catName}</h1>
                                </button>


                        })
                    }
                </div>

                {/*Articles*/}
                <div className={'grid grid-cols-2 md:grid-cols-3 gap-2'}>
                    { isLoading ?
                        [1,2,3,1,1,1,1,1,1].map((el, index) => {
                            return <div className={""} key={index}>
                                <Skeleton className="h-[125px] w-auto md:w-[250px] rounded-xl"/>
                            </div>
                        })
                        :
                        data.length == 0 ?
                            <div className={"flex flex-col items-center justify-center  md:relative md:left-[70%] w-full"}>
                            <Image src={"/images/sammy-sailor-looking-through-telescope-off-the-mast.gif"}
                                       alt={"data empty"}
                                       priority
                                       width={700}
                                       height={700}
                                       className={"bg-center bg-cover"}
                                />

                                <h1 className={"text-center font-regular text-blue-600 text-[25px]"}>Pas d'article pour cette catégorie</h1>
                            </div> :
                            data.map((articles, index) => {

                                    return <div key={index}>
                                        <Card2 articleName={articles.name} price={Number(articles.price)}
                                               id={Number(articles.articleId)} image={articles.imageUrl}/>
                                    </div>


                            })
                    }
                </div>
            </div>
        </div>
    );
}

