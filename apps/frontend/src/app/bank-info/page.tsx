import Link from 'next/link';
import { 
  Building2, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Calculator,
  Shield,
  Clock,
  Banknote,
  Users,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Info,
  ArrowRight,
  Percent,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const loanFeatures = [
  { label: 'Loan Amount', value: '₹5,000 - ₹1,50,000', icon: Banknote },
  { label: 'Interest Rate', value: 'MCLR + 1-2%', subtext: '≈ 8.5-10.5% p.a.', icon: Percent },
  { label: 'Tenure', value: '3-7 years', icon: Clock },
  { label: 'Moratorium', value: 'Course + 3 months', icon: Shield },
  { label: 'Collateral', value: 'Not Required', icon: CheckCircle2 },
  { label: 'Processing Fee', value: '0.5%', subtext: 'Waived for pilot', icon: FileText },
];

const eligibility = [
  { item: 'Age', requirement: '18-35 years' },
  { item: 'Residence', requirement: 'Domicile of Jammu & Kashmir' },
  { item: 'Education', requirement: 'Minimum Class 10 pass (varies by course)' },
  { item: 'Credit History', requirement: 'No existing defaults' },
  { item: 'Course', requirement: 'Must be approved by SkillConnect JK' },
];

const documents = [
  { 
    category: 'Identity Proof',
    items: ['Aadhaar Card', 'PAN Card', 'Voter ID', 'Passport'],
    required: true,
  },
  { 
    category: 'Address Proof',
    items: ['Aadhaar Card', 'Utility Bill', 'Ration Card', 'Domicile Certificate'],
    required: true,
  },
  { 
    category: 'Educational Documents',
    items: ['Class 10 Marksheet', 'Class 12 Marksheet (if applicable)', 'Graduation Certificate (if applicable)'],
    required: true,
  },
  { 
    category: 'Income Proof',
    items: ['Family Income Certificate', 'Bank Statement (6 months)', 'Salary Slip of Guardian (if applicable)'],
    required: false,
  },
  { 
    category: 'Photographs',
    items: ['2 Passport Size Photos', 'Family Photo (for verification)'],
    required: true,
  },
];

const disbursementSchedule = [
  { 
    milestone: 'T0 - Enrollment',
    percentage: '30%',
    description: 'Released when course enrollment is confirmed',
    paid_to: 'Training Provider',
  },
  { 
    milestone: 'T1 - 33% Completion',
    percentage: '30%',
    description: 'Released when 33% attendance & assessment verified',
    paid_to: 'Training Provider',
  },
  { 
    milestone: 'T2 - 66% Completion',
    percentage: '20%',
    description: 'Released when 66% attendance & assessment verified',
    paid_to: 'Training Provider',
  },
  { 
    milestone: 'T3 - Certification',
    percentage: '20%',
    description: 'Released upon certification/course completion',
    paid_to: 'Training Provider',
  },
];

const bankPartners = [
  {
    name: 'J&K Bank',
    type: 'Primary Partner',
    status: 'Active',
    branches: 50,
    contact: '1800-XXX-XXXX',
    email: 'skillconnect@jkbank.com',
    logo: '🏦',
    color: 'from-blue-600 to-blue-800',
  },
  {
    name: 'State Bank of India',
    type: 'Expansion Partner',
    status: 'Coming Soon',
    branches: 100,
    contact: '1800-XXX-XXXX',
    email: 'skillconnect@sbi.co.in',
    logo: '🏛️',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Punjab National Bank',
    type: 'Expansion Partner',
    status: 'Coming Soon',
    branches: 40,
    contact: '1800-XXX-XXXX',
    email: 'skillconnect@pnb.co.in',
    logo: '🏛️',
    color: 'from-red-500 to-rose-600',
  },
];

const faqs = [
  {
    question: 'What is CGFSSD guarantee?',
    answer: 'The Credit Guarantee Fund for Skill Development (CGFSSD) covers 75% of the outstanding principal in case of default, making loans risk-free for banks and enabling collateral-free lending.',
  },
  {
    question: 'What is milestone-based disbursement?',
    answer: 'Instead of giving the full loan amount upfront, funds are released in tranches as you progress through the course. This ensures you stay motivated and complete the course.',
  },
  {
    question: 'What is the Step-up EMI scheme?',
    answer: 'For the first 6 months after moratorium, you pay only 50% of the regular EMI. This helps you manage expenses while you start your career.',
  },
  {
    question: 'Can I prepay my loan?',
    answer: 'Yes, you can prepay your loan without any prepayment penalty. We encourage early repayment.',
  },
  {
    question: 'What if I fail to complete the course?',
    answer: 'If you fail due to genuine reasons, your loan terms will be reviewed. The TP guarantee and CGFSSD coverage protect both you and the bank.',
  },
];

export default function BankInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20">
        <div className="absolute inset-0 kashmir-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 rounded-full px-4 py-2 mb-6">
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">Bank Partners & Documentation</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              Loan Documentation &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Bank Information
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Everything you need to know about loan eligibility, documentation requirements, 
              and our banking partners.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90">
                <Download className="mr-2 h-5 w-5" />
                Download Application Form
              </Button>
              <Link href="/emi-calculator">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Calculator className="mr-2 h-5 w-5" />
                  EMI Calculator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Loan Features at a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {loanFeatures.map((feature) => (
              <div key={feature.label} className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="text-xl font-bold text-gray-900">{feature.value}</div>
                {feature.subtext && (
                  <div className="text-xs text-gray-500">{feature.subtext}</div>
                )}
                <div className="text-sm text-muted-foreground mt-1">{feature.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Eligibility Criteria
              </h2>
              <div className="space-y-4">
                {eligibility.map((item, index) => (
                  <div key={item.item} className="flex items-center gap-4 bg-white rounded-lg p-4 border">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{item.item}</div>
                      <div className="text-sm text-muted-foreground">{item.requirement}</div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border">
              <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                CGFSSD Protection
              </h3>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  All loans under SkillConnect JK are covered under the Credit Guarantee Fund 
                  for Skill Development (CGFSSD).
                </p>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">75%</div>
                  <div className="text-sm text-blue-800">Of outstanding principal guaranteed</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>No collateral required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>No third-party guarantor needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Risk-free lending for banks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Lower interest rates for borrowers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Documents Required
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div key={doc.category} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{doc.category}</h3>
                  {doc.required ? (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Required</span>
                  ) : (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Optional</span>
                  )}
                </div>
                <ul className="space-y-2">
                  {doc.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 rounded-xl p-6 flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-900">DigiLocker Integration</h4>
              <p className="text-sm text-amber-800 mt-1">
                You can share documents directly from DigiLocker for faster verification. 
                Physical documents may be required for final verification at the bank branch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disbursement Schedule */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
              Milestone-Based Disbursement
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Your loan is released in stages as you progress through the course, 
              ensuring accountability and motivation.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute top-12 left-0 right-0 h-1 bg-gray-700 hidden md:block" />
            
            <div className="grid md:grid-cols-4 gap-6">
              {disbursementSchedule.map((stage, index) => (
                <div key={stage.milestone} className="relative text-center">
                  <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br ${
                    index === 0 ? 'from-green-500 to-emerald-600' :
                    index === 1 ? 'from-blue-500 to-cyan-600' :
                    index === 2 ? 'from-purple-500 to-pink-600' :
                    'from-amber-500 to-orange-600'
                  }`}>
                    {stage.percentage}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-white">{stage.milestone}</h3>
                    <p className="text-sm text-gray-400 mt-2">{stage.description}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      Paid to: {stage.paid_to}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bank Partners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Banking Partners
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {bankPartners.map((bank) => (
              <div key={bank.name} className="bg-white rounded-2xl border overflow-hidden">
                <div className={`bg-gradient-to-r ${bank.color} p-6 text-white`}>
                  <div className="text-4xl mb-3">{bank.logo}</div>
                  <h3 className="font-bold text-xl">{bank.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      bank.status === 'Active' ? 'bg-green-500' : 'bg-white/30'
                    }`}>
                      {bank.status}
                    </span>
                    <span className="text-xs text-white/80">{bank.type}</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span>{bank.branches} branches in J&K</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{bank.contact}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{bank.email}</span>
                  </div>
                  {bank.status === 'Active' && (
                    <Button className="w-full mt-4">
                      Apply with {bank.name.split(' ')[0]}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-xl border group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6 text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Ready to Apply for a Skill Loan?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Gather your documents and start your application today. Our team will guide you through every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-white/90">
                Start Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

