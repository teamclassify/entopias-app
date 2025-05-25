import { MapPin } from "lucide-react";

export default function Message() {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <MapPin size={64} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No tienes una dirección guardada</h2>
        <p className="text-gray-500 max-w-md">
          ¡Crea una direccion para poder realizar tu compra!
        </p>
      </div>
    );
}
