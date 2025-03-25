import { uploadFile } from "@/config/supabase";
import "filepond/dist/filepond.min.css";
import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { toast } from "sonner";

import { deleteFile } from "@/config/supabase";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const STORAGE_URL =
  "https://wjtmjrfdgzplbydfenyn.supabase.co/storage/v1/object";

function UploadImage({ setImages }) {
  return (
    <FilePond
      allowMultiple={true}
      //integration with supabase
      server={{
        process: async (fieldName, file, metadata, load, error) => {
          const formData = new FormData();
          formData.append("file", file, file.name);

          const response = await uploadFile("products", file, file.name);

          console.log(response);

          if (!response.fullPath) {
            error("Upload failed");
            toast.error("Falló la subida de la imagen");
            return;
          }

          setImages((prev) => [...prev, `${STORAGE_URL}/${response.fullPath}`]);

          toast.success("Imagen subida correctamente");
          load(response);
        },
      }}
      // delete files
      onremovefile={async (_, file) => {
        const response = await deleteFile("products", file.file.name);
        console.log(response);
      }}
      maxFiles={3}
      name="files" /* sets the file input name, it's filepond by default */
      labelIdle='Arrastra y suelta tus archivos o <span class="filepond--label-action"> Busca en tu computadora</span>'
    />
  );
}

export default UploadImage;
