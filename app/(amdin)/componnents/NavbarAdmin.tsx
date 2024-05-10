"use client"
import Link from "next/link";
import Image from "next/image";
import { DropdownMenuDemoAdmin } from "./DropDwonMenuAdmin";
import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "@/redux/features/auth-slice";
import {useEffect, useState} from "react";
import {Api} from "@/api/Api";
import {RootState} from "@/redux/store";
import {Skeleton} from "@/components/ui/skeleton";

const NavbarAdmin = () => {
    const route = useRouter();
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const uid = useSelector((state: RootState) => state.auth.value.uid);
    const isAuth = useSelector((state: RootState) => state. auth.value.isAuth);

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        if(isAuth) {
            Api.getAll(`user/single/${uid}`).then((value:any) => {
                setUserName(value.firstName);
            });
        }

        setLoading(false)
    }, []);
    return (
        <header className={"bg-white h-[50px] items-center justify-between content-between pr-5 pl-[20%] w-full flex"}>

            {/*items*/}

            <div className={'flex space-x-5 ml-[50px]'}>
                <Link href={"/"}
                    className={' text-[20px] mt-2.5 text-blue-600 font-bold'}>
                            Acceuil
                        </Link>
                   
            </div>

            {/*compte*/}

            <DropdownMenuDemoAdmin
                    buttonTitle ={
                        loading ?
                            <Skeleton className={"h-[40px] w-[100px] rounded-md"}/>
                            :
                            <div className={' flex items-center space-x-3 w-auto p-1 '}>
                                <Image src={"/images/icons8-personne-homme-94.png"}
                                       alt="image profim"
                                       width={30}
                                       height={30}
                                       className="bg-center bg-cover rounded-full  border-2 border-black"/>

                                <h1 className={"text-cyan-600 font-bold"}>{userName}</h1>
                            </div>
                    }
                    childrens={
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                        size={"icon"}
                                        onClick={() => {
                                            route.push(`/admin/profiil`)
                                        }}
                                        className={'self-center flex space-x-2 w-full'}
                                >
                                    <User />
                                    <h2>Profil</h2>
                                </Button>
                            </DropdownMenuItem>

                            {/*delete Item*/}
                            <DropdownMenuItem>

                            <Button type="button"
                                        variant={'destructive'}
                                        size={'sm'}
                                        onClick={() => {
                                            dispatch(logOut());
                                            route.push("/")
                                        }}
                                        className="flex space-x-2"
                                >
                                    <LogOut  className=""/>
                                    <h2>Se déconnecter</h2>
                                </Button>
                            </DropdownMenuItem>

                        </DropdownMenuGroup>

                    }/>

        </header>
    );
}

export default NavbarAdmin;