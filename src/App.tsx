import { useState } from "react";
import { type Crop } from "react-image-crop";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUpload";
import ImagePreview from "./components/ImagePreview";
import Controls from "./components/Controls";
import ImageGrid from "./components/ImageGrid";
import type { ImageData } from "./types";
import ThemeSwitcher from "./components/ThemeToggle";

function App() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const selectedImage = images.find((img) => img.id === selectedId);

  const handleImageUpload = async (files: FileList) => {
    const newImages: ImageData[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const id = crypto.randomUUID();
      const url = URL.createObjectURL(file);

      const img = new Image();
      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = url;
      });

      newImages.push({
        id,
        originalFile: file,
        originalUrl: url,
        compressedUrl: null,
        width: img.width,
        height: img.height,
        quality: 80,
        filter: "none",
        format: "image/jpeg",
      });
    }

    setImages((prev) => [...prev, ...newImages]);
    if (!selectedId && newImages.length > 0) {
      setSelectedId(newImages[0].id);
    }
  };

  const compressImage = async (imageData: ImageData) => {
    const img = new Image();
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = imageData.originalUrl;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to the desired output size
    canvas.width = imageData.width;
    canvas.height = imageData.height;

    if (ctx) {
      if (imageData.crop) {
        // Calculate actual pixel values from percentages
        const cropX = (imageData.crop.x / 100) * img.naturalWidth;
        const cropY = (imageData.crop.y / 100) * img.naturalHeight;
        const cropWidth = (imageData.crop.width / 100) * img.naturalWidth;
        const cropHeight = (imageData.crop.height / 100) * img.naturalHeight;

        // Draw the cropped portion scaled to the desired dimensions
        ctx.drawImage(
          img,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          imageData.width,
          imageData.height
        );
      } else {
        // If no crop, just resize
        ctx.drawImage(img, 0, 0, imageData.width, imageData.height);
      }

      // Apply filter if any
      if (imageData.filter !== "none") {
        ctx.filter = imageData.filter;
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.drawImage(canvas, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(tempCanvas, 0, 0);
          ctx.filter = "none";
        }
      }

      const compressedDataUrl = canvas.toDataURL(
        imageData.format,
        imageData.quality / 100
      );

      setImages((prev) =>
        prev.map((img) =>
          img.id === imageData.id
            ? { ...img, compressedUrl: compressedDataUrl }
            : img
        )
      );
    }
  };

  const handleCropChange = (crop: Crop) => {
    if (selectedId) {
      setImages((prev) =>
        prev.map((img) => (img.id === selectedId ? { ...img, crop } : img))
      );
    }
  };

  const handleRecompress = () => {
    if (selectedImage) {
      compressImage(selectedImage);
    }
  };

  const handleDownload = () => {
    if (selectedImage?.compressedUrl) {
      const link = document.createElement("a");
      const extension = selectedImage.format.split("/")[1];
      link.download = `compressed-image.${extension}`;
      link.href = selectedImage.compressedUrl;
      link.click();
    }
  };

  const updateSelectedImage = (updates: Partial<ImageData>) => {
    if (selectedId) {
      setImages((prev) =>
        prev.map((img) =>
          img.id === selectedId ? { ...img, ...updates } : img
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Header />
        <div className="flex justify-end mb-8">
          <ThemeSwitcher />
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-8 transition-colors
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            ${images.length === 0 ? "hover:border-blue-400" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleImageUpload(e.dataTransfer.files);
          }}
        >
          {images.length === 0 ? (
            <ImageUploader
              onImageUpload={handleImageUpload}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
            />
          ) : (
            <>
              <ImageGrid
                images={images}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onDelete={(id) => {
                  setImages((prev) => prev.filter((img) => img.id !== id));
                  if (selectedId === id) {
                    setSelectedId(images[0]?.id || null);
                  }
                }}
              />

              {selectedImage && (
                <>
                  <ImagePreview
                    originalImage={selectedImage.originalUrl}
                    compressedImage={selectedImage.compressedUrl}
                    crop={selectedImage.crop as Crop}
                    onCropChange={handleCropChange}
                    filter={selectedImage.filter}
                  />

                  <Controls
                    width={selectedImage.width}
                    height={selectedImage.height}
                    quality={selectedImage.quality}
                    filter={selectedImage.filter}
                    format={selectedImage.format}
                    onWidthChange={(width) => updateSelectedImage({ width })}
                    onHeightChange={(height) => updateSelectedImage({ height })}
                    onQualityChange={(quality) =>
                      updateSelectedImage({ quality })
                    }
                    onFilterChange={(filter) => updateSelectedImage({ filter })}
                    onFormatChange={(format) => updateSelectedImage({ format })}
                    onRecompress={handleRecompress}
                    onDownload={handleDownload}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
