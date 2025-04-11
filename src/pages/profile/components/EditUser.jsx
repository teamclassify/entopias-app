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
import { useEffect, useState } from "react";
import { Loading } from "@/components/ui/loading";
import UploadImage from "../../../components/base/UploadImage";
import ProfilePicture from "./ProfilePicture";
import { useLocation } from "wouter";

const formSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().min(10).optional(),
});

function EditUser({ isPending = false }) {

    const [image, setImage] = useState([]);
    const { user } = useUser();
    const [location, navigate] = useLocation();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            photo: "",
            phone: user?.phone || "",
            gender: user?.gender,
        },
    });

    useEffect(() => {
        if (user?.photo) {
            setImage([user.photo.url]);
        }
    }, [user]);

    const handleSubmit = (data) => {
        onSubmit({
            ...data,
            photo: image[0]?.file ?? image[0],
        });
    };

    return (
        <div className="flex flex-col gap-8">
            <p className="font-bold text-[20px] py-4">Editar Perfil</p>
            <div>
                <ProfilePicture
                    currentImageUrl={user.photoUrl}
                    onImageChange={(file) => {
                        setValue("photo", file);
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
                                <Button type="submit" className="w-[48%]">
                                    {isPending ? (
                                        <Loading className="w-2 h-2 mr-2 border-white" />
                                    ) : (
                                        <> {"Actualizar Perfil"}</>
                                    )}
                                </Button>
                                <Button 
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