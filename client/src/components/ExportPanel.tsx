import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileImage } from 'lucide-react';
import { useCanvas } from '@/hooks/use-canvas';
import { useToast } from '@/hooks/use-toast';

interface ExportPanelProps {
  hasContent: boolean;
  onExport: () => Promise<void>;
}

export function ExportPanel({ hasContent, onExport }: ExportPanelProps) {
  const [quality, setQuality] = useState('1');
  const [format, setFormat] = useState('png');
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

  const getFileSize = () => {
    if (!hasContent) return '0 MB';
    const baseSize = 2.4; // Estimated base size in MB
    const qualityMultiplier = parseFloat(quality);
    return `${(baseSize * qualityMultiplier).toFixed(1)} MB`;
  };

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Export Options</h2>
            <p className="text-sm text-gray-500 mt-1">Download your formatted mockup</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Quality</label>
                <Select value={quality} onValueChange={setQuality} disabled={!hasContent}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">High (1x)</SelectItem>
                    <SelectItem value="2">Ultra (2x)</SelectItem>
                    <SelectItem value="3">Retina (3x)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Format</label>
                <Select value={format} onValueChange={setFormat} disabled={!hasContent}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpg">JPG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button
              onClick={handleExport}
              disabled={!hasContent || isExporting}
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Download PNG'}
            </Button>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FileImage className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">mockup-iphone-screenshot.{format}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">
                {hasContent ? 'Ready to export' : 'Upload a screenshot to export'}
              </span>
            </div>
            <div className="text-gray-500">
              <span>{getFileSize()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
