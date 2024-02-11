"use client"
import Image from "next/image";
import {Input} from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons";
import {Button} from "@/components/ui/button";
export default function Home() {
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
                <Button className={'bg-buttonColor text-[20px]'}
                        size={'lg'}
                >
                    S'inscrire maintenant!
                </Button>
            </div>

            {/*search par*/}
            <div className={'md:block hidden ml-[30px]'}>
                <div className={'flex space-x-2'}>
                    <Input className={'md:w-[500px] bg-white '}
                           placeholder={'Trouver un Produit'}

                    />
                        <div>
                            <FaSearch className={'w-[30px] h-[30px] '} color={'black'}/>
                        </div>
                </div>
            </div>
        </div>
        <div>
            page de garde
        </div>

    </main>
  );
}
