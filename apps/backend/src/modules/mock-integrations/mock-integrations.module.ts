import { Module } from '@nestjs/common';
import { MockIntegrationsController } from './mock-integrations.controller';

/**
 * Mock Integrations Module
 * 
 * Provides mock endpoints for external service integrations:
 * - DigiLocker KYC
 * - Bank API (loan submission, disbursement, repayment)
 * - UPI AutoPay (mandate creation, payment callbacks)
 * 
 * These mocks can be easily replaced with real integrations in production.
 */
@Module({
  controllers: [MockIntegrationsController],
})
export class MockIntegrationsModule {}

