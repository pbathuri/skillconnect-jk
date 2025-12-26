Cursor linked correctly – test commit

# SkillConnect JK

A public-private partnership (PPP) platform providing outcome-linked skilling credit to youth in Jammu & Kashmir.

## Overview

SkillConnect JK enables banks to finance skilling without government subsidies by enforcing accountability through:
- **Milestone-based loan disbursements** - Funds released in tranches (30%, 30%, 20%, 20%)
- **Training Provider (TP) performance guarantees** - Dynamic guarantee deposits based on TPScore
- **Automated repayments** via UPI AutoPay
- **Risk-based pricing** using Borrower Score (0-100)

## Architecture

```
skillconnect-jk/
├── apps/
│   ├── backend/          # NestJS API server
│   └── frontend/         # Next.js web application
├── packages/
│   └── shared/           # Shared types and utilities
└── docker/               # Docker configurations
```

## Tech Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Cache**: Redis
- **Queue**: Bull (Redis-based)
- **Auth**: JWT with Passport.js

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: React Query + Zustand
- **i18n**: next-intl (English, Hindi, Urdu, Kashmiri)

## Features

### For Learners (18-29 years)
- Browse accredited courses (IT/ITeS, Electronics, Tourism/Hospitality)
- Apply for skill loans (₹5,000 - ₹1,50,000)
- Track learning progress and loan status
- Automated EMI payments via UPI AutoPay

### For Training Providers
- Manage courses and batches
- Upload attendance and assessment data
- Track milestone disbursements
- View guarantee deposit status

### For Banks
- Review loan applications
- Monitor portfolio performance
- Process disbursements
- Manage collections

### For Administrators
- Accredit training providers
- Configure policies and parameters
- Monitor system KPIs
- Generate reports

## Quick Start

### Prerequisites
- Node.js >= 18
- PostgreSQL >= 14
- Redis >= 7
- pnpm (recommended)

### Installation

```bash
# Clone and install dependencies
cd skillconnect-jk
npm install

# Set up environment variables
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env.local

# Run database migrations
npm run db:migrate

# Seed sample data
npm run db:seed

# Start development servers
npm run dev
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api/v1
- **API Documentation**: http://localhost:4000/api/docs

## Key Concepts

### Borrower Score (0-100)
Weighted index evaluating learner creditworthiness:
- KYC & Identity Verification: 10%
- Education & Skills Baseline: 20%
- Income & Financial Information: 15%
- Course Fit & Demand: 25%
- Commitment Indicators: 20%
- Community Endorsement: 10%

**Thresholds**:
- ≥80: Low risk, full loan eligible, lowest spread
- 50-79: Moderate risk, may need co-signer
- <50: High risk, may be declined

### TPScore (0-100)
Training provider quality metric:
- Completion Rate: 30%
- Certification Rate: 25%
- Placement Rate: 20%
- Refund History: 15%
- Audit & Compliance: 10%

### Milestone Disbursement
| Milestone | Percentage | Trigger |
|-----------|------------|---------|
| T0 | 30% | Enrollment confirmed |
| T1 | 30% | 33% course completion |
| T2 | 20% | 66% course completion |
| T3 | 20% | Certification achieved |

### Repayment Structure
- **Moratorium**: Course duration + 3 months
- **Step-up EMI**: First 6 EMIs at 50%, then 100%
- **Tenure**: 3-7 years

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/kyc/initiate` - Initiate DigiLocker KYC

### Courses
- `GET /api/v1/courses` - List courses
- `GET /api/v1/courses/:id` - Course details
- `POST /api/v1/courses` - Create course (TP only)

### Loans
- `POST /api/v1/loans/apply` - Submit loan application
- `GET /api/v1/loans/:id` - Loan details
- `POST /api/v1/loans/:id/milestones/:milestone/verify` - Verify milestone

### Training Providers
- `GET /api/v1/training-providers` - List TPs
- `POST /api/v1/training-providers/:id/attendance` - Upload attendance
- `POST /api/v1/training-providers/:id/assessment` - Upload assessment

## Environment Variables

### Backend
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/skillconnect
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
DIGILOCKER_CLIENT_ID=xxx
BANK_API_BASE_URL=https://bank-api.example.com
```

### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Testing

```bash
# Run all tests
npm run test

# Run backend tests
cd apps/backend && npm run test

# Run frontend tests
cd apps/frontend && npm run test
```

## Deployment

### Docker Compose (Local)
```bash
docker-compose up -d
```

### Kubernetes
```bash
kubectl apply -f k8s/
```

## License

Proprietary - Government of Jammu & Kashmir

## References
- [Model Skill Loan Scheme](https://konkanlohanasamaj.com/skill-loan-scheme/)
- [CGFSSD Coverage](https://www.greaterkashmir.com/opinion/soaring-unemployment-rate/)
- [UPI AutoPay](https://www.microsave.net/2025/06/26/digital-convenience-new-ways-for-indias-mfi-borrowers-to-repay-loans/)

