"use client"
import {Separator} from "@/components/ui/separator";
import CardArt1 from "@/components/CardArt1";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast";

const images = [
    {
        id: 1,
        url: '/images/cimco 2.svg'
    },
    {
        id: 2,
        url: '/images/fer12 5.svg'
    },
]
const ProductPage = () => {
    const [urls, setUrls] = useState('');
    const [isClicked, setIsClick] = useState(0);
    const [qte, setQte] = useState(0);
    const { toast } = useToast();
    useEffect(() => {
        images.forEach(function(data){
            if(data.id === 0) {
                setUrls(data.url);
            }
        })
    }, []);

    return (
        <div className={" mt-[35%] md:mt-[10%] px-3 md:px-20 flex flex-col items-center justify-center"}>
            <section className={'md:self-start'} >
                <h1 className={"text-[30px] font-bold"}>Nom de l'article</h1>

                <p className={"text-[15px] font-light md:w-[600px]"}>
                    description dolor sit amet consectetur.
                    Et pretium pharetra cras non ridiculus gravida. Sit
                    nisl elit dignissim eu ante diam.
                    Tincidunt arcu rhoncus nisl aenean cras a.
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
                            images.map((data, index) => {
                                return <div key={index}
                                            onClick={() => {
                                              setIsClick(data.id);
                                              setUrls(data.url);
                                            }}
                                            className={isClicked == data.id ? "w-[50px] h-[50px] rounded-sm border-2 border-buttonColor" : "w-[50px] h-[50px] rounded-sm border-2 border-black"}
                                >
                                    <img src={data.url} className={"bg-cover bg-center"} alt={"image"} />
                                </div>
                            })
                        }
                    </div>

                    {/* image*/}
                        <div className={"bg-[#CFD8DC] md:w-[400px] h-[300px] p-3"} >
                            <img
                                src={urls}
                                alt={'image'}
                                className={'w-[300px] h-[300px]'}
                            />
                        </div>


                    {/* caracterisques*/}
                    <div className={'bg-white rounded-[15px] md:w-[500px] p-5 h-auto  md:ml-[10%]'}>
                        <h1 className={'text-[25px] font-bold underline'}>Caractéristiques</h1>

                        {/* caracteristiques data*/}
                        <div className={'mt-3'}>
                            <div className={'flex space-x-1'}>
                                <h1>Nom du caracteristique</h1>
                                <h1>:Valeur du caract</h1>
                            </div>

                            <div className={'flex space-x-3'}>
                                <h1>Nom du caracteristique</h1>
                                <h1>:Valeur du caract</h1>
                            </div>
                        </div>

                        {/* button to add product*/}
                        <div className={'flex flex-col mt-[10%] space-y-3'}>

                            <div className={'flex space-x-10 self-center'}>
                                <Button variant={'outline'}
                                        size={'icon'}
                                        onClick={() => {
                                            if(qte == 0) {
                                                setQte(0);
                                            }
                                            else {
                                                setQte(qte-1);
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
                                            setQte(qte+1)
                                        }}
                                >
                                    <FaPlus className={'w-[25]px] h-[25px]'}/>
                                </Button>
                            </div>

                            <Button className={'bg-buttonColor flex space-x-3'}
                                    size={'lg'}
                                    onClick={ () => {
                                        if (qte <= 2) {
                                            toast({
                                                title: "Panier",
                                                description: "ajouter au moin 3 quantité!!",
                                                variant: 'destructive',
                                                action: <ToastAction altText="Reessayer">Try again</ToastAction>,
                                            })
                                        }
                                        toast({
                                            title: "Panier",
                                            description: "Article ajouté au panier!!",
                                        })
                                    }

                                    }

                            >

                                   <h1>
                                       Ajouter au panier
                               </h1>
                                   <FaCartPlus  className={'text-white w-[20px] h-[20px]'}/>

                            </Button>
                        </div>

                    </div>
                </div>
            </section>

            <section className={'mt-10'}>
                <h1 className={'text-[30px] font-bold'}>Autre recommandation pour vous</h1>

                <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                    <CardArt1/>

                    <CardArt1/>
                    <CardArt1/>
                    <CardArt1 />
                </div>
            </section>
        </div>
    );
}
export default ProductPage;