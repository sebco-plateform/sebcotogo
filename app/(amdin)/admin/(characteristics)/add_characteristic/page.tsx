"use client"
import { Separator } from "@/components/ui/separator";
import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import * as Yup from "yup"
import { useFormik } from "formik";
import {useRouter} from "next/navigation";
import {Api} from "@/api/Api";
import {useToast} from "@/components/ui/use-toast";
import { Button } from "antd";
import {CharacteristicModel} from "@/app/models/characteristic";
import {ArrowLeftCircle} from "lucide-react";

export default  function AddCategory() {
    const [loading, setLoading] = useState(false);
    const route = useRouter();
    const { toast } = useToast()

    function resetForm(values: any)  {
        values.name= "";
        values.value= "";
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            value: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Le nom est obligatoire"),
            value: Yup.string().required("La valeur est obligatoire"),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            const characteristicModel = new CharacteristicModel(values.name, values.value);
            const response = await Api.post(characteristicModel, 'characteristic/add')
            if(response.ok) {
                //show toast
                toast({
                    title: "Caracteristique Ajouter avec succès",
                    description: "Une caractéristique a été ajouter",
                })
                resetForm(values);
            }
            else
            {
                //show erro toast
                toast({
                    variant: 'destructive',
                    title: "Une erreur s'est produite lors de l'ajout ",
                    description: "Réessayer!!!",
                });
                setLoading(false)
            }
            setLoading(false)

        }
    })
    return (
        <main className={'mt-20 mx-20'}>
            <div className={'flex justify-between content-between'}>
                <div className={''}>
                    <h1 className={'font-extrabold text-[30px]'}>Ajouter une Caractéristique</h1>
                    <h1 className={'text-gray-400'}>gestion des Caractéristique</h1>
                </div>

                <Button size={'small'}
                        type={"dashed"}
                        className={'flex justify-center items-center space-x-2 p-3 '}
                        onClick={() => {
                            route.back();
                        }}
                >
                    <ArrowLeftCircle className={'h-[25px] w-[25px]'}/>

                </Button>

            </div>

            <Separator className={'w-full'}/>

            <section>
                <form onSubmit={formik.handleSubmit} className={'flex flex-col space-y-3 w-[950px]'}>
                    {/*image*/}

                    {/*first input row*/}
                    <div className={'flex mt-5 space-x-20'}>
                        <div className={'flex flex-col'}>
                            <Label
                                className={formik.touched.name && formik.errors.name ? 'text-red-600' : ''}>{formik.touched.name && formik.errors.name ? formik.errors.name : "Nom du Caractéristique"}<span
                                className={'text-red-600'}>*</span> </Label>
                            <Input type={'text'}
                                   name={'name'}
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   className={'bg-white border-none h-[35px] w-[250px]'}/>
                        </div>

                        <div className={'flex flex-col'}>
                            <Label
                                className={formik.touched.value && formik.errors.value ? 'text-red-600' : ''}>{formik.touched.value && formik.errors.value ? formik.errors.value : "valeur"}<span
                                className={'text-red-600'}>*</span> </Label>
                            <Input type={'text'}
                                   name={'value'}
                                   value={formik.values.value}
                                   onChange={formik.handleChange}
                                   className={'bg-white border-none h-[35px] w-[250px]'}/>
                        </div>


                    </div>

                    <div className={"flex space-x-5 relative top-14"}>
                        <Button htmlType={"button"} type={'dashed'} onClick={() => resetForm(formik.values)}
                                size={'large'} className={'w-auto '}>Effacer</Button>
                        <Button htmlType={"submit"} size={'large'} loading={loading}  className={'w-auto '}>Ajouter</Button>
                    </div>
                </form>
            </section>
        </main>
    );
}