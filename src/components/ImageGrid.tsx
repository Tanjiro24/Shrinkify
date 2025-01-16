import { Trash2 } from 'lucide-react';
import type { ImageData } from '../types';

interface ImageGridProps {
  images: ImageData[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  selectedId: string | null;
}

const ImageGrid = ({ images, onSelect, onDelete, selectedId }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
      {images.map((image) => (
        <div
          key={image.id}
          className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all
            ${selectedId === image.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200 hover:border-blue-300'}`}
          onClick={() => onSelect(image.id)}
        >
          <img
            src={image.compressedUrl || image.originalUrl}
            alt="Thumbnail"
            className="w-full aspect-square object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(image.id);
            }}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;