import "../globals.css";
import NavBar from "@/app/(cover_page)/components/NavBar";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (


        <div className={``}>

        <NavBar />
        {children}

        </div>

    );
}
