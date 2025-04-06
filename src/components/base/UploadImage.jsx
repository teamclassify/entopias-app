import "filepond/dist/filepond.min.css";
import React from "react";
import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function UploadImage({ setImages }) {
  return (
    <FilePond
      allowMultiple={true}
      onaddfile={(_, file) => {
        console.log("file", file.file);
        setImages((prev) => [...prev, file.file]);
      }}
      onremovefile={async (_, file) => {
        setImages((prev) => prev.filter((f) => f.name !== file.name));
      }}
      maxFiles={3}
      name="files" /* sets the file input name, it's filepond by default */
      labelIdle='Arrastra y suelta tus archivos o <span class="filepond--label-action"> Busca en tu computadora</span>'
    />
  );
}

export default UploadImage;
