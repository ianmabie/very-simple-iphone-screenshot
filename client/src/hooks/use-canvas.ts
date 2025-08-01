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

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (backgroundGradient === 'gray') {
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#d1d5db');
    } else if (backgroundGradient === 'blue') {
      gradient.addColorStop(0, '#60a5fa');
      gradient.addColorStop(1, '#2563eb');
    } else if (backgroundGradient === 'purple') {
      gradient.addColorStop(0, '#a78bfa');
      gradient.addColorStop(1, '#ec4899');
    } else {
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#d1d5db');
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      const screenCenterX = deviceFrame.screenArea.x + deviceFrame.screenArea.width / 2;
      const screenCenterY = deviceFrame.screenArea.y + deviceFrame.screenArea.height / 2;
      
      const scaledWidth = image.width * scale;
      const scaledHeight = image.height * scale;
      
      ctx.drawImage(
        image,
        screenCenterX + position.x - scaledWidth / 2,
        screenCenterY + position.y - scaledHeight / 2,
        scaledWidth,
        scaledHeight
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

    ctx.restore();
  }, []);

  const exportCanvas = useCallback(async (filename: string = 'mockup-iphone-screenshot.png') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    return new Promise<void>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve();
          return;
        }
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        resolve();
      }, 'image/png', 1);
    });
  }, []);

  return {
    canvasRef,
    drawMockup,
    exportCanvas
  };
}
