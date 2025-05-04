import useUser from "@/hooks/useUser";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";

function ProfileMenu({ page }) {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const { logout } = useUser();

  return (
    <div className="w-full">
      <h3 className="">{t("profile.account.title")}</h3>
      <hr className="my-4" />
      <ul className="flex gap-2 flex-col w-full text-gray-500">
        <li
          onClick={() => setLocation("/perfil/inicio")}
          className={`flex justify-between cursor-pointer hover:bg-gray-100 p-1 rounded ${
            page === "inicio" ? "bg-gray-100" : ""
          }`}
        >
          <span>{t("profile.title")}</span>
          <ChevronRight />
        </li>
        <li
          onClick={() => setLocation("/perfil/direcciones")}
          className={`flex justify-between cursor-pointer hover:bg-gray-100 p-1 rounded ${
            page === "direcciones" ? "bg-gray-100" : ""
          }`}
        >
          <span>{t("profile.address.title")}</span>
          <ChevronRight />
        </li>
        <li
          onClick={() => setLocation("/perfil/historial")}
          className={`flex justify-between cursor-pointer hover:bg-gray-100 p-1 rounded ${
            page === "historial" ? "bg-gray-100" : ""
          }`}
        >
          <span>{t("profile.orders.title")}</span>
          <ChevronRight />
        </li>
        <li
          onClick={logout}
          className={`flex justify-between cursor-pointer hover:bg-gray-100 p-1 rounded ${
            page === "" ? "bg-gray-100" : ""
          }`}
        >
          <span>{t("homePage.navigation.logout")}</span>
        </li>
      </ul>
    </div>
  );
}

export default ProfileMenu;
