"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik"
import { useState } from "react";
import { CustomerModel } from "@/app/models/CustomerModel";
import Password from "antd/es/input/Password";
import { Api } from "@/api/Api";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Select } from 'antd';


const AddUser = () => {
    const [passConf, setPassConf] = useState('')
    const route = useRouter();
    const { toast } = useToast();
    const [role, setRole] = useState("");

    //from validation
    const formik = useFormik({
        initialValues: {
            lastName: "",
            firstName: "",
            email: "",
            phone: "",
            passwords: "",
            passwordsConfirm: "",
        },

        validationSchema: Yup.object({
            lastName: Yup.string().required("Votre nom est obligatoire"),
            firstName: Yup.string().required("Votre prénom est obligatoire"),
            email: Yup.string().email("Entrez un email valide").required("Votre email est obligatoire"),
            passwords: Yup.string().required("Le mot de passe est obligatoire"),
            passwordsConfirm: Yup.string().required("confirmez le mot de passe"),
            phone: Yup.number().required("Votre numéro est obligatoire")

        }),

        onSubmit: async (values) => {
            if(values.passwords != values.passwordsConfirm) {
                setPassConf('Les mots de passe ne sont pas conformes')
            }
            else {

                const customerModel = new CustomerModel(Number(values.phone), values.passwords, values.email, values.firstName, values.lastName, role)

                const response = await Api.post(customerModel, "user/add");
                if(response.ok) {
                    // TODO:: show toast, redirect to login page
                    toast({
                        title: "Vous ete inscripte avec succès",
                        description: "Vous faite partie desormait de nos client"
                    });

                    route.push("/login");
                }
                else {
                    toast({
                        title: "Une erreur est survenue lors de l'inscription",
                        description: "Réesayer",
                        variant: "destructive"
                    })
                }
            }

        }
    })

    const onChange = (value: string) => {
        setRole(value);
    };
    return (
        <div className=" px-3 mt-5 md:mt-10 h-screen flex w-full items-center justify-center">
            <div className="py-5 px-2 bg-white rounded-[15px] w-[500px] flex flex-col space-y-10 items-center justify-center ">
                <h1 className="text-[45px] font-bold text-center "> Ajouté un utilisateur.</h1>
                <h1 className={"text-[16px] text-center text-red-600"}>{passConf != "" ? passConf : "" } </h1>
                <form onSubmit={formik.handleSubmit} className=" flex flex-col space-y-5 md:w-[400px] ">
                    {/** first form */}
                    <div className="flex space-x-3 content-between justify-between">
                        <div className="flex flex-col">
                            <label
                                className={formik.touched.firstName && formik.errors.firstName ? "text-[16px] text-red-600 " : "text-[16px] text-gray-600 "}>
                                {formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : "Nom"}
                                <span className={"text-red-600"}>*</span>
                            </label>

                            <Input type="tel"
                                   className="w-full"
                                   value={formik.values.firstName}
                                   onChange={formik.handleChange}
                                   name="firstName"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                className={formik.touched.lastName && formik.errors.lastName ? "text-[16px] text-red-600 " : "text-[16px] text-gray-600 "}>
                                {formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : "Prénom"}
                                <span className={"text-red-600"}>*</span>
                            </label>

                            <Input type="tel"
                                   className="w-full"
                                   value={formik.values.lastName}
                                   onChange={formik.handleChange}
                                   name="lastName"
                            />
                        </div>

                    </div>


                    {/**number */}
                    <div className="flex flex-col">
                        <label
                            className={formik.touched.phone && formik.errors.phone ? "text-[16px] text-red-600" : "text-[16px] text-gray-600 "}>
                            {formik.touched.phone && formik.errors.phone ? formik.errors.phone : "Numéro de téléphone"}
                            <span className={"text-red-600"}>*</span>
                        </label>

                        <Input type="tel"
                               className="w-full"
                               name="phone"
                               value={formik.values.phone}
                               onChange={formik.handleChange}
                               pattern={"[0-9]{8}"}
                               maxLength={8}
                        />
                    </div>

                    {/**email */}
                    <div className="flex flex-col">
                        <label
                            className={formik.touched.email && formik.errors.email ? "text-[16px] text-red-600" : "text-[16px] text-gray-600 "}>
                            {formik.touched.email && formik.errors.email ? formik.errors.email : "Email"} <span
                            className={"text-red-600"}>*</span>
                        </label>

                        <Input type="tel"
                               className="w-full"
                               name="email"
                               value={formik.values.email}
                               onChange={formik.handleChange}
                        />
                    </div>

                    {/*select role*/}

                    <div className="flex flex-col">
                        <label
                            className={"text-[16px] text-gray-600 "}>
                            { "Selectionner le role"} <span className={"text-red-600"}>*</span>
                        </label>

                        <Select
                            placeholder="Selectionner le role"
                            optionFilterProp="children"
                            onChange={onChange}

                            options={[
                                {
                                    value: 'admin',
                                    label: 'Administrateur',
                                },
                                {
                                    value: 'super_admin',
                                    label: 'Super admin',
                                },
                                {
                                    value: 'driver',
                                    label: 'Camionneur',
                                },
                            ]}
                        />
                    </div>


                    {/** password form */}
                    <div
                        className="flex flex-col space-y-5 ">
                        <div className="flex flex-col">
                            <label
                                className={formik.touched.passwords && formik.errors.passwords ? "text-[16px] text-red-600 " : "text-[16px] text-gray-600 "}>
                                {formik.touched.passwords && formik.errors.passwords ? formik.errors.passwords : "Mot de passe"}
                                <span className={"text-red-600"}>*</span>
                            </label>

                            <Input type="password"
                                   className="w-full"
                                   value={formik.values.passwords}
                                   onChange={formik.handleChange}
                                   name="passwords"
                                   minLength={8}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                className={formik.touched.passwordsConfirm && formik.errors.passwordsConfirm ? "text-[16px] text-red-600 " : "text-[16px] text-gray-600 "}>
                                {formik.touched.passwordsConfirm && formik.errors.passwordsConfirm ? formik.errors.passwordsConfirm : "confirmer le mot de passe"}
                                <span className={"text-red-600"}>*</span>
                            </label>

                            <Input type="password"
                                   className="w-full"
                                   value={formik.values.passwordsConfirm}
                                   onChange={formik.handleChange}
                                   name="passwordsConfirm"
                            />
                        </div>




                    </div>


                    <Button
                        size={"lg"}
                        variant={"default"}
                        type="submit"
                        className="p-2 w-auto bg-buttonColor"
                    >
                        Enrégistrer
                    </Button>
                </form>

                {/**inscription text */}
            </div>
        </div>
    );
}
export default AddUser;