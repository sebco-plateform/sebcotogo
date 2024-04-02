"use client"
import { useEffect, useRef } from 'react';

const Test = () => {
    const embedRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.fedapay.com/checkout.js?v=1.1.7';
        // @ts-nocheck
        script.onload = () => {
            // @ts-ignore
          window.FedaPay.init({
            public_key: 'pk_sandbox_iMo6GhIxyKT7SdFWKD-BgHYR',
            environment: "sandbox",
            data_widget_image: "",
            transaction: {
              amount: 1000,
              description: 'Acheter mon produit'
            },
            customer: {
              email: 'johndoe@gmail.com',
              lastname: 'Doe',
            },
            container: embedRef.current
          });
        };
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    return (
        <div className={' mt-[35%] md:mt-[10%] px-3 md:px-20 flex flex-col items-center justify-center'}>
            <div ref={embedRef} style={{ width: '500px', height: '420px' }} />
        </div>
    );
}

export default Test;