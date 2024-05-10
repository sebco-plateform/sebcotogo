"use client"
import { FaSearch } from "react-icons/fa";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Swipers from "@/components/Swiper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Card2 from "@/components/Card2";
import { Api } from "@/api/Api";
import { ArticleModel } from "../models/ArticleModel";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import EmptyData from "@/components/EmptyData";
import { Skeleton } from "@/components/ui/skeleton";
import CommentSwiper from "@/components/CommentSwiper";
import {ArrowRightCircle} from "lucide-react";


interface articleIterf {

    article_articleName : string;
    article_id: string;
    article_price: string;
    article_description: string;
}
interface DataInterface {
    name: string;
    price: string;
    description: string;
    articleId: string;
    imageUrl: string;
    imageId: string;
}
export default function Home() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ArticleModel[]>([]);
    const [actif, setActif] = useState(false);
    const [articlesData, setArticlesData] = useState<ArticleModel[]>([])
    const [data1, setData1] = useState<DataInterface[]>([])
    const [data2, setData2] = useState<DataInterface[]>([])
    const [data3, setData3] = useState<DataInterface[]>([])
    const isAuth = useSelector((state: RootState) => state.auth.value.isAuth)
    const [loading, setLoading] = useState(false);
    const route = useRouter();



    useEffect(() => {
        setLoading(true)

        Api.getAll('article/all').then((data) => {
            setArticlesData(data)
        })

        const fetchData1 = async () => {
            try {
                const articles: any[] = await Api.getAll(`article/articleByCategoryName/fer`);
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

                setData1(dataArray);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

         fetchData1();

        const fetchData2 = async () => {
            try {
                const articles: any[] = await Api.getAll(`article/articleByCategoryName/ciment`);
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

                setData2(dataArray);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData2();

        const fetchData3 = async () => {
            try {
                const articles: any[] = await Api.getAll(`article/articleByCategoryName/agregat`);
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

                setData3(dataArray);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData3();

        setLoading(false)

    }, [])

    /**fonction of search */
    const handleChange = (e: any) => {
        const searchTerm = e.target.value;
        if(searchTerm.trim() !== '') {
            setActif(true)
            setQuery(searchTerm);
            // Simulation d'une recherche avec un tableau de données statique
            const filteredResults = articlesData.filter(item =>
                item.articleName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        }
        else  {
            setActif(false)
            setQuery('');
            setResults([]);
        }

    };
  return (
    <main className="">
        {/* cover page*/}
        <div className={'bg-coverPageMobBg md:bg-coverPageWebBg bg-cover bg-containt bg-center bg-fixed top-0 bg-no-repeat w-full h-[500px]'}>
            <div className={'text-[20px] w-auto font-medium md:text-[30px] text-white pt-[30%] md:pt-[10%] md:w-[850px] ml-8'}>
                Bienvenue sur notre site
                dédié aux matériaux de construction, ou vous trouvérez de variété exceptionnelle de
                sable et de gravier pour donner vie à vos projets. Explorez notre sélection et façonnez
                vos idées avec des produits de qualité et un service fiable.
            </div>

            {/*button*/}
            <div className={'md:hidden flex ml-[25px]'}>
                {
                    !isAuth &&  <Button variant={"outline"}
                                        className={'border-buttonColor flex space-x-5 text-[20px] mt-3'}
                                        size={'lg'}
                                        onClick={() => {route.push("/registre")}}
                    >
                        <h1>S'inscrire maintenant!</h1>
                    <ArrowRightCircle />
                    </Button>
                }

            </div>

            {/*search par*/}
            <div className={'md:block hidden mt-10 ml-[30px]'}>
                <div className={'flex space-x-2 items-center bg-white h-[50px] w-[600px] rounded-[20px] px-3'}>
                    <form>
                        <input
                            className={'md:w-[450px] h-9  my-3 ml-2 bg-white outline-0 border-0 focus:border-0 focus:outline-0 '}
                            placeholder={'Trouver un Produit'}
                            type="text"
                            value={query}
                            onChange={handleChange}

                        />
                    </form>

                    <button className={'bg-buttonColor p-3  w-[100px] my-1 rounded-[20px] flex space-x-2'}>
                        <FaSearch className={'w-[15px] h-[15px] '} color={'white'}/>
                        <h1 className={'text-[18px] text-white mt-[-5px]'}>search</h1>
                    </button>
                </div>
                {/*search rendere*/}
                <div className={`${actif ? 'block bg-white w-[600px] p-5 rounded-[20px] h-auto mt-3 absolute' : 'hidden'} `}>
                    <ul className={"flex flex-col space-y-5"}>
                        {results.map((result, index) => (
                            <li key={index}>
                                <Link className={"hover:text-blue-600"} href={'/product/1'}>
                                    {result.articleName}
                                </Link>
                            
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>

        <div className={'mt-10 md:px-20 px-3'}>

            <h1 className={'text-[30px] px-3 md:px-0 font-medium text-black'}>
                Articles
            </h1>

            {/*articles*/}
            <div className={"flex items-center justify-center w-full md:px-0"}>
                <Swipers />
            </div>


            {/*categori serction*/}
            <section className={'mt-[50px]'}>
                <h1  className={'text-[30px] font-medium text-black'}>Catégories</h1>

                <Tabs defaultValue={data1.length != 0 ? "acier" :  "cimant" } className="w-auto mt-10">
                    <TabsList>
                        <TabsTrigger value="cimant" className={data2.length == 0 ? "hidden" :"flex font-bold text-[18px]"}>cimant</TabsTrigger>
                        <TabsTrigger value="acier"   className={data1.length == 0 ? "hidden" :"flex font-bold text-[18px]"}>acier</TabsTrigger>
                        <TabsTrigger value="agérégat" className={data3.length == 0 ? "hidden" : "flex font-bold text-[18px]"}>agérégat</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cimant" className={data2.length == 0 ? "hidden" :'md:px-10 px-3 w-full items-center justify-center flex flex-col space-y-5 md:space-y-0 md:grid grid-cols-1 md:grid-cols-5 gap-4'}>
                    {
                        loading ?
                            [1,2,3,4,5].map((items) => {
                                return (
                                    <div>
                                        <Skeleton className={"rounded-[15px] md:w-[200px] w-[300px]   h-[300px] md:h-[270px]"} />
                                    </div>

                                )
                            })

                            :
                            data2.length == 0 ?
                                <EmptyData/>
                                :
                                data2.map((articles, index) => {

                                    return <div key={index}>
                                        <Card2 articleName={articles.name} price={Number(articles.price)} id={Number(articles.articleId)} image={articles.imageUrl} />
                                    </div>
                                })
                    }

                </TabsContent>
                    <TabsContent value="acier" className={data1.length == 0 ? "hidden" :'md:px-10 px-3 w-full items-center justify-center  flex flex-col space-y-5 md:space-y-0 md:grid grid-cols-1 md:grid-cols-5 gap-4'}>
                        {
                            loading ?
                                [1,2,3,4,5].map((items) => {
                                    return (
                                        <div>
                                            <Skeleton className={"rounded-[15px] md:w-[200px] w-[300px]   h-[300px] md:h-[270px]"} />
                                        </div>

                                    )
                                })

                                :
                            data1.length == 0 ?
                                <EmptyData/>
                                :
                            data1.map((articles, index) => {

                                return <div key={index}>
                                    <Card2 articleName={articles.name} price={Number(articles.price)} id={Number(articles.articleId)} image={articles.imageUrl} />
                                </div>
                            })
                        } 
                    </TabsContent>
                    <TabsContent value="agérégat" className={data3.length == 0 ? "hidden" : 'md:px-10 px-3 w-full items-center justify-center flex flex-col space-y-5 md:space-y-0 md:grid grid-cols-1 md:grid-cols-5 gap-4'}>
                    {
                        loading ?
                            [1,2,3,4,5].map((items) => {
                                return (
                                    <div>
                                        <Skeleton className={"rounded-[15px] md:w-[200px] w-[300px]   h-[300px] md:h-[270px]"} />
                                    </div>

                                )
                            })

                            :
                        data3.length == 0 ?
                            <EmptyData/>
                             :
                            data3.map((articles, index) => {
                                return <div key={index}>
                                    <Card2 articleName={articles.name} price={Number(articles.price)} id={Number(articles.articleId)} image={articles.imageUrl} />
                                </div>
                            })
                        } 
                       
                    </TabsContent>
                </Tabs>

            </section>


            <section className={" my-10"}>
                <h1 className={'text-[30px] md:px-0 font-medium text-black'}>
                    Avis des clients
                </h1>
                <CommentSwiper/>
            </section>
        </div>

    </main>
  );
}
