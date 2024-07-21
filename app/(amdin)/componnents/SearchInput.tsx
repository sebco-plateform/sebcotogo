"use client"

import { searchFunction } from "@/lib/utils";
import { Input } from "antd";
import { Search } from "lucide-react";

interface Props {
    query: any;
    setQuery: any;
    data: any[];
    setResults: any;
    palceholder: string;
    element: string
}


const SearchInput = ({query, setQuery, data, setResults, palceholder, element}: Props) => {
    return(
        <div className="flex items-center justify-center my-5">
                <div className="flex space-x-3 items-center">
                    <Input className="md:w-[300px] w-[250px] "
                        placeholder={palceholder}
                        value={query}
                        onChange={(e) => searchFunction(setQuery, data, element, setResults, e)}
                    />
                    {/*<Search className="text-blue-600" />*/}
                </div>

            </div>
    );
}
export default SearchInput;