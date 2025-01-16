export interface ImageData {
    id: string;
    originalFile: File;
    originalUrl: string;
    compressedUrl: string | null;
    width: number;
    height: number;
    quality: number;
    filter: string;
    format: string;
    crop?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }