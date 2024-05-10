"use client"
import {Separator} from "@/components/ui/separator";
import React, {useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/navigation";
import {Button, Select} from 'antd';
import type { SelectProps } from 'antd';
import {Methodes} from "@/resource_methodes/methodes";
import { Api } from "@/api/Api";
import { useToast } from "@/components/ui/use-toast";
import {ImageModel} from "@/app/models/Image";
import {ArticleModel} from "@/app/models/Article";
import {CharacteristicModel} from "@/app/models/characteristic";
import {CharacteristicArticleModel} from "@/app/models/CharacteristicArticle";
import ImageUpload from "@/app/(amdin)/componnents/image-uploadAdmin";




let ImagesArray: string[] = [];
let categoryArray: SelectProps['options'] = [];
let characteristicArray: SelectProps['options'] = [];
let characteristicVal: string[] = [];
const AddProduct = ({ params } : { params: {id: string }}) =>{
    const [loading, setLoading] = useState(false);
    const route = useRouter();
    const [images, setImages] = useState<string>('')
    const [imageData, setImageData] = useState<ImageModel[]>([])
    const [article, setArticle] = useState<ArticleModel>()
    const [charactArticle, setCharactArticle] = useState<any[]>([]);
    const [defaultOption, setDefaultOption] = useState<SelectProps['options']>();
    const [characteristic, setCharacteristic] = useState("")
    const [categoryArrays, setCategoryArrays] = useState<SelectProps['options']>();
    const [characteristicArrays, setCharacteristicArrays] = useState<SelectProps['options']>()
    const [respons, setRespons] = useState(false);

    const {toast} = useToast();


    useEffect(() => {

        const fetch = async () => {

            const characteristicId: number[]= [];
            const optionsDef: SelectProps['options']=[]
            //@ts-ignore
            const respArti: ArticleModel = await  Api.getAll(`article/single/${params.id}`);
            Api.getAll(`characteristic-article/findCharactByArticleId/${respArti.id}`).then((charact: any[]) => {
                setCharactArticle(charact)
                charact.forEach((ele: any) => {
                    optionsDef.push({
                        label: ele.characteristic.charactName,
                        value: ele.characteristic.id,
                    })
                })

            });

            const initialValue = {
                name: respArti.articleName,
                price: String(respArti.price),
                quantity: "0",
                category:String(respArti.category_id),
                description: respArti.description,
                tax: String(respArti.tax),
            }
            await formik.setValues(initialValue);
            setDefaultOption(optionsDef);
        }

        Api.getAll(`image/articleImage/${params.id}`).then((img: any[]) => {
            setImageData(img)
        });

        //loard categories
        Api.getAll('category/all').then((cats: any[]) => {
           // setCategoryData(cats);
            const newCategory: SelectProps['options'] = [];
            cats.forEach((element) => {

                    newCategory.push({
                        value: element.id,
                        label: element.catName,
                    })

            })
            setCategoryArrays(newCategory);
        });

        Api.getAll('characteristic/all').then((cats: CharacteristicModel[]) => {
            //setCharacteristic(cats);

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



        fetch();
    }, [params.id]);
            field: Yup.string().optional(),


    function resetForm(values: any)  {
        values.field= "";
        values.name= "";
        values. price= "";
        values.quantity= "";
        values.category= "";
        values.characteristic= "";
        values.description= "";
        values.tax= "";

        if(Methodes.removeAllArray(ImagesArray)) {
            setImages('');

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
        validationSchema : Yup.object({
            name: Yup.string().required("Le nom de l'aricle est obligatoire"),
            price: Yup.number().required('le prix est obligatoire'),
            quantity: Yup.number().optional(),
            category: Yup.string().required("la categorie est obligatoire"),
            description: Yup.string().optional(),
            tax: Yup.string().optional(),
        }),
        onSubmit: async (values) => {
            setLoading(true)

            //setImagesArrays(ImagesArray)
            //check if ids is not undefined
            if (values.category != "" && characteristicArrays?.length != 0) {
                const articleModel = new ArticleModel(values.name, Number(values.price), values.description, Number(values.category), Number(values.tax));

                if (imageData.length != 0) {
                    const resp = await Api.post(articleModel, 'article/update');

                    if (resp.ok) {
                        resp.json().then((datas: any) => {
                            //save characteristic article id

                            characteristicArrays?.forEach((element) => {
                                const characteristicArticleModel = new CharacteristicArticleModel(values.description, Number(datas.id), Number(element))
                                Api.post(characteristicArticleModel, 'characteristic-article/update')
                            })

                        })

                        if (respons) {
                            toast({
                                title: 'Produt ajouter avec succès',
                            })
                            //resetForm(values);

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
        },
    })


    return (
        <main className={'mt-20 px-20'}>
            <div className={'flex justify-between content-between'}>
                <div className={'flex flex-col space-y-0'}>
                    <h1 className={'font-extrabold text-[30px]'}>Modifier un Arcticle</h1>
                    <p className={'text-gray-400'}>Modification des articles</p>
                </div>
            </div>

            <Separator className={'w-full my-5'}/>

            <section>
                <form onSubmit={formik.handleSubmit} className={'flex flex-col space-y-10 w-[950px]'}>
                    {/*image*/}
                    <div>
                        <Label>Image <span className={'text-red-600'}>*</span> </Label>
                        <div className={"flex space-x-5"}>
                            {
                                
                                imageData.map((img, index) => {
                                    //setImages(img.imageUrl)
                                    
                                    return <div key={index}>
                                        <ImageUpload
                                            value={img.imageUrl}
                                            disable={loading}
                                            onChange={ async (url) => {

                                                setImages(url);
                                                if (url != "") {
                                                    const imageModel = new ImageModel(String(img.imageName), String(url),Number(params.id))
                                                
                                                    const resp2 = await  Api.update(imageModel,`image/update/${img.id}`)
                                                    if(resp2.ok) {
                                                        toast({
                                                            title: "image modifier avec succès"
                                                        })
                                                    }
                                                    else {
                                                        toast({
                                                            title: "Une ereur est survenue lors de la modification",
                                                            description: "réessayer",
                                                            variant: "destructive"
                                                        })
                                                    }
                                                    ImagesArray.push(url)
                                                }

                                            }}
                                            onRemove={ async () => {
                                                const resp2 = await  Api.remove(`image/delete/${img.id}`)
                                                if(resp2.ok) {
                                                    toast({
                                                        title: "image suprimer avec succès"
                                                    })
                                                    route.refresh()
                                                }
                                                else {
                                                    toast({
                                                        title: "Une ereur est survenue lors de la supression",
                                                        description: "réessayer",
                                                        variant: "destructive"
                                                    })
                                                }
                                                const result = Methodes.removeInArray(ImagesArray, images);
                                                if (result) {
                                                    setImages("");
                                                }
                                            }}

                                        />
                                    </div>
                                })
                            }

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
                                   className={'bg-white border-none h-[35px] w-[250px]'}/>
                        </div>

                        <div className={'flex flex-col'}>
                            <Label className={formik.touched.price && formik.errors.price ? 'text-red-600' : ''}> {formik.touched.price && formik.errors.price ? formik.errors.price : "Prix"}  <span className={'text-red-600'}></span> </Label>
                            <Input type={'number'}
                                   name={'price'}
                                   value={formik.values.price}
                                   onChange={formik.handleChange}
                                   className={'bg-white border-none h-[35px] w-[250px]'}/>
                        </div>

                        <div className={'flex flex-col'}>
                            <Label className={formik.touched.quantity && formik.errors.quantity ? "text-red-600" : ""}> {formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : "Quantité"}  <span className={'text-red-600'}>*</span> </Label>
                            <Input type={'number'}
                                   name={'quantity'}
                                   disabled={true}
                                   value={formik.values.quantity}
                                   onChange={formik.handleChange}
                                   className={'bg-white border-none h-[35px] w-[250px]'}/>
                        </div>

                    </div>


                    {/*second input row*/}
                    <div className={'flex justify-between content-between'}>
                        <div className={'flex flex-col'}>
                            <Label className={ formik.errors.category ? "text-red-600": ""}> { formik.errors.category ? formik.errors.category : "Catégorie"}  <span className={'text-red-600'}>*</span> </Label>

                            <Select
                                placeholder=""
                                onSelect={(value, option) => {
                                    formik.values.category = String(value);
                                }}
                                onChange={formik.handleChange}
                                options={categoryArrays}
                                className="bg-white border-none h-[35px] w-[250px]"
                            />

                        </div>

                        <div className={'flex flex-col'}>
                            <Label className={ ""}> {"Caractéristique"}  <span className={'text-red-600'}></span> </Label>
                            <Select
                                defaultValue={defaultOption}
                                placeholder=""
                                onSelect={(value, option) => {
                                    setCharacteristic(String(value));
                                }}
                                onChange={formik.handleChange}
                                options={characteristicArrays}
                                className="bg-white border-none h-[35px] w-[250px]"
                            />

                        </div>

                        <div className={'flex flex-col'}>
                            <Label className={formik.errors.tax ? "text-red-600" : ""}> { formik.errors.tax ? formik.errors.tax : "Taxe"} <span className={'text-red-600'}></span> </Label>
                            <Input type={'number'} name={'tax'}
                                   value={formik.values.tax}
                                   onChange={formik.handleChange}
                                   className={'bg-white border-none h-[35px] w-[250px]'}/>
                        </div>

                    </div>

                    <div className={'flex justify-between content-between'}>


                        <div className={'flex flex-col space-y-2'}>
                            <Label className={formik.touched.description && formik.errors.description ? "text-red-600" : ""}> {formik.touched.description && formik.errors.description ? formik.errors.description : "Description"} <span className={'text-red-600'}></span> </Label>
                            <Input type={'text'} name={'description'}
                                   value={formik.values.description}
                                   onChange={formik.handleChange}
                                   className={'bg-white border-none h-[85px] w-[250px]'}/>
                        </div>

                        <div className={"flex space-x-5 relative top-14"}>
                            <Button htmlType={"submit"} size={'large'} className={'w-auto '}>Ajouter</Button>
                        </div>

                    </div>

                </form>
            </section>
        </main>
    );
}
export default AddProduct;