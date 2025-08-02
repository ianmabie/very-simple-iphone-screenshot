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
  hasDynamicIsland: boolean;
  homeIndicator?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  notch?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  dynamicIsland?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const deviceFrames: DeviceFrame[] = [
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    displayName: 'iPhone 15 Pro',
    dimensions: { width: 300, height: 600 },
    screenArea: { x: 8, y: 8, width: 284, height: 584 },
    frameColor: '#1f2937',
    cornerRadius: 24,
    hasNotch: false,
    hasDynamicIsland: true,
    homeIndicator: { x: 134, y: 588, width: 32, height: 4 },
    dynamicIsland: { x: 120, y: 16, width: 60, height: 20 }
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    displayName: 'iPhone 15',
    dimensions: { width: 300, height: 600 },
    screenArea: { x: 8, y: 8, width: 284, height: 584 },
    frameColor: '#1f2937',
    cornerRadius: 24,
    hasNotch: false,
    hasDynamicIsland: true,
    homeIndicator: { x: 134, y: 588, width: 32, height: 4 },
    dynamicIsland: { x: 120, y: 16, width: 60, height: 20 }
  },
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    displayName: 'iPhone 14 Pro',
    dimensions: { width: 300, height: 600 },
    screenArea: { x: 8, y: 8, width: 284, height: 584 },
    frameColor: '#1f2937',
    cornerRadius: 24,
    hasNotch: false,
    hasDynamicIsland: true,
    homeIndicator: { x: 134, y: 588, width: 32, height: 4 },
    dynamicIsland: { x: 120, y: 16, width: 60, height: 20 }
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    displayName: 'iPhone 14',
    dimensions: { width: 300, height: 600 },
    screenArea: { x: 8, y: 8, width: 284, height: 584 },
    frameColor: '#1f2937',
    cornerRadius: 24,
    hasNotch: true,
    hasDynamicIsland: false,
    homeIndicator: { x: 134, y: 588, width: 32, height: 4 },
    notch: { x: 115, y: 8, width: 70, height: 24 }
  },
  {
    id: 'iphone-13-pro',
    name: 'iPhone 13 Pro',
    displayName: 'iPhone 13 Pro',
    dimensions: { width: 300, height: 600 },
    screenArea: { x: 8, y: 8, width: 284, height: 584 },
    frameColor: '#1f2937',
    cornerRadius: 24,
    hasNotch: true,
    hasDynamicIsland: false,
    homeIndicator: { x: 134, y: 588, width: 32, height: 4 },
    notch: { x: 115, y: 8, width: 70, height: 24 }
  },
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    displayName: 'iPhone 13',
    dimensions: { width: 300, height: 600 },
    screenArea: { x: 8, y: 8, width: 284, height: 584 },
    frameColor: '#1f2937',
    cornerRadius: 24,
    hasNotch: true,
    hasDynamicIsland: false,
    homeIndicator: { x: 134, y: 588, width: 32, height: 4 },
    notch: { x: 115, y: 8, width: 70, height: 24 }
  }
];
