/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        EMAISERVICEID:'service_t7in95j',
        EMAILTEMPLETEID:'template_do2efd3',
        EMAILPUBLICKEY:'BO2zMVOs_vdFpQCUc',
        API_URL: 'https://sebco-api.vercel.app/', //'http://localhost:3001/' /*  */,
        GOOGLEMAP_API_KEY:'AIzaSyCyQ0LQ6XqiaXPRK2Wi_zssbLk2gSaiQfY',
        RESEND_API: "re_K2R6ogGE_8k43NsHdZkth7SUjyTbVTrVy",
        KKIAPAY_API: "eff95894c4bf706ff11ca8541c63da3bd59103d3"
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
};

export default nextConfig;
