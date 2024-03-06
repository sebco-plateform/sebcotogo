'use client'
import Link from "next/link";


const CardArt1 = () => {

    return <Link href={'/products/1'}>
        <div className={'flex flex-col md:flex-row md:space-x-5 md:p-3 p-1 w-auto md:w-[486px] h-auto bg-white rounded-[15px]'}>
            {/*image*/}
            <div className={"w-auto self-center"}>
                <img
                    src={'/images/cimco 2.svg'}
                    alt={'image'}
                    className={'w-[200px] h-[200px] self-center'}
                />
            </div>

            <div className={'flex flex-col space-y-5 mt-3'}>
                {/*title*/}
                <h1 className={'font-bold text-[20px] text-center md:text-start'}>CIMCCO</h1>

                {/*description*/}
                <p className={'md:flex hidden font-light text-[15px]'}>
                    description dolor sit amet consectetur.
                    Et pretium pharetra cras non ridiculus gravida. Sit
                    nisl elit dignissim eu ante diam.
                    Tincidunt arcu rhoncus nisl aenean cras a.
                </p>

                <div className={' text-center md:text-start font-bold text-[20px] mt-5'}>
                    25000 <span className={'font-light text-[15px]'}>TTC</span>
                </div>
            </div>
        </div>
    </Link>
}

export default CardArt1;