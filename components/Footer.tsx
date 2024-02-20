"use client"
import React, {LegacyRef, useRef} from 'react';
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { BsTelephoneFill } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";
import emailjs from '@emailjs/browser';
import { useToast } from "@/components/ui/use-toast"
import {ToastAction} from "@/components/ui/toast";

const links = [
    {
        icon: <BsTelephoneFill />,
        name: "telephone",
        url: "",
    },

    {
        icon: <FaSquareXTwitter />,
        name: "twitter",
        url: "",
    },

    {
        icon: <MdMail />,
        name: "email",
        url: "",
    },

    {
        icon: <IoLogoWhatsapp />,
        name: "whatsapp",
        url: "",
    },

    {
        icon: <FaTiktok />,
        name: "tiktok",
        url: "",
    }
]

function Footer() {
    const form = useRef<HTMLFormElement>();
    const { toast } = useToast()

    //fonction to send email
    const sendEmail = (e: any) => {
        e.preventDefault();

        emailjs.sendForm( String(process.env.EMAISERVICEID) ,  String(process.env.EMAILTEMPLETEID), form.current!,  String(process.env.EMAILPUBLICKEY))
            .then((result) => {
                toast({
                    description: "Email envoyer avec succès",
                })
            }, () => {
                toast({
                    variant: 'destructive',
                    description: "Un problème est survenu lors de l'envoi de l'email",
                    action: <ToastAction altText="Try again">Reéssayer!!</ToastAction>,
                })
            });
    };
    return (
        <div className={' bottom-0 mt-[20px] w-full  flex items-center justify-center md:flex-row md:space-x-10 px-4 flex-col space-y-5 py-5 bg-[#DDDCDC]'}>
            <div className={'flex flex-col space-y-3'}>
                <div>
                    <Image src={'/images/Construction worker-bro 1.svg'} height={350} width={350} className={''}  alt={'foot img'}/>
                </div>


                <div>
                    <div className={'flex justify-between content-between '}>
                        {
                            links.map((items, index) => {
                                return <Link key={index} href={items.url}>
                                    {items.icon}
                                </Link>
                            })
                        }
                    </div>
                </div>

            </div>

            <div className={'flex flex-col space-y-3'}>
                <h1 className={'font-medium text-[35px] text-black'}> Nous Contacter </h1>

                <div>
                    <form className={'flex flex-col space-y-3 md:flex-row md:space-x-5'} ref={form as LegacyRef<HTMLFormElement> } onSubmit={sendEmail}>
                        <div className={'flex flex-col space-y-3'}>
                            <Input type={'text'} placeholder={'Name'} name={'from_name'} required className={'bg-white'}/>
                            <Input type={'email'} placeholder={'Email'} name={'from_email'} required className={'bg-white'}/>
                        </div>

                        <div className={'flex flex-col space-y-5'}>
                             <textarea className={" pl-5 pt-3 rounded-sm h-[90px]"} placeholder={'Votre message'} rows={4} cols={40} />

                            <Button type={'submit'} variant={'default'} size={'lg'} className={'bg-buttonColor text-white'}
                                    >
                                Envoyer
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Footer;