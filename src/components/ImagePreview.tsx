import { useRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ImagePreviewProps {
  originalImage: string;
  compressedImage: string | null;
  crop: Crop | undefined;
  onCropChange: (crop: Crop) => void;
  filter: string;
}

const ImagePreview = ({ originalImage, compressedImage, crop, onCropChange, filter }: ImagePreviewProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Original (Click and drag to crop)</h3>
        <div className="relative">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => onCropChange(percentCrop)}
            className="rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              ref={imgRef}
              src={originalImage}
              alt="Original"
              className="max-w-full h-auto"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </ReactCrop>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Drag to create a crop area. Click "Apply Changes" to see the result.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Preview</h3>
        <div className="relative" style={{ minHeight: '200px' }}>
          {compressedImage ? (
            <img
              src={compressedImage}
              alt="Compressed"
              className="rounded-lg max-w-full h-auto bg-gray-100"
              style={{
                maxHeight: '500px',
                objectFit: 'contain',
                filter,
              }}
            />
          ) : (
            <div className="rounded-lg bg-gray-100 w-full aspect-square flex items-center justify-center text-gray-400">
              Click "Apply Changes" to see preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
