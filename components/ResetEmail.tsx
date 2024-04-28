import { Html, Head, Tailwind, Body, Container, Img, Link, Preview, Section, Text } from "@react-email/components";
import React from "react";
import Image from "next/image";

interface DropboxResetPasswordEmailProps {
    otp?: string;

}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

const RestEmail = ({ otp }: DropboxResetPasswordEmailProps) => (
    <Html>
        <Head />
        <Preview>SebcoTogo OTP code</Preview>
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            brand: "#007291",
                        },
                    },
                },
            }}
        >
        <Body className="bg-gray-100 flex items-center justify-center-center p-10">
            <Container className="bg-white border border-gray-200 flex flex-col items-center rounded-xl justify-center p-3 ">
                {/*<Img src={"/public/icons/SEBCO TOGO 3.png"}
                      alt={""}
                      width={'200'}
                      height={'200'}
                      className={"bg-cover self-center bg-center"}
                />*/}

                <Section className={"w-full flex flex-col space-y-10 mt-10 "}>
                    <Text className={"text-center"}>Entrez le code suivant pour réinitialiser votre mot de passe.</Text>

                    <Section className={"w-auto font-bold text-xl py-2 px-5  bg-cyan-500 text-white"}>{otp}</Section>

                    <Text className={"font-bold text-center text-red-600 text-md"}>NE PARTAGEZ PAS CE CODE</Text>
                </Section>
            </Container>
        </Body>
        </Tailwind>
    </Html>
);

RestEmail.PreviewProps = {
};

export default RestEmail;
