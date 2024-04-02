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
import { removeProduct } from "@/redux/features/cart-slice";
import { useRouter } from "next/navigation";
import Image from "next/image";


interface DataType {
    key: string;
    image: ReactNode;
    name: string;
    quantite: number;
    prix_unitaire: number;
    prix_total: number;
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
    const [qte, setQte] = useState(0);
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

                                    dispatch(removeProduct(record.key))
                                    const newData = items.filter(item => item.id !== record.key);
                                    setItems(newData)
                                    setTotal(items.reduce((totals, cartModel ) => totals + cartModel.priceTotal, 0));
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

   
    
     if(items.length == 0) {
         return(
             <div className=" mt-[35%] md:mt-[10%]  flex flex-col items-center justify-center">

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

            {/** table */}
            <section className="mt-20 mx-2">


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
                              if(isAuth) {
                                    router.push("/order");
                                }
                                else {
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