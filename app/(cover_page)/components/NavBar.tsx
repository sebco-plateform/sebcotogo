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
import MenuResponsive from "@/components/MenuResponsive";
import Tap from "@/components/Tap";
import Dialogs from "@/components/Dialog";
import { Badge } from 'antd';
import SearchNav from '@/components/SearchNav';
const navItemWeb1 = [
    {
        name: "Demander un Devis",
        icon: "",
        route: "/",
    },

    {
        name: "Se Connecter",
        icon: <FcBusinessman style={{ color: 'white'}} size={24} className={'h-[24px] w-[24px] text-white'}/>,
        route: "/login",
    },

    {
        name: "S'inscrire",
        icon: "",
        route: "/registre",
    },

    {
        name: "",
        icon:(<Badge count={5}> <IoIosNotifications style={{ color: 'white'}} className={'h-[24px] w-[24px] text-white'}/> </Badge> ) ,
        route: "/notifications",
    },

    {
        name: "",
        icon:(<Badge count={5}><TiShoppingCart style={{ color: 'white'}} size={24} className={'h-[24px] w-[24px] '}/> </Badge> ) ,
        route: "/cart",
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
        icon: <Dialogs color={'white'}  />,
            /*<FaSearch style={{ color: 'white'}} size={24} className={'h-[24px] w-[24px] text-white'}/>,*/
    },

    {
        name: "profil",
        route: '/login',
        icon:(<FcBusinessman style={{ color: 'white'}} size={24} className={'h-[24px] w-[24px] text-white'}/>) ,
    },


    {
        name: "",
        route: '/notifications',
        icon:(<Badge count={5}> <IoIosNotifications style={{ color: 'white'}} className={'h-[24px] w-[24px] text-white'}/>  </Badge> ) ,
    },

    {
        name: "",
        route: '/cart',
        icon:(<Badge count={5}> <TiShoppingCart style={{ color: 'white'}} size={24} className={'h-[24px] w-[24px] '}/></Badge> ) ,
    },

]

const navItems2 = [
    {
        name: 'Accueil',
        route: '/',
    },
    {
        name: 'Nos services',
        route: '/categories',
    },
    {
        name: 'A propos',
        route: '/about',
    },
    {
        name: 'Notre equipe',
        route: '/about',
    },
    {
        name: 'Historique des achats',
        route: '/history',
    },
]
function NavBar() {
    const [currentRoute, setCurrentRoute] = useState("");

    useEffect(() => {
        setCurrentRoute(window.location.pathname)
    }, []);
    return (
        <nav className={'text-white fixed bg-blackOpacity py-2 top-0 px-5 w-full'}>
            {/*items 1*/}
            <div className={'flex justify-between'}>
                {/*image or bugger icone**/}

                {/*image*/}
                <div className={'hidden md:flex w-full'}>
                    <Image src={"/icons/logo.svg"} alt={"logo"} width={100} height={100} className={''} quality={100}/>
                </div>

                 {/*searche bar*/}
                <SearchNav />

                {/*icon responsive*/}
                <div className={'md:hidden w-full'}>
                    <Tap
                        props={
                            <div className={'flex space-x-2'}>
                                <GiHamburgerMenu style={{color: ''}} className={''}/>
                            </div>
                        }

                    />
                    {/*<MenuResponsive/>
                     <GiHamburgerMenu style={{color: 'white'}} size={24} className={'h-[24px] w-[24px]'}/>
                    */}

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
                                    <div className={'mt-[-5px]'}>
                                         {items.icon}
                                    </div>

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
                    <Tap
                        props={
                            <div className={'flex space-x-2'}>
                                <GiHamburgerMenu style={{color: ''}} className={''}/>
                                <h1>
                                    Tous les catégories
                                </h1>

                            </div>
                        }

                    />
                    {/*<Menu1 />
                         <GiHamburgerMenu style={{color: 'white'}} size={24} className={'h-[24px] w-[24px]'}/>
                        <p className={'text-white'}>Tous les catégories</p>
                        */}
                </div>


                <div className={'flex space-x-2 w-[1000px]'}>
                    {
                        navItems2.map((items, index) => {
                            return <div className={''} 
                            key={index}>
                                <Link href={items.route}

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
                        return <div className={''} key={index}>
                            <Link href={items.route}

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