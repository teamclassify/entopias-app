import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon, XIcon } from "lucide-react";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProfileCard from "./components/ProfileCard";
import ProfileMenu from "./components/ProfileMenu";
import InfoUser from "./components/InfoUser";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";


function Menu() {
    return (
        <Drawer direction="left">
            <DrawerTrigger>
                <MenuIcon />
            </DrawerTrigger>
            <DrawerContent className="p-4">
                <DrawerClose className="absolute top-4 right-4">
                    <XIcon />
                </DrawerClose>
                <nav>
                    <ProfileMenu />
                </nav>
            </DrawerContent>
        </Drawer>
    );
}

function Profile() {
    const [location] = useLocation();
    const [page, setPage] = useState("inicio");

    // useEffect(() => {
    //     const page = location.split("/")[2];
    //     setPage(
    //         page === "direcciones"
    //             ? location.split("/")[3] === "nueva"
    //                 ? "nueva"
    //                 : "direcciones"
    //             : page
    //     );
    // }, [location]);

    return (
        <DefaultLayout>
            <div className="lg:hidden">
                <Menu />
            </div>
            <div className="grid lg:grid-cols-[1.2fr_3fr] lg:w-full gap-8">
                <div className="lg:flex flex-col w-full gap-8 hidden">
                    <ProfileCard />
                    <ProfileMenu page={page} onChange={(value) => setPage(value)} />
                </div>
                <div className="w-full">
                    {page === "inicio" && <InfoUser/>}
                </div>
            </div>

        </DefaultLayout>
    );
}

export default Profile;