import { useState, useCallback } from 'react';
import { Smartphone, HelpCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorkflowSteps } from '@/components/WorkflowSteps';
import { FileUploadZone } from '@/components/FileUploadZone';
import { DeviceSelector } from '@/components/DeviceSelector';
import { PreviewCanvas } from '@/components/PreviewCanvas';
import { ExportPanel } from '@/components/ExportPanel';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { DeviceFrame, deviceFrames } from '@/lib/device-frames';
import { loadImageFromFile, fitImageToArea } from '@/lib/canvas-utils';
import { useCanvas, CanvasState } from '@/hooks/use-canvas';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    image: null,
    deviceFrame: deviceFrames[1], // iPhone 15 as default
    position: { x: 0, y: 0 },
    scale: 1,
    backgroundGradient: 'gray'
  });

  const { exportCanvas } = useCanvas();
  const { toast } = useToast();

  const handleFileSelect = useCallback(async (file: File) => {
    setIsProcessing(true);
    setCurrentStep(2);

    try {
      const image = await loadImageFromFile(file);
      
      // Auto-fit image to device screen
      if (canvasState.deviceFrame) {
        const fitted = fitImageToArea(
          image.width,
          image.height,
          canvasState.deviceFrame.screenArea.width,
          canvasState.deviceFrame.screenArea.height
        );
        
        setCanvasState(prev => ({
          ...prev,
          image,
          scale: fitted.scale,
          position: { x: 0, y: 0 }
        }));
      } else {
        setCanvasState(prev => ({ ...prev, image }));
      }

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
    setCanvasState(prev => {
      const newState = { ...prev, deviceFrame: device };
      
      // Re-fit image if one is loaded
      if (prev.image) {
        const fitted = fitImageToArea(
          prev.image.width,
          prev.image.height,
          device.screenArea.width,
          device.screenArea.height
        );
        newState.scale = fitted.scale;
        newState.position = { x: 0, y: 0 };
      }
      
      return newState;
    });
  }, []);

  const handleStateChange = useCallback((changes: Partial<CanvasState>) => {
    setCanvasState(prev => ({ ...prev, ...changes }));
  }, []);

  const handleExport = useCallback(async () => {
    try {
      await exportCanvas('mockup-iphone-screenshot.png');
    } catch (error) {
      throw error;
    }
  }, [exportCanvas]);

  const hasContent = canvasState.image && canvasState.deviceFrame;

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
              <Button variant="ghost" size="sm">
                <HelpCircle className="w-4 h-4" />
              </Button>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Star className="w-4 h-4 mr-2" />
                Pro
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WorkflowSteps currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <FileUploadZone 
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
            />
            <DeviceSelector
              selectedDevice={canvasState.deviceFrame}
              onDeviceSelect={handleDeviceSelect}
            />
          </div>

          <PreviewCanvas
            canvasState={canvasState}
            onStateChange={handleStateChange}
          />
        </div>

        <ExportPanel
          hasContent={!!hasContent}
          onExport={handleExport}
        />
      </main>

      <LoadingOverlay
        isVisible={isProcessing}
        message="Processing Screenshot"
        progress={45}
      />
    </div>
  );
}
