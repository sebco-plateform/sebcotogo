"use client"
import CardArt1 from "@/components/CardArt1";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {FaMinus, FaPlus} from "react-icons/fa6";
import {FaCartPlus} from "react-icons/fa";
import {useToast} from "@/components/ui/use-toast"
import {ToastAction} from "@radix-ui/react-toast";
import {Api} from "@/api/Api";
import {useDispatch} from "react-redux";
import CartModel from "@/app/models/CartModel";
import {addProduct} from "@/redux/features/cart-slice";
import {ArticleModel} from "@/app/models/ArticleModel";
import {DataInterface} from "@/lib/interfaces";
import Image from "next/image";


const ProductPage = ({params}: { params: { productId: string } }) => {
    const [urls, setUrls] = useState('');
    const [isClicked, setIsClick] = useState(0);
    const [qte, setQte] = useState(1);
    const {toast} = useToast();
    const [productData, setProductData] = useState<any>()
    const [characteristicData, setCharacteristicData] = useState<any[]>([])
    const [imageData, setImageData] = useState<any[]>([])
    const [data, setData] = useState<DataInterface[]>([]);
    const [price, setPrice] = useState(0);
    const [priceTotal, setPriceTotal] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        Api.getAll(`article/single/${params.productId}`).then((articleData: any) => {
            setProductData(articleData);
            setPrice(Number(articleData.price))
            setPriceTotal(Number(articleData.price))
        })

        const fetchData = async () => {
            const dataArray: DataInterface[] = [];
            Api.getAll('article/all').then((articles: ArticleModel[]) => {
                articles.forEach((articleElement) => {
                    Api.getAll(`image/articleImage/${articleElement.id}`).then((imgData: any[]) => {
                        imgData.forEach((img) => {
                            if (img.article.id == articleElement.id) {
                                dataArray.push({
                                    name: articleElement.articleName,
                                    price: String(articleElement.price),
                                    description: articleElement.description,
                                    articleId: String(articleElement.id),
                                    imageUrl: img.imageUrl,
                                    imageId: String(img.id)
                                })
                            }

                        })
                    })
                })
                setData(dataArray);
            })

        }

        fetchData();

        Api.getAll(`characteristic-article/findCharactByArticleId/${params.productId}`).then((charactData) => {

            setCharacteristicData(charactData);
        })

        Api.getAll(`image/articleImage/${params.productId}`).then((imgData) => {

            setImageData(imgData);
            imgData.forEach((element: any) => {
                setUrls(element.imageUrl)
            })

        })


    }, []);


    return (
        <div className={" mt-[35%] md:mt-[10%] px-3 md:px-20 flex flex-col items-center justify-center"}>
            <section className={'md:self-start'}>
                <h1 className={"text-[30px] font-bold"}>{productData?.articleName}</h1>

                <p className={"text-[15px] font-light md:w-[600px]"}>
                    {productData?.description}
                </p>
            </section>


            {/*div content image and caracteristic*/}
            <section
                className={'flex self-center flex-col w-auto space-y-5 md:flex-row md:content-between md:justify-between mt-10'}>
                {/* images*/}
                <div className={'flex flex-col w-full space-y-3 md:flex-row  md:space-x-5'}>
                    {/*liste image*/}
                    <div className={"flex space-x-5 md:flex-col md:space-y-5 md:space-x-0"}>
                        {
                            imageData.map((data, index) => {
                                return <div key={index}
                                            onClick={() => {
                                                setIsClick(data.id);
                                                setUrls(data.imageUrl);
                                            }}
                                            className={isClicked == data.id ? "w-[50px] h-[50px] rounded-sm border-2 border-buttonColor p-1 flex items-center justify-center" : "flex items-center justify-center p-1 w-[50px] h-[50px] rounded-sm border-2 border-black"}
                                >
                                    <img src={data.imageUrl} className={"bg-cover  bg-center"} alt={"image"}/>
                                </div>
                            })
                        }
                    </div>

                    {/* image*/}
                    <div className={"bg-purple-100 md:w-[400px] h-[400px] p-3"}>
                        <img
                            src={urls}
                            alt={'image'}
                            className={urls == "" ? "hidden" : 'flex bg-cover bg-center  w-full h-full'}
                        />
                    </div>


                    {/* caracterisques*/}
                    <div className={'bg-white rounded-[15px] md:w-[500px] p-5 h-auto  md:ml-[10%]'}>
                        <h1 className={'text-[25px] font-bold underline'}>Caractéristiques</h1>

                        {/* caracteristiques data*/}
                        <div className={"flex space-x-5 items-center"}>
                            <div className={'mt-3 flex flex-col space-y-3'}>
                                {
                                    characteristicData.map((charact, index) => {
                                        return <div key={index} className={'flex space-x-1'}>
                                            <h1>{charact.characteristic.charactName}</h1>
                                            <h1 className={"font-bold text-sky-400"}>: {charact.characteristic.value} </h1>
                                        </div>


                                    })
                                }
                            </div>

                            <div className={"text-[20px] font-bold text-white bg-lime-600 p-3 rounded-md"}>
                                {price} TTC
                            </div>
                        </div>


                        {/* button to add product*/}
                        <div className={'flex flex-col mt-[10%] space-y-3'}>

                            <div className={'flex space-x-10 self-center'}>
                                <Button variant={'outline'}
                                        size={'icon'}
                                        onClick={() => {
                                            if (qte > 1) {
                                                setQte(qte - 1);
                                                setPrice(price - priceTotal);
                                            }
                                        }}
                                >
                                    <FaMinus className={'w-[25]px] h-[25px]'}/>
                                </Button>


                                <div className={'text-[30px] font-bold'}>
                                    {qte}
                                </div>

                                <Button variant={'outline'}
                                        size={'icon'}
                                        onClick={() => {
                                            setQte(qte + 1);
                                            setPrice(price + priceTotal);
                                        }}
                                >
                                    <FaPlus className={'w-[25]px] h-[25px]'}/>
                                </Button>
                            </div>

                            <Button className={'bg-buttonColor flex space-x-3'}
                                    size={'lg'}
                                    onClick={() => {
                                        if (qte < 1) {
                                            toast({
                                                title: "Panier",
                                                description: "ajouter au moin une article!!",
                                                variant: 'destructive',
                                                action: <ToastAction altText="Reessayer">Try again</ToastAction>,
                                            });
                                        } else {
                                            const modelCart = new CartModel(productData?.id, productData?.articleName, urls, Number(productData?.price), Number(productData?.price * qte), qte);
                                            dispatch(addProduct(modelCart));
                                            setQte(1);
                                            setPrice(priceTotal);
                                            toast({
                                                title: "Panier",
                                                description: "Article ajouté au panier!!",
                                            })
                                        }

                                    }

                                    }

                            >

                                <h1>
                                    Ajouter au panier
                                </h1>
                                <FaCartPlus className={'text-white w-[20px] h-[20px]'}/>

                            </Button>
                        </div>

                    </div>
                </div>
            </section>


            {/*secrion 2*/}
            <section className={'mt-20'}>
                <h1 className={'text-[30px] font-bold'}>Autres recommandations pour vous.</h1>

                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    {data.length == 0 ?
                        <div className={"flex flex-col  md:relative md:left-[70%] w-full"}>
                            <Image src={"/images/sammy-sailor-looking-through-telescope-off-the-mast.gif"}
                                   alt={"data empty"}
                                   priority
                                   width={700}
                                   height={700}
                                   className={"bg-center bg-cover"}
                            />

                            <h1 className={"text-center font-regular text-blue-600 text-[25px]"}>Pas d'article</h1>
                        </div> :
                        data.map((art, index) => {
                            if (index <= 4) {
                                return <div key={index}>
                                    <CardArt1 name={art.name} price={String(art.price)} description={art.description}
                                              image={art.imageUrl} id={Number(art.articleId)}/>
                                </div>
                            }
                        })
                    }
                </div>
            </section>
        </div>
    );
}
export default ProductPage;