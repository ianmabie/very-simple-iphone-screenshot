export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

export function exportCanvasAsPNG(
  canvas: HTMLCanvasElement,
  filename: string,
  quality: number = 1
): Promise<void> {
  return new Promise((resolve) => {
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
    }, 'image/png', quality);
  });
}

export function fitImageToArea(
  imageWidth: number,
  imageHeight: number,
  areaWidth: number,
  areaHeight: number
): { width: number; height: number; scale: number } {
  const scaleX = areaWidth / imageWidth;
  const scaleY = areaHeight / imageHeight;
  const scale = Math.min(scaleX, scaleY);
  
  return {
    width: imageWidth * scale,
    height: imageHeight * scale,
    scale
  };
}

export function getImageDimensions(image: HTMLImageElement): { width: number; height: number } {
  return {
    width: image.width,
    height: image.height
  };
}

export function recommendDevice(imageWidth: number, imageHeight: number) {
  const aspectRatio = imageWidth / imageHeight;
  
  // Common iPhone aspect ratios
  const devices = [
    { name: 'iPhone 14 Pro', aspectRatio: 0.486, screenWidth: 393, screenHeight: 852 },
    { name: 'iPhone 15', aspectRatio: 0.486, screenWidth: 393, screenHeight: 852 },
    { name: 'iPhone 12', aspectRatio: 0.486, screenWidth: 390, screenHeight: 844 },
    { name: 'iPhone SE', aspectRatio: 0.562, screenWidth: 375, screenHeight: 667 }
  ];
  
  let bestMatch = devices[0];
  let smallestDifference = Math.abs(aspectRatio - bestMatch.aspectRatio);
  
  for (const device of devices) {
    const difference = Math.abs(aspectRatio - device.aspectRatio);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      bestMatch = device;
    }
  }
  
  return bestMatch.name;
}
