import { Search } from "lucide-react"

function ErrorProduct(){
  return (
  <div className="flex flex-col items-center justify-center text-center py-20">
        <Search size={64} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No hay productos por ahora disponible</h2>
        <p className="text-gray-500 max-w-md">
          ¡Vuelve pronto! Estamos trabajando para ofrecerte los mejores productos.
        </p>
      </div>
)
}

export default ErrorProduct;