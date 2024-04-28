import NavBar from "@/components/NavBar";
import "../globals.css";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (


        <div className={``}>

            <NavBar style="text-white fixed bg-blackOpacity py-2 top-0 px-5 w-full" text_color="text-white"/>
            {children}

        </div>

    );
}
