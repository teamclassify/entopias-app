import UploadImage from "@/components/base/UploadImage";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormUI,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3),
  type: z.string().min(3).max(255),
});

/*
  Component Form for adding or editing a product

  Props:
    - product?: object
    - onSubmit: function
    - onCancel: function
*/
function Form({ product, onSubmit, isPending = false }) {
  const [images, setImages] = useState([]);
  const [varieties, setVarieties] = useState([
    {
      weight: 0,
      price: 0,
      stock: 0,
    },
  ]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      photos: [],
      type: product?.type || "",
    },
  });

  useEffect(() => {
    if (product) {
      setImages(product?.photos.map((photo) => photo.url));
      setVarieties(product?.varieties || []);
    }
  }, [product]);

  const handleSubmit = (data) => {
    onSubmit({
      ...data,
      photos: images.map((image) => image.file ?? image),
      varieties: varieties,
    });
  };

  return (
      <div className="lg:flex gap-4">
        <FormUI {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 w-full"
          >
            <div className="bg-[#ECECEC] p-10">
              <div className="">
                <h3 className="text-lg font-semibold mb-2">
                  Información del producto
                </h3>
  
                <div className="w-full grid gap-4 h-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          El nombre del producto debe tener al menos 3 caracteres.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={4} />
                        </FormControl>
                        <FormDescription>
                          La descripción del producto debe tener al menos 3
                          caracteres.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <FormControl>
                          <FormItem>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <hr />
  
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Variedades</h3>
                      </div>
  
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setVarieties((prev) => {
                            const newVarieties = [...prev];
  
                            newVarieties.push({
                              weight: 0,
                              price: 0,
                              stock: 0,
                            });
  
                            return newVarieties;
                          });
                        }}
                        className="mb-2"
                      >
                        Agregar variedad
                      </Button>
                    </div>
  
                    {/* Lista de Variedades con un boton para editar o eliminar la variedad */}
                    <ScrollArea className="h-60 w-full px-4">
                      {varieties.map((variety, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-sm block mb-2 font-bold">
                              #{index + 1}
                            </span>
  
                            <span
                              className="text-sm cursor-pointer hover:underline"
                              onClick={() => {
                                setVarieties((prev) => {
                                  const newVarieties = [...prev];
  
                                  newVarieties.splice(index, 1);
  
                                  return newVarieties;
                                });
                              }}
                            >
                              Eliminar
                            </span>
                          </div>
  
                          <div>
                            <div className="flex gap-2">
                              <FormField
                                control={form.control}
                                name={`variedades.${index}.size`}
                                render={() => (
                                  <FormItem>
                                    <FormLabel>
                                      Peso
                                      <span className="text-sm text-gray-500">
                                        (gr)
                                      </span>
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        isRequired
                                        min={0}
                                        value={variety.weight}
                                        onChange={(value) => {
                                          setVarieties((prev) => {
                                            const newVarieties = [...prev];
  
                                            newVarieties[index].weight = Number(
                                              value.target.value
                                            );
  
                                            return newVarieties;
                                          });
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
  
                              <FormField
                                control={form.control}
                                name={`variedades.${index}.price`}
                                render={() => (
                                  <FormItem>
                                    <FormLabel>Precio</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        isRequired
                                        min={0}
                                        value={variety.price}
                                        onChange={(value) => {
                                          setVarieties((prev) => {
                                            const newVarieties = [...prev];
  
                                            newVarieties[index].price = Number(
                                              value.target.value
                                            );
  
                                            return newVarieties;
                                          });
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
  
                              <FormField
                                control={form.control}
                                name={`variedades.${index}.stock`}
                                render={() => (
                                  <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        isRequired
                                        min={0}
                                        value={variety.stock}
                                        onChange={(value) => {
                                          setVarieties((prev) => {
                                            const newVarieties = [...prev];
  
                                            newVarieties[index].stock = Number(
                                              value.target.value
                                            );
  
                                            return newVarieties;
                                          });
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
  
                  <Button type="submit">
                    {isPending ? (
                      <Loading className="w-2 h-2 mr-2 border-white" />
                    ) : (
                      <> {product ? "Actualizar producto" : "Agregar producto"}</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </FormUI>
  
        <div className="bg-[#ECECEC] p-10 w-full">
          <h3 className="text-lg font-semibold mb-2">
            Imagenes del producto{" "}
            <span className="text-sm text-gray-500">
              (Puedes subir hasta 3 imagenes)
            </span>
          </h3>
  
          <p className="text-sm text-gray-500 mb-2">
            Las imagenes deben ser de tipo JPG, PNG o JPEG.
          </p>
  
          <UploadImage images={images} setImages={setImages} maxNumber={3} />
        </div>
      </div>
    );
}

export default Form;
