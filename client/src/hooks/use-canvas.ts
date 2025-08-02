import { useRef, useCallback } from 'react';
import { DeviceFrame } from '@/lib/device-frames';
import { drawRoundedRect, createCanvas } from '@/lib/canvas-utils';

export interface CanvasState {
  image: HTMLImageElement | null;
  deviceFrame: DeviceFrame | null;
  position: { x: number; y: number };
  scale: number;
  backgroundGradient: string;
}

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawMockup = useCallback((state: CanvasState) => {
    const canvas = canvasRef.current;
    if (!canvas || !state.deviceFrame) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { deviceFrame, image, position, scale, backgroundGradient } = state;
    
    // Set canvas size to device frame size with padding
    const padding = 40;
    canvas.width = deviceFrame.dimensions.width + padding * 2;
    canvas.height = deviceFrame.dimensions.height + padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw transparent background (no background fill for transparent export)

    // Device frame position (centered with padding)
    const frameX = padding;
    const frameY = padding;

    // Draw device frame
    ctx.save();
    ctx.translate(frameX, frameY);

    // Frame background
    ctx.fillStyle = deviceFrame.frameColor;
    drawRoundedRect(
      ctx,
      0,
      0,
      deviceFrame.dimensions.width,
      deviceFrame.dimensions.height,
      deviceFrame.cornerRadius
    );
    ctx.fill();

    // Screen area (clipped)
    ctx.save();
    drawRoundedRect(
      ctx,
      deviceFrame.screenArea.x,
      deviceFrame.screenArea.y,
      deviceFrame.screenArea.width,
      deviceFrame.screenArea.height,
      deviceFrame.cornerRadius - 4
    );
    ctx.clip();

    // Screen background
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Draw screenshot if available
    if (image) {
      // Fit image to screen area exactly
      ctx.drawImage(
        image,
        deviceFrame.screenArea.x,
        deviceFrame.screenArea.y,
        deviceFrame.screenArea.width,
        deviceFrame.screenArea.height
      );
    }

    ctx.restore();

    // Draw home indicator if device has one
    if (deviceFrame.homeIndicator) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      drawRoundedRect(
        ctx,
        deviceFrame.homeIndicator.x,
        deviceFrame.homeIndicator.y,
        deviceFrame.homeIndicator.width,
        deviceFrame.homeIndicator.height,
        deviceFrame.homeIndicator.height / 2
      );
      ctx.fill();
    }

    // Draw notch if device has one
    if (deviceFrame.hasNotch && deviceFrame.notch) {
      ctx.fillStyle = deviceFrame.frameColor;
      drawRoundedRect(
        ctx,
        deviceFrame.notch.x,
        deviceFrame.notch.y,
        deviceFrame.notch.width,
        deviceFrame.notch.height,
        12
      );
      ctx.fill();
    }

    // Draw Dynamic Island if device has one
    if (deviceFrame.hasDynamicIsland && deviceFrame.dynamicIsland) {
      ctx.fillStyle = '#000000';
      drawRoundedRect(
        ctx,
        deviceFrame.dynamicIsland.x,
        deviceFrame.dynamicIsland.y,
        deviceFrame.dynamicIsland.width,
        deviceFrame.dynamicIsland.height,
        10
      );
      ctx.fill();
    }

    ctx.restore();
  }, []);

  const exportCanvas = useCallback(async (filename: string = 'mockup-iphone-screenshot.png') => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas ref is null:', canvasRef.current);
      throw new Error('Canvas not available');
    }

    return new Promise<void>((resolve, reject) => {
      try {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob'));
            return;
          }
          
          // Create download link
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          
          // Force download by clicking the link
          document.body.appendChild(link);
          link.click();
          
          // Clean up
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          resolve();
        }, 'image/png', 1.0);
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  return {
    canvasRef,
    drawMockup,
    exportCanvas
  };
}
