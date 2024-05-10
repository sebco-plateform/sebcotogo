import NavbarAdmin from "@/app/(amdin)/componnents/NavbarAdmin";
import SideBar from "@/app/(amdin)/componnents/SideBar";


export default function AdminLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div >
            <SideBar />
            <NavbarAdmin />

            <div className="ml-[20%] ">
                {children}
            </div>

        </div>

    );
}
