/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',

    env:{
        EMAISERVICEID:'service_t7in95j',
        EMAILTEMPLETEID:'template_do2efd3',
        EMAILPUBLICKEY:'BO2zMVOs_vdFpQCUc',
        API_URL: 'https://sebco-api.vercel.app/', //'http://localhost:3001/' /*  */,
        GOOGLEMAP_API_KEY:'AIzaSyCyQ0LQ6XqiaXPRK2Wi_zssbLk2gSaiQfY',
        RESEND_API: "re_K2R6ogGE_8k43NsHdZkth7SUjyTbVTrVy",
        KKIAPAY_API: "eff95894c4bf706ff11ca8541c63da3bd59103d3",
        KKIAPAY_API_SANDBOX: "67d76270f1d911ee893a11aa70730d95",
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "djridjkwu",
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
    transpilePackages: ['@mui/x-charts'],
};

export default nextConfig;
