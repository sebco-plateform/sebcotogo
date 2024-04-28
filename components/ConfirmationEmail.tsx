import { Html, Head, Body, Container, Img, Tailwind, Heading, Section, Text, Link,  Hr } from "@react-email/components";
import React from "react";

const ConfirmationEmail = () => {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

    return (
        <Html>
            <Head />
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
            <Body className="font-sans bg-white">
                <Container className="mx-auto p-5 bg-no-repeat bg-bottom" style={{ backgroundImage: `url("${baseUrl}/static/raycast-bg.png")` }}>
                    <Img src={`../../../public/icons/SEBCO TOGO 3.png`} width={48} height={48} alt="Raycast" />

                    <Text className={"font-bold"}>Bonjour</Text>

                    <Text>
                       Nous tenons à vous remercier pour votre
                       récente commande sur Sebcotogo. Nous sommes
                       ravis que vous ayez choisi notre site pour vos achats en ligne.
                   </Text>

                    <Text>
                        Votre commande sera traitée dans les plus brefs délais. Vous recevrez
                        un e-mail de confirmation dès que votre commande sera expédiée.
                    </Text>

                    <Text>
                        Si vous avez des questions concernant votre
                        commande ou si vous avez besoin d'une assistance supplémentaire, n'hésitez pas à nous contacter
                        à l'adresse e-mail suivante : sebcotogo@gmail.com.
                    </Text>

                    <Text>
                        Nous vous remercions encore une fois pour
                        votre confiance et votre soutien continu.
                    </Text>

                    <Text>
                        Cordialement,
                    </Text>
                    <Text>L'équipe de Sebcotogo</Text>
                </Container>
            </Body>
            </Tailwind>
        </Html>
    );
};

export default ConfirmationEmail;
