"use client"
import Image from "next/image";
import {Input} from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import {Button} from "@/components/ui/button";
import {useState} from "react";

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
            setResults([]);
        }

    };
  return (
    <main className="">
        {/* cover page*/}
        <div className={'bg-coverPageMobBg md:bg-coverPageWebBg bg-cover bg-fixed top-0 bg-no-repeat w-full h-screen'}>
            <div className={'text-[20px] w-auto font-medium md:text-[30px] text-white pt-[48%] md:pt-[15%] md:w-[850px] ml-8'}>
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
            <div className={'md:block hidden ml-[30px]'}>
                <div className={'flex space-x-2 bg-white h-[50px] w-[600px] rounded-[20px] px-3'}>
                    <input
                        className={'md:w-[450px] h-9 mt-2 ml-2 bg-white outline-0 border-0 focus:border-0 focus:outline-0 '}
                        placeholder={'Trouver un Produit'}
                        type="text"
                        value={query}
                        onChange={handleChange}

                    />
                    <div className={'bg-buttonColor p-3  w-[100px] my-1 rounded-[20px] flex space-x-2'}>
                        <FaSearch className={'w-[15px] h-[15px] '} color={'white'}/>
                        <h1 className={'text-[18px] text-white mt-[-5px]'}>search</h1>
                    </div>
                </div>
                <div className={`${actif ? 'block bg-white w-[600px] p-5 rounded-[20px] h-auto mt-3' : 'hidden'} `}>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>{result}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
        <div>
            page de garde
        </div>

    </main>
  );
}
