"use client"


import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik  } from "formik";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {Button} from "antd";
import {Api} from "@/api/Api";
import {useToast} from "@/components/ui/use-toast";
import {CategoryModel} from "@/app/models/Category";
import ImageUpload from "@/app/(amdin)/componnents/image-uploadAdmin";
import {ArrowLeftCircle, PlusCircle} from "lucide-react";
import {useRouter} from "next/navigation";
let ImagesArray:string[] = [];

export default  function AddCategory() {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string>('');
    const route = useRouter()
    const {toast} = useToast();
    function resetForm(values: any)  {

        values.name= "";
        values. description= "";
        setImages('');
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Le nom est obligatoire"),
            description: Yup.string().optional(),
        }),
        onSubmit: async (values) => {
            setLoading(true)
            if(images != ""){
                const categoryModel = new CategoryModel(values.name, values.description, images);
                const resp = await Api.post(categoryModel,'category/add')
                if(resp.ok) {
                    toast({
                        title: 'Catégorie ajouter avec succès',
                    });
                    resetForm(values);
                }
                else {
                    toast({
                        variant: 'destructive',
                        title: 'Une erreur est survenu lors de l enregistrement',
                        description: 'réessayer'
                    });
                }

            }
            else {
                toast({
                    title: 'ajouter au moin une image',
                    variant: 'destructive'
                });
                setLoading(false);
            }
            setLoading(false);
        }
    })
    return (
        <main className={'mt-20 mx-20'}>
            <div className={'flex justify-between content-between'}>
                <div className={''}>
                    <h1 className={'font-extrabold text-[30px]'}>Ajouter une Categories</h1>
                    <h1 className={'text-gray-400'}>gestion des Categories</h1>
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
                    <div>
                        <label>Image <span className={'text-red-600'}>*</span> </label>
                        <div className={"flex justify-between content-between"}>
                            <div>
                                <ImageUpload
                                    value={images}
                                    disable={loading}
                                    onChange={(url: any) => {
                                        setLoading(true)
                                        if (url != "") {
                                            setImages(url);
                                        }
                                        setLoading(false)
                                    }}
                                    onRemove={() => {
                                        setImages("");
                                    }}

                                />
                            </div>
                        </div>
                    </div>

                    {/*first input row*/}
                    <div className={'flex mt-5 space-x-20'}>
                        <div className={'flex flex-col'}>
                            <label
                                className={formik.touched.name && formik.errors.name ? 'text-red-600' : ''}>{formik.touched.name && formik.errors.name ? formik.errors.name : "Nom du Catégorie"}<span
                                className={'text-red-600'}>*</span> </label>
                            <Input type={'text'}
                                   name={'name'}
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   className={'bg-white border-none h-[35px] w-[250px]'}/>
                        </div>

                        <div className={'flex flex-col'}>
                            <label
                                className={formik.touched.description && formik.errors.description ? 'text-red-600' : ''}> {formik.touched.description && formik.errors.description ? formik.errors.description : "Description"}
                                <span className={'text-red-600'}></span> </label>
                            <Input type={'text'}
                                   name={'description'}
                                   value={formik.values.description}
                                   onChange={formik.handleChange}
                                   className={'bg-white border-none h-[65px] w-[250px]'}/>
                        </div>
                    </div>


                    <div className={"flex space-x-5 relative top-14"}>
                        <Button htmlType={"button"} type={'dashed'}  onClick={() => resetForm(formik.values)}
                                size={'large'} className={'w-auto '}>Effacer</Button>
                        <Button htmlType={"submit"} type={"default"} size={'large'} loading={loading} className={'w-auto bg-black text-white'}>Ajouter</Button>
                    </div>
                </form>
            </section>
        </main>
    );
}