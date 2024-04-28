"use client"

import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import React, { ReactNode, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { BsTrash3 } from "react-icons/bs";
import CartModel from "@/app/models/CartModel";
import {addProduct, removeProduct, updateProduct} from "@/redux/features/cart-slice";
import { useRouter } from "next/navigation";
import Image from "next/image";


interface DataType {
    key: string;
    image: ReactNode;
    name: string;
    quantite: number;
    prix_unitaire: number;
    prix_total: number;
    url?: string;
}

function  removeInArray(array: any[], element: any) {
    const newArray = array.filter(item => item !== element);

    if(array.length != newArray.length) {
        return true;
    }
    else
        return false;
}

const Cart = () => {
    const itemCart: CartModel[] = useSelector((state: RootState) => state.cartSlice);
    const [items, setItems] = useState<CartModel[]>(itemCart)
    const [qte, setQte] = useState(1);
    const [data, setData] = useState<DataType[]>([]);
    const { toast } = useToast();
    const [total, setTotal] = useState(0);
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth);
    const dispatch = useDispatch();
    const router = useRouter()

    useEffect(() => {

       // setItems(itemCart)

        setTotal(items.reduce((totals, cartModel ) => totals + cartModel.priceTotal, 0));
        const datas : DataType[] = [];
        items.forEach((element) => {

            datas.push({
                key: element.id,
                image: <Image src={element.image} alt="image" width={100} height={100} className="w-[150px] h-[150px] " />,
                name: element.name,
                prix_unitaire: element.price,
                quantite: element.quantity,
                prix_total: element.priceTotal,
                url: element.image,
            });
            
        })

        setData(datas)
    }, []);
    

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Prix Unitaire',
            dataIndex: 'prix_unitaire',
            key: 'prix_unitaire',
        },
        {
            title: 'Quantité',
           dataIndex: 'quantite',
            key: 'quantite',
           /* render: (_, record) => {

                return <Space size="middle">

                    <div className={'flex space-x-10 self-center'}>
                        <Button variant={'outline'}
                                size={'icon'}
                                onClick={() => {
                                   /* setQte(record.quantite)
                                    setQte(prevQte => {
                                        const newQte = prevQte === 0 ? 1 : prevQte - 1;
                                        const modelCart = new CartModel(record.key, record.name, String(record.url), Number(record.prix_unitaire), Number(record.prix_unitaire * newQte), newQte);
                                        dispatch(updateProduct({index: record.key, updatedProduct: modelCart}));
                                        router.refresh();
                                        return newQte;
                                    });
                                }}
                        >
                            <FaMinus className={'w-[18px] h-[18px]'}/>
                        </Button>


                        <div className={'text-[20px] font-bold'}>
                            {qte==0 ? record.quantite : qte}
                        </div>

                        <Button variant={'outline'}
                                size={'icon'}
                                onClick={() => {
                                   /* setQte(record.quantite)
                                    setQte(prevQte => {
                                        const newQte = prevQte + 1;
                                        const modelCart = new CartModel(record.key, record.name, String(record.url), Number(record.prix_unitaire), Number(record.prix_unitaire * newQte), newQte);
                                        dispatch(updateProduct({index: record.key, updatedProduct: modelCart}));
                                        router.refresh();
                                        return newQte;
                                    });
                                    //setPrice(price + priceTotal);
                                }}
                        >
                            <FaPlus className={'w-[18]px] h-[18px]'}/>
                        </Button>
                    </div>
                </Space>
            },*/
        },

        {
            title: 'Prix Total',
            dataIndex: 'prix_total',
            key: 'prix_total',
        },

        {
            title: '',
            key: 'action',
            render: (_, record) => (

                <Space size="middle">

                    <Button size={'icon'}
                            variant={"destructive"}
                            onClick={() => {

                                // @ts-ignore
                                dispatch(removeProduct(record.key))
                                router.push("/cart");
                                toast({
                                    title: "Article suprimer",
                                    variant: "destructive"
                                })


                            }}

                    >
                        <BsTrash3 className={''}/>
                    </Button>
                </Space>
            ),
        },
    ];


    if (items.length == 0) {
        return (
            <div className=" mt-[35%] md:mt-[10%] p-3  flex flex-col items-center justify-center">

                <Image src={"/images/sammy-grocery-cart-1.gif"}
                       alt={"data empty"}
                       priority
                            width={500}
                            height={500}
                            className={"bg-center bg-cover"}
                     />

                     <h1 className={"text-center font-regular text-blue-600 text-[25px]"}>
                         C'est un peu vide par ici!!! <br/>
                        <span className={"text-center text-[18px] text-black font-light"}>
                            Commencez par ajouter quelques <br/>
                         articles au panier.
                        </span>
                     </h1>

             </div>
         );
     }

    return (
        <div className=" mt-[35%] md:mt-[10%] px-3 md:px-20 flex flex-col items-center justify-center">
            <h1 className="text-[25px] text-start ">Votre panier</h1>
            {/** cart product list of mobile */}
            <section className={"hidden"}>
                {
                    data.map((items, index) => {
                        return <div key={index} className={" p-2 w-full bg-white flex items-center justify-between content-between"}>

                            <Image src={String(items.url)} alt="image" width={80} height={80}
                                   className=" "/>

                            <div className={"flex flex-col space-y-3"}>
                                <h1 className={"text-center"}>{items.name}</h1>

                                <div className={"flex space-x-3 justify-between content-between"}>
                                    <h1>{items.prix_unitaire}</h1>
                                    <h1>{items.quantite}</h1>
                                    {/*<div className={'flex space-x-5 self-center'}>
                                        <Button variant={'outline'}
                                                size={'icon'}
                                                onClick={() => {
                                                    setQte(items.quantite)
                                                    if (qte > 1) {
                                                        setQte(qte - 1)
                                                    }
                                                    console.log("mise a jour effectuer")
                                                }}
                                        >
                                            <FaMinus className={'w-[18px] h-[18px]'}/>
                                        </Button>


                                        <div className={'text-[20px] font-bold'}>
                                            {items.quantite}
                                        </div>

                                        <Button variant={'outline'}
                                                size={'icon'}
                                                onClick={() => {

                                                }}
                                        >
                                            <FaPlus className={'w-[18]px] h-[18px]'}/>
                                        </Button>
                                    </div>*/}

                                    <h1>{items.prix_total}</h1>
                                    <Button size={'icon'}
                                            variant={"destructive"}
                                            onClick={() => {

                                                // @ts-ignore
                                                dispatch(removeProduct(items.key))
                                                router.refresh();
                                                toast({
                                                    title: "Article suprimer",
                                                    variant: "destructive"
                                                })
                                            }}>
                                        <BsTrash3 className={''}/>
                                    </Button>
                                </div>
                            </div>


                        </div>
                    })
                }
            </section>


            {/** cart product list of web */}
            <section className="flex mt-20 mx-2">
                <Table columns={columns} dataSource={data}/>
            </section>

            <div
                className={"mt-10 mb-[10px] w-full flex flex-col-reverse space-y-5 md:flex-row md:space-y-0 md:content-between md:justify-between"}>
                {/*button*/}
                <div>
                    <Button
                        variant={"default"}
                        type={"button"}
                        className=" md:py-2 bg-buttonColor font-bold md:text-[20px]"
                        onClick={() => {
                            if (isAuth) {
                                if (total < 5000) {
                                    toast({
                                        title: "La somme total doit être supérieur ou égale a 5000 TTC",
                                        variant: "destructive"
                                    })
                                } else {
                                    router.push("/order");
                                }

                            } else {
                                router.push("/login");
                            }

                        }}
                    >
                        Passer la commande
                    </Button>
                </div>

                {/*total*/}
                <div className={" text-[18px] md:text-[20px]"}>
                    TOTAL: <span className={"text-blue-600"}> {total} TTC</span>
                </div>
            </div>
        </div>
    );
}
export default Cart;