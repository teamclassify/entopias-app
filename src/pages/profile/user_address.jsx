import useUser from "@/hooks/useUser";
import AdressCard from "./components/AdressCard";

const usuarios = [
    { nombre: "Luisa 1", direccion: "Av. Siempre Viva 123, Lima, Perú" },
    { nombre: "Luisa Casa", direccion: "Calle Falsa 456, Bogotá, Colombia" },
    { nombre: "Luisa 2", direccion: "Carrera 9 No. 45-67, Medellín, Colombia" },
    { nombre: "Luisa Apt", direccion: "Rua das Flores 789, São Paulo, Brasil" },
];

function UserAddress() {
    const { user } = useUser();
    return (
        <div className="flex flex-col w-full gap-6">
            <div className="flex flex-row justify-between py-4">
                <p className="font-bold text-[20px]">Mis Direcciones</p>
                <button className="border-2 border-[#1C0B08] p-1 w-48 cursor-pointer"
                    onClick={() => onChange("nueva")}
                >Agregar Dirección</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {usuarios.map((usuario, index) => (
                    <AdressCard name={usuario.nombre} address={usuario.direccion}/>
                ))}
            </div>


        </div>
    );
}

export default UserAddress;