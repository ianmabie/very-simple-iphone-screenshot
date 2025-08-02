import { Info } from 'lucide-react';

interface ImageInfoProps {
  dimensions: { width: number; height: number } | null;
  recommendedDevice: string | null;
}

export function ImageInfo({ dimensions, recommendedDevice }: ImageInfoProps) {
  if (!dimensions) return null;

  return (
    <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Info className="w-4 h-4 text-blue-500" />
        <h3 className="text-sm font-semibold text-gray-900">Image Details</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Dimensions:</span>
          <span className="font-medium text-gray-900">
            {dimensions.width} × {dimensions.height}px
          </span>
        </div>
        
        {recommendedDevice && (
          <div className="flex justify-between">
            <span className="text-gray-600">Best fit:</span>
            <span className="font-medium text-blue-600">{recommendedDevice}</span>
          </div>
        )}
      </div>
    </div>
  );
}