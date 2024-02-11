import React from 'react';
import {FcRules} from "react-icons/fc";


function DevisBtn() {
    return (
        <div className={' md:hidden fixed bottom-10 right-5 '}>
            <button className={'rounded-full p-3 bg-buttonColor w-[50px] h-[50px]'} >
                 <FcRules   className={'h-[24px] w-[24px]'}/>

            </button>
        </div>
    );
}

export default DevisBtn;