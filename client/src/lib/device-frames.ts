export interface DeviceFrame {
  id: string;
  name: string;
  displayName: string;
  dimensions: {
    width: number;
    height: number;
  };
  screenArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  frameColor: string;
  cornerRadius: number;
  hasNotch: boolean;
  homeIndicator?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const deviceFrames: DeviceFrame[] = [
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    displayName: 'iPhone 14 Pro',
    dimensions: { width: 300, height: 600 },
    screenArea: { x: 8, y: 8, width: 284, height: 584 },
    frameColor: '#1f2937',
    cornerRadius: 24,
    hasNotch: true,
    homeIndicator: { x: 134, y: 588, width: 32, height: 4 }
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    displayName: 'iPhone 15',
    dimensions: { width: 300, height: 600 },
    screenArea: { x: 8, y: 8, width: 284, height: 584 },
    frameColor: '#1f2937',
    cornerRadius: 24,
    hasNotch: true,
    homeIndicator: { x: 134, y: 588, width: 32, height: 4 }
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE',
    displayName: 'iPhone SE',
    dimensions: { width: 280, height: 560 },
    screenArea: { x: 8, y: 60, width: 264, height: 440 },
    frameColor: '#1f2937',
    cornerRadius: 16,
    hasNotch: false
  },
  {
    id: 'iphone-12',
    name: 'iPhone 12',
    displayName: 'iPhone 12',
    dimensions: { width: 300, height: 600 },
    screenArea: { x: 8, y: 8, width: 284, height: 584 },
    frameColor: '#1f2937',
    cornerRadius: 24,
    hasNotch: true,
    homeIndicator: { x: 134, y: 588, width: 32, height: 4 }
  }
];
