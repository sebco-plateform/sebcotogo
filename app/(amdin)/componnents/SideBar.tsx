"use client"
import Image from "next/image"
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { HiSpeakerphone } from "react-icons/hi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { RiArticleFill, RiDashboard3Fill} from "react-icons/ri";
import { FaUsers, FaUserTie } from "react-icons/fa6";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import { MdOutlineSettingsSuggest } from "react-icons/md";

const links = [
    {
        name: "Dashboard",
        url: "/admin",
        icon: <RiDashboard3Fill className="w-[40px] h-[25px] " />
    },

    {
        name: "Clients",
        url: "/admin/customers",
        icon: <FaUsers className="w-[40px] h-[25px] "/>
    },

    {
        name: "Admins",
        url: "/admin/admins",
        icon: <FaUserTie  className="w-[40px] h-[25px] "/>
    },

    {
        name: "Promotions",
        url: "/admin/promotions",
        icon: <HiSpeakerphone className="w-[40px] h-[25px] " />
    },
    {
        name: "Commandes",
        url: "/admin/orders",
        icon: <BsFillCartCheckFill className="w-[40px] h-[25px] " />
    },

    {
        name: "Catégories",
        url: "/admin/categories",
        icon: <MdCategory className="w-[40px] h-[25px] " />
    },
    {
        name: "Caractéristique",
        url: "/admin/characteristics",
        icon: <MdDashboard className="w-[40px] h-[25px] " />
    },

    {
        name: "Articles",
        url: "/admin/products",
        icon: <RiArticleFill className="w-[40px] h-[25px] " />
    },

    {
        name: "Parametre",
        url: "/admin/settings",
        icon: <MdOutlineSettingsSuggest className="w-[40px] h-[25px] " />
    },

];
const SideBar = () => {

    const routePath = usePathname();
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            // Mettre à jour la date et l'heure chaque seconde
            setDateTime(new Date());
        }, 1000);

        // Nettoyer l'intervalle lors du démontage du composant
        return () => clearInterval(interval);
         // Récupère le jour du mois (1-31)

        // Récupère les secondes (0-59)
    }, []);


    return(
        <div className=" fixed left-0 h-screen bg-white w-[250px] flex flex-col space-y-3 items-center ">
             {/*logo*/}
             <div className={'mt-[20%] '}>
                <Image src={'/icons/logo.svg'}
                     alt={'logo'}
                     className={'bg-center bg-cover h-[100px] w-[150px] '}
                       width={100}
                       height={100}
                     />
            </div>

             {/*items*/}

             <div className={'flex flex-col space-y-5 ml-5 mt-[25%] '}>
                {
                    links.map((items, index) => {
                        return <Link href={items.url}
                                     key={index}
                                     className={` ${routePath == items.url ? 'font-bold text-blue-600 flex space-x-5 text-[18px] hover:text-blue-400' : 'hover:text-blue-400 text-[15px] text-gray-700 font-regular flex space-x-5'}`}>
                           <div>
                            {items.icon}
                        </div> 
                        <h1 className={""}>
                        {items.name}
                        </h1>
                        </Link>
                    })
                }
            </div>

            {/*date and hours*/}

            <div className={"absolute bottom-5 text-[20px] flex flex-col space-y-2 items-center text-red-600 font-bold "}>
                <h1>
                    {dateTime.toLocaleDateString()}


                </h1>
                <h1>
                    {dateTime.toLocaleTimeString()}

                </h1>
            </div>

        </div>
    )
}

export default SideBar;