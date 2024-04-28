"use client"
import ConfirmationEmail from "@/components/ConfirmationEmail";
import {resend} from "@/lib/resources";
import {useEffect, useState} from "react";
const Test = () => {
    const [ok, setOk] = useState(false)


    return (
        <div className={' mt-[35%] md:mt-[10%] px-3 md:px-20 flex flex-col items-center justify-center'}>
            <button type={"button"} onClick={ async () => {
                await fetch(`/api/send`, {
                    //mode: 'no-cors',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: "tiassousylvain6120@gmail.com"}),
                }).then((val)  => {

                    if(val.ok) {
                        console.log(val)
                    }
                });
            } }>click me</button>
        </div>
    );
}

export default Test;