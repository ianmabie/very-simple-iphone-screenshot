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
        9
      );
      ctx.fill();
    }

    ctx.restore();
  }, []);

  const exportCanvas = useCallback(async (filename: string = 'mockup-iphone-screenshot.png', originalImageDimensions?: { width: number; height: number }, canvasState?: CanvasState, isHighQuality: boolean = true) => {
    if (!canvasState?.image || !canvasState?.deviceFrame) {
      throw new Error('No image or device frame available for export');
    }

    const { image, deviceFrame, position, scale } = canvasState;

    return new Promise<void>((resolve, reject) => {
      try {
        // Calculate export dimensions based on quality setting
        let exportScale = isHighQuality ? 4 : 2; // High quality: 4x, Low quality: 2x
        if (isHighQuality && originalImageDimensions) {
          // Use original image resolution to determine optimal export scale for high quality
          const frameWidth = deviceFrame.dimensions.width;
          const frameHeight = deviceFrame.dimensions.height;
          
          // Calculate scale to match or exceed original image resolution
          exportScale = Math.max(
            originalImageDimensions.width / frameWidth,
            originalImageDimensions.height / frameHeight,
            4 // Minimum 4x scale for high quality
          );
        }
        
        const exportWidth = deviceFrame.dimensions.width * exportScale;
        const exportHeight = deviceFrame.dimensions.height * exportScale;
        
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = exportWidth;
        exportCanvas.height = exportHeight;
        const exportCtx = exportCanvas.getContext('2d');
        
        if (!exportCtx) {
          reject(new Error('Could not create export canvas context'));
          return;
        }
        
        // Configure context for maximum quality
        exportCtx.imageSmoothingEnabled = true;
        exportCtx.imageSmoothingQuality = 'high';
        
        // REDRAW EVERYTHING AT HIGH RESOLUTION instead of scaling up low-res canvas
        
        // 1. Draw device frame background at high resolution
        exportCtx.fillStyle = deviceFrame.frameColor;
        drawRoundedRect(
          exportCtx,
          0,
          0,
          exportWidth,
          exportHeight,
          deviceFrame.cornerRadius * exportScale
        );
        exportCtx.fill();
        
        // 2. Create screen area clipping path at high resolution
        const screenArea = deviceFrame.screenArea;
        exportCtx.save();
        drawRoundedRect(
          exportCtx,
          screenArea.x * exportScale,
          screenArea.y * exportScale,
          screenArea.width * exportScale,
          screenArea.height * exportScale,
          deviceFrame.cornerRadius * exportScale
        );
        exportCtx.clip();
        
        // 3. Draw the original high-resolution image to match preview exactly
        // The preview fills the entire screen area, so we do the same in export
        exportCtx.drawImage(
          image,
          screenArea.x * exportScale,
          screenArea.y * exportScale,
          screenArea.width * exportScale,
          screenArea.height * exportScale
        );
        
        exportCtx.restore();
        
        // 4. Draw notch at high resolution if device has one
        if (deviceFrame.hasNotch && deviceFrame.notch) {
          exportCtx.fillStyle = '#000000';
          drawRoundedRect(
            exportCtx,
            deviceFrame.notch.x * exportScale,
            deviceFrame.notch.y * exportScale,
            deviceFrame.notch.width * exportScale,
            deviceFrame.notch.height * exportScale,
            12 * exportScale
          );
          exportCtx.fill();
        }
        
        // 5. Draw Dynamic Island at high resolution if device has one
        if (deviceFrame.hasDynamicIsland && deviceFrame.dynamicIsland) {
          exportCtx.fillStyle = '#000000';
          drawRoundedRect(
            exportCtx,
            deviceFrame.dynamicIsland.x * exportScale,
            deviceFrame.dynamicIsland.y * exportScale,
            deviceFrame.dynamicIsland.width * exportScale,
            deviceFrame.dynamicIsland.height * exportScale,
            9 * exportScale
          );
          exportCtx.fill();
        }
        
        // Export with maximum quality
        exportCanvas.toBlob((blob) => {
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
