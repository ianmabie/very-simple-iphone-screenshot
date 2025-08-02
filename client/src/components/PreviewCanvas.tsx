import { useEffect, useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { CanvasState } from '@/hooks/use-canvas';
import { useToast } from '@/hooks/use-toast';

interface PreviewCanvasProps {
  canvasState: CanvasState;
  onStateChange: (state: Partial<CanvasState>) => void;
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  canvasHook: ReturnType<typeof import('@/hooks/use-canvas').useCanvas>;
}

const handleRemoveImage = (onStateChange: (state: Partial<CanvasState>) => void) => {
  onStateChange({
    image: null,
    position: { x: 0, y: 0 },
    scale: 1
  });
};

export function PreviewCanvas({ canvasState, onStateChange, onFileSelect, isProcessing, canvasHook }: PreviewCanvasProps) {
  const { canvasRef, drawMockup } = canvasHook;
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    drawMockup(canvasState);
  }, [canvasState, drawMockup]);

  const hasContent = canvasState.image && canvasState.deviceFrame;

  const validateFile = useCallback((file: File): boolean => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/heic'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PNG, JPG, or HEIC file.',
        variant: 'destructive'
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 10MB.',
        variant: 'destructive'
      });
      return false;
    }

    return true;
  }, [toast]);

  const handleFileSelect = useCallback((file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
    }
  }, [validateFile, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);



  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
      </div>

      <div className="p-8">
        <div 
          className={`flex items-center justify-center min-h-96 bg-gray-50 rounded-lg border-2 border-dashed transition-all cursor-pointer ${
            isDragOver
              ? 'border-blue-500 bg-blue-50'
              : !hasContent 
                ? 'border-gray-300 hover:border-blue-500 hover:bg-blue-50' 
                : 'border-gray-300'
          } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !hasContent && document.getElementById('preview-file-input')?.click()}
        >
          {!hasContent ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <Upload className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">Drag & drop your screenshot</p>
                <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
                <p className="text-xs text-gray-400 mt-2">Supports PNG, JPG, HEIC up to 10MB</p>
              </div>
              <Button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                disabled={isProcessing}
              >
                Choose File
              </Button>
            </div>
          ) : (
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-96 object-contain"
                style={{ imageRendering: 'crisp-edges' }}
              />
              <Button
                onClick={() => handleRemoveImage(onStateChange)}
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white/90 hover:bg-white border border-gray-200 shadow-sm"
              >
                <X className="w-4 h-4 mr-2" />
                Remove Image
              </Button>
            </div>
          )}
        </div>
      </div>

      <input
        id="preview-file-input"
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/heic"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={isProcessing}
      />
    </div>
  );
}
