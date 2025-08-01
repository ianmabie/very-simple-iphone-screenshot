import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RotateCcw, Maximize2, Move, ZoomIn, ZoomOut, Plus } from 'lucide-react';
import { useCanvas, CanvasState } from '@/hooks/use-canvas';

interface PreviewCanvasProps {
  canvasState: CanvasState;
  onStateChange: (state: Partial<CanvasState>) => void;
}

export function PreviewCanvas({ canvasState, onStateChange }: PreviewCanvasProps) {
  const { canvasRef, drawMockup } = useCanvas();

  useEffect(() => {
    drawMockup(canvasState);
  }, [canvasState, drawMockup]);

  const hasContent = canvasState.image && canvasState.deviceFrame;

  const backgroundOptions = [
    { id: 'gray', gradient: 'linear-gradient(135deg, #f3f4f6, #d1d5db)' },
    { id: 'blue', gradient: 'linear-gradient(135deg, #60a5fa, #2563eb)' },
    { id: 'purple', gradient: 'linear-gradient(135deg, #a78bfa, #ec4899)' }
  ];

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onStateChange({ position: { x: 0, y: 0 }, scale: 1 })}
              disabled={!hasContent}
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={!hasContent}
              title="Zoom fit"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-center min-h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            {!hasContent ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-500">No screenshot uploaded</p>
                  <p className="text-sm text-gray-400 mt-1">Upload an iPhone screenshot to get started</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-96 object-contain"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!hasContent}
                >
                  <Move className="w-4 h-4 text-gray-400" />
                </Button>
                <div className="flex-1 space-y-1">
                  <Slider
                    value={[canvasState.position.x]}
                    onValueChange={([x]) => onStateChange({ position: { ...canvasState.position, x } })}
                    min={-100}
                    max={100}
                    step={1}
                    disabled={!hasContent}
                    className="w-full"
                  />
                  <Slider
                    value={[canvasState.position.y]}
                    onValueChange={([y]) => onStateChange({ position: { ...canvasState.position, y } })}
                    min={-100}
                    max={100}
                    step={1}
                    disabled={!hasContent}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Scale</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onStateChange({ scale: Math.max(0.1, canvasState.scale - 0.1) })}
                  disabled={!hasContent}
                >
                  <ZoomOut className="w-4 h-4 text-gray-400" />
                </Button>
                <Slider
                  value={[canvasState.scale]}
                  onValueChange={([scale]) => onStateChange({ scale })}
                  min={0.1}
                  max={3}
                  step={0.1}
                  disabled={!hasContent}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onStateChange({ scale: Math.min(3, canvasState.scale + 0.1) })}
                  disabled={!hasContent}
                >
                  <ZoomIn className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
              <div className="flex items-center space-x-2">
                {backgroundOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onStateChange({ backgroundGradient: option.id })}
                    className={`w-8 h-8 rounded border-2 shadow-sm ${
                      canvasState.backgroundGradient === option.id
                        ? 'border-blue-500'
                        : 'border-white'
                    }`}
                    style={{ background: option.gradient }}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 border-2 border-dashed border-gray-300 p-0"
                  disabled
                >
                  <Plus className="w-3 h-3 text-gray-400" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
