import { Info } from 'lucide-react';

interface ImageInfoProps {
  dimensions: { width: number; height: number } | null;
  recommendedDevice: string | null;
}

export function ImageInfo({ dimensions, recommendedDevice }: ImageInfoProps) {
  if (!dimensions) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Info className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Image Details</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Dimensions:</span>
            <span className="font-semibold text-gray-900 text-lg">
              {dimensions.width} × {dimensions.height}px
            </span>
          </div>
          
          {recommendedDevice && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Best fit:</span>
              <span className="font-semibold text-blue-600 text-lg">{recommendedDevice}</span>
            </div>
          )}

          <div className="pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Frame type:</span>
              <span className="font-semibold text-gray-900">Dynamic Island</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Background:</span>
            <span className="font-semibold text-gray-900">Transparent</span>
          </div>
        </div>
      </div>
    </div>
  );
}