import { useState, useCallback } from 'react';
import { Smartphone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';


import { DeviceSelector } from '@/components/DeviceSelector';
import { PreviewCanvas } from '@/components/PreviewCanvas';
import { ExportPanel } from '@/components/ExportPanel';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { ImageInfo } from '@/components/ImageInfo';
import { DeviceFrame, deviceFrames } from '@/lib/device-frames';
import { loadImageFromFile, fitImageToArea, getImageDimensions, recommendDevice } from '@/lib/canvas-utils';
import { useCanvas, CanvasState } from '@/hooks/use-canvas';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [recommendedDevice, setRecommendedDevice] = useState<string | null>(null);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    image: null,
    deviceFrame: deviceFrames[0], // iPhone 15 Pro (Dynamic Island) as default
    position: { x: 0, y: 0 },
    scale: 1,
    backgroundGradient: 'transparent'
  });

  const { toast } = useToast();
  const canvasHook = useCanvas();
  const { exportCanvas } = canvasHook;

  const handleFileSelect = useCallback(async (file: File) => {
    setIsProcessing(true);
    setCurrentStep(2);

    try {
      const image = await loadImageFromFile(file);
      
      // Get image dimensions and recommend device
      const dimensions = getImageDimensions(image);
      const recommended = recommendDevice(dimensions.width, dimensions.height);
      
      setImageDimensions(dimensions);
      setRecommendedDevice(recommended);
      
      // Set image to canvas state
      setCanvasState(prev => ({
        ...prev,
        image,
        scale: 1,
        position: { x: 0, y: 0 }
      }));

      setCurrentStep(3);
      toast({
        title: 'Screenshot uploaded successfully',
        description: 'Your screenshot has been loaded and is ready for formatting.',
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'There was an error processing your file. Please try again.',
        variant: 'destructive'
      });
      setCurrentStep(1);
    } finally {
      setIsProcessing(false);
    }
  }, [canvasState.deviceFrame, toast]);

  const handleDeviceSelect = useCallback((device: DeviceFrame) => {
    setCanvasState(prev => ({
      ...prev,
      deviceFrame: device,
      position: { x: 0, y: 0 },
      scale: 1
    }));
  }, []);

  const handleStateChange = useCallback((changes: Partial<CanvasState>) => {
    setCanvasState(prev => ({ ...prev, ...changes }));
  }, []);

  const hasContent = canvasState.image && canvasState.deviceFrame;

  const handleExport = useCallback(async (isHighQuality: boolean = true) => {
    if (!hasContent) {
      toast({
        title: 'No content to export',
        description: 'Please upload a screenshot first.',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      const qualityText = isHighQuality ? 'high-quality' : 'low-quality';
      await exportCanvas(`mockup-iphone-screenshot-${qualityText}.png`, imageDimensions || undefined, canvasState, isHighQuality);
      toast({
        title: 'Download started',
        description: `Your ${isHighQuality ? 'high quality' : 'low quality'} mockup is being downloaded.`,
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: 'Download failed',
        description: 'Please try again.',
        variant: 'destructive'
      });
    }
  }, [hasContent, exportCanvas, toast, imageDimensions, canvasState]);

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Smartphone className="text-blue-500 w-6 h-6" />
                <h1 className="text-xl font-bold text-gray-900">MockDevice</h1>
              </div>
              <span className="text-sm text-gray-500 hidden sm:inline">iPhone Screenshot Formatter</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="sm" variant="outline" className="text-gray-500">
                <Star className="w-4 h-4 mr-2" />
                Pro Mode Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Layout - Vertical Stack */}
        <div className="lg:hidden">
          <div className="max-w-4xl mx-auto">
            <PreviewCanvas
              canvasState={canvasState}
              onStateChange={handleStateChange}
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
              canvasHook={canvasHook}
            />
            
            <div className="mt-8 space-y-6">
              <ImageInfo 
                dimensions={imageDimensions}
                recommendedDevice="iPhone 15 Pro (Dynamic Island)"
              />
            </div>
          </div>

          <ExportPanel
            hasContent={!!hasContent}
            onExport={handleExport}
          />
        </div>

        {/* Desktop Layout - Two Columns */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-5 gap-8 h-[calc(100vh-16rem)]">
            {/* Left Column - Preview Canvas (3/5 width) */}
            <div className="col-span-3 flex flex-col">
              <PreviewCanvas
                canvasState={canvasState}
                onStateChange={handleStateChange}
                onFileSelect={handleFileSelect}
                isProcessing={isProcessing}
                canvasHook={canvasHook}
              />
            </div>

            {/* Right Column - Controls (2/5 width) */}
            <div className="col-span-2 flex flex-col">
              <ImageInfo 
                dimensions={imageDimensions}
                recommendedDevice="iPhone 15 Pro (Dynamic Island)"
              />
              
              <div className="flex-1 flex flex-col justify-center">
                <ExportPanel
                  hasContent={!!hasContent}
                  onExport={handleExport}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <LoadingOverlay
        isVisible={isProcessing}
        message="Processing Screenshot"
        progress={45}
      />
    </div>
  );
}
