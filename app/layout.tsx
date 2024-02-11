import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DevisBtn from "@/components/DevisBtn";

const josefin = Josefin_Sans({
  subsets: ["latin"] ,
  weight: [
    "100" , "200" , "300" , "400" , "500" , "600" , "700"
  ],
  style: ["italic", "normal"]
});

export const metadata: Metadata = {
  title: "SeBcO TOGO",
  description: "Sebco togo est une plateforme ecommerce spécialisé dans la vente des matériaux de construction",
    icons: [
      {
        url: '/icons/logo.svg',
        href: '/icons/logo.svg'
      }
    ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">

      <body className={`${josefin.className} bg-primaryColor `}>

      <NavBar />

      <DevisBtn />

        {children}

      <Footer/>
      </body>

    </html>
  );
}
