import { DeviceFrame, deviceFrames } from '@/lib/device-frames';
import { Smartphone } from 'lucide-react';

interface DeviceSelectorProps {
  selectedDevice: DeviceFrame | null;
  onDeviceSelect: (device: DeviceFrame) => void;
}

export function DeviceSelector({ selectedDevice, onDeviceSelect }: DeviceSelectorProps) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Device Frame</h3>
      <div className="grid grid-cols-2 gap-3">
        {deviceFrames.map((device) => (
          <button
            key={device.id}
            onClick={() => onDeviceSelect(device)}
            className={`p-3 border rounded-lg transition-all text-left group ${
              selectedDevice?.id === device.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-12 bg-gray-900 rounded-md flex items-center justify-center">
                <div className="w-6 h-10 bg-white rounded-sm flex items-center justify-center">
                  <Smartphone className="w-3 h-3 text-gray-400" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{device.displayName}</p>
                <p className="text-xs text-gray-500">
                  {device.dimensions.width}×{device.dimensions.height}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
