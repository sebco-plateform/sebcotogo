'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {LogOut, User, History} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {logOut} from "@/redux/features/auth-slice";
import {FcBusinessman} from "react-icons/fc";
import React from "react";


const ProfilBtn = () => {
    const route = useRouter()
    const dispatch = useDispatch();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className={"h-[30px] w-[30px] flex items-center rounded-full  border-secondaryColor border-[4px]"}>
                    <FcBusinessman  size={24} className={'h-[24px] w-[24px] text-white'}/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>

                <DropdownMenuSeparator />


                <DropdownMenuItem>
                    <Button type={"button"}
                            size={"sm"}
                            variant={"outline"}
                            className={"w-full flex space-x-3 "}
                            onClick={() => {
                                route.push('/profil')
                            }}
                    >
                        <User/>
                        <h1>Profile</h1>
                    </Button>
                </DropdownMenuItem>

                {/*<DropdownMenuItem>
                    <Button type={"button"}
                            size={"sm"}
                            variant={"outline"}
                            className={"w-full flex space-x-3 "}
                            onClick={() => {
                                route.push('/history')
                            }}
                    >
                        <History/>
                        <h1>Historique</h1>
                    </Button>
                </DropdownMenuItem>*/}

                <DropdownMenuItem>
                    <Button type={"button"}
                            size={"sm"}
                            variant={"destructive"}
                            className={"w-full flex space-x-3 "}
                            onClick={() => {
                                dispatch(logOut());
                                route.push("/");
                            }}
                    >
                        <LogOut/>
                        <h1>Se Deconnecter</h1>
                    </Button>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>

    );
}
export default ProfilBtn;