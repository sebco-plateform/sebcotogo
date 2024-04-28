"use client"

import {Button, Input} from "antd";
import {useEffect, useState} from "react";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import Image from "next/image";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useToast} from "@/components/ui/use-toast";
import {CustomerModel} from "@/app/models/CustomerModel";
import {Api} from "@/api/Api";
import { useRouter} from "next/navigation";

function generateOTP(): string {
    // Générer un code OTP aléatoire de 4 chiffres
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    return otp;
}

function validateOTP(otp: string, enteredOTP: string): boolean {
    // Valider le code OTP entré par l'utilisateur
    return otp === enteredOTP;
}

export default function PasswordRecovery() {
    const [emailAc, setEmailAct] = useState(true);
    const [otpAc, setOtplAct] = useState(false);
    const [passAc, setPassAct] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false)
    const {toast} = useToast();
    const [otp, setOtp] = useState("")
    const [email, setemail] = useState("")
    const [customer, setCustomer] = useState<CustomerModel>()
    const router = useRouter();
    useEffect(() => {

    }, []);
    async function sendEmail(email: string, otp: string) {
        await fetch(`/api/sendOtp`, {
            //mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, otp: otp}),
        }).then((val)  => {

            if(val.ok) {
                toast({
                    title: "Un code a 4 chiffres à été envoyer a cet addresse email."
                });
                setEmailAct(false)
                setOtplAct(true)

            }
            else {

                toast({
                    title: "Une erreur est survenu lors de l'envoi de l'email.",
                    variant: "destructive"
                })
            }
        });
    }

    //email formik
    const formikEmail = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Entrer un email correct").required("l'email est obligatoire")
        }),
        onSubmit: async (values) => {
            setEmailLoading(true)
           const resp =  await Api.post({email: values.email}, 'user/emailVerification');
           if(resp.ok) {
               const data : CustomerModel = await resp.json()
               setCustomer(data)
               const newOtp = generateOTP();
               setOtp(newOtp)
               setemail(values.email)
               await sendEmail(values.email, newOtp);
           } else {
               toast({
                   title: "L'email n'existe pas.",
                   variant: "destructive"
               })
               setEmailLoading(false)
           }
            setEmailLoading(false)
        }
    });
    //otp formik
    const formikOtp = useFormik({
        initialValues: {
            otp1: "",otp2: "",otp3: "",otp4: "",
        },
        validationSchema: Yup.object({
            otp1: Yup.string().required("otp requise"),
            otp2: Yup.string().required("otp requise"),
            otp3: Yup.string().required("otp requise"),
            otp4: Yup.string().required("otp requise"),
        }),

        onSubmit: (values) => {
            setEmailLoading(true)
            const otps = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}`;
            console.log(otps);
            if(validateOTP(otp, otps)) {
                setOtplAct(false)
                setPassAct(true)
            }
            else {
                toast({
                    title: "le code OTP entré n'est pas valide",
                    variant: "destructive"
                });
                setEmailLoading(false);
            }
            setEmailLoading(false);
        }
    });

    //pass formik
    const formikPass = useFormik({
        initialValues: {
            pass1: "",
            pass2: "",
        },
        validationSchema: Yup.object({
            pass1: Yup.string().required('le mot de passe est requise'),
            pass2: Yup.string().required('le mot de passe est requise'),
        }),
        onSubmit: async (values) => {
            setEmailLoading(true)
            if(values.pass1 == values.pass2) {
                const customerModel = new CustomerModel(Number(customer?.phone), values.pass1, String(customer?.email), String(customer?.firstName), String(customer?.lastName), String(customer?.role))
                const response = await Api.update(customerModel, `user/update/${String(customer?.id)}`);
                if(response.ok) {
                    // TODO:: show toast
                    toast({
                        title: "Mise à jour du mot de passe est effectué avec succès",
                    });
                    router.push('/login')

                }
                else {
                    toast({
                        title: "Une erreur est survenue lors de la mise a jours",
                        description: "Réesayer",
                        variant: "destructive"
                    });
                    setEmailLoading(false)
                }
            }
            else {
                toast({
                    title: "Les mots de passe ne sont pas conformes",
                    variant: "destructive"
                });
                setEmailLoading(false)
            }
            setEmailLoading(false)
        }
    })

    return (
        <div className={"w-full h-screen flex flex-col space-y-10 items-center justify-center"}>
                <Image src={"/icons/logo.svg"}
                       alt={""}
                       width={200}
                       height={200}
                       className={"bg-cover bg-center"}
                />

            {/*email form*/}
            <div className={emailAc ? "flex w-[400px] flex-col space-y-5": "hidden"}>
                <h1 className={""}>
                    Entrer l'email associer a votre compte et <br/>
                    Nous vous envéron un code de 4 chiffres.
                </h1>
                <form onSubmit={formikEmail.handleSubmit} className={"flex flex-col space-y-5"}>
                    <div>
                        <label className={formikEmail.touched.email && formikEmail.errors.email ? "text-red-600" : ""}>{formikEmail.touched.email && formikEmail.errors.email ? formikEmail.errors.email : "Email de recupération"}</label>
                        <Input type={"email"}
                               className={""}
                               name={"email"}
                               value={formikEmail.values.email}
                               onChange={formikEmail.handleChange}
                        />
                    </div>

                    <Button htmlType={"submit"}
                            loading={emailLoading}
                            size={"large"}
                            className={"w-full bg-cyan-400"}
                    >
                        Valider
                    </Button>
                </form>
            </div>


            {/*Otp form*/}
            <div className={otpAc ? "flex w-[400px] flex-col space-y-5": "hidden"}>
                <h1>Enter le code OTP à quatre chiffres que <br/> vous avez reçu par email</h1>
                <form onSubmit={formikOtp.handleSubmit} className={"flex flex-col space-y-5"}>
                    <label className={'text-red-600'}>
                        {formikOtp.touched.otp2 || formikOtp.touched.otp1 || formikOtp.touched.otp3 || formikOtp.touched.otp4 && formikOtp.errors.otp1 || formikOtp.errors.otp2 || formikOtp.errors.otp3 || formikOtp.errors.otp4 ? formikOtp.errors.otp3 : ""}
                    </label>
                    <div className="flex space-x-4">
                        <Input type="text"
                               value={formikOtp.values.otp1}
                               onChange={formikOtp.handleChange}
                               name={"otp1"}
                               className="w-12 h-12 rounded-lg border border-gray-300 text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                               maxLength={1}/>
                        <Input type="text"
                               value={formikOtp.values.otp2}
                               onChange={formikOtp.handleChange}
                               name={"otp2"}
                               className="w-12 h-12 rounded-lg border border-gray-300 text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                               maxLength={1}/>
                        <Input type="text"
                               value={formikOtp.values.otp3}
                               name={"otp3"}
                               onChange={formikOtp.handleChange}
                               className="w-12 h-12 rounded-lg border border-gray-300 text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                               maxLength={1}/>
                        <Input type="text"
                               value={formikOtp.values.otp4}
                               name={"otp4"}
                               onChange={formikOtp.handleChange}
                               className="w-12 h-12 rounded-lg border border-gray-300 text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                               maxLength={1}/>
                    </div>

                    <Button htmlType={"submit"}
                            loading={emailLoading}
                            className={"w-full bg-cyan-400"}
                    >
                        Valider
                    </Button>
                </form>

                <div onClick={async () => {
                    await sendEmail(email, otp);
                }}
                     className={"text-center text-sky-600 hover:cursor-pointer"}>Reenvoyer le code</div>
            </div>

            {/*new password form*/}
            <div className={passAc ? "flex w-[400px] flex-col space-y-5": "hidden"}>
                <h1></h1>
                <form onSubmit={formikPass.handleSubmit} className={"flex flex-col space-y-5"}>
                    <div>
                        <label className={formikPass.touched.pass1 && formikPass.errors.pass1 ? "text-red-600" : ""}>{formikPass.touched.pass1 && formikPass.errors.pass1 ? formikPass.errors.pass1 : "Enter un nouveau mot de passe"}</label>
                        <Input.Password
                            value={formikPass.values.pass1}
                            onChange={formikPass.handleChange}
                            name={"pass1"}
                            placeholder="input password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>

                    <div>
                        <label className={formikPass.touched.pass2 && formikPass.errors.pass2 ? "text-red-600" : ""}>{formikPass.touched.pass2 && formikPass.errors.pass2 ? formikPass.errors.pass2 : "Confirmer le mot de passe"}</label>
                        <Input.Password
                            value={formikPass.values.pass2}
                            name={"pass2"}
                            onChange={formikPass.handleChange}
                            placeholder="input password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>

                    <Button htmlType={"submit"}
                            className={"w-full bg-cyan-400"}
                            loading={emailLoading}>
                        Valider
                    </Button>
                </form>
            </div>
        </div>
    )
}