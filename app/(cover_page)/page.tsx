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
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth)

    const route = useRouter();



    useEffect(() => {

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
                    !isAuth &&  <Button className={'bg-buttonColor text-[20px] mt-3'}
                                        size={'lg'}
                                        onClick={() => {route.push("/registre")}}
                    >
                        S'inscrire maintenant!
                    </Button>
                }

            </div>

            {/*search par*/}
            <div className={'md:block hidden mt-10 ml-[30px]'}>
                <div className={'flex space-x-2 bg-white h-[50px] w-[600px] rounded-[20px] px-3'}>
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
                <div className={`${actif ? 'block bg-white w-[600px] p-5 rounded-[20px] h-auto mt-3 absolute' : 'hidden'} `}>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>
                                <Link href={'/product/1'}>
                                    {result.articleName}
                                </Link>
                            
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>

        <div className={'mt-10 md:px-20 pl-x'}>

            <h1 className={'text-[30px] font-medium text-black'}>
                Articles
            </h1>

            {/*articles*/}
            <Swipers />


            {/*categori serction*/}
            <section className={'mt-[50px]'}>
                <h1  className={'text-[30px] font-medium text-black'}>Catégories</h1>


                <Tabs defaultValue="acier" className="w-auto mt-10">
                    <TabsList>
                        <TabsTrigger value="acier">acier</TabsTrigger>
                        <TabsTrigger value="cimant">cimant</TabsTrigger>
                        <TabsTrigger value="agérégat">agérégat</TabsTrigger>
                    </TabsList>
                    <TabsContent value="acier" className={' flex items-center justify-center flex-col space-y-3  md:flex-row md:space-x-5'}>
                        {
                            data1.length == 0 ?
                                <div className={"flex flex-col  w-auto"}>
                                    <Image src={"/images/sammy-sailor-looking-through-telescope-off-the-mast.gif"}
                                           alt={"data empty"}
                                           priority
                                           width={400}
                                           height={400}
                                           className={"bg-center bg-cover"}
                                    />

                                    <h1 className={"text-center font-regular text-blue-600 text-[25px]"}>Pas d'article pour cette catégorie</h1>
                                </div> :
                            data1.map((articles, index) => {

                                return <div key={index}>
                                    <Card2 articleName={articles.name} price={Number(articles.price)} id={Number(articles.articleId)} image={articles.imageUrl} />
                                </div>
                            })
                        } 
                    </TabsContent>
                    <TabsContent value="cimant" className={'flex items-center justify-center flex-col space-y-3  md:flex-row md:space-x-5'}>
                    {
                        data2.length == 0 ?
                            <div className={"flex flex-col  md:relative md:left-[70%] w-full"}>
                                <Image src={"/images/sammy-sailor-looking-through-telescope-off-the-mast.gif"}
                                       alt={"data empty"}
                                       priority
                                       width={700}
                                       height={700}
                                       className={"bg-center bg-cover"}
                                />

                                <h1 className={"text-center font-regular text-blue-600 text-[25px]"}>Pas d'article pour cette catégorie</h1>
                            </div> :
                            data2.map((articles, index) => {

                                return <div key={index}>
                                    <Card2 articleName={articles.name} price={Number(articles.price)} id={Number(articles.articleId)} image={articles.imageUrl} />
                                </div>
                            })
                        } 
                        
                    </TabsContent>
                    <TabsContent value="agérégat" className={'flex items-center justify-center flex-col space-y-3 md:flex-row md:space-x-5'}>
                    {
                        data3.length == 0 ?
                            <div className={"flex flex-col  md:relative md:left-[70%] w-full"}>
                                <Image src={"/images/sammy-sailor-looking-through-telescope-off-the-mast.gif"}
                                       alt={"data empty"}
                                       priority
                                       width={700}
                                       height={700}
                                       className={"bg-center bg-cover"}
                                />

                                <h1 className={"text-center font-regular text-blue-600 text-[25px]"}>Pas d'article pour cette catégorie</h1>
                            </div> :
                            data3.map((articles, index) => {
                                return <div key={index}>
                                    <Card2 articleName={articles.name} price={Number(articles.price)} id={Number(articles.articleId)} image={articles.imageUrl} />
                                </div>
                            })
                        } 
                       
                    </TabsContent>
                </Tabs>

            </section>

        </div>

    </main>
  );
}
