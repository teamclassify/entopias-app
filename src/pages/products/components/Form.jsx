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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loading } from "../../../components/ui/loading";

const formSchema = z.object({
  name: z.string().min(3).max(255),
  precio: z.number().min(0),
  stock: z.number().min(0),
  descripcion: z.string().min(3),
  // images: z.array(z.string()).max(3),
  loteId: z.number(),
  molido: z.string().optional(),
  tueste: z.string().optional(),
  notas: z.string().optional(),
});

/*
  Component Form for adding or editing a product

  Props:
    - product?: object
    - onSubmit: function
    - onCancel: function
*/
function Form({ product, onSubmit, isPending = false }) {
  const [images] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      precio: product?.precio || 0,
      stock: product?.stock || 0,
      descripcion: product?.descripcion || "",
      // images: product?.photos || [],
      loteId: product?.loteId || 0,
      molido: "",
      tueste: "",
      notas: product?.lote?.cafe?.notasOlfativas || "",
    },
  });

  // useEffect(() => {
  //   if (product) {
  //     setImages(product?.photos.map((photo) => photo.url));
  //   }
  // }, [product]);

  const handleSubmit = (data) => {
    onSubmit({
      ...data,
      photos: images,
    });
  };

  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 ">
        <div className="md:bg-[#ECECEC] md:p-10">
          <div className="lg:flex gap-8">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="tueste"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tueste</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="molido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Molido</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            form.setValue("stock", Number(value.target.value));
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
            <div className="w-full grid gap-4 h-full">
              <FormField
                control={form.control}
                name="notas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas de Cata</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} />
                    </FormControl>
                    <FormDescription>
                      Separar cada característica con comas ( , )
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                {/* <FormLabel className="mb-2">
                  Imagenes <span className="text-gray-500">(opcional)</span>
                </FormLabel>
                <UploadImage defaultImages={images} setImages={setImages} /> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormUI>
  );
}

export default Form;
