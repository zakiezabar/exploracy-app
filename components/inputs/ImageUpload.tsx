'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { BiStar } from "react-icons/bi";

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    },[onChange]);

    return ( 
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset="ob5amstl"
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="
                            relative
                            cursor-pointer
                            hover:opacity-70
                            transition
                            border-dashed
                            rounded-xl
                            border-2
                            p-20
                            border-mono-400
                            flex
                            flex-col
                            justify-center
                            items-center
                            gap-4
                            text-neutral-600
                        "
                    >
                    <TbPhotoPlus size={44} />
                        <div className="font-semibold text-lg">
                            {value ? 'Change image' : 'Click to upload'}
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                alt="Upload"
                                fill
                                style={{ objectFit: 'cover' }}
                                src={value}
                                className="rounded-lg"
                            />
                            </div>
                        )}
                    </div>
                )
            }}

        </CldUploadWidget>
     );
}
 
export default ImageUpload;