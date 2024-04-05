
import NavBar from "@/components/NavBar";
import "../globals.css";


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (


        <div className={``}>
        <NavBar style= "bg-white  py-2 text-black fixed top-0 px-5 w-full" text_color="text-black" />
        {children}

        </div>

    );
}
