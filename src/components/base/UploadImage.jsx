import { RefreshCwIcon, Trash } from "lucide-react";
import ReactImageUploading from "react-images-uploading";
import { Button } from "@/components/ui/button";

function UploadImage({ images, setImages, maxNumber = 1 }) {
  return (
    <ReactImageUploading
      multiple
      value={images}
      onChange={setImages}
      maxNumber={maxNumber}
      acceptType={["jpg", "png", "jpeg"]}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="upload__image-wrapper">
          <button
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
            className="text-center bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg p-4 w-full"
          >
            Click or Arrastra y suelta aqui
          </button>

          <div className="grid grid-cols-4 gap-4 mt-4">
            {imageList.map((image, index) => {
              return (
                <div key={index} className="relative">
                  <img src={image.data_url} alt="" />

                  <div className="absolute top-0 right-0 flex gap-1 p-1">
                    <Button onClick={() => onImageUpdate(index)} size="sm">
                      <RefreshCwIcon className="w-4 h-4" />
                    </Button>

                    <Button onClick={() => onImageRemove(index)} size="sm">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </ReactImageUploading>
  );
}

export default UploadImage;
