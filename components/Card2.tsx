'use client'
import {Button} from "@/components/ui/button";

const Card2 = () => {
    return (
        <div
            className={'bg-white rounded-[15px] w-[200px] p-3 h-[250px] flex flex-col items-center justify-center'}>
            {/*image*/}
            <img src={'/images/cimco 2.svg'} className={'h-[150px]'}/>
            {/*name*/}
            <h1 className={'font-bold'}>fer de 10</h1>
            {/*price*/}
            <h1 className={'font-light'}>2500 TTC</h1>

            {/*button*/}
            <Button variant={'default'} size={'lg'} type={'button'} className={'font-bold bg-buttonColor mt-3'}>
                Ajouter
            </Button>
        </div>

    );
}

export default Card2;