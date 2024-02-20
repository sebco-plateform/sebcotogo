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
const navItemWeb1 = [
    {
        name: "Demander un Devis",
        icon: "",
        route: "/",
    },

    {
        name: "Se Connecter",
        icon: <FcBusinessman  size={24} className={'h-[24px] w-[24px] '}/>,
        route: "/",
    },

    {
        name: "S'inscrire",
        icon: "",
        route: "/",
    },

    {
        name: "",
        icon: (<Badge count={5}> <IoIosNotifications  className={'h-[24px] w-[24px] '}/> </Badge>),

        route: "",
    },

    {
        name: "",
        icon: (<Badge count={5}> <TiShoppingCart  size={24} className={'h-[24px] w-[24px] '}/></Badge>) ,
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
        icon: <Dialogs color={'black'}  />,
    },
    /*<FaSearch  size={24} className={'h-[24px] w-[24px] '}/>*/
    {
        name: "profil",
        route: '/',
        icon: <FcBusinessman  size={24} className={'h-[24px] w-[24px] '}/>,
    },


    {
        name: "Notification",
        route: '/',
        icon: (<Badge count={5}> <IoIosNotifications  className={'h-[24px] w-[24px] '}/> </Badge>),
    },

    {
        name: "Panier",
        route: '/',
        icon: (<Badge count={5}> <TiShoppingCart  size={24} className={'h-[24px] w-[24px] '}/></Badge>),
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


const mockData = [
    "Résultat 1",
    "Résultat 2",
    "Autre résultat",
    "Encore un résultat",
    "Dernier résultat"
];
function NavBar() {
    const [currentRoute, setCurrentRoute] = useState("");
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [actif, setActif] = useState(false);


    useEffect(() => {
        setCurrentRoute(window.location.pathname)
    }, []);

    const handleChange = (e: any) => {
        const searchTerm = e.target.value;
        if(searchTerm.trim() !== '') {
            setActif(true)
            setQuery(searchTerm);
            // Simulation d'une recherche avec un tableau de données statique
            const filteredResults = mockData.filter(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredResults);
        }
        else  {
            setActif(false)
            setQuery('');
            setResults([]);
        }

    };
    return (
        <nav className={'bg-white md:bg-transparent py-5 text-black absolute top-0 px-5 w-full'}>
            {/*items 1*/}
            <nav className={'flex justify-between'}>
                {/*image or bugger icone**/}

                {/*image*/}
                <div className={'hidden md:flex w-full'}>
                    <Image src={"/icons/logo.svg"} alt={"logo"} width={100} height={100} className={''} quality={100}/>
                </div>

                {/*searche bar*/}
                <div className={'md:block hidden absolute left-[15%] top-3'}>
                    <div
                        className={'flex space-x-2 bg-white border-2 border-black h-[50px] w-auto rounded-[20px] px-3'}>
                        <form>
                            <input
                                className={'md:w-[320px] h-9 mt-2 ml-2 bg-white outline-0 border-0 focus:border-0 focus:outline-0 '}
                                placeholder={'Trouver un Produit'}
                                type="text"
                                value={query}
                                onChange={handleChange}

                            />
                        </form>

                        <div className={'bg-buttonColor p-3  w-[100px] my-1 rounded-[20px] flex space-x-2'}>
                            <FaSearch className={'w-[15px] h-[15px] '} color={'white'}/>
                            <h1 className={'text-[18px] text-white mt-[-5px]'}>search</h1>
                        </div>
                    </div>

                    <div className={`${actif ? 'block bg-gray-100 w-[600px] p-5 rounded-[20px] h-auto mt-5' : 'hidden'} `}>
                        <ul>
                            {results.map((result, index) => (
                                <li key={index}>{result}</li>
                            ))}
                        </ul>
                    </div>
                </div>


                {/*icon responsive*/}
                <div className={'md:hidden w-full'}>
                    <Tap
                        props={
                            <div className={'flex space-x-2'}>
                                <GiHamburgerMenu style={{color: 'black'}} className={''}/>
                            </div>
                        }

                    />
                    {/*
                    <GiHamburgerMenu  size={24} className={'h-[24px] w-[24px]'}/>
                    */}

            </div>

            {/*Nav items2 web*/}
            <div className={'hidden  md:flex space-x-5 w-[800px] relative top-5'}>
                {
                    navItemWeb1.map((items, index) => {
                        return <Link href={items.route}
                                     key={index}
                                     className={' font-light md:text-[15px]'}
                        >
                            <div className={'flex '}>
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
                                     className={''}
                        >
                            {items.icon}
                        </Link>
                    })
                }
            </div>
        </nav>

    {/*items 2 web*/
    }
    <div className={'hidden md:flex justify-between md:w-full'}>

        <div className={'flex space-x-3 w-full  ml-5'}>
            <Tap
                props={
                    <div className={'flex space-x-2 text-black'}>
                        <GiHamburgerMenu style={{color: 'black'}} className={''}/>
                        <h1 className={'text-black'}>
                            Tous les catégories
                        </h1>

                    </div>
                }

            />
            {/*
                         <GiHamburgerMenu style={{color: 'white'}} size={24} className={'h-[24px] w-[24px]'}/>
                        <p className={'text-white'}>Tous les catégories</p>
                        */}
        </div>


        <div className={'flex space-x-2 w-[1000px]'}>
            {
                navItems2.map((items, index) => {
                    return <div className={''} key={index}>
                        <Link href={items.route}

                              className={currentRoute == items.route ? 'font-extrabold md:text-[15px] text-[10px] text-white' : '  font-light md:text-[15px] text-[12px] '}
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
                                  className={currentRoute == items.route ? 'font-extrabold md:text-[15px] text-[10px] text-white' : '  font-light md:text-[15px] text-[12px] '}
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