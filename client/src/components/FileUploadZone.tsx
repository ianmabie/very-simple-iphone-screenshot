import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function FileUploadZone({ onFileSelect, isProcessing }: FileUploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Screenshot</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
          isDragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Drag & drop your screenshot</p>
            <p className="text-xs text-gray-500 mt-1">or click to browse files</p>
          </div>
          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isProcessing}
          >
            Choose File
          </Button>
        </div>
      </div>

      <input
        id="file-input"
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/heic"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={isProcessing}
      />

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs font-medium text-gray-700 mb-2">Supported formats:</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-white text-xs text-gray-600 rounded border">PNG</span>
          <span className="px-2 py-1 bg-white text-xs text-gray-600 rounded border">JPG</span>
          <span className="px-2 py-1 bg-white text-xs text-gray-600 rounded border">HEIC</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Max file size: 10MB</p>
      </div>
    </div>
  );
}
