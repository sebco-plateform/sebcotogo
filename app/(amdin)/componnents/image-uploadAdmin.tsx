"use client"

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {ImagePlus, Trash} from "lucide-react";
import Image from "next/image";
import {CldUploadWidget} from "next-cloudinary";

interface ImageUploadProps {
    disable?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string;
}
const ImageUpload = ({
                         disable,
                         onChange,
                         onRemove,
                         value,
                     }: ImageUploadProps) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if (!isMounted) {
        return null;
    }
    return (
        <div>

             <CldUploadWidget
                              uploadPreset={"nnvz35ft"}
                              options={{
                                  maxFiles: 1
                              }}
                              onUpload={onUpload}
             >
                 {({open}) => {
                     const onClick = () => {
                         open();
                     }

                     return (
                         <div className={' rounded-[15px] border border-solid border-black mb-4 flex flex-col items-center gap-4'}>

                         <div
                             className={' flex relative w-[200px] h-[200px] rounded-md overflow-hidden'}>
                             <div className={'z-10 absolute top-2 right-2'}>
                                 <Button type={'button'} onClick={() => onRemove(value)} variant={'destructive'}
                                         size={'icon'}
                                         className={value == "" ? "hidden" :''}
                                 >
                                     <Trash className={'h-4 w-4'}/>
                                 </Button>
                             </div>
                             <Image src={value} alt={'image'} layout={'fill'} fill className={value == "" ? "hidden" : 'object-cover'}/>
                             <Button
                                 type={'button'}
                                 disabled={disable}
                                 variant={'outline'}
                                 onClick={onClick}
                                 className={value != "" ? " bg-transparent self-center mx-2 absolute" : 'self-center mx-2'}
                             >
                                 <ImagePlus className={'w-4 h-4 mr-2'}/>
                                 Upload an Image
                             </Button>
                         </div>

                     </div>

                 )
                 }}
             </CldUploadWidget>
        </div>
    )
}

export default ImageUpload;