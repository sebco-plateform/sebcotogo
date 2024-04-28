'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { Api } from '@/api/Api';
import { ArticleModel } from '@/app/models/ArticleModel';

const SearchNav = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ArticleModel[]>([]);
    const [actif, setActif] = useState(false);

    const [articlesData, setArticlesData] = useState<ArticleModel[]>([])

    useEffect(()=> {
        Api.getAll('article/all').then((data) => {
            
            setArticlesData(data)
        })
    }, [])

    const handleChange = (e: any) => {
        const searchTerm = e.target.value;
        if(searchTerm.trim() !== '') {
            setActif(true)
            setQuery(searchTerm);
            // Simulation d'une recherche avec un tableau de données statique
            const filteredResults = articlesData.filter(item =>
                item.articleName.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className={'md:block hidden absolute left-[15%] top-3'}>
        <div
            className={'flex space-x-2 bg-white border-2 border-black h-[50px] w-[480px] rounded-[20px] px-3'}>
            <form>
                <input
                    className={'md:w-[320px] h-9 mt-2 ml-2 bg-white text-black outline-0 border-0 focus:border-0 focus:outline-0 '}
                    placeholder={'Trouver un Produit'}
                    type="text"
                    value={query}
                    onChange={handleChange}

                />
            </form>

            <button className={'bg-buttonColor p-3  w-[100px] my-1 rounded-[20px] flex space-x-2'}
                    onClick={handleChange}
                    >
                <FaSearch className={'w-[15px] h-[15px] '} color={'white'}/>
                <h1 className={'text-[18px] text-white mt-[-5px]'}>search</h1>
            </button>
        </div>

        <div className={`${actif ? 'block text-black bg-white w-[500px] p-5 rounded-[20px] h-auto mt-5' : 'hidden'} `}>
            <ul className={"flex flex-col space-y-5"}>
                {results.map((result, index) => (
                    <li key={index}>
                        <Link className="hover:text-blue-600  hover:pointer font-bold text-[18px]" href={`/products/${result.id}`}>
                            {result.articleName}
                        </Link>
                        
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}

export default SearchNav;