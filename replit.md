# replit.md

## Overview

This is a full-stack web application for creating device mockups from screenshots. Users can upload screenshots and place them within realistic device frames (like iPhone models) to create professional-looking mockups for app stores, presentations, or marketing materials. The application features a React frontend with TypeScript, an Express.js backend, and uses PostgreSQL with Drizzle ORM for data persistence.

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
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Basic user schema with username/password (implementation not yet complete)
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **API Structure**: RESTful API with /api prefix for all endpoints
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
- **Production Build**: Vite builds frontend to dist/public, esbuild bundles backend to dist/
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Database Migrations**: Drizzle Kit for schema management and migrations

## External Dependencies

### Database
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL
- **Drizzle ORM**: Type-safe database operations with schema-first approach

### Cloud Services
- **Google Cloud Storage**: File storage capabilities (configured but not yet implemented)
- **File Upload**: Uppy.js integration for advanced file upload features

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