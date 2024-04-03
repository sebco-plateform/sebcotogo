"use client"
import { useEffect, useRef } from 'react';
import { useKKiaPay } from 'kkiapay-react';
const Test = () => {

        const { openKkiapayWidget, addKkiapayListener,     removeKkiapayListener
        } = useKKiaPay();

        function successHandler(response: any) {
            console.log(response);
        }

        function failureHandler(error: any) {
            console.log(error);
        }

        useEffect(() => {
            addKkiapayListener('success',successHandler)
            addKkiapayListener('failed', failureHandler)

            return () => {
                removeKkiapayListener('success')//,successHandler
                removeKkiapayListener('failed')//, failureHandler
            };
        }, [addKkiapayListener,removeKkiapayListener]);
        function open() {
            openKkiapayWidget({
                amount: 4000,
                fullname: "",
                api_key: "3cb8ff60f18711eeae665f935f4f8891",
                sandbox: true,
                email: "randomgail@gmail.com",
                phone: "97000000",
            });
        }


    return (
        <div className={' mt-[35%] md:mt-[10%] px-3 md:px-20 flex flex-col items-center justify-center'}>
            <button type={"button"} onClick={() => {
                open();
            } }>click me</button>
        </div>
    );
}

export default Test;