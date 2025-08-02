import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ExportPanelProps {
  hasContent: boolean;
  onExport: (isHighQuality: boolean) => Promise<void>;
}

export function ExportPanel({ hasContent, onExport }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState<'high' | 'low' | null>(null);

  const handleExport = async (isHighQuality: boolean) => {
    setIsExporting(isHighQuality ? 'high' : 'low');
    try {
      await onExport(isHighQuality);
    } finally {
      setIsExporting(null);
    }
  };

  const getFileSize = (isHighQuality: boolean) => {
    if (!hasContent) return '~0 MB';
    const baseSize = isHighQuality ? 2.8 : 1.2; // Estimated sizes in MB
    return `~${baseSize.toFixed(1)} MB`;
  };

  return (
    <div className="lg:mt-0 mt-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Options</h3>
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-3 lg:space-y-0 lg:space-x-4">
          <Button
            onClick={() => handleExport(false)}
            disabled={!hasContent || isExporting !== null}
            variant="outline"
            className="border-gray-300 hover:bg-gray-50 w-full lg:w-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting === 'low' ? 'Downloading...' : `Low Quality ${getFileSize(false)}`}
          </Button>
          
          <Button
            onClick={() => handleExport(true)}
            disabled={!hasContent || isExporting !== null}
            className="bg-emerald-500 hover:bg-emerald-600 text-white w-full lg:w-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting === 'high' ? 'Downloading...' : `High Quality ${getFileSize(true)}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
