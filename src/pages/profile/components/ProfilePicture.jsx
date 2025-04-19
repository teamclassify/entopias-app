import { useEffect, useState } from "react";
import ReactImageUploading from "react-images-uploading";
import { SlUser } from "react-icons/sl";

function ProfilePicture({ currentImageUrl, onImageChange }) {
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        if (currentImageUrl) {
            setImageList([{ data_url: currentImageUrl }]);
        }
    }, [currentImageUrl]);

    const handleImageChange = (imageList) => {
        setImageList(imageList);
        const imageName = imageList?.[0]?.file?.name || "";
        onImageChange(imageName); 
    };

    return (
        <ReactImageUploading
            value={imageList}
            onChange={handleImageChange}
            maxNumber={1}
            acceptType={["jpg", "png", "jpeg"]}
            dataURLKey="data_url"
        >
            {({ onImageUpload }) => (
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        {imageList[0]?.data_url ? (
                            <img
                                src={imageList[0]?.data_url}
                                alt="Foto de perfil"
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <SlUser className="h-18 w-18 text-gray-400" />
                        )}
                    </div>

                    <button
                        onClick={onImageUpload}
                        className="mt-3 px-4 py-1 border-2 text-sm cursor-pointer"
                    >
                        Cambiar Foto
                    </button>
                </div>
            )}
        </ReactImageUploading>
    );
}

export default ProfilePicture;
