"use client"
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { SelectProps } from 'antd';
import {Button, Select } from 'antd';
import { Methodes } from "@/resource_methodes/methodes";
import { Api } from "@/api/Api";
import { useToast } from "@/components/ui/use-toast";
import {CategoryModel} from "@/app/models/Category";
import {CharacteristicModel} from "@/app/models/characteristic";
import {ArticleModel} from "@/app/models/Article";
import {CharacteristicArticleModel} from "@/app/models/CharacteristicArticle";
import {ImageModel} from "@/app/models/Image";
import ImageUpload from "@/app/(amdin)/componnents/image-uploadAdmin";
import {ArrowLeftCircle} from "lucide-react";
import {useRouter} from "next/navigation"

let ImagesArray: string[] = [];
let categoryArray: SelectProps['options'] = [];
let characteristicArray: SelectProps['options'] = [];
let characteristicVal: string[] = [];

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const route = useRouter();
    const [images, setImages] = useState<string>('');
    const [images2, setImages2] = useState<string>('');
    const [images3, setImages3] = useState<string>('');
    const [images4, setImages4] = useState<string>('');
    const [categoryData, setCategoryData] = useState<CategoryModel[]>([]);
    const [characteristic, setCharacteristic] = useState<CharacteristicModel[]>([]);
    const [categoryArrays, setCategoryArrays] = useState<SelectProps['options']>();
    const [characteristicArrays, setCharacteristicArrays] = useState<SelectProps['options']>()
    const [imagesArrays, setImagesArrays] = useState<string[]>([])
    const [respons, setRespons] = useState(false);
    const { toast } = useToast();
    const [catId, setCatId] = useState<number>()
    const [charId, setCharId] = useState<number>()
    const [characteristicValues, setCharacteristicValues] = useState<string[]>([])

    useEffect(() => {
       //loard categories
        Api.getAll('category/all').then((cats: any[]) => {
            setCategoryData(cats);
            const newCategory: SelectProps['options'] = [];
            cats.forEach((element) => {
                if (!categoryArray?.includes({ value: element.id, label: element.catName })) {
                    newCategory.push({
                        value: element.id,
                        label: element.catName,
                    })
                }            
            })
             setCategoryArrays(newCategory);
        })

        //loard characteristic data
        Api.getAll('characteristic/all').then((cats: CharacteristicModel[]) => {
            setCharacteristic(cats);
            
            const newCharacteristic: SelectProps['options'] = [];
            cats.forEach((element) => {
                if (!characteristicArray?.includes({ value: element.id, label: element.charactName })) {
                   // setCharacteristicArrays({value: element.id, label: element.charactName})
                   newCharacteristic.push({
                        value: element.id,
                        label: element.charactName,
                    })
                }
            })
            setCharacteristicArrays(newCharacteristic);
            
        })

    }, [categoryArrays, characteristicArrays]);
   

    function resetForm(values: any) {
        values.field = "";
        values.name = "";
        values.price = "";
        values.quantity = "";
        values.category = "";
        values.characteristic = [];
        values.description = "";
        values.tax = "";

        ImagesArray = ImagesArray.filter(() => false);
        setImagesArrays(ImagesArray);
        if (Methodes.removeAllArray(ImagesArray)) {
            setImages('');
            setImages2('');
            setImages3('');
            setImages4('');
        }
    }

    const formik = useFormik({
        initialValues: {
           
            name: "",
            price: "",
            quantity: "",
            category: "",
            description: "",
            tax: "",

        },
        validationSchema: Yup.object({
            field: Yup.string().optional(),
            name: Yup.string().required("Le nom de l'aricle est obligatoire"),
            price: Yup.number().required('le prix est obligatoire'),
            quantity: Yup.number().required("La quantité est obligatoire"),
            category: Yup.string().required("la categorie est obligatoire"),
           // characteristic: Yup.ArraySchema.required("le caracteristique est obligatoire"),
            description: Yup.string().optional(),
            tax: Yup.string().optional(),
        }),
        onSubmit: async (values) => {
            setLoading(true)

               setImagesArrays(ImagesArray)
                //check if ids is not undefined
                if (values.category != "" && characteristicValues.length != 0 ) {
                    if (imagesArrays.length != 0) {
                        const articleModel = new ArticleModel(values.name, Number(values.price), values.description, Number(values.category), Number(values.tax));
                        const resp = await Api.post(articleModel, 'article/add');
                        
                        if (resp.ok) {
                            resp.json().then((datas: any) => {
                                //save characteristic article id

                                characteristicValues.forEach((element) => {
                                    const characteristicArticleModel = new CharacteristicArticleModel(values.description, Number(datas.id), Number(element))
                                    Api.post(characteristicArticleModel, 'characteristic-article/add')
                                })
    
                                //add image
                                ImagesArray.forEach((elements, ind) => {
                                    const imageModel = new ImageModel(`art_image${ind}`, elements,  datas.id)
                                    const resp2 = Api.post(imageModel, 'image/add')
                                    resp2.then((re) => {
                                        setRespons(re.ok)
                                    })
                                })
                            })
    
                            if (respons) {
                                toast({
                                    title: 'Produt ajouter avec succès',
                                })
                                resetForm(values);
    
                            } else {
                                toast({
                                    variant: 'destructive',
                                    title: 'Une erreur est survenu lors de l enregistrement de l image',
                                    description: 'réessayer'
                                });
                                setLoading(false)
                            }
                        }
                    } else {
                        toast({
                            variant: 'destructive',
                            title: "Ajouter au moin une image",
                            description: 'Réessayer'
                        });
                        setLoading(false)
    
                    }
    
                } else {
                    toast({
                        variant: 'destructive',
                        title: "Selectioner la catégorie et une caracteristique",
                        description: 'Réessayer'
                    });
                    setLoading(false)

                }

                setLoading(false)
        }


});
     

    return (
        <main className={'mt-20 px-20'}>
            <div className={'flex justify-between content-between'}>
                <div className={'flex flex-col space-y-0'}>
                    <h1 className={'font-extrabold text-[30px]'}>Ajouter un Arcticle</h1>
                    <p className={'text-gray-400'}>Ajouter des articles</p>
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

            <Separator className={'w-full my-5'} />

            <section>
                <form onSubmit={formik.handleSubmit} className={'flex flex-col space-y-10 w-[950px]'}>
                    {/*image*/}
                    <div>
                        <Label>Image <span className={'text-red-600'}>*</span> </Label>
                        <div className={"flex justify-between content-between"}>
                            <div>
                                <ImageUpload
                                    value={images}
                                    disable={loading}
                                    onChange={(url) => {


                                        if (url != "") {
                                            setImages(url);
                                            ImagesArray.push(url)
                                        }

                                    }}
                                    onRemove={() => {
                                        const result = Methodes.removeInArray(ImagesArray, images);
                                        if (result) {
                                            setImages("");
                                        }
                                    }}

                                />
                            </div>
                            <div>
                                <ImageUpload
                                    value={images2}
                                    disable={loading}
                                    onChange={(url) => {


                                        if (url != "") {
                                            setImages2(url);
                                            ImagesArray.push(url)
                                        }

                                    }}
                                    onRemove={() => {
                                        const result = Methodes.removeInArray(ImagesArray, images2);
                                        if (result) {
                                            setImages2("");
                                        }
                                    }}

                                />
                            </div>
                            <div>
                                <ImageUpload
                                    value={images3}
                                    disable={loading}
                                    onChange={(url) => {


                                        if (url != "") {
                                            setImages3(url);
                                            ImagesArray.push(url)
                                        }

                                    }}
                                    onRemove={() => {
                                        const result = Methodes.removeInArray(ImagesArray, images3);
                                        if (result) {
                                            setImages3("");
                                        }
                                    }}

                                />
                            </div>
                            <div>
                                <ImageUpload
                                    value={images4}
                                    disable={loading}
                                    onChange={(url) => {



                                        if (url != "") {
                                            ImagesArray.push(url)
                                            setImages4(url);
                                        }

                                    }}
                                    onRemove={() => {
                                        const result = Methodes.removeInArray(ImagesArray, images4);
                                        if (result) {
                                            setImages4("");
                                        }
                                    }}

                                />
                            </div>

                        </div>


                    </div>

                    {/*first input row*/}
                    <div className={'flex justify-between content-between'}>
                        <div className={'flex flex-col'}>
                            <Label
                                className={formik.touched.name && formik.errors.name ? 'text-red-600' : ''}>{formik.touched.name && formik.errors.name ? formik.errors.name : "Nom de l'article"}<span
                                    className={'text-red-600'}>*</span> </Label>
                            <Input type={'text'}
                                name={'name'}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className={'bg-white border-none h-[35px] w-[250px]'} />
                        </div>

                        <div className={'flex flex-col'}>
                            <Label
                                className={formik.touched.price && formik.errors.price ? 'text-red-600' : ''}> {formik.touched.price && formik.errors.price ? formik.errors.price : "Prix"}
                                <span className={'text-red-600'}>*</span> </Label>
                            <Input type={'number'}
                                name={'price'}
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                className={'bg-white border-none h-[35px] w-[250px]'} />
                        </div>

                        <div className={'flex flex-col'}>
                            <Label
                                className={formik.touched.quantity && formik.errors.quantity ? "text-red-600" : ""}> {formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : "Quantité"}
                                <span className={'text-red-600'}>*</span> </Label>
                            <Input type={'number'}
                                name={'quantity'}
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                className={'bg-white border-none h-[35px] w-[250px]'} />
                        </div>

                    </div>


                    {/*second input row*/}
                    <div className={'flex justify-between content-between'}>
                        <div className={'flex flex-col'}>
                            <Label
                                className={formik.touched.category && formik.errors.category ? "text-red-600" : ""}> {formik.touched.category && formik.errors.category ? formik.errors.category : "Catégorie"}
                                <span className={'text-red-600'}>*</span> </Label>

                            <Select
                                placeholder=""
                    
                                onSelect={(value) => {
                                    formik.values.category = String(value)
                                }}
                                options={categoryArrays}
                                className="bg-white border-none h-[35px] w-[250px]"
                            />

                        </div>

                        <div className={'flex flex-col'}>
                            <Label
                                className={""}>  Caractéristique
                                <span className={'text-red-600'}>*</span> </Label>
                            <Select
                                 mode="multiple"
                                placeholder=""
                                onSelect={(value) => {
                                    characteristicVal.push(value as string)
                                    setCharacteristicValues(characteristicVal);
                                }}
                                
                                options={characteristicArrays}
                                className="bg-white border-none h-[35psx] w-[250px]"
                            />

                        </div>

                        <div className={'flex flex-col'}>
                            <Label
                                className={formik.errors.tax ? "text-red-600" : ""}> {formik.errors.tax ? formik.errors.tax : "Taxe"}
                                <span className={'text-red-600'}></span> </Label>
                            <Input type={'number'} name={'tax'}
                                value={formik.values.tax}
                                onChange={formik.handleChange}
                                className={'bg-white border-none h-[35px] w-[250px]'} />
                        </div>

                    </div>

                    <div className={'flex justify-between content-between'}>


                        <div className={'flex flex-col space-y-2'}>
                            <Label
                                className={formik.touched.description && formik.errors.description ? "text-red-600" : ""}> {formik.touched.description && formik.errors.description ? formik.errors.description : "Description"}
                                <span className={'text-red-600'}></span> </Label>
                            <Input type={'text'} name={'description'}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                className={'bg-white border-none h-[85px] w-[250px]'} />
                        </div>

                        <div className={"flex space-x-5 relative top-14"}>
                            <Button htmlType={"reset"} type={'dashed'} onClick={() => resetForm(formik.values)}
                                size={'large'} className={'w-auto '}>Effacer</Button>
                            <Button htmlType={"submit"} size={'large'} loading={loading} className={'w-auto '}>Ajouter</Button>
                        </div>

                    </div>

                </form>
            </section>
        </main>
    );
}
export default AddProduct;