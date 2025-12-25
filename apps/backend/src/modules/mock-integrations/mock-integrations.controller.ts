import { Controller, Post, Get, Body, Param, Query, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExcludeController } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

/**
 * Mock Integrations Controller
 * 
 * Simulates external service responses for development and testing.
 * In production, these would be replaced with actual API calls.
 */
@ApiTags('mock')
@ApiExcludeController() // Hide from public Swagger docs
@Controller('mock')
export class MockIntegrationsController {
  
  // ============ DigiLocker Mock ============

  @Get('digilocker/authorize')
  @ApiOperation({ summary: 'Mock DigiLocker OAuth authorization' })
  digilockerAuthorize(
    @Query('client_id') clientId: string,
    @Query('user_id') userId: string,
  ) {
    // Simulate DigiLocker OAuth flow
    return {
      status: 'success',
      message: 'Redirecting to DigiLocker consent screen',
      authorizationCode: uuidv4(),
      redirectUrl: `http://localhost:3000/kyc/callback?code=${uuidv4()}&user_id=${userId}`,
    };
  }

  @Post('digilocker/token')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mock DigiLocker token exchange' })
  digilockerToken(@Body() body: { code: string; client_id: string }) {
    return {
      access_token: `mock_access_${uuidv4()}`,
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: `mock_refresh_${uuidv4()}`,
    };
  }

  @Post('digilocker/aadhaar/verify')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mock Aadhaar eKYC verification' })
  verifyAadhaar(@Body() body: { access_token: string }) {
    // Simulate successful Aadhaar verification
    return {
      status: 'success',
      verified: true,
      data: {
        aadhaarNumber: '****' + Math.floor(1000 + Math.random() * 9000),
        name: 'Test User',
        dateOfBirth: '1998-05-15',
        gender: 'M',
        address: {
          house: '123',
          street: 'Main Road',
          locality: 'Lal Chowk',
          city: 'Srinagar',
          state: 'Jammu and Kashmir',
          pincode: '190001',
        },
        photo: 'base64_encoded_photo_here',
      },
      verificationId: uuidv4(),
      timestamp: new Date().toISOString(),
    };
  }

  // ============ Bank API Mock ============

  @Post('bank/loan/submit')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mock bank loan submission' })
  submitLoan(@Body() body: any) {
    return {
      status: 'success',
      bankApplicationId: `BANK-${Date.now()}`,
      message: 'Loan application received',
      estimatedDecisionTime: '2-3 business days',
      submittedAt: new Date().toISOString(),
    };
  }

  @Post('bank/loan/:applicationId/approve')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mock bank loan approval' })
  approveLoan(
    @Param('applicationId') applicationId: string,
    @Body() body: { approvedAmount: number },
  ) {
    return {
      status: 'approved',
      bankApplicationId: applicationId,
      approvedAmount: body.approvedAmount,
      loanAccountNumber: `LA${Date.now()}`,
      interestRate: 10.0,
      tenureMonths: 60,
      sanctionLetterUrl: `https://mock-bank.com/sanction/${applicationId}.pdf`,
      approvedAt: new Date().toISOString(),
    };
  }

  @Post('bank/disbursement')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mock bank disbursement' })
  processDisbursement(@Body() body: {
    loanAccountNumber: string;
    amount: number;
    beneficiaryAccount: string;
    beneficiaryIfsc: string;
    beneficiaryName: string;
  }) {
    return {
      status: 'success',
      transactionId: `TXN${Date.now()}`,
      utrNumber: `UTR${Date.now()}`,
      amount: body.amount,
      beneficiaryAccount: body.beneficiaryAccount,
      processedAt: new Date().toISOString(),
      expectedCreditTime: '2-4 hours',
    };
  }

  @Post('bank/repayment/record')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mock repayment recording' })
  recordRepayment(@Body() body: {
    loanAccountNumber: string;
    amount: number;
    transactionId: string;
  }) {
    return {
      status: 'success',
      receiptNumber: `RCP${Date.now()}`,
      amount: body.amount,
      remainingBalance: 50000, // Mock remaining balance
      nextEmiDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      recordedAt: new Date().toISOString(),
    };
  }

  // ============ UPI AutoPay Mock ============

  @Post('upi/mandate/create')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mock UPI mandate creation' })
  createMandate(@Body() body: {
    customerVpa: string;
    amount: number;
    frequency: string;
    startDate: string;
    endDate: string;
    purpose: string;
  }) {
    return {
      status: 'pending',
      mandateId: `MDT${Date.now()}`,
      customerVpa: body.customerVpa,
      amount: body.amount,
      frequency: body.frequency,
      validFrom: body.startDate,
      validTo: body.endDate,
      intentUrl: `upi://mandate?pa=skillconnect@bank&pn=SkillConnect&mc=5411&tid=${Date.now()}`,
      deepLink: `gpay://mandate?data=mock_mandate_data`,
      createdAt: new Date().toISOString(),
      message: 'Mandate created, awaiting customer approval',
    };
  }

  @Post('upi/mandate/:mandateId/status')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mock UPI mandate status check' })
  getMandateStatus(@Param('mandateId') mandateId: string) {
    // Simulate approved mandate
    return {
      mandateId,
      status: 'active',
      approvedAt: new Date().toISOString(),
      customerVpa: 'customer@upi',
      bankReference: `BANKREF${Date.now()}`,
    };
  }

  @Post('upi/mandate/:mandateId/execute')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mock UPI mandate execution (collect EMI)' })
  executeMandate(
    @Param('mandateId') mandateId: string,
    @Body() body: { amount: number; reference: string },
  ) {
    // Simulate successful collection 80% of the time
    const success = Math.random() > 0.2;

    if (success) {
      return {
        status: 'success',
        transactionId: `UPI${Date.now()}`,
        mandateId,
        amount: body.amount,
        reference: body.reference,
        utrNumber: `UTR${Date.now()}`,
        debitedAt: new Date().toISOString(),
      };
    } else {
      return {
        status: 'failed',
        mandateId,
        amount: body.amount,
        reference: body.reference,
        errorCode: 'INSUFFICIENT_BALANCE',
        errorMessage: 'Customer has insufficient balance',
        failedAt: new Date().toISOString(),
      };
    }
  }

  @Post('upi/callback')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mock UPI payment callback' })
  upiCallback(@Body() body: any) {
    // This would be called by UPI provider after payment
    console.log('UPI Callback received:', body);
    return { status: 'acknowledged' };
  }

  // ============ CGFSSD Mock ============

  @Post('cgfssd/claim')
  @HttpCode(200)
  @ApiOperation({ summary: 'Mock CGFSSD guarantee claim' })
  submitClaim(@Body() body: {
    loanId: string;
    claimAmount: number;
    defaultDate: string;
    daysOverdue: number;
  }) {
    return {
      status: 'submitted',
      claimId: `CGFSSD${Date.now()}`,
      loanId: body.loanId,
      claimAmount: body.claimAmount,
      eligibleAmount: body.claimAmount * 0.75, // 75% coverage
      submittedAt: new Date().toISOString(),
      estimatedProcessingDays: 30,
    };
  }

  @Get('cgfssd/claim/:claimId/status')
  @ApiOperation({ summary: 'Mock CGFSSD claim status' })
  getClaimStatus(@Param('claimId') claimId: string) {
    return {
      claimId,
      status: 'approved',
      approvedAmount: 50000,
      approvedAt: new Date().toISOString(),
      disbursementStatus: 'pending',
    };
  }
}

