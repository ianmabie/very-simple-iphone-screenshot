import { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageInfoProps {
  dimensions: { width: number; height: number } | null;
  recommendedDevice: string | null;
}

export function ImageInfo({ dimensions, recommendedDevice }: ImageInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!dimensions) return null;

  return (
    <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
      >
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold text-gray-900">Image Details</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </Button>
      
      {isExpanded && (
        <div className="px-4 pb-4 space-y-2 text-sm border-t border-gray-100">
          <div className="flex justify-between pt-3">
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
      )}
    </div>
  );
}