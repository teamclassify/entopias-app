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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(255),
  precio: z.number().min(0),
  stock: z.number().min(0),
  descripcion: z.string().min(3),
  loteId: z.number(),
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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      precio: product?.precio || 0,
      stock: product?.stock || 0,
      descripcion: product?.descripcion || "",
      photos: [],
      loteId: product?.loteId || 0,
    },
  });

  useEffect(() => {
    if (product) {
      setImages(product?.photos.map((photo) => photo.url));
    }
  }, [product]);

  const handleSubmit = (data) => {
    onSubmit({
      ...data,
      photos: images.map((image) => image.file ?? image),
    });
  };

  return (
    <div className="lg:flex gap-8">
      <FormUI {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 w-full"
        >
          <div className="bg-[#ECECEC] p-10">
            <div className="">
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
                  name="loteId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lote de Origen</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={product}
                          onChange={(value) => {
                            form.setValue("loteId", Number(value.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4 ">
                  <FormField
                    control={form.control}
                    name="precio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio del producto</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(value) => {
                              form.setValue(
                                "precio",
                                parseFloat(value.target.value)
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(value) => {
                              form.setValue(
                                "stock",
                                Number(value.target.value)
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="descripcion"
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
        <p className="text-lg font-semibold mb-2">
          Imagenes del producto{" "}
          <span className="text-sm text-gray-500">
            (Puedes subir hasta 3 imagenes)
          </span>
        </p>

        <p className="text-sm text-gray-500 mb-2">
          Las imagenes deben ser de tipo JPG, PNG o JPEG.
        </p>

        <UploadImage images={images} setImages={setImages} maxNumber={3} />
      </div>
    </div>
  );
}

export default Form;
