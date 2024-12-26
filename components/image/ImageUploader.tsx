import React from "react";
import { FormHelperText } from "@mui/material";
import Image from "next/image";
import { FileTypeEnum } from "@/models/FileTypeEnum";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ImageUploaderProps {
  imagePreview?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  next?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  previous?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  required: boolean;
  isFormSubmitted: boolean;
  errorMessage?: string;
  label?: string;
  fileType?: FileTypeEnum;
  isMultiple?: boolean;
  fileLen?: any;
  currentFileIndex?: any;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imagePreview,
  onChange,
  next,
  previous,
  required,
  isFormSubmitted,
  errorMessage,
  label = "Choose File",
  fileType = FileTypeEnum.Image, // Default to "image"
  isMultiple = false,
  fileLen,
  currentFileIndex
}) => {
  // Determine the accepted file types based on fileType prop
  const acceptTypes =
    fileType === FileTypeEnum.Image
      ? "image/*"
      : fileType === FileTypeEnum.Video
      ? "video/*"
      : "image/*,video/*";

  return (
    <div className="flex flex-col gap-2 items-center pt-2 flex-none w-[400px] max-h-[400px] mb-[50px]">
      <div className="relative w-full max-w-[400px] max-h-[400px] ">
        {/* Left Arrow */}
        {isMultiple && (
          <button
            onClick={previous}
            className="absolute top-[100px] left-0 transform -translate-y-1/2 transition bg-white text-primary rounded hover:bg-primary hover:text-white p-1 ml-1"
          >
            <ArrowBackIcon />
          </button>
        )}

        {/* Image */}
        <Image
          src={imagePreview || "/images/default-image.png"}
          alt="Preview"
          className="w-full h-auto rounded object-contain max-h-[400px] max-w-[400px]"
          width={400}
          height={400}
        />

        {/* Right Arrow */}
        {isMultiple && (
          <button
            onClick={next}
            className="absolute top-[100px]  right-0 transform -translate-y-1/2 transition bg-white text-primary rounded hover:bg-primary hover:text-white p-1 mr-1"
          >
            <ArrowForwardIcon />
          </button>
        )}
      </div>

      <label
        htmlFor="fileUploader"
        className="cursor-pointer px-4 py-2 mt-2 bg-primary text-white rounded-md hover:bg-blue-600 transition duration-300 "
      >
        {label}
      </label>

      <input
        id="fileUploader"
        name="fileUploader"
        required={required}
        type="file"
        onChange={onChange}
        accept={acceptTypes}
        className="hidden"
        multiple={isMultiple}
      />
      {fileLen > 0 && <label>{`${currentFileIndex + 1}/${fileLen}`}</label>}
      {required && !imagePreview && isFormSubmitted && (
        <FormHelperText error>
          {errorMessage || "File is required"}
        </FormHelperText>
      )}
    </div>
  );
};

export default ImageUploader;
