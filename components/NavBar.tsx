"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";
import { IoIosNotifications } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import Image from "next/image";
import Menu1 from "@/components/Menu";

const navItemWeb1 = [
    {
        name: "Demander un Devis",
        icon: "",
        route: "/",
    },

    {
        name: "Se Connecter",
        icon: <FcBusinessman style={{ color: 'white'}} size={24} className={'h-[24px] w-[24px] text-white'}/>,
        route: "/",
    },

    {
        name: "S'inscrire",
        icon: "",
        route: "/",
    },

    {
        name: "",
        icon: <IoIosNotifications style={{ color: 'white'}} className={'h-[24px] w-[24px] text-white'}/>,
        route: "",
    },

    {
        name: "",
        icon: <TiShoppingCart style={{ color: 'white'}} size={24} className={'h-[24px] w-[24px] '}/>,
        route: "/",
    },

    {
        name: "",
        icon: "",
        route: "",
    },
]

const navItemWeb2 = [

]
const navItems1 = [

    {
        name: "Recherche",
        route: '/',
        icon: <FaSearch style={{ color: 'white'}} size={24} className={'h-[24px] w-[24px] text-white'}/>,
    },

    {
        name: "profil",
        route: '/',
        icon: <FcBusinessman style={{ color: 'white'}} size={24} className={'h-[24px] w-[24px] text-white'}/>,
    },


    {
        name: "Notification",
        route: '/',
        icon: <IoIosNotifications style={{ color: 'white'}} className={'h-[24px] w-[24px] text-white'}/>,
    },

    {
        name: "Panier",
        route: '/',
        icon: <TiShoppingCart style={{ color: 'white'}} size={24} className={'h-[24px] w-[24px] '}/>,
    },

]

const navItems2 = [
    {
        name: 'Accueil',
        route: '/',
    },
    {
        name: 'Nos services',
        route: '/',
    },
    {
        name: 'A propos',
        route: '/',
    },
    {
        name: 'Notre equipe',
        route: '/',
    },
    {
        name: 'Historique des achats',
        route: '/',
    },
]
function NavBar() {
    const [currentRoute, setCurrentRoute] = useState("");

    useEffect(() => {
        setCurrentRoute(window.location.pathname)
    }, []);
    return (
        <nav className={'text-white absolute top-5 px-5 w-full'}>
            {/*items 1*/}
            <div className={'flex justify-between'}>
                {/*image or bugger icone**/}

                {/*image*/}
                <div className={'hidden md:flex w-full'}>
                    <Image src={"/icons/logo.svg"} alt={"logo"} width={100} height={100} className={''} quality={100}/>
                </div>

                {/*icon responsive*/}
                <div className={'md:hidden w-full'}>
                    <GiHamburgerMenu style={{color: 'white'}} size={24} className={'h-[24px] w-[24px]'}/>
                </div>

                {/*Nav items2 web*/}
                <div className={'hidden  md:flex space-x-5 w-[800px] relative top-5'}>
                    {
                        navItemWeb1.map((items, index) => {
                            return <Link href={items.route}
                                         key={index}
                                         className={'text-white font-light md:text-[15px]'}
                            >
                                <div className={'flex text-white'}>
                                    <span className={'mt-[-5px]'}>
                                         {items.icon}
                                    </span>

                                    {items.name}
                                </div>
                            </Link>
                        })
                    }
                </div>

                {/*Nav items2 responsive*/}
                <div className={'md:hidden flex space-x-5'}>
                    {
                        navItems1.map((items, index) => {
                            return <Link href={items.route}
                                         key={index}
                                         className={'text-white'}
                            >
                                {items.icon}
                            </Link>
                        })
                    }
                </div>
            </div>


            {/*items 2 web*/}
            <div className={'hidden md:flex justify-between md:w-full'}>

                    <div className={'flex space-x-3 w-full text-white ml-5'}>
                        <Menu1 />
                        {/*
                         <GiHamburgerMenu style={{color: 'white'}} size={24} className={'h-[24px] w-[24px]'}/>
                        <p className={'text-white'}>Tous les catégories</p>
                        */}
                    </div>


                <div className={'flex space-x-2 w-[1000px]'}>
                    {
                        navItems2.map((items, index) => {
                            return <div className={''}>
                            <Link href={items.route}
                                      key={index}
                                      className={currentRoute == items.route ? 'font-extrabold md:text-[15px] text-[10px] text-white' : '  font-light md:text-[15px] text-[12px] text-white'}
                                >
                                    {items.name}
                                </Link>
                            </div>
                        })
                    }
                </div>

            </div>


            {/*items 2 responsive*/}
            <div className={'md:hidden flex justify-between md:w-full'}>
                {
                    navItems2.map((items, index) => {
                        return <div className={''}>
                            <Link href={items.route}
                                  key={index}
                                  className={currentRoute == items.route ? 'font-extrabold md:text-[15px] text-[10px] text-white' : '  font-light md:text-[15px] text-[12px] text-white'}
                            >
                                {items.name}
                            </Link>
                        </div>
                    })
                }
            </div>
        </nav>
    );
}

export default NavBar;