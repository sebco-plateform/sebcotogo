"use client"
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {OrderModel} from "@/app/models/OrderModel";
import CartModel from "@/app/models/CartModel";
import {Api} from "@/api/Api";
import {OrderArticleModel} from "@/app/models/OrderArticle";
import {useRouter} from "next/navigation";
import {removeProduct} from "@/redux/features/cart-slice";
import {CustomerModel} from "@/app/models/CustomerModel";

const Paiement = ({params}: {params: {deliveryId: string}}) => {
    const embedRef = useRef(null);
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth)
    const uid = useSelector((state: RootState) => state.authReducer.value.uid)
    const itemCart: CartModel[] = useSelector((state: RootState) => state.cartSlice);
    const [total ,setTotal] = useState(0)
    const [response, setResponse] = useState(false);
    const route = useRouter();
    const dispatch = useDispatch();
    const [orderId,setOrder] = useState("");
    const [customer, setCustomer] = useState<any>()

    useEffect(() => {
        setTotal(itemCart.reduce((totals, cartModel ) => totals + cartModel.priceTotal, 0));
        if (isAuth) {
            // @ts-ignore
            Api.getAll(`user/single/${uid}`).then((custom: any) => {
                setCustomer(custom)
                const script = document.createElement('script');
                script.src = 'https://cdn.fedapay.com/checkout.js?v=1.1.7';
                // @ts-nocheck
                script.onload = () => {
                    // @ts-ignore
                    window.FedaPay.init({
                        public_key: 'pk_live_saqK9coFXPq0MtLm0uWzcjLE',
                        environment: "live",
                        transaction: {
                            amount: total,
                            description: 'Acheter mon produit'
                        },
                        customer: {
                            email: custom?.email,
                            lastname: custom?.lastName,
                            firstname: custom?.firstName,
                        },
                        container: embedRef.current,
                        async onComplete(resp: any) {
                            // @ts-ignore
                            const FedaPay = window['FedaPay'];
                            if (resp.reason === FedaPay.DIALOG_DISMISSED) {
                                const orderModel = new OrderModel(total, "pass", Number(uid), Number(params.deliveryId));
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
                                        route.push(`/congratulation/${orderId}`)
                                    }
                                }
                            } else {
                                //alert('Transaction terminée: ' + resp.reason);
                                const orderModel = new OrderModel(total, "pass", Number(uid), Number(params.deliveryId));
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
                                        route.push(`/congratulation/${orderId}`)
                                    }
                                }
                            }
                        }
                    });
                };
                document.body.appendChild(script);
                return () => {
                    document.body.removeChild(script);
                };
            })
        }


        console.log(customer)


      }, []);
    return (
        <div className={' mt-[35%] h-screen md:mt-[10%] px-3 md:px-20 flex flex-col items-center justify-center'}>
            <div ref={embedRef}
            className={"w-full h-full "}
            />
        </div>
    );
}

export default Paiement;