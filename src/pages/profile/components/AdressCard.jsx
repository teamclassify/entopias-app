import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

function AdressCard({ name, address }) {

    const [aceptado, setAceptado] = useState(false);

    const handleChange = (e) => {
        setAceptado(e.target.checked);
    };

    return (
        <div className="border-1 border-[#C6CCD5] h-20 p-3">
            <div className="flex flex-row w-full h-full justify-between">
                <div className="w-[95%] flex flex-col justify-between">
                    <div className="flex flex-row ">
                        <p className="w-24 truncate">{name}</p>
                        <label className="flex items-center gap-2 text-xs">

                            <input
                                type="checkbox"
                                checked={aceptado}
                                onChange={handleChange}
                                className="w-3 h-3"
                            />
                            Establecer como mi dirección
                        </label>
                    </div>
                    <p className="text-sm text-[#737373]">{address}</p>
                </div>
                <div className="w-[5%] flex justify-end">
                    <FiMoreVertical />
                </div>
            </div>
        </div>
    );
}

export default AdressCard;