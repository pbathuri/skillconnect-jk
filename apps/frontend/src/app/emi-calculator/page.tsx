'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Info, 
  ArrowRight,
  Banknote,
  Clock,
  Percent,
  Calendar,
  TrendingDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(36);
  const [moratorium, setMoratorium] = useState(9);

  // Calculate EMI
  const monthlyRate = interestRate / 12 / 100;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
              (Math.pow(1 + monthlyRate, tenure) - 1);
  
  // Step-up EMI (50% for first 6 months)
  const stepUpEMI = emi * 0.5;
  
  // Interest during moratorium
  const moratoriumInterest = loanAmount * (interestRate / 100) * (moratorium / 12);
  
  // Total amount
  const totalStepUpPayment = stepUpEMI * 6;
  const totalRegularPayment = emi * (tenure - 6);
  const totalPayment = totalStepUpPayment + totalRegularPayment + moratoriumInterest;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 rounded-full px-4 py-2 mb-6">
              <Calculator className="h-4 w-4" />
              <span className="text-sm font-medium">EMI Calculator</span>
            </div>
            <h1 className="font-display text-4xl font-bold mb-4">
              Calculate Your EMI
            </h1>
            <p className="text-lg text-gray-300">
              Plan your loan repayment with our interactive calculator. See your monthly EMI, 
              step-up payments, and total interest.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-2xl border p-8">
              <h2 className="font-bold text-xl text-gray-900 mb-6">Loan Parameters</h2>
              
              {/* Loan Amount */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium text-gray-700">Loan Amount</label>
                  <div className="text-xl font-bold text-primary-600">
                    ₹{loanAmount.toLocaleString()}
                  </div>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="5000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹5,000</span>
                  <span>₹1,50,000</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium text-gray-700">Interest Rate (p.a.)</label>
                  <div className="text-xl font-bold text-primary-600">
                    {interestRate}%
                  </div>
                </div>
                <input
                  type="range"
                  min="7"
                  max="12"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>7%</span>
                  <span>12%</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium text-gray-700">Loan Tenure</label>
                  <div className="text-xl font-bold text-primary-600">
                    {tenure} months ({Math.floor(tenure/12)} yrs {tenure%12} mo)
                  </div>
                </div>
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="6"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 year</span>
                  <span>7 years</span>
                </div>
              </div>

              {/* Moratorium */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-medium text-gray-700">Moratorium Period</label>
                  <div className="text-xl font-bold text-primary-600">
                    {moratorium} months
                  </div>
                </div>
                <input
                  type="range"
                  min="3"
                  max="15"
                  step="3"
                  value={moratorium}
                  onChange={(e) => setMoratorium(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>3 months</span>
                  <span>15 months</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Moratorium = Course duration + 3 months (no EMI during this period)
                </p>
              </div>

              <div className="bg-amber-50 rounded-lg p-4 text-sm">
                <h4 className="font-semibold text-amber-900 mb-2">Step-up EMI Benefit</h4>
                <p className="text-amber-800">
                  For the first 6 months after moratorium, you pay only 50% of regular EMI. 
                  This helps you settle into your new job before full payments begin.
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* EMI Card */}
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                <h2 className="font-bold text-xl mb-6">Your EMI Breakdown</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-white/70 text-sm mb-1">Regular EMI</div>
                    <div className="text-3xl font-bold">₹{Math.round(emi).toLocaleString()}</div>
                    <div className="text-white/50 text-xs mt-1">per month</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-white/70 text-sm mb-1">Step-up EMI</div>
                    <div className="text-3xl font-bold text-green-300">₹{Math.round(stepUpEMI).toLocaleString()}</div>
                    <div className="text-white/50 text-xs mt-1">first 6 months</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Loan Amount</span>
                    <span className="font-semibold">₹{loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Moratorium Interest</span>
                    <span className="font-semibold">₹{Math.round(moratoriumInterest).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Interest</span>
                    <span className="font-semibold">₹{Math.round(totalInterest).toLocaleString()}</span>
                  </div>
                  <hr className="border-white/20" />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total Payment</span>
                    <span className="font-bold">₹{Math.round(totalPayment).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Schedule */}
              <div className="bg-white rounded-2xl border p-6">
                <h3 className="font-bold text-gray-900 mb-4">Payment Schedule</h3>
                
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                  
                  <div className="space-y-4">
                    {/* Moratorium */}
                    <div className="relative flex items-start gap-4 pl-10">
                      <div className="absolute left-2 w-4 h-4 rounded-full bg-gray-300 border-2 border-white" />
                      <div>
                        <div className="font-semibold text-gray-900">Moratorium Period</div>
                        <div className="text-sm text-gray-500">{moratorium} months - No EMI payment</div>
                        <div className="text-xs text-amber-600 mt-1">Interest accrues: ₹{Math.round(moratoriumInterest).toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Step-up EMI */}
                    <div className="relative flex items-start gap-4 pl-10">
                      <div className="absolute left-2 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                      <div>
                        <div className="font-semibold text-gray-900">Step-up Phase</div>
                        <div className="text-sm text-gray-500">6 months @ ₹{Math.round(stepUpEMI).toLocaleString()}/month</div>
                        <div className="text-xs text-green-600 mt-1">50% of regular EMI</div>
                      </div>
                    </div>

                    {/* Regular EMI */}
                    <div className="relative flex items-start gap-4 pl-10">
                      <div className="absolute left-2 w-4 h-4 rounded-full bg-primary-500 border-2 border-white" />
                      <div>
                        <div className="font-semibold text-gray-900">Regular EMI Phase</div>
                        <div className="text-sm text-gray-500">{tenure - 6} months @ ₹{Math.round(emi).toLocaleString()}/month</div>
                        <div className="text-xs text-gray-500 mt-1">Full EMI payment</div>
                      </div>
                    </div>

                    {/* Loan Closure */}
                    <div className="relative flex items-start gap-4 pl-10">
                      <div className="absolute left-2 w-4 h-4 rounded-full bg-blue-500 border-2 border-white" />
                      <div>
                        <div className="font-semibold text-gray-900">Loan Closure</div>
                        <div className="text-sm text-gray-500">After {moratorium + tenure} months from disbursement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Step-up EMI</div>
                      <div className="text-xs text-gray-500">50% EMI for 6 months</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Moratorium</div>
                      <div className="text-xs text-gray-500">No EMI during course</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <Percent className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Low Interest</div>
                      <div className="text-xs text-gray-500">MCLR + 1-2%</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <Banknote className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">No Prepayment Fee</div>
                      <div className="text-xs text-gray-500">Pay early, save interest</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link href="/auth/register">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" size="lg">
                  Apply for Loan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <strong className="text-gray-900">Disclaimer:</strong> This calculator provides 
            indicative EMI values for planning purposes only. Actual EMI may vary based on 
            bank policies, your credit profile, and prevailing interest rates at the time of 
            disbursement. Please consult with the lending bank for exact figures.
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

