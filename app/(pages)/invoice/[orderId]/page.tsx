"use client"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import Resources from "@/lib/resources";
import {Separator} from "@/components/ui/separator";

import { Table} from 'antd';
import type { TableProps } from 'antd';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {CustomerModel} from "@/app/models/CustomerModel";
import {OrderModel} from "@/app/models/OrderModel";
import {Api} from "@/api/Api";

interface DataType {
    key: string;
    name: string;
    price: number;
    quantity: number;
    subTotal: number;
}


const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Articles',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Prix',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Quantités',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Sous Total',
        key: 'subTotal',
        dataIndex: 'subTotal',
    },
];




const Invoice = ({ params }: {params: {orderId: string }}) => {
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth)
    const uid = useSelector((state: RootState) => state.authReducer.value.uid)
    const [order, setOrder] = useState<OrderModel>()
    const [orderArticle, setOrderArticle] = useState<DataType[]>([])
    const [customer, setCustomer] = useState<CustomerModel>()
    const [items, setItems] = useState<any[]>([])
    const refPdf: any = useRef();
    useEffect(() => {

        if(isAuth) {
            const orderArt: DataType[] = []
            Api.getAll(`order-article/findByOrder/${params.orderId}`).then((item: any[]) => {
                //setItems(item)
                //console.log(item)
                item.forEach((itemx: any) => {
                    orderArt.push({
                        key: itemx.orderArticle_id,
                        name: itemx.article_articleName,
                        price: Number(itemx.article_price),
                        quantity: Number(itemx.orderArticle_quantity),
                        subTotal: Number(itemx.article_price * itemx.orderArticle_quantity)

                    })
                })

                setOrderArticle(orderArt);
                console.log(orderArticle)
            })
            console.log(orderArticle)



            Api.getAll(`order/single/${params.orderId}`).then((ord: any) => {
                setOrder(ord)
            })

            Api.getAll(`user/single/${uid}`).then((cust: any) => {
                setCustomer(cust)
            })

        }

    }, []);
    const downloadPDF = () => {
        const input: any = refPdf.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
            const  imgX = (pdfWidth - imgWidth * ratio) /2
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth*ratio, imgHeight*ratio);
            pdf.save('SeBco_invoice.pdf');
        });
    }
    return(
        <div className={"mt-[35%]  md:mt-[10%] px-3 md:px-20 flex flex-col items-center justify-center"}>
            <div ref={refPdf}
                 className={"w-full md:w-[800px] flex flex-col space-y-10 p-5"}
            >
                {/*logo and reference*/}
                <div className={"flex justify-between content-between"}>
                    {/*log */}
                    <div className={"w-full flex flex-col space-y-2"}>
                        <Image src={"/icons/logo.svg"} alt={"logo"}
                               width={100}
                               height={100}
                               priority
                        />
                        {/*entreprice information*/}
                        <div>
                            <h1 className={"font-bold text-[25px]"}>SeBcO TOGO</h1>
                            <h1>Addresse</h1>
                            <h1>LOME</h1>
                            <h1>TOGO</h1>

                            <h1 className={"text-[13px] "}>Tél: +228 70 15 90 13</h1>
                            <h1 className={"text-[13px] "}>sebcotogo@gmail.com</h1>
                            <h1 className={"text-[13px] text-blue-600"}>sebcotogo.com</h1>

                        </div>

                    </div>

                    {/*factuer*/}
                    <div className={"flex flex-col w-full self-end"}>
                        <div className={"border border-1 "}>
                            <h1 className={"text-[25px] text-center"}> FACTURE</h1>
                        </div>

                        <div>
                            <h1 className={"text-[13px]  text-right"}> Référence: sebco2000-{order?.id}</h1>
                            <h1 className={"text-[13px] text-right "}> Date de facturation: {Resources.date}</h1>
                            <h1 className={"text-[13px]  text-right"}>Référence client: customer N°{customer?.id}</h1>
                        </div>

                        <div className={""}>
                            <h1 className={"text-[20px] font-bold"}> {customer?.firstName} {customer?.lastName} </h1>
                            <h1>Addresse</h1>
                            <h1>TOGO</h1>
                            <h1 className={"text-[13px]"}>Tél: +228 {customer?.phone} </h1>
                        </div>
                    </div>
                </div>

                <Separator className={"w-full h-1"}/>


                {/*tableau des articles*/}
                <div>
                    <Table columns={columns} dataSource={orderArticle}/>
                </div>

                {/*total*/}
                <div className={"self-end"}>
                    <h1 className={"text-right text-[20px] text-blue-600"}> TOTAL : {order?.totalPrice} TTC</h1>
                </div>

                <div className={"flex justify-between content-between"}>
                    <Image src={"/icons/logo.svg"} alt={"logo"}
                           width={100}
                           height={100}
                           priority
                    />
                    <h1 className={"text-center text-[10px] "}>
                        Nous vous remercions d'avoir choisi <span className={"text-blue-600"}>SeBcO TOGO</span> pour vos
                        besoins en matériaux de construction. Si vous avez des questions
                        concernant votre facture ou si vous avez besoin d'une assistance
                        supplémentaire, n'hésitez pas à nous contacter. Nous sommes là pour vous aider à
                        réaliser vos projets de construction avec les meilleurs produits et services.
                    </h1>
                </div>

            </div>
            <Button type={"button"}
                    size={"sm"}
                    variant={"outline"}
                    onClick={downloadPDF}

            >
                Télécharger la facture
            </Button>
        </div>
    );
}
export default Invoice;