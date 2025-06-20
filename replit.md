# KidsMotion - Scientific Children's Fitness Analysis System

## Overview

KidsMotion is a comprehensive web application that provides scientific measurement and AI-powered analysis of children's physical fitness capabilities. The system uses smart cycling equipment to measure various fitness parameters including explosive power, strength, muscle endurance, and cardiovascular endurance, then generates personalized exercise recommendations and professional reports.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **State Management**: React Query (TanStack Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **PWA**: Progressive Web App with service worker for offline capabilities

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Design**: RESTful endpoints with type-safe schema validation

### Build System
- **Bundler**: Vite for development and production builds
- **Development**: Hot module replacement with Vite dev server
- **Production**: Static assets served by Express
- **TypeScript**: Strict type checking across client and server

## Key Components

### Data Collection
- **Smart Cycling Equipment**: Real-time power measurement (5s, 15s, 30s, 60s intervals)
- **Biometric Data**: Heart rate monitoring, left/right balance tracking
- **User Information**: Age, gender, height, weight, school affiliation

### Analysis Engine
- **Percentile Calculation**: Age and gender-specific fitness standards
- **Relative Power Calculation**: Using W/kg^0.67 formula for fair comparison
- **Balance Assessment**: Left/right power distribution analysis
- **BMI and Growth Tracking**: Health indicators and trend analysis

### AI Integration
- **OpenAI GPT-4**: Generates personalized fitness analysis reports
- **Analysis Components**: Core insights, balance commentary, exercise explanations
- **Recommendations**: Tailored improvement suggestions based on weak areas

### Report Generation
- **PDF Export**: Professional reports with charts and analysis
- **QR Code Sharing**: Easy access to results via mobile devices
- **Print Optimization**: Formatted for standard A4 printing
- **Mobile Responsive**: Optimized viewing across all devices

## Data Flow

1. **Data Input**: User enters student information and measurement results
2. **Validation**: Client and server-side validation using Zod schemas
3. **Storage**: Measurement data stored in PostgreSQL with Drizzle ORM
4. **Analysis**: Server calculates percentiles, grades, and relative power metrics
5. **AI Processing**: OpenAI generates personalized fitness commentary
6. **Presentation**: Results displayed with interactive charts and visualizations
7. **Export**: Users can generate PDF reports or share via QR codes

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **AI Service**: OpenAI API for analysis generation
- **UI Components**: Radix UI primitives for accessibility
- **Charting**: Recharts for responsive data visualization

### Development Tools
- **Build**: Vite with TypeScript support
- **ORM**: Drizzle Kit for database migrations
- **Validation**: Zod for type-safe schema validation
- **Testing**: Built-in Replit development environment

### Optional Integrations
- **PWA Features**: Service worker for offline functionality
- **Image Generation**: DALL-E integration for system visualization
- **Mobile Optimization**: Responsive design with touch-friendly interfaces

## Deployment Strategy

### Production Environment
- **Platform**: Replit autoscale deployment
- **Build Process**: Vite production build with Express server bundle
- **Database**: Neon PostgreSQL with connection pooling
- **Environment Variables**: Secure API key and database URL management

### Development Workflow
- **Local Development**: Vite dev server with hot reloading
- **Database Migrations**: Drizzle Kit for schema management
- **Type Safety**: Shared TypeScript schemas between client/server
- **Code Quality**: ESLint and TypeScript strict mode

### Scalability Considerations
- **Database**: Serverless PostgreSQL auto-scales with demand
- **Frontend**: Static assets served efficiently
- **API**: Stateless design for horizontal scaling
- **Caching**: Browser caching for static assets and API responses

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 17, 2025. Initial setup