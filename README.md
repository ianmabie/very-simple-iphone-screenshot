# iPhone Mockup Generator

A simple, client-side web application for creating professional iPhone mockups from screenshots. Upload your app screenshots and automatically place them within realistic iPhone frames with Dynamic Island support.

![iPhone Mockup Generator](generated-icon.png)

## Features

- **Drag & Drop Upload**: Simple file upload with support for PNG, JPG, and HEIC formats
- **Automatic Device Detection**: Smart device recommendation based on screenshot dimensions
- **Dynamic Island Support**: Modern iPhone 15 Pro/15 frames with authentic Dynamic Island design
- **Classic iPhone Support**: iPhone 13/14 models with traditional notch design
- **High-Quality Export**: Export mockups as PNG files with transparent backgrounds
- **Dual Quality Options**: Choose between high-quality (~2.8MB) and low-quality (~1.2MB) exports
- **Client-Side Processing**: All image processing happens in your browser - no data leaves your device
- **Zero Configuration**: No database setup required - runs anywhere Node.js is supported

## Device Frames Included

### Modern (Dynamic Island)
- iPhone 15 Pro
- iPhone 15
- iPhone 14 Pro

### Classic (Notch)
- iPhone 14
- iPhone 13 Pro
- iPhone 13

## Quick Start

### Prerequisites
- Node.js 18 or higher
- Works on Windows, macOS, and Linux

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd iphone-mockup-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5000
   ```

### Troubleshooting

If you encounter port issues on macOS or Windows, try:
- Using a different port: `PORT=3000 npm run dev`
- Ensuring no other applications are using port 5000

## Usage

1. **Upload Screenshot**: Drag and drop your iPhone screenshot or click to browse
2. **Automatic Fitting**: Your screenshot is automatically positioned within the device frame
3. **View Preview**: See your mockup in real-time with authentic iPhone styling
4. **Export Options**: 
   - **High Quality**: Perfect for App Store submissions and marketing materials
   - **Low Quality**: Great for quick sharing and web use
5. **Download**: Click your preferred quality option to download the PNG file

## Technical Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with Shadcn/ui components
- **HTML5 Canvas** for image processing
- **TanStack Query** for state management

### Backend
- **Express.js** (minimal - just serves static files)
- **No database required**
- **No cloud storage dependencies**

### Image Processing
- All processing happens client-side using HTML5 Canvas
- Original image resolution preserved for high-quality exports
- Transparent background support
- Automatic scaling and positioning

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run check
```

## Deployment

The app can be deployed to any platform that supports Node.js:

### Vercel/Netlify
```bash
npm run build
# Deploy the dist/ folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### Traditional Hosting
1. Run `npm run build`
2. Copy the `dist/` folder to your server
3. Run `node dist/index.js`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and device frames
│   │   └── pages/         # Application pages
├── server/                # Minimal Express backend
├── shared/                # Shared types and schemas
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Key Files

- `client/src/lib/device-frames.ts` - iPhone frame definitions and specifications
- `client/src/hooks/use-canvas.ts` - Canvas operations and image processing
- `client/src/components/PreviewCanvas.tsx` - Real-time mockup preview
- `client/src/components/ExportPanel.tsx` - Export functionality with quality options

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- iPhone frame designs based on official Apple specifications
- Dynamic Island proportions carefully measured for authenticity
- Built with modern web technologies for optimal performance

---

**Note**: This application processes all images locally in your browser. No screenshots or generated mockups are uploaded to any server, ensuring complete privacy and security.