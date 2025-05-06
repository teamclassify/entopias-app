import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form as FormUI,
} from "@/components/ui/form";
import useUser from "@/hooks/useUser";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import ProfilePicture from "./components/ProfilePicture";
import { useMutation, useQuery } from '@tanstack/react-query';
import UsersService from "../../services/api/Users";
import { toast } from 'react-hot-toast';



const formSchema = z.object({
    name: z.string().min(3).max(255),
    photo: z.string().optional(),
    email: z.string().email(),
    phone: z.string().min(10).optional(),
    gender: z.string(),
});

function EditUser({ onChange }) {

    const [image, setImage] = useState([]);
    const { user, setUser } = useUser();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || "",
            photo: user?.photoUrl || "",
            email: user?.email || "",
            phone: user?.phone || "",
            gender: user?.gender,
        },
    });


    const mutateUpdateProfile = useMutation({
        mutationFn: ({ id, data }) => UsersService.updateUser({ id, data }),
        onSuccess: (data) => {
            toast.success("Perfil actualizado");
            setUser((prev) => ({
                ...prev,
                ...data.data,
            }));
            onChange("inicio");
            console.log("Perfil actualizado");
        },
        onError: (error) => {
            toast.error("Ocurrió un error al actualizar el perfil");
            console.log(error);
        },
    });


    const handleSubmit = (formValues) => {
        mutateUpdateProfile.mutate({
            id: user.id,
            data: formValues
        });
    }

    return (
        <div className="flex flex-col gap-8">
            <p className="font-bold text-[20px] py-4">Editar Perfil</p>
            <div>
                <ProfilePicture
                    currentImageUrl={user?.photo}
                    onImageChange={(imageName) => {
                        form.setValue("photo", imageName);
                    }}
                />
                <FormUI {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Teléfono</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Género</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-full flex flex-row justify-between">
                                <Button type="submit" className="w-[48%]" disabled={mutateUpdateProfile.isLoading}>
                                    {mutateUpdateProfile.isLoading ? "Guardando..." : "Guardar"}
                                </Button>
                                <Button
                                    type="button"
                                    className="w-[48%] px-4 py-2 bg-gray-200 text-gray-700  hover:bg-gray-300"
                                    onClick={() => onChange("inicio")}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </form>
                </FormUI>
            </div>
        </div>
    );
}

export default EditUser;