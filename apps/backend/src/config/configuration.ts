export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),

  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USERNAME || 'skillconnect',
    password: process.env.DATABASE_PASSWORD || 'skillconnect_password',
    name: process.env.DATABASE_NAME || 'skillconnect_jk',
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-change-me',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  integrations: {
    digilocker: {
      apiUrl: process.env.DIGILOCKER_API_URL || 'http://localhost:4000/mock/digilocker',
      clientId: process.env.DIGILOCKER_CLIENT_ID || 'mock-client-id',
      clientSecret: process.env.DIGILOCKER_CLIENT_SECRET || 'mock-client-secret',
    },
    bank: {
      apiUrl: process.env.BANK_API_URL || 'http://localhost:4000/mock/bank',
      apiKey: process.env.BANK_API_KEY || 'mock-bank-api-key',
    },
    upiAutopay: {
      apiUrl: process.env.UPI_AUTOPAY_API_URL || 'http://localhost:4000/mock/upi',
      merchantId: process.env.UPI_MERCHANT_ID || 'mock-merchant-id',
      secret: process.env.UPI_SECRET || 'mock-upi-secret',
    },
  },

  // Credit Guarantee Fund for Skill Development
  cgfssd: {
    coveragePercentage: parseFloat(process.env.CGFSSD_COVERAGE_PERCENTAGE || '75'),
  },

  platform: {
    feePercentage: parseFloat(process.env.PLATFORM_FEE_PERCENTAGE || '2.5'),
    defaultInterestSpread: parseFloat(process.env.DEFAULT_INTEREST_SPREAD || '1.5'),
    mclrRate: parseFloat(process.env.MCLR_RATE || '8.5'),
  },

  rateLimit: {
    ttl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },

  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },

  // Loan configuration based on Model Skill Loan Scheme
  loan: {
    minAmount: 5000,
    maxAmount: 150000,
    minTenureMonths: 36,
    maxTenureMonths: 84,
    moratoriumMonths: 3, // After course completion
    stepUpEmiMonths: 6, // First N EMIs at 50%
    stepUpEmiPercentage: 50,
  },

  // Milestone disbursement percentages
  disbursement: {
    t0: 30, // On enrollment
    t1: 30, // At 33% completion
    t2: 20, // At 66% completion
    t3: 20, // On certification
  },

  // Interest spread based on Borrower Score
  interestSpread: {
    lowRisk: 1.0, // Score >= 80
    moderateRisk: 1.5, // Score 50-79
    highRisk: 2.0, // Score < 50
  },

  // TP Guarantee percentages based on TPScore
  tpGuarantee: {
    strong: 15, // Score >= 80
    average: 25, // Score 50-79
    risky: 30, // Score < 50
  },
});

