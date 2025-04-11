import { useRef, useState } from "react";
import { SlUser } from "react-icons/sl";

function ProfilePicture({ currentImageUrl, onImageChange }) {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(currentImageUrl);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreview(imageURL);
            onImageChange(file); 
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                {preview ? (
                    <img
                        src={preview}
                        alt="Foto de perfil"
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <SlUser className="h-18 w-18 text-gray-400" />
                )}
            </div>
            <button
                onClick={handleImageClick}
                className="mt-3 px-4 py-1 border-2 text-sm cursor-pointer"
            >
                Cambiar Foto
            </button>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}

export default ProfilePicture;