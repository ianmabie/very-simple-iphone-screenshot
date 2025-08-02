# replit.md

## Overview

This is a client-side web application for creating device mockups from screenshots. Users can upload screenshots and place them within realistic device frames (like iPhone models) to create professional-looking mockups for app stores, presentations, or marketing materials. The application features a React frontend with TypeScript and a minimal Express.js backend for serving static files. All image processing happens client-side with no database or persistent storage requirements.

## User Preferences

Preferred communication style: Simple, everyday language.
Interface preference: Clean, simplified UI with minimal controls and automatic features.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming and dark mode support
- **State Management**: TanStack Query for server state and local React state for UI interactions
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **Canvas Operations**: Custom HTML5 Canvas implementation for image manipulation and mockup generation
- **File Handling**: Custom drag-and-drop file upload with validation for image types (PNG, JPG, HEIC)

### Backend Architecture
- **Framework**: Minimal Express.js server with TypeScript
- **Database**: None - no persistent storage required
- **Authentication**: None - no user accounts needed
- **Storage**: No storage layer - all processing client-side
- **API Structure**: Simple health check endpoint at /api/health
- **Development Setup**: Hot reloading with Vite integration in development mode

### Core Features
- **Device Frame Library**: iPhone models from iPhone 13 onwards with proper notch/Dynamic Island designs
- **Unified Interface**: Combined upload and preview area with drag-and-drop functionality
- **Automatic Image Fitting**: Screenshots are automatically fitted to device screen areas without manual scaling
- **Export System**: PNG export with transparent background
- **Device Recommendation**: Automatic device suggestion based on screenshot dimensions
- **Modern iPhone Support**: Includes iPhone 15 Pro/15 (Dynamic Island) and iPhone 13/14 (notch) variants

### Build and Deployment
- **Development**: Vite dev server with Express backend proxy
- **Production Build**: Vite builds frontend to dist/public, esbuild bundles minimal backend to dist/
- **Type Safety**: Shared TypeScript types between frontend and backend
- **No Database Setup**: Zero database configuration required for deployment
- **Simplified Deployment**: Can be deployed anywhere Node.js is supported with just `npm install` and `npm start`

## External Dependencies

### Core Dependencies
- **No Database**: Eliminated PostgreSQL and Drizzle ORM dependencies
- **No Cloud Storage**: Removed Google Cloud Storage and Uppy.js dependencies
- **Simplified Architecture**: Client-side only processing with minimal server footprint

### UI and Styling
- **Radix UI**: Accessible component primitives for complex UI components
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Replit Integration**: Cartographer plugin for development environment optimization
- **TypeScript**: Full type safety across the application
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Image Processing
- **HTML5 Canvas**: Native browser image manipulation
- **File API**: Browser-native file handling for uploads
- **Blob API**: Image export and download functionality