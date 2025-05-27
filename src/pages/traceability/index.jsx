import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar1Icon,
  ClockAlertIcon,
  CoffeeIcon,
  MapIcon,
  ThermometerIcon,
} from "lucide-react";
import { useLocation, useParams } from "wouter";
import ProductsBatchService from "../../services/api/ProductsBatch";
import formatDate from "../../utils/formatDate";

function Traceability() {
  const [, setLocation] = useLocation();

  const params = useParams();
  const { id } = params;

  const { data, isLoading } = useQuery({
    queryKey: ["origin-product", id],
    queryFn: () => (id ? ProductsBatchService.getById({ id }) : null),
    enabled: !!id,
  });

  console.log("data", data);

  if (!isLoading && !data?.data) {
    setLocation("/not-found");
  }

  return (
    <DefaultLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Trazabilidad del Café</h2>
        <p>Conoce el origen y proceso de tu café</p>
      </div>

      {isLoading ? (
        <>
          <div className="max-w-4xl mx-auto p-10 bg-white rounded-lg border">
            <div className="mb-8 text-center">
              <h3 className="text-lg font-bold">Cargando información...</h3>
            </div>
            <div className="flex justify-center">
              <img
                className="w-full max-w-[200px] h-auto rounded-lg mb-4 mx-auto"
                src="https://archive.org/download/placeholder-image//placeholder-image.jpg"
                alt="Cargando..."
              />
            </div>
            <div className="text-center">
              <p className="text-gray-600">Por favor, espera un momento.</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-4xl mx-auto p-10 bg-white rounded-lg border">
            <div className="mb-8 text-center">
              <h3 className="text-lg font-bold">{data?.data?.product?.name}</h3>
              <p className="mb-4">Lote: #{data?.data?.id}</p>
              <img
                className="w-full max-w-[200px] h-auto rounded-lg mb-4 mx-auto"
                src={
                  data?.data?.product?.photos[0]?.url ||
                  "https://archive.org/download/placeholder-image//placeholder-image.jpg"
                }
                alt=""
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2">
                  <MapIcon className="inline-block mr-1" />
                  <span>Origen</span>
                </h4>

                <div className="pl-4">
                  <p className="mb-2">
                    <span className="text-sm text-gray-600 block">País</span>
                    {data?.data?.producer?.country}
                  </p>

                  <p className="mb-2">
                    <span className="text-sm text-gray-600 block">Región</span>
                    {data?.data?.producer?.state}
                  </p>

                  <p className="mb-2">
                    <span className="text-sm text-gray-600 block">Finca</span>
                    {data?.data?.producer?.farm}
                  </p>

                  <p className="mb-2">
                    <span className="text-sm text-gray-600 block">
                      Productor
                    </span>
                    {data?.data?.producer?.name}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2">
                  <CoffeeIcon className="inline-block mr-1" />
                  <span>Características</span>
                </h4>

                <div className="pl-4">
                  <p className="mb-2">
                    <span className="text-sm text-gray-600 block">
                      Notas aromaticas
                    </span>
                    {data?.data?.aromaticNotes}
                  </p>
                  <p className="mb-2">
                    <span className="text-sm text-gray-600 block">
                      Tipo de tostado
                    </span>
                    {data?.data?.roastedType}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-10 bg-white  rounded-lg mt-8 border">
            <h4 className="text-lg font-bold mb-4">
              <Calendar1Icon className="inline-block mr-1" />
              <span>Fechas Importantes</span>
            </h4>

            <ul className="pl-6">
              <li className="flex items-center mb-4">
                <ThermometerIcon className="inline-block mr-1" />
                <p className="mb-2">
                  <span className="text-sm text-gray-600 block">Tueste</span>
                  {formatDate(
                    new Date(data?.data?.roastedDate).getTime() / 1000
                  )}
                </p>
              </li>

              <li className="flex items-center mb-4">
                <ClockAlertIcon className="inline-block mr-1" />
                <p className="mb-2">
                  <span className="text-sm text-gray-600 block">
                    Vencimiento
                  </span>
                  {formatDate(
                    new Date(data?.data?.expirationDate).getTime() / 1000
                  )}
                </p>
              </li>
            </ul>
          </div>
        </>
      )}
    </DefaultLayout>
  );
}

export default Traceability;
