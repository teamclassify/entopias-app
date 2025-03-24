import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function UploadImage({ form }) {
  return (
    <FilePond
      files={form.watch("images")}
      onupdatefiles={(fileItems) => {
        console.log(fileItems);
        // form.setValue(
        //   "images",
        //   fileItems.map((fileItem) => fileItem.file)
        // );
      }}
      allowMultiple={true}
      maxFiles={3}
      name="files" /* sets the file input name, it's filepond by default */
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
    />
  );
}

export default UploadImage;
