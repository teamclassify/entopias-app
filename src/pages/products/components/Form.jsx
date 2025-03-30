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

import UploadImage from "@/components/base/UploadImage";

const formSchema = z.object({
  name: z.string().min(3).max(255),
  price: z.number().min(0),
  stock: z.number().min(0),
  description: z.string().min(3),
  images: z.array(z.string()).max(3),
});

/*
  Component Form for adding or editing a product

  Props:
    - product?: object
    - onSubmit: function
    - onCancel: function
*/
function Form({ product, onSubmit }) {
  const [images, setImages] = useState(product?.images || []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      price: product?.name || 0,
      stock: product?.stock || 0,
      description: product?.description || "",
      images: product?.images || [],
    },
  });

  const handleSubmit = (data) => {
    onSubmit({
      ...data,
      images,
    });
  };

  return (
    <FormUI {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 ">
        <div className="bg-[#ECECEC] p-10">
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
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origen</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="altura"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altura</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(value) => {
                            form.setValue("altura", parseFloat(value.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="mt-8 text-sm text-[#565758]">msnm</p>
              </div>

              <FormField
                control={form.control}
                name="finca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Finca</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fechaTostado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Tostado</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fechaCaducidad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Caducidad</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">
                {product ? "Actualizar producto" : "Agregar producto"}
              </Button>
            </div>
            <div className="w-full grid gap-4 h-full">
              <div className="grid grid-cols-2 gap-4 ">
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

              <div className="grid grid-cols-2 gap-4 ">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio del producto</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(value) => {
                            form.setValue("price", parseFloat(value.target.value));
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
                        <Input type="number" disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                <FormLabel className="mb-2">
                  Imagenes <span className="text-gray-500">(opcional)</span>
                </FormLabel>
                <UploadImage setImages={setImages} />
              </div>
            </div>
          </div>
        </div>

      </form>
    </FormUI>
  );
}

export default Form;
