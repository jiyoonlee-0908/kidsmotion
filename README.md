# KidsMotion - Scientific Children's Fitness Analysis System

## 🎯 Overview

KidsMotion is a comprehensive web application that provides scientific measurement and AI-powered analysis of children's physical fitness capabilities. The system uses smart cycling equipment to measure various fitness parameters including explosive power, strength, muscle endurance, and cardiovascular endurance, then generates personalized exercise recommendations and professional reports.

## 🏗️ System Architecture

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

## 📁 Code Structure

```
KidsMotion/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── measurement-form.tsx # Fitness measurement input form
│   │   │   ├── results-display.tsx  # Analysis results visualization
│   │   │   ├── simple-measurement-history.tsx # Measurement records management
│   │   │   ├── navigation.tsx       # Site navigation
│   │   │   └── ui/                  # Shadcn/ui components
│   │   ├── lib/
│   │   │   ├── fitness-calculations.ts # Frontend percentile calculations
│   │   │   └── queryClient.ts       # React Query configuration
│   │   ├── pages/                   # Route components
│   │   └── App.tsx                  # Main application component
├── server/                          # Backend Express application
│   ├── db.ts                        # Database connection (Neon PostgreSQL)
│   ├── routes.ts                    # API endpoints
│   ├── storage.ts                   # Database storage interface
│   ├── percentile.ts                # Core percentile calculation algorithms
│   ├── supabase.ts                  # Supabase integration
│   ├── openai.ts                    # AI analysis integration
│   └── index.ts                     # Express server entry point
├── shared/
│   └── schema.ts                    # Shared TypeScript schemas (Drizzle)
├── snapshots/                       # HTML report snapshots storage
├── public/                          # Static assets
├── package.json                     # Dependencies and scripts
├── drizzle.config.ts               # Database configuration
├── vite.config.ts                  # Vite bundler configuration
└── replit.md                       # Project documentation and preferences
```

## 🧮 Percentile Calculation Algorithm

### Core Algorithm Philosophy

KidsMotion uses scientifically-validated allometric scaling to ensure fair comparison across different age groups and body sizes. The system implements age-specific scaling exponents based on exercise physiology research.

### Age-Specific Allometric Scaling

```typescript
// Age-specific scaling exponents
const getScalingExponent = (age: number): number => {
  if (age <= 9) return 0.75;      // Younger children
  if (age <= 13) return 0.72;     // Pre-adolescent
  return 0.67;                    // Adolescent and older
};

// Relative power calculation
const relativePower = absolutePower / Math.pow(weight, scalingExponent);
```

### 5-Grade Percentile System

The system uses 5 key percentile benchmarks (P3, P15, P50, P85, P97) to classify fitness levels:

```typescript
// Grade classification
1등급: ≥97% (매우우수 - Very Excellent)
2등급: 85-96% (우수 - Excellent) 
3등급: 15-84% (보통 - Average)
4등급: 3-14% (부족 - Below Average)
5등급: <3% (매우부족 - Poor)
```

### Linear Interpolation Formula

For precise percentile calculation between benchmark points:

```typescript
const interpolatePercentile = (
  power: number, 
  lowerValue: number, 
  upperValue: number, 
  lowerPercentile: number, 
  upperPercentile: number
): number => {
  if (power <= lowerValue) return lowerPercentile;
  if (power >= upperValue) return upperPercentile;
  
  const ratio = (power - lowerValue) / (upperValue - lowerValue);
  return lowerPercentile + ratio * (upperPercentile - lowerPercentile);
};
```

### Implementation Files

- **`server/percentile.ts`**: Core percentile calculation engine
- **`client/src/lib/fitness-calculations.ts`**: Frontend calculation utilities
- **`server/build-wattbike-cutoffs.ts`**: Cutoff value generation
- **`fitness_evaluation_standards.csv`**: Reference data standards

## 🔗 Database Integration

### Neon PostgreSQL (Primary Database)

KidsMotion uses Neon serverless PostgreSQL as the primary database for local measurements and user sessions.

```typescript
// Database connection (server/db.ts)
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";

neonConfig.webSocketConstructor = ws;

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});
export const db = drizzle({ client: pool, schema });
```

### Database Schema (shared/schema.ts)

```typescript
// Primary measurement table
export const measurements = pgTable('measurements', {
  id: serial('id').primaryKey(),
  studentName: text('student_name').notNull(),
  age: integer('age').notNull(),
  gender: text('gender').notNull(),
  height: real('height'),
  weight: real('weight'),
  affiliation: text('affiliation'),
  birthDate: text('birth_date'),
  measureDate: text('measure_date'),
  power5s: real('power5s'),
  power15s: real('power15s'),
  power30s: real('power30s'),
  power60s: real('power60s'),
  power180s: real('power180s'),
  power360s: real('power360s'),
  leftBalance: real('left_balance'),
  rightBalance: real('right_balance'),
  maxHeartRate: integer('max_heart_rate'),
  avgHeartRate: integer('avg_heart_rate'),
  createdAt: timestamp('created_at').defaultNow()
});

// Report snapshots for sharing
export const reportSnapshots = pgTable('fitness_report_snapshots', {
  id: serial('id').primaryKey(),
  measurementId: bigint('measurement_id', { mode: 'number' }).notNull(),
  htmlContent: text('html_content').notNull(),
  fileName: text('file_name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  reportUrl: text('report_url')
});
```

## 🔌 Supabase Integration

### External Data Source

Supabase serves as an external data repository containing fitness measurements from the KidsMotion mobile application. This enables automatic data prefilling and cross-platform data synchronization.

### Connection Configuration

```typescript
// server/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
```

### Data Flow Architecture

```
KidsMotion Mobile App → Supabase → Web Application → Analysis → Report
```

### Supabase Table Structure

```sql
-- Participants table in Supabase
participants (
  id: bigint PRIMARY KEY,
  name: text,
  birth_date: date,
  gender: text,
  organization: text,
  measure_date: date,
  height: real,
  weight: real,
  created_at: timestamptz,
  
  -- Fitness measurement data
  power_5s: real,
  power_15s: real,
  power_30s: real,
  power_60s: real,
  power_180s: real,
  power_360s: real,
  left_balance: real,
  right_balance: real,
  max_heart_rate: integer,
  avg_heart_rate: integer
)
```

### Duplicate Prevention System

The system implements 4-field unique identification to prevent duplicate entries:

```typescript
// Duplicate detection logic (server/supabase.ts)
const uniqueKey = `${name}-${birthDate}-${organization}-${measureDate}`;

// Keep only the latest record for each unique combination
const deduplicatedParticipants = participants.reduce((acc, participant) => {
  const key = `${participant.name}-${participant.birth_date}-${participant.organization}-${participant.measure_date}`;
  
  if (!acc[key] || new Date(participant.created_at) > new Date(acc[key].created_at)) {
    acc[key] = participant;
  }
  return acc;
}, {} as Record<string, any>);
```

## 🌐 Web Application Workflow

### 1. Data Input Phase

**Manual Input:**
- User enters student information (name, age, gender, height, weight, affiliation)
- Measurement results input (5s, 15s, 30s, 60s, 180s, 360s intervals)
- Balance data (left/right power distribution)
- Heart rate data (optional)

**Automatic Supabase Integration:**
- Real-time name search with duplicate handling
- Automatic form prefilling from existing Supabase data
- Multiple measurement date selection for same student

```typescript
// Auto-prefill workflow (client/src/components/measurement-form.tsx)
const handleNameSearch = async (name: string) => {
  const response = await fetch(`/api/supabase/search-user/${encodeURIComponent(name)}`);
  const userData = await response.json();
  
  if (userData.multiple) {
    // Show date selection for multiple measurements
    setMultipleParticipants(userData.participants);
  } else if (userData.participant) {
    // Auto-fill form with single participant data
    prefillFormData(userData.participant);
  }
};
```

### 2. Analysis Processing

**Server-Side Calculation:**
```typescript
// Analysis pipeline (server/routes.ts)
app.post('/api/measurements', async (req, res) => {
  // 1. Validate input data
  const validatedData = insertMeasurementSchema.parse(req.body);
  
  // 2. Calculate percentiles for each time interval
  const analysis = {
    percentile5s: calculatePercentile(validatedData.power5s, age, gender, '5s'),
    percentile15s: calculatePercentile(validatedData.power15s, age, gender, '15s'),
    // ... other intervals
    overallPercentile: calculateOverallPercentile(allPowers, age, gender)
  };
  
  // 3. Generate AI commentary
  const aiAnalysis = await generateFitnessAnalysis(validatedData, analysis);
  
  // 4. Store measurement and return complete analysis
  const result = await storage.createMeasurement(validatedData);
  res.json({ measurement: result, analysis, aiAnalysis });
});
```

### 3. AI-Powered Analysis

**OpenAI Integration:**
```typescript
// AI analysis generation (server/openai.ts)
export async function generateFitnessAnalysis(
  measurement: any, 
  analysis: any
): Promise<string> {
  const prompt = `
아동 체력 측정 결과를 분석해주세요:
- 나이: ${measurement.age}세 (${measurement.gender === 'M' ? '남자' : '여자'})
- 5초 파워: ${measurement.power5s}W (${Math.round(analysis.percentile5s)}%)
- 15초 파워: ${measurement.power15s}W (${Math.round(analysis.percentile15s)}%)
- 30초 파워: ${measurement.power30s}W (${Math.round(analysis.percentile30s)}%)
- 60초 파워: ${measurement.power60s}W (${Math.round(analysis.percentile60s)}%)

전문적이고 건설적인 분석과 운동 권장사항을 제공해주세요.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1000,
    temperature: 0.7
  });

  return response.choices[0].message.content || '';
}
```

### 4. Report Generation & Sharing

**HTML Snapshot System:**
```typescript
// Report snapshot creation (client/src/components/results-display.tsx)
const saveReportSnapshot = async (measurementId: number) => {
  // 1. Capture complete HTML including charts and QR code
  const reportElement = document.getElementById('fitness-report');
  const canvas = await html2canvas(reportElement);
  
  // 2. Generate QR code for sharing
  const qrCodeElement = document.querySelector('.qr-code-container');
  
  // 3. Save HTML snapshot to server
  const htmlContent = reportElement.outerHTML;
  const response = await fetch('/api/save-report-snapshot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      measurementId,
      htmlContent,
      fileName: `${measurementId}.html`
    })
  });
  
  return response.json();
};
```

**QR Code Sharing:**
```typescript
// QR code generation for mobile access
const reportUrl = `${window.location.origin}/report/${measurementId}`;
<QRCodeSVG value={reportUrl} size={150} />
```

## 🔄 Supabase ↔ Web Application Data Flow

### 1. Mobile App → Supabase
```
KidsMotion Mobile App
↓ (Measurements)
Supabase Database
↓ (Real-time sync)
Web Application (Auto-prefill)
```

### 2. Web App → Analysis → Report
```
Web Form Input
↓ (Process)
Local PostgreSQL Storage
↓ (Calculate)
Percentile Analysis Engine
↓ (Generate)
AI-Powered Report
↓ (Save)
HTML Snapshot Storage
↓ (Share)
QR Code Access
```

### 3. Cross-Platform Access
```
Mobile Measurement → Supabase → Web Analysis → QR Code → Mobile Report View
```

## 🧪 Testing Structure

### 1. Manual Testing Workflow

**Frontend Testing:**
```bash
# Start development server
npm run dev

# Test measurement input
# 1. Navigate to measurement form
# 2. Enter test data:
#    - Name: "김철수" or "박시아" (test users in Supabase)
#    - Verify auto-prefill functionality
#    - Enter power measurements
#    - Submit and verify analysis

# Test measurement history
# 1. Navigate to /records
# 2. Search by student name
# 3. Verify report list without grade badges
# 4. Test "리포트 보기" functionality
```

**Backend API Testing:**
```bash
# Test Supabase connection
curl -X GET http://localhost:5000/api/supabase/search-user/박시아

# Test measurement creation
curl -X POST http://localhost:5000/api/measurements \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "테스트학생",
    "age": 10,
    "gender": "M",
    "height": 140,
    "weight": 35,
    "power5s": 180,
    "power15s": 160,
    "power30s": 140,
    "power60s": 120
  }'

# Test percentile calculation
curl -X GET http://localhost:5000/api/percentile-test
```

### 2. Database Testing

**PostgreSQL Connection:**
```bash
# Check database status
npm run db:push

# Verify tables exist
# Connect to database and run:
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

**Supabase Integration:**
```typescript
// Test Supabase connection (server/test-supabase-table.ts)
async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('participants')
      .select('*')
      .limit(5);
    
    console.log('Supabase test successful:', data?.length, 'records');
    return data;
  } catch (error) {
    console.error('Supabase test failed:', error);
  }
}
```

### 3. Algorithm Validation

**Percentile Accuracy Testing:**
```typescript
// Test percentile calculations (server/percentile.ts)
const testCases = [
  { age: 10, gender: 'M', power: 150, expected: '~85%' },
  { age: 12, gender: 'F', power: 120, expected: '~50%' },
  // Add more test cases
];

testCases.forEach(test => {
  const result = calculatePercentile(test.power, test.age, test.gender, '30s');
  console.log(`Age ${test.age}, Power ${test.power}W → ${result}% (expected ${test.expected})`);
});
```

## 🚀 Deployment & Environment

### Development Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add: DATABASE_URL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY

# Initialize database
npm run db:push

# Start development server
npm run dev
```

### Production Deployment

**Replit Autoscale:**
- Platform: Replit autoscale deployment
- Domain: kidsmotion.bike
- Build: Vite production build with Express server bundle
- Database: Neon PostgreSQL with connection pooling

**Environment Variables:**
```
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
OPENAI_API_KEY=sk-...
```

## 📊 Key Features

### 1. Scientific Accuracy
- Age-specific allometric scaling for fair comparison
- Research-validated percentile benchmarks
- Gender and age-appropriate fitness standards

### 2. Real-time Integration
- Supabase automatic data synchronization
- Duplicate prevention with 4-field unique identification
- Cross-platform measurement accessibility

### 3. Professional Reporting
- AI-generated personalized analysis
- Interactive charts and visualizations
- QR code sharing for mobile access
- Print-optimized report formatting

### 4. User Experience
- Progressive Web App (PWA) functionality
- Responsive design for all devices
- Intuitive measurement input workflow
- Comprehensive measurement history management

## 🔧 Maintenance & Updates

### Regular Maintenance Tasks

1. **Database Cleanup**: Remove duplicate Supabase entries
2. **Snapshot Management**: Archive old HTML snapshots
3. **Algorithm Updates**: Update percentile benchmarks as needed
4. **Security**: Rotate API keys and database credentials

### Version Control

```bash
# Current branch structure
main/              # Production deployment
development/       # Feature development
feature/xyz        # Individual features
```

### Performance Monitoring

- Server response times via Express logging
- Database query performance monitoring
- Supabase connection reliability tracking
- User interaction analytics

---

## 📧 Support & Contact

For technical issues or algorithm questions, refer to the replit.md file for the latest project status and recent changes.

**Key Maintainers:**
- Algorithm Development: Core percentile calculation system
- Database Integration: Supabase and PostgreSQL management
- Frontend Development: React/TypeScript implementation
- AI Integration: OpenAI analysis generation

---

*Last Updated: July 24, 2025*
*Version: 2.0.0*
*License: Proprietary (Patent Pending)*