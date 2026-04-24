<div align="center">

# SkillConnect JK

**A public-private partnership platform providing outcome-linked skilling credit to youth in Jammu & Kashmir.**

<br/>

<img src="https://img.shields.io/badge/Backend-NestJS-0D1117?style=for-the-badge&labelColor=161B22&color=FFA657" />
<img src="https://img.shields.io/badge/Frontend-Next.js%2014-0D1117?style=for-the-badge&logo=nextdotjs&logoColor=58A6FF&labelColor=161B22" />
<img src="https://img.shields.io/badge/DB-PostgreSQL%20%C2%B7%20Redis-0D1117?style=for-the-badge&labelColor=161B22&color=58A6FF" />
<img src="https://img.shields.io/badge/i18n-EN%20%C2%B7%20HI%20%C2%B7%20UR%20%C2%B7%20KS-0D1117?style=for-the-badge&labelColor=161B22&color=8B949E" />
<img src="https://img.shields.io/badge/Context-Policy%20Hackathon-0D1117?style=for-the-badge&labelColor=161B22&color=FFA657" />

</div>

---

## TL;DR

A financing rail that lets banks fund skilling **without government subsidies** by engineering accountability into the product:

- **Milestone-based disbursement** — tranches of 30% / 30% / 20% / 20%
- **Dynamic Training-Provider guarantees** — sized from a live **TPScore**
- **UPI AutoPay** repayments
- **Risk-based pricing** via a 0–100 **Borrower Score**

Built for the Jammu Policy Hackathon.

---

## Architecture

```
skillconnect-jk/
├── apps/
│   ├── backend/          NestJS API server
│   └── frontend/         Next.js web application
├── packages/
│   └── shared/           Shared types + utilities
└── docker/               Docker configurations
```

### Stack

**Backend** — NestJS · TypeScript · PostgreSQL (TypeORM) · Redis · Bull queue · JWT (Passport)
**Frontend** — Next.js 14 · TypeScript · Tailwind + shadcn/ui · React Query + Zustand · next-intl (EN/HI/UR/KS)

---

## Features by persona

### 🎓 Learners (18–29)
- Browse accredited courses (IT/ITeS · Electronics · Tourism/Hospitality)
- Apply for skill loans ₹5,000 – ₹1,50,000
- Track learning progress and loan status
- Automated EMI payments via UPI AutoPay

### 🏫 Training providers
- Manage courses and batches
- Upload attendance and assessment data
- Track milestone disbursements
- View guarantee deposit status

### 🏦 Banks
- Review loan applications
- Monitor portfolio performance
- Process disbursements
- Manage collections

### 🛠️ Administrators
- Accredit training providers
- Configure policies and parameters
- Monitor system KPIs
- Generate reports

---

## Money flow

```mermaid
flowchart LR
    B[Bank] -->|1: approve| L[Loan]
    L -->|30% tranche 1| T[Training Provider]
    T -->|attendance + assessments| S[SkillConnect]
    S -->|milestone met| L
    L -->|30% / 20% / 20%| T
    L -.->|UPI AutoPay| B
    S -->|TPScore| G[TP Guarantee<br/>deposit]
```

---

## Quick start

**Prereqs** — Node ≥ 18 · PostgreSQL ≥ 14 · Redis ≥ 7 · pnpm (recommended)

```bash
cd skillconnect-jk
pnpm install

# Backend
cd apps/backend
cp .env.example .env
pnpm dev

# Frontend (separate terminal)
cd apps/frontend
cp .env.example .env
pnpm dev
```

---

<div align="center">
<sub>Policy hackathon submission · Part of <a href="https://github.com/pbathuri">@pbathuri</a>'s <a href="https://github.com/pbathuri/Map_Projects_MAC">project portfolio</a></sub>
</div>
