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
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ProfilBtn from "@/components/ProfilBtn";
import NotificationDrawer from "@/components/NotificationDrawer";


interface NavInterface  {
    style: string;
    text_color: string;
}
function NavBar({ style, text_color } : NavInterface) {
    const [currentRoute, setCurrentRoute] = useState("");
    const isAuth = useSelector((state: RootState) => state.authReducer.value.isAuth)
    const item = useSelector((state: RootState) => state.cartSlice)


    useEffect(() => {
        
        setCurrentRoute(window.location.pathname)
    }, []);

    const navItemWeb1 = [
        /*{
            name: "Demander un Devis",
            icon: "",
            route: "/",
        },*/
    
        {
            name: "Se Connecter",
            icon: <FcBusinessman  size={24} className={`h-[24px] w-[24px] text-white ${text_color}`}/>,
            route: "/login",
        },
    
        {
            name: "S'inscrire",
            icon: "",
            route: "/registre",
        },
    
        {
            name: "",
            icon:(<Badge count={0}> <NotificationDrawer text_color={text_color}/> </Badge> ) ,
            route: "#",
        },
    
        {
            name: "",
            icon:(<Badge count={item.length}><TiShoppingCart  size={24} className={`h-[24px] w-[24px] ${text_color} `}/> </Badge> ) ,
            route: "/cart",
        },
    
        {
            name: "",
            icon: "",
            route: "",
        },
    ]
    
    const navItemWeb1Connect = [
        /*{
            name: "Demander un Devis",
            icon: "",
            route: "/",
        },*/
    
        {
            name: "",
            icon:(<Badge count={0}> <NotificationDrawer text_color={text_color}/> </Badge> ) ,
            route: "#",
        },
    
        {
            name: "",
            icon:(<Badge count={item.length}><TiShoppingCart  size={24} className={`h-[24px] w-[24px] ${text_color} `}/> </Badge> ) ,
            route: "/cart",
        },
    
        {
            name: "",
            icon: "",
            route: "",
        },
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
            icon:(<FcBusinessman   className={`h-[24px] w-[24px] ${text_color} `}/>) ,
        },
    
    
        {
            name: "",
            route: '#',
            icon:(<Badge count={0}> <NotificationDrawer text_color={text_color}/>  </Badge> ) ,
        },
    
        {
            name: "",
            route: '/cart',
            icon:(<Badge count={item.length}> <TiShoppingCart  size={24} className={`h-[24px] w-[24px] ${text_color} `}/></Badge> ) ,
        },
    
    ]
    
    const navItems1Connect = [
    
        {
            name: "Recherche",
            route: '/',
            icon: <Dialogs color={'white'}  />,
                /*<FaSearch style={{ color: 'white'}} size={24} className={'h-[24px] w-[24px] text-white'}/>,*/
        },
    
    
        {
            name: "",
            route: '#',
            icon:(<Badge count={0}> <NotificationDrawer text_color={text_color}/>  </Badge> ) ,
        },
    
        {
            name: "",
            route: '/cart',
            icon:(<Badge count={item.length}> <TiShoppingCart  size={24} className={`h-[24px] w-[24px] ${text_color} `}/></Badge> ) ,
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
       /* {
            name: 'Notre equipe',
            route: '/about',
        },
        {
            name: 'Historique',
            route: '/history',
        },*/
    ]

    return (
        <nav className={style}>
            {/*items 1*/}
            <div className={'flex justify-between content-between items-center '}>
                {/*image or bugger icone**/}

                {/*image*/}
                <div className={'hidden md:flex w-full'}>
                    <Image src={"/icons/logo.svg"} alt={"logo"} width={100} height={100} className={''} quality={100}/>
                </div>

                 {/*searche bar*/}
                <div className={"w-full"}>
                    <SearchNav />
                </div>


                {/*icon responsive*/}
                <div className={'md:hidden flex ml-5 mb-5 self-start w-full'}>
                    <Tap
                        props={
                            <div className={'flex space-x-2'}>
                                <GiHamburgerMenu style={{color: ''}} className={`${text_color}  w-[20px] h-[20px]`}/>
                            </div>
                        }

                    />
                    {/*<MenuResponsive/>
                     <GiHamburgerMenu style={{color: 'white'}} size={24} className={'h-[24px] w-[24px]'}/>
                    */}

                </div>

                {/*Nav items2 web connect*/}
                <div className={'hidden  md:flex w-full space-x-5 items-center justify-end'}>
                    {
                        isAuth ? navItemWeb1Connect.map((items, index) => {
                                return <Link href={items.route}
                                             key={index}
                                             className={`${text_color} font-light md:text-[15px]`}
                                >
                                    <div className={`flex ${text_color}`}>
                                        <div className={'mt-[-5px]'}>
                                             {items.icon}
                                        </div>
    
                                        {items.name}
                                    </div>
                                </Link>
                            })
                        :  navItemWeb1.map((items, index) => {
                                return <Link href={items.route}
                                             key={index}
                                             className={`${text_color} h-auto font-light md:text-[15px]`}
                                >
                                    <div className={`flex ${`${text_color} h-auto`}`}>
                                        <div className={'mt-[-5px]'}>
                                             {items.icon}
                                        </div>
    
                                        {items.name}
                                    </div>
                                </Link>
                            })
                    }

                    {
                        isAuth && <div className={"mt-[-10px]"}>
                            <ProfilBtn/>
                        </div>
                    }


                </div>

                {/*Nav items2 responsive*/}
                <div className={'md:hidden flex space-x-5'}>
                    {
                        isAuth ?  navItems1Connect.map((items, index) => {
                            return <Link href={items.route}
                                         key={index}
                                         className={`${text_color} h-auto`}
                            >
                                {items.icon}
                            </Link>
                        })
                        
                        : 
                        navItems1.map((items, index) => {
                            return <Link href={items.route}
                                         key={index}
                                         className={`${text_color} h-auto`}
                            >
                                {items.icon}
                            </Link>
                        })
                    }
                    {
                        isAuth && <div className={""}>
                            <ProfilBtn/>
                        </div>
                    }

                </div>
            </div>


            {/*items 2 web*/}
            <div className={'hidden md:flex justify-between content-between md:w-full'}>

                <div className={`flex  space-x-3 w-auto ${text_color} ml-5`}>
                    <Tap
                        props={
                            <div className={'flex space-x-2 items-center justify-center'}>
                                <GiHamburgerMenu style={{color: ''}} className={text_color}/>
                                <h1 className={text_color}>
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

                <div className={'flex space-x-2 w-auto   '}>
                    {
                        navItems2.map((items, index) => {
                            return <div className={''} 
                            key={index}>
                                <Link href={items.route}

                                      className={currentRoute == items.route ? `font-extrabold md:text-[15px] text-[10px] ${text_color}` : `font-light md:text-[15px] text-[12px] ${text_color}`}
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

                                  className={currentRoute == items.route ? `font-extrabold md:text-[15px] text-[10px] ${text_color}` : `  font-light md:text-[15px] text-[12px] ${text_color}`}
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