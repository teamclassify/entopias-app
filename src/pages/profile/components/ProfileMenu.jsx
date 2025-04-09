
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";

function ProfileMenu({ page, onChange }) {

    const [, setLocation] = useLocation();

    return (
        <div className="w-full">
            <h3 className="">Mi cuenta</h3>
            <hr className="my-4" />
            <ul className="flex gap-2 flex-col w-full text-gray-500">
                <li
                    onClick={() => setLocation("/perfil/inicio")}
                    className={`flex justify-between cursor-pointer hover:bg-gray-100 p-1 rounded ${page === "inicio" ? "bg-gray-100" : ""
                        }`}
                >
                    <span>Mi perfil</span>
                    <ChevronRight />
                </li>
                <li
                    onClick={() => setLocation("/perfil/direcciones")}
                    className={`flex justify-between cursor-pointer hover:bg-gray-100 p-1 rounded ${page === "direcciones" ? "bg-gray-100" : ""
                        }`}
                >
                    <span>Mis direcciones</span>
                    <ChevronRight />
                </li>
                <li
                    onClick={() => setLocation("/perfil/direcciones")}
                    className={`flex justify-between cursor-pointer hover:bg-gray-100 p-1 rounded ${page === "" ? "bg-gray-100" : ""
                        }`}
                >
                    <span>Cerrar sesión</span>
                </li>

            </ul>
        </div>
    );
}

export default ProfileMenu;