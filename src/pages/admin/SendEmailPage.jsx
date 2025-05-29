import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AdminLayout from "@/components/layouts/AdminLayout";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import InvoicesService from "@/services/api/Invoices";
import EmailService from "@/services/api/Emails";

const schema = z.object({
  subject: z.string().min(5, "El asunto es obligatorio"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

function SendEmailPage() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data, isPending } = useQuery({
    queryKey: ["invoices", id],
    queryFn: () => InvoicesService.getInvoiceByID({ id }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (data) {
      const msg = `Hola ${data.order?.user?.name || "cliente"},

¡Gracias por tu compra! Tu pedido con número de factura #${
        data.id
      } está siendo preparado y pronto será enviado a:

${data.order?.address?.address || "tu dirección"},
${data.order?.address?.city || ""}, ${data.order?.address?.country || ""}

Saludos,
El equipo de Entopías Café ☕`;

      form.reset({
        subject: "Tu pedido está en preparación",
        message: msg,
      });
    }
  }, [data, form]);

  async function handleSend(values) {
    const response = await EmailService.sendOrderEmail({
      invoiceId: id,
      email: data.order.user.email,
      subject: values.subject,
      message: values.message,
    });

    if (response && response.success) {
      toast.success("Correo enviado correctamente");
      setLocation("/admin/facturas");
    } else {
      toast.error("Error al enviar el correo");
    }
  }

  if (isPending || !data) return <div className="p-8">Cargando...</div>;

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Enviar correo al cliente</h1>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asunto</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensaje</FormLabel>
                  <FormControl>
                    <Textarea rows={8} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  className="w-full bg-green-600 text-white"
                >
                  Confirmar y Enviar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Enviar este correo al cliente?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={form.handleSubmit(handleSend)}>
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}

export default SendEmailPage;
