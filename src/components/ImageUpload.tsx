import { useRef } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (files: FileList) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

const ImageUploader = ({ onImageUpload}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleDrop = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   onImageUpload(e.dataTransfer.files);
  // };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onImageUpload(e.target.files);
    }
  };

  return (
    <div>
      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileInput}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Choose Images
      </button>
      <p className="mt-2 text-sm text-gray-500">
        or drag and drop your images here
      </p>
    </div>
  );
};

export default ImageUploader;