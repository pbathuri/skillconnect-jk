import Link from 'next/link';
import { 
  Search, 
  FileText, 
  CheckCircle2, 
  Banknote, 
  GraduationCap,
  ArrowRight,
  Play,
  Users,
  Shield,
  Clock,
  Award,
  Calculator,
  Building2,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const steps = [
  {
    step: 1,
    title: 'Explore & Choose',
    description: 'Browse our catalog of 100+ certified courses. Use free resources to build basics first.',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    details: [
      'Browse courses by sector and location',
      'Compare training providers and fees',
      'Check placement records and reviews',
      'Start with free YouTube courses to prepare',
    ],
  },
  {
    step: 2,
    title: 'Apply for Loan',
    description: 'Submit your application online with required documents. Get approval within 7 days.',
    icon: FileText,
    color: 'from-purple-500 to-pink-500',
    details: [
      'Register on SkillConnect JK platform',
      'Complete KYC via DigiLocker',
      'Submit income and education documents',
      'Select loan amount and tenure',
    ],
  },
  {
    step: 3,
    title: 'Verification & Approval',
    description: 'Bank verifies your documents. CGFSSD provides 75% guarantee - no collateral needed!',
    icon: CheckCircle2,
    color: 'from-emerald-500 to-teal-500',
    details: [
      'Document verification by bank',
      'Borrower Score calculation',
      'Risk assessment and approval',
      'Loan sanction within 7 working days',
    ],
  },
  {
    step: 4,
    title: 'Start Learning',
    description: 'Enroll in your chosen course. First 30% disbursement goes directly to training provider.',
    icon: GraduationCap,
    color: 'from-amber-500 to-orange-500',
    details: [
      'Course enrollment confirmed',
      'T0 (30%) disbursement released',
      'Start attending classes',
      'Track progress on dashboard',
    ],
  },
  {
    step: 5,
    title: 'Progress & Milestones',
    description: 'Remaining funds released as you hit attendance and assessment milestones.',
    icon: Award,
    color: 'from-rose-500 to-red-500',
    details: [
      'T1 (30%) at 33% course completion',
      'T2 (20%) at 66% course completion',
      'T3 (20%) upon certification',
      'TP reports progress in real-time',
    ],
  },
  {
    step: 6,
    title: 'Get Placed & Repay',
    description: 'Get placement support. Start EMI payments after 3-month moratorium post-course.',
    icon: Banknote,
    color: 'from-indigo-500 to-violet-500',
    details: [
      'Placement assistance from TP',
      '3-month moratorium after course',
      'Step-up EMI: 50% for first 6 months',
      'Full EMI afterwards, prepay anytime',
    ],
  },
];

const disbursement = [
  { milestone: 'T0', name: 'Enrollment', percentage: 30, description: 'Upon course registration' },
  { milestone: 'T1', name: '33% Complete', percentage: 30, description: 'Attendance & assessment verified' },
  { milestone: 'T2', name: '66% Complete', percentage: 20, description: 'Continued progress verified' },
  { milestone: 'T3', name: 'Certified', percentage: 20, description: 'Upon successful completion' },
];

const stakeholders = [
  {
    role: 'Learner (You)',
    icon: Users,
    responsibilities: [
      'Apply for loan',
      'Attend classes regularly',
      'Pass assessments',
      'Repay EMIs on time',
    ],
  },
  {
    role: 'Training Provider',
    icon: GraduationCap,
    responsibilities: [
      'Deliver quality training',
      'Report attendance & progress',
      'Provide placement support',
      'Maintain TP guarantee deposit',
    ],
  },
  {
    role: 'Bank',
    icon: Building2,
    responsibilities: [
      'Process loan application',
      'Release milestone disbursements',
      'Collect EMI repayments',
      'Report to credit bureaus',
    ],
  },
  {
    role: 'SkillConnect JK',
    icon: Shield,
    responsibilities: [
      'Verify training providers',
      'Monitor course quality',
      'Track learner progress',
      'Handle grievances',
    ],
  },
];

const faqs = [
  {
    question: 'What is the interest rate?',
    answer: 'Interest rate is MCLR + 1-2%, which works out to approximately 8.5-10.5% per annum. This is lower than personal loans because of the CGFSSD guarantee.',
  },
  {
    question: 'Do I need collateral or guarantor?',
    answer: 'No! The CGFSSD provides 75% guarantee on the outstanding principal, eliminating the need for collateral or third-party guarantors.',
  },
  {
    question: 'When do I start repaying?',
    answer: 'You get a moratorium period equal to course duration plus 3 months. EMIs start after this period. Interest accrues during moratorium.',
  },
  {
    question: 'What if I fail to complete the course?',
    answer: 'If you fail due to genuine reasons, your case will be reviewed. The Training Provider\'s guarantee and CGFSSD coverage protect both you and the bank.',
  },
  {
    question: 'Can I prepay my loan?',
    answer: 'Yes, you can prepay partially or fully at any time without any prepayment penalty.',
  },
  {
    question: 'What is Step-up EMI?',
    answer: 'For the first 6 months after moratorium ends, you pay only 50% of the regular EMI amount. This helps you manage finances while starting your career.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 kashmir-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              How SkillConnect JK Works
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              From browsing courses to getting placed - a step-by-step guide to your 
              skill development journey with outcome-linked loans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Play className="mr-2 h-5 w-5" />
                  Free Learning First
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your Journey in 6 Steps
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From course selection to placement - we guide you through every step
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="md:w-1/2">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-4`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">Step {step.step}</div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <div className={`aspect-video rounded-2xl bg-gradient-to-br ${step.color} p-8 flex items-center justify-center`}>
                    <div className="text-white/20 text-[120px] font-bold">{step.step}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone Disbursement */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Milestone-Based Disbursement
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Your loan is released in stages as you progress, keeping you motivated and accountable.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-700 -translate-y-1/2 hidden md:block rounded-full" />
              
              <div className="grid md:grid-cols-4 gap-6 relative">
                {disbursement.map((item, index) => (
                  <div key={item.milestone} className="text-center relative">
                    <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold border-4 border-gray-700 relative z-10 ${
                      index === 0 ? 'bg-green-500' :
                      index === 1 ? 'bg-blue-500' :
                      index === 2 ? 'bg-purple-500' :
                      'bg-amber-500'
                    }`}>
                      {item.percentage}%
                    </div>
                    <div className="mt-4">
                      <div className="text-lg font-bold">{item.milestone}</div>
                      <div className="text-gray-300">{item.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="font-bold text-lg mb-4">Example: ₹50,000 Loan</h3>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">₹15,000</div>
                  <div className="text-sm text-gray-400">T0: Enrollment</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">₹15,000</div>
                  <div className="text-sm text-gray-400">T1: 33% Complete</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">₹10,000</div>
                  <div className="text-sm text-gray-400">T2: 66% Complete</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-amber-400">₹10,000</div>
                  <div className="text-sm text-gray-400">T3: Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Who's Involved?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding the roles and responsibilities in the SkillConnect ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stakeholders.map((stakeholder) => (
              <div key={stakeholder.role} className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  <stakeholder.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-4">{stakeholder.role}</h3>
                <ul className="space-y-2">
                  {stakeholder.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator Promo */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">
                Calculate Your EMI
              </h2>
              <p className="text-white/80">
                Plan your finances with our interactive EMI calculator
              </p>
            </div>
            <Link href="/emi-calculator">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90">
                <Calculator className="mr-2 h-5 w-5" />
                Open Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-xl border group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-90 flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/faq">
              <Button variant="outline">
                View All FAQs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of J&K youth who are building their careers through skill development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
