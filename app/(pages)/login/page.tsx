"use client"

import { Input } from "@/components/ui/input";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Api } from "@/api/Api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/features/auth-slice";
import {Button} from "antd";

const Login = () => {
    const route = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    
    const formik = useFormik({
        initialValues: {
            phone: "",
            passwords: ""
        },
        validationSchema: Yup.object({
            phone: Yup.number().required('votre numero est obligatoire'),
            passwords: Yup.string().required('le mot de passe est obligatoire')
        }),

        onSubmit: async (values) => {
            setLoading(true)
            const response = await Api.post({phone: Number(values.phone), password: values.passwords}, `user/login`)
            if(response.ok) {
                const data: any = await  response.json();

                if(!data.error){
                   dispatch(logIn(data.id));
                   values.passwords = "";
                   values.phone = "";
                   route.push('/cart');
                }
                else {
                    setErrorMessage('Le numéro ou le mot de passe est incorrecte. Réessayez!!!!');
                    values.passwords = "";
                    values.phone = "";
                    setLoading(false)
                }
                
            }
            else {
                setErrorMessage('Le numéro ou le mot de passe est incorrecte. Réessayez!!!!');
                values.passwords = "";
                   values.phone = "";
                setLoading(false)
            }

            setLoading(false)
        }

    })
    return (
        <div className=" px-3  h-screen flex w-full items-center justify-center">
            <div className="p-5 bg-white rounded-[15px] w-[500px] flex flex-col space-y-10 items-center justify-center ">
                <h1 className="text-[45px] font-bold text-center "> Connectez vous.</h1>
                <h1 className="text-[18px] font-bold text-center text-red-600 ">{
                    errorMessage != '' ? errorMessage : ''
                }</h1>
                <form onSubmit={formik.handleSubmit} className=" flex flex-col space-y-5">

                    <div className="flex flex-col">
                        <label className={ formik.touched.phone && formik.errors.phone ? "text-[16px] text-red-600 " : "text-[16px] text-gray-600 "}>
                            {
                                formik.touched.phone && formik.errors.phone ? formik.errors.phone : "Numéro de téléphone"
                            }
                        </label>

                        <Input type="tel"
                            className="w-[300px]"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {/** password field */}
                    <div className="flex flex-col">
                        <label className={formik.touched.passwords && formik.errors.passwords ?  "text-[16px] text-red-600 " : "text-[16px] text-gray-600 "}>
                            {
                                formik.touched.passwords && formik.errors.passwords ? formik.errors.passwords : "Mot de passe"
                            }
                        </label>

                        <Input type="password"
                            className="w-[300px]"
                            name="passwords"
                            value={formik.values.passwords}
                            onChange={formik.handleChange}

                        />
                    </div>

                    <Button
                        size={"large"}
                        loading={loading}
                        htmlType="submit"
                        className="p-2 w-auto bg-buttonColor"
                    >
                        Connexion
                    </Button>
                </form>

                {/**inscription text */}
                <div className="flex flex-col space-y-3">
                    <div className="text-center">Vous n'avez pas un compte? <Link href={"/registre"} className="text-blue-600"> Inscriver-vous!</Link> </div> 
                    <Link className="text-blue-600 text-center" href={"/password_recovery"}>Mot de passe oublié</Link>
                </div>
            </div>
        </div>
    );
}
export default Login;