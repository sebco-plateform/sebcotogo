"use client"
import Confetti from 'react-confetti'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {BiSend} from "react-icons/bi";
import * as Yup from "yup";
import { useFormik } from 'formik';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {CommentModel} from "@/app/models/CommentModel";
import {Api} from "@/api/Api";
import { useToast } from '@/components/ui/use-toast';
import Resources from "@/lib/resources";


const Congratulation = ({params}: {params: {orderId: string}}) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const router = useRouter()
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth)
    const uid = useSelector((state: RootState) => state.authReducer.value.uid)
    const { toast } = useToast();


    useEffect(() => {
        setHeight(window.innerHeight)
        setWidth(window.innerWidth)
    }, []);

    const formik = useFormik({
        initialValues: {
            comment: "",
        },
        validationSchema: Yup.object({
            comment: Yup.string().required("Merci  de laisser un commentaire")
        }),
        onSubmit: async (values) => {

            if(isAuth) {
                const commentModel = new CommentModel(values.comment, String(Resources.date), Number((uid)));
                const resp = await Api.post(commentModel, "comment/add")
                if(resp.ok) {
                    toast({
                        title: "Merci de télécharger votre facture sur la page suivante"
                    })
                    router.push(`/invoice/${params.orderId}`)
                }
            }
        }
    })

    return(
        <div className={"mt-[35%]  md:mt-[10%] px-3 md:px-20 flex flex-col items-center justify-center"}>

            <div>
                <h1 className={"text-[25px] font-medium text-blue-600 text-center"}>SeBcO VOUS REMERCIE POUR
                    VOTRE CONFIANCE</h1>
                <h1 className={"text-[18px] font-light text-blue-600 text-center"}>Votre commande est en route
                    pour votre addresse</h1>
            </div>


            <div className={"flex flex-col-reverse space-y-3  md:flex-row  md:space-x-5 "}>

                {/* comment form*/}
                <div className={"flex flex-col space-y-10 md:mt-[15%]"}>
                    <h1 className={"text-center text-[18px] "}>
                        Laissez nous un commentaire sur votre experience d'utilisation <br/>
                        et télécharger votre facture
                    </h1>

                    <form onSubmit={formik.handleSubmit} className={"flex flex-col space-y-5 "}>

                        <div className={"flex flex-col space-y-2"}>
                            <label className={"text-red-600 text-center"}>
                                {formik.touched.comment  && formik.errors.comment ? formik.errors.comment : ""}
                            </label>
                            <Input type={"text"}
                                   placeholder={"Entrer votre commentairre"}
                                   className={"h-[100px]"}
                                   name={"comment"}
                                   value={formik.values.comment}
                                   onChange={formik.handleChange}
                            />

                        </div>

                        <Button type={"submit"}
                                size={"lg"}
                                className={"self-center md:self-end w-auto bg-buttonColor"}

                        >
                            Envoyer
                            <BiSend/>
                        </Button>
                    </form>
                </div>

                <div className={"flex flex-col"}>

                    <Image src={"/images/sammy-woman-in-shopping-cart-placing-order-on-smartphone.gif"}
                           alt={"data empty"}
                           priority
                           width={500}
                           height={500}
                           className={"bg-center bg-cover"}
                    />


                </div>


            </div>


            <Confetti
                width={width}
                height={height}
            />
        </div>
    );
}
export default Congratulation;