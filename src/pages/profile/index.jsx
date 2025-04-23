import DefaultLayout from "@/components/layouts/DefaultLayout";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import InfoUser from "./components/InfoUser";
import ProfileCard from "./components/ProfileCard";
import ProfileMenu from "./components/ProfileMenu";
import EditUser from "./edit_user";
import NewAddress from "./new_address";
import UserAddress from "./user_address";

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
  const [location, navigate] = useLocation();
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

  useEffect(() => {
    const current = location.split("/")[2] || "inicio";
    setPage(current);
  }, [location]);

  const handleChangePage = (value) => {
    navigate(`/perfil/${value}`);
    setPage(value);
  };

  return (
    <DefaultLayout>
      <div className="lg:hidden">
        <Menu />
      </div>
      <div className="grid lg:grid-cols-[1.2fr_3fr] lg:w-full gap-8">
        <div className="lg:flex flex-col w-full gap-8 hidden">
          <ProfileCard />
          <ProfileMenu page={page} onChange={handleChangePage} />
        </div>
        <div className="w-full">
          {page === "inicio" && <InfoUser onChange={handleChangePage} />}
          {page === "editar" && <EditUser onChange={handleChangePage} />}
          {page === "direcciones" && (
            <UserAddress onChange={handleChangePage} />
          )}
          {page === "nueva-direccion" && (
            <NewAddress onChange={handleChangePage} />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Profile;
