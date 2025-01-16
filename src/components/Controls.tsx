import { Download, RefreshCw } from 'lucide-react';

interface ControlsProps {
  width: number;
  height: number;
  quality: number;
  filter: string;
  format: string;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onQualityChange: (quality: number) => void;
  onFilterChange: (filter: string) => void;
  onFormatChange: (format: string) => void;
  onRecompress: () => void;
  onDownload: () => void;
}

const filters = [
  { name: 'None', value: 'none' },
  { name: 'Grayscale', value: 'grayscale(100%)' },
  { name: 'Sepia', value: 'sepia(100%)' },
  { name: 'Blur', value: 'blur(2px)' },
  { name: 'Brightness', value: 'brightness(150%)' },
  { name: 'Contrast', value: 'contrast(150%)' },
];

const formats = ['image/jpeg', 'image/png', 'image/webp'];

const Controls = ({
  width,
  height,
  quality,
  filter,
  format,
  onWidthChange,
  onHeightChange,
  onQualityChange,
  onFilterChange,
  onFormatChange,
  onRecompress,
  onDownload,
}: ControlsProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8  dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
            Width (px)
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => onWidthChange(Number(e.target.value))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
            Height (px)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
            Quality ({quality}%)
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={quality}
            onChange={(e) => onQualityChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
            Format
          </label>
          <select
            value={format}
            onChange={(e) => onFormatChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
          >
            {formats.map(f => (
              <option key={f} value={f}>
                {f.split('/')[1].toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
          Filter
        </label>
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
        >
          {filters.map(f => (
            <option key={f.name} value={f.value}>
              {f.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={onRecompress}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Apply Changes
        </button>
        
        <button
          onClick={onDownload}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
};

export default Controls;