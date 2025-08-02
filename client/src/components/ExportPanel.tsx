import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportPanelProps {
  hasContent: boolean;
  onExport: () => Promise<void>;
}

export function ExportPanel({ hasContent, onExport }: ExportPanelProps) {
  const [quality, setQuality] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport();
      toast({
        title: 'Export successful',
        description: 'Your mockup has been downloaded successfully.',
      });
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'There was an error exporting your mockup. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getQualityLabel = () => {
    if (quality <= 1) return 'Low';
    if (quality <= 2) return 'Medium';
    return 'High';
  };

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Export PNG</h2>
              <p className="text-sm text-gray-500 mt-1">Download your formatted mockup</p>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Quality:</label>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-500 w-8">Low</span>
                <Slider
                  value={[quality]}
                  onValueChange={([value]) => setQuality(value)}
                  min={1}
                  max={3}
                  step={0.5}
                  disabled={!hasContent}
                  className="w-24"
                />
                <span className="text-xs text-gray-500 w-8">High</span>
              </div>
              <span className="text-sm text-gray-600 w-16">{getQualityLabel()}</span>
            </div>
          </div>
          
          <Button
            onClick={handleExport}
            disabled={!hasContent || isExporting}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'Downloading...' : 'Download PNG'}
          </Button>
        </div>
      </div>
    </div>
  );
}
