"use client"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "@/redux/store";
import { DeliveryModel } from "@/app/models/DeliveryModel";
import { Api } from "@/api/Api";
import { useToast } from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import { useKKiaPay } from 'kkiapay-react';
import {CustomerModel} from "@/app/models/CustomerModel";
import CartModel from "@/app/models/CartModel";
import {OrderModel} from "@/app/models/OrderModel";
import {OrderArticleModel} from "@/app/models/OrderArticle";
import {removeProduct} from "@/redux/features/cart-slice";

const Order = () => {

    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth)
    const uid = useSelector((state: RootState) => state.authReducer.value.uid)
    const {toast} = useToast();
    const itemCart: CartModel[] = useSelector((state: RootState) => state.cartSlice);
    const [total ,setTotal] = useState(0)
    const route = useRouter()
    const { openKkiapayWidget, addKkiapayListener,     removeKkiapayListener
    } = useKKiaPay();
    const [customer, setCustomer] = useState<CustomerModel>()
    const dispatch = useDispatch();
    const [orderId,setOrder] = useState("");
    const [deliveryId,setDelivery] = useState("");

    const [response, setResponse] = useState(false);



    async  function  successHandler(response: any) {
        //console.log(response);
        const orderModel = new OrderModel(total, "PASS", Number(uid), Number(deliveryId));
        const resp1 = await  Api.post(orderModel, 'order/add')
        if(resp1.ok) {
            resp1.json().then((datas: any) => {
                setOrder(datas.id);
                itemCart.forEach((ele) => {
                    const orderArticle = new OrderArticleModel(ele.quantity, ele.price, Number(ele.id), datas.id);
                    Api.post(orderArticle, 'order-article/add').then((res) => {
                        setResponse(res.ok);
                    })
                })
            });

            if(response) {
                itemCart.forEach((ele) => {
                    dispatch(removeProduct(ele.id))
                })
                toast({
                    title: "informations enregistrées avec succès!"
                });
                route.push(`/congratulation/${orderId}`)
            }
        }
    }

    function failureHandler(error: any) {
        console.log(error);
        toast({
            title: "Une erreur est survenue lors du paiement!",
            variant: "destructive"
        })
    }

    useEffect(() => {
        setTotal(itemCart.reduce((totals, cartModel ) => totals + cartModel.priceTotal, 0));

        Api.getAll(`user/single/${uid}`).then((custom: any) => {
            setCustomer(custom)
        });

        addKkiapayListener('success',successHandler)
        addKkiapayListener('failed', failureHandler)

        return () => {
            removeKkiapayListener('success')//,successHandler
            removeKkiapayListener('failed')//, failureHandler
        };
    }, [addKkiapayListener,removeKkiapayListener]);

    function open() {
        openKkiapayWidget({
            amount: total,
            fullname: `${customer?.lastName} ${customer?.firstName}`,
            api_key: "3cb8ff60f18711eeae665f935f4f8891",
            sandbox: true,
            email: `${customer?.email}`,
            phone: "97000000",
        });
    }

    const formik = useFormik({
        initialValues: {
            city: "",
            quarter: "",
            deliveryDate: "",
            deliveryHoures: "",
            codePromo: "",
            indiqueName: "",
            indiqueNumber: ""
        },
        validationSchema: Yup.object({
            city: Yup.string().required('La vile est obligatoire'),
            quarter: Yup.string().required('Le quartier est obligatoire'),
            deliveryDate: Yup.string().required('la date de livraison est obligatoire'),
            deliveryHoures: Yup.string().notRequired(),
            codePromo: Yup.string().notRequired(),
            indiqueName: Yup.string().required('Le nom de l indique est obligatoire'),
            indiqueNumber: Yup.string().required('Le numéro de l indique est obligatoire'),
        }),
        onSubmit: async (values) => {
            if(isAuth) {
                const deliveryModel = new DeliveryModel(values.city, values.quarter, values.deliveryDate, values.deliveryHoures, values.codePromo, values.indiqueName, Number(values.indiqueNumber), "0", "0", "description", Number(uid));

                const resp = await Api.post(deliveryModel, `delivery/add`);
                 if(resp.ok) {
                     resp.json().then((del: any) => {

                         setDelivery(del.id)
                         open();
                         //route.push(`/paiement/${del.id}`)
                     })

                 }else {
                     toast({
                         title: "Une erreur est rencomtrer lors de l'enregistrement",
                         variant: "destructive",
                         description: "réessayer!!"
                     })
                 }
            }

        }
    })
    return (
        <div className=" mt-[35%] h-full md:mt-[10%] px-3 md:px-20 flex flex-col items-center justify-center">
            <div className="bg-white rounded-[15px] p-3 w-full md:w-[800px] flex flex-col md:flex-row  items-center justify-center h-auto ">
                <div className="flex flex-col w-full">
                     <h1 className="text-[30px] font-medium text-center my-5 ">Formulaire de livraison.</h1>
               {/**image */}
               <div className="w-full h-full ">
                <Image src={'/images/sammy-man-and-dog-delivering-packages-on-a-moped.gif'}
                        alt="gift"
                        width={200}
                        height={200}
                        className="w-full h-full bg-cover bg-center bg-content"
                    />
               </div>
                </div>
               
               
                <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-5 w-full ">
                    <div className="flex flex-row space-x-5 w-full">

                        <div className="flex flex-col space-y-3">


                            <div className="flex space-x-4">

                                {/** city input */}
                                <div className="flex flex-col space-y-1">
                                    <label className={formik.touched.city && formik.errors.city ? "text-red-600" : ""}>{
                                        formik.touched.city && formik.errors.city ? formik.errors.city : "Ville"
                                    } <span className="text-red-600">*</span> </label>
                                    <Input type="text"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        name="city"
                                        className="" />
                                </div>

                                {/** quarterquarter input */}
                                <div className="flex flex-col space-y-1">
                                    <label className={formik.touched.quarter && formik.errors.quarter ? "text-red-600" : ""}>{
                                        formik.touched.quarter && formik.errors.quarter ? formik.errors.quarter : "Quartier"
                                    }<span className="text-red-600">*</span> </label>
                                    <Input type="text"
                                        value={formik.values.quarter}
                                        onChange={formik.handleChange}
                                        name="quarter"
                                        className="" />
                                </div>
                            </div>



                            <div className="flex space-x-4">
                                {/** date input */}
                                <div className="flex flex-col space-y-1">
                                    <label className={formik.touched.deliveryDate && formik.errors.deliveryDate ? "text-red-600" : ""}>{
                                        formik.touched.deliveryDate && formik.errors.deliveryDate ? formik.errors.deliveryDate : "Date de livraison souhaité"
                                    }<span className="text-red-600">*</span> </label>
                                    <Input type="date"
                                        value={formik.values.deliveryDate}
                                        onChange={formik.handleChange}
                                        name="deliveryDate"
                                        className="" />
                                </div>

                                {/** houres input */}
                                <div className="flex flex-col space-y-1">
                                    <label className={formik.touched.deliveryHoures && formik.errors.deliveryHoures ? "text-red-600" : ""}>{
                                        formik.touched.deliveryHoures && formik.errors.deliveryHoures ? formik.errors.deliveryHoures : "Heure de livraison souhaité"
                                    } </label>
                                    <Input type="time"
                                        value={formik.values.deliveryHoures}
                                        onChange={formik.handleChange}
                                        name="deliveryHoures"
                                        className="" />
                                </div>
                            </div>

                            <Separator orientation="horizontal" className="my-5" />

                             {/** indique name input */}
                             <div className="flex flex-col space-y-1">
                                <label className={formik.touched.indiqueName && formik.errors.indiqueName ? "text-red-600" : ""}>{
                                    formik.touched.indiqueName && formik.errors.indiqueName ? formik.errors.indiqueName : "Nom et prénom d'un indique"
                                }<span className="text-red-600">*</span> </label>
                                <Input type="text"
                                    value={formik.values.indiqueName}
                                    onChange={formik.handleChange}
                                    name="indiqueName"
                                    className="" />
                            </div>

                            {/** indique number input */}
                            <div className="flex flex-col space-y-1">
                                <label className={formik.touched.indiqueNumber && formik.errors.indiqueNumber ? "text-red-600" : ""}>{
                                    formik.touched.indiqueNumber && formik.errors.indiqueNumber ? formik.errors.indiqueNumber : "Numéro de l'indique indique"
                                }<span className="text-red-600">*</span> </label>
                                <Input type="tel"
                                    value={formik.values.indiqueNumber}
                                    onChange={formik.handleChange}
                                    name="indiqueNumber"
                                    pattern={"[0-9]{8}"}
                                    maxLength={8}
                                    className="" />
                            </div>

                               {/** code  promo input */}
                               <div className="flex flex-col space-y-1">
                                <label className={formik.touched.codePromo && formik.errors.codePromo ? "text-red-600" : ""}>{
                                    formik.touched.codePromo && formik.errors.codePromo ? formik.errors.codePromo : "Votre code promo"
                                }<span className="text-red-600"></span> </label>
                                <Input type="text"
                                    value={formik.values.codePromo}
                                    onChange={formik.handleChange}
                                    name="codePromo"
                                    className="" />
                            </div>
                        </div>

                
                    </div>


                    <Button type="submit" className="bg-buttonColor self-center md:self-end">
                        Passer A la caisse
                    </Button>
                </form>

            </div>
        </div>
    );
}
export default Order;