"use client"

const About = () => {
    return(
        <div className={"flex flex-col space-y-10 mt-20 md:mt-28 px-3 md:px-20 mb-10 "}>
            <div className={"flex flex-col space-y-3"}>
                <div className={"flex flex-col w-auto"}>
                    <h1 className={"font-bold text-[35px]"}>À propos de nous</h1>
                    <hr className={"h-2 w-[200px] font-bold bg-cyan-600"}/>
                </div>

                <div className={"w-full md:w-[600px]"}>
                    Bienvenue sur <span className={"font-bold text-orange-600"}>SeBcO TOGO</span> !

                    Nous sommes passionnés par la construction et
                    l'amélioration de votre espace de vie. Chez
                    <span className={"font-bold text-orange-600"}>SeBcO TOGO</span>, nous nous efforçons de fournir
                    des matériaux de construction de haute qualité pour vos
                    projets, grands ou petits.
                </div>
            </div>

            <div className={"flex flex-col space-y-3"}>
                <div className={"flex flex-col w-auto"}>
                    <h1 className={"font-bold text-[35px]"}>
                        Notre Histoire
                    </h1>
                    <hr className={"h-2 w-[200px] font-bold bg-cyan-600"}/>
                    <div className={"w-full md:w-[600px]"}>
                        Depuis 2023, <span className={"font-bold text-orange-600"}>SeBcO TOGO</span>] s'est
                        engagé à fournir des matériaux de construction de qualité
                        supérieure pour répondre aux besoins des projets de
                        construction à travers le TOGO. Nous établissons une réputation solide
                        en tant que fournisseur fiable et de confiance dans l'industrie de la construction.
                    </div>
                </div>
            </div>

            <div className={"flex flex-col space-y-3"}>
                <div className={"flex flex-col w-auto"}>
                    <h1 className={"font-bold text-[35px]"}>
                        Notre Mission
                    </h1>
                    <hr className={"h-2 w-[200px] font-bold bg-cyan-600"}/>
                    <div className={"w-full md:w-[600px]"}>
                        Notre mission chez <span className={"font-bold text-orange-600"}>SeBcO TOGO</span> est de
                        simplifier le processus de construction en fournissant
                        des matériaux de construction de qualité supérieure,
                        une expertise inégalée et un service client exceptionnel.
                        Nous croyons fermement que chaque projet, qu'il s'agisse
                        d'une simple rénovation ou d'une construction à grande
                        échelle, mérite les meilleurs matériaux et le meilleur
                        service possible.


                    </div>
                </div>
            </div>


            <div className={"flex flex-col space-y-3"}>
                <div className={"flex flex-col w-auto"}>
                    <h1 className={"font-bold text-[35px]"}>
                        Nos Produits
                    </h1>
                    <hr className={"h-2 w-[200px] font-bold bg-cyan-600"}/>
                    <div className={"w-full md:w-[600px]"}>
                        Chez <span className={"font-bold text-orange-600"}>SeBcO TOGO</span>
                        , nous nous engageons à
                        offrir une vaste sélection de matériaux de construction de
                        première qualité. Que vous ayez besoin de matériaux de
                        construction traditionnels comme le béton, le bois et la
                        brique, ou que vous recherchiez des solutions innovantes
                        telles que les matériaux de construction
                        écologiques, nous avons ce qu'il vous faut.
                    </div>
                </div>
            </div>


            <div className={"flex flex-col space-y-3"}>
                <div className={"flex flex-col w-auto"}>
                    <h1 className={"font-bold text-[35px]"}>
                        Notre Équipe
                    </h1>
                    <hr className={"h-2 w-[200px] font-bold bg-cyan-600"}/>
                    <div className={"w-full md:w-[600px]"}>

                        Notre équipe chez <span className={"font-bold text-orange-600"}>SeBcO TOGO</span>
                        est composée d'experts passionnés par l'industrie
                        de la construction. De notre équipe de service client
                        dévouée à nos spécialistes en produits, nous sommes là pour vous fournir
                        l'assistance et les conseils dont vous avez besoin à chaque étape de votre projet.
                    </div>
                </div>
            </div>
        </div>
    );
}
export default About;