"use client"
import Image from "next/image";
import {Input} from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import Link from "next/link";
import CardArt1 from "@/components/CardArt1";
import Swipers from "@/components/Swiper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Card2 from "@/components/Card2";

//https://www.figma.com/file/OxGg10ukR3y8hpgB5OxCAe/sebco-plateforme?type=design&node-id=6-24&mode=design&t=pwROPYMC1jn54VaO-0
const mockData = [
    "Résultat 1",
    "Résultat 2",
    "Autre résultat",
    "Encore un résultat",
    "Dernier résultat"
];
export default function Home() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [actif, setActif] = useState(false);
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
    <main className="">
        {/* cover page*/}
        <div className={'bg-coverPageMobBg md:bg-coverPageWebBg bg-cover bg-containt bg-center bg-fixed top-0 bg-no-repeat w-full h-[500px]'}>
            <div className={'text-[20px] w-auto font-medium md:text-[30px] text-white pt-[30%] md:pt-[10%] md:w-[850px] ml-8'}>
                Bienvenue sur notre site
                dédié aux matériaux de construction, ou vous trouvérez de variété exceptionnelle de
                sable et de gravier pour donner vie à vos projets. Explorez notre sélection et façonnez
                vos idées avec des produits de qualité et un service fiable.
            </div>

            {/*button*/}
            <div className={'md:hidden flex ml-[25px]'}>
                <Button className={'bg-buttonColor text-[20px] mt-3'}
                        size={'lg'}
                >
                    S'inscrire maintenant!
                </Button>
            </div>

            {/*search par*/}
            <div className={'md:block hidden mt-10 ml-[30px]'}>
                <div className={'flex space-x-2 bg-white h-[50px] w-[600px] rounded-[20px] px-3'}>
                    <form>
                        <input
                            className={'md:w-[450px] h-9  my-3 ml-2 bg-white outline-0 border-0 focus:border-0 focus:outline-0 '}
                            placeholder={'Trouver un Produit'}
                            type="text"
                            value={query}
                            onChange={handleChange}

                        />
                    </form>

                    <button className={'bg-buttonColor p-3  w-[100px] my-1 rounded-[20px] flex space-x-2'}>
                        <FaSearch className={'w-[15px] h-[15px] '} color={'white'}/>
                        <h1 className={'text-[18px] text-white mt-[-5px]'}>search</h1>
                    </button>
                </div>
                <div className={`${actif ? 'block bg-white w-[600px] p-5 rounded-[20px] h-auto mt-3 absolute' : 'hidden'} `}>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>
                                <Link href={'/product/1'}>
                                    {result}
                                </Link>
                            
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>





        <div className={'mt-10 md:px-20 pl-x'}>

            <h1 className={'text-[30px] font-medium text-black'}>
                Articles
            </h1>

            {/*articles*/}
            <Swipers />





            {/*categori serction*/}
            <section className={'mt-[50px]'}>
                <h1  className={'text-[30px] font-medium text-black'}>Catégories</h1>


                <Tabs defaultValue="acier" className="w-auto mt-10">
                    <TabsList>
                        <TabsTrigger value="acier">acier</TabsTrigger>
                        <TabsTrigger value="cimant">cimant</TabsTrigger>
                        <TabsTrigger value="agérégat">agérégat</TabsTrigger>
                    </TabsList>
                    <TabsContent value="acier" className={' flex items-center justify-center flex-col space-y-3 md:grid md:grid-cols-4 md:gap-2'}>
                        <Card2 />
                        <Card2 />
                        <Card2 />
                        <Card2 />
                    </TabsContent>
                    <TabsContent value="cimant" className={'flex items-center justify-center flex-col space-y-3 md:grid md:grid-cols-4 md:gap-2'}>
                        <Card2 />
                        <Card2 />
                        <Card2 />
                    </TabsContent>
                    <TabsContent value="agérégat" className={'flex items-center justify-center flex-col space-y-3 md:grid md:grid-cols-4 md:gap-2'}>
                        <Card2 />
                        <Card2 />
                    </TabsContent>
                </Tabs>

            </section>

        </div>

    </main>
  );
}
