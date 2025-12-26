import Link from 'next/link';
import {
  HelpCircle,
  Search,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const faqCategories = [
  {
    category: 'Loan Basics',
    questions: [
      {
        question: 'What is SkillConnect JK?',
        answer: 'SkillConnect JK is an outcome-linked skill development loan platform for youth in Jammu & Kashmir. We connect learners with verified training providers and provide affordable skill loans from ₹5,000 to ₹1,50,000 with milestone-based disbursement.',
      },
      {
        question: 'What is the loan amount range?',
        answer: 'Loan amounts range from ₹5,000 to ₹1,50,000 depending on the course fee and your eligibility. The exact amount is determined based on the course you choose and your borrower score.',
      },
      {
        question: 'What is the interest rate?',
        answer: 'Interest rate is MCLR + 1-2%, which works out to approximately 8.5-10.5% per annum. This is lower than typical personal loans because of the CGFSSD guarantee backing.',
      },
      {
        question: 'Do I need collateral or a guarantor?',
        answer: 'No! Thanks to the CGFSSD (Credit Guarantee Fund for Skill Development) which covers 75% of the outstanding principal, you don\'t need any collateral or third-party guarantor.',
      },
      {
        question: 'What is the loan tenure?',
        answer: 'Loan tenure ranges from 3 to 7 years (36 to 84 months). You can choose a tenure that gives you comfortable EMIs based on your expected income.',
      },
    ],
  },
  {
    category: 'Eligibility & Documents',
    questions: [
      {
        question: 'Who is eligible for a skill loan?',
        answer: 'You need to be: (1) Between 18-35 years of age, (2) A domicile of Jammu & Kashmir, (3) Minimum Class 10 pass (varies by course), (4) No existing loan defaults.',
      },
      {
        question: 'What documents are required?',
        answer: 'Required documents include: Aadhaar Card, PAN Card, Address proof, Educational certificates (Class 10/12 marksheets), Family income certificate (optional), and 2 passport-size photographs. You can share documents via DigiLocker for faster verification.',
      },
      {
        question: 'How long does loan approval take?',
        answer: 'Loan approval typically takes 5-7 working days after document submission. Using DigiLocker for KYC can speed up the process.',
      },
      {
        question: 'Can I apply if I have no credit history?',
        answer: 'Yes! We welcome first-time borrowers. Our Borrower Score considers multiple factors beyond credit history, including education, course fit, and commitment indicators.',
      },
    ],
  },
  {
    category: 'Disbursement & Milestones',
    questions: [
      {
        question: 'What is milestone-based disbursement?',
        answer: 'Instead of disbursing the full loan at once, funds are released in stages: T0 (30%) at enrollment, T1 (30%) at 33% completion, T2 (20%) at 66% completion, and T3 (20%) upon certification. This keeps you motivated and ensures accountability.',
      },
      {
        question: 'Who receives the disbursed amount?',
        answer: 'All disbursements go directly to the training provider\'s escrow account, not to the learner. This ensures the funds are used for your education.',
      },
      {
        question: 'What if I miss a milestone?',
        answer: 'If you fail to meet attendance or assessment requirements, the next disbursement is held. You\'ll get support to catch up. In case of genuine issues, our grievance cell will review your case.',
      },
      {
        question: 'What happens if I drop out?',
        answer: 'If you drop out, remaining disbursements are cancelled. You\'ll need to repay the already disbursed amount. The TP guarantee and CGFSSD coverage help minimize losses for all parties.',
      },
    ],
  },
  {
    category: 'Repayment',
    questions: [
      {
        question: 'When do EMI payments start?',
        answer: 'EMI payments begin after the moratorium period, which is your course duration plus 3 additional months. This gives you time to complete the course and find employment.',
      },
      {
        question: 'What is Step-up EMI?',
        answer: 'For the first 6 months after moratorium ends, you pay only 50% of the regular EMI. This helps you manage finances while starting your career. After 6 months, you pay the full EMI.',
      },
      {
        question: 'Can I prepay my loan?',
        answer: 'Yes! You can prepay partially or fully at any time without any prepayment penalty. Early repayment reduces your total interest burden.',
      },
      {
        question: 'What happens if I miss an EMI?',
        answer: 'Missing an EMI attracts late fees and affects your credit score. If you face genuine difficulties, contact us early - we can discuss restructuring options.',
      },
      {
        question: 'What payment methods are available?',
        answer: 'You can pay via UPI AutoPay (NACH mandate), bank transfer, or at bank branches. We recommend setting up AutoPay to never miss a payment.',
      },
    ],
  },
  {
    category: 'Courses & Training Providers',
    questions: [
      {
        question: 'How are training providers verified?',
        answer: 'All TPs go through rigorous verification including: NSDC/NCVET registration check, physical infrastructure audit, placement record verification, and ongoing performance monitoring via TPScore.',
      },
      {
        question: 'What is TPScore?',
        answer: 'TPScore is our rating system for training providers based on: completion rate, certification rate, placement rate, refund history, and compliance audits. Higher TPScore means more reliable providers.',
      },
      {
        question: 'Can I change courses after enrollment?',
        answer: 'Course changes are possible within the first 15 days, subject to availability and TP approval. After that, changes require special approval and may affect your loan terms.',
      },
      {
        question: 'What if my training provider closes down?',
        answer: 'In rare cases of TP closure, we help transfer you to another verified provider. The TP guarantee deposit provides additional protection.',
      },
    ],
  },
  {
    category: 'Free Learning Resources',
    questions: [
      {
        question: 'Are there free courses I can take before applying?',
        answer: 'Yes! Our Learn section has curated free resources from Khan Academy, Coursera, NPTEL, YouTube channels, and more. Building basics before a paid course improves your success rate.',
      },
      {
        question: 'Do free courses count for anything?',
        answer: 'Completing free courses can improve your Borrower Score by demonstrating commitment and aptitude. Some TPs also accept prior learning for course credits.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 rounded-full px-4 py-2 mb-6">
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Help Center</span>
            </div>
            <h1 className="font-display text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Find answers to common questions about skill loans, eligibility, and the SkillConnect JK platform.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category) => (
              <div key={category.category} className="mb-12">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <details key={index} className="bg-white rounded-xl border group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                        <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-90 flex-shrink-0" />
                      </summary>
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our support team is here to help you with any queries.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-sm text-gray-500 mb-3">Toll-free helpline</p>
                <a href="tel:1800-XXX-XXXX" className="text-primary-600 font-semibold">
                  1800-XXX-XXXX
                </a>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-sm text-gray-500 mb-3">Response within 24 hours</p>
                <a href="mailto:support@skillconnectjk.gov.in" className="text-primary-600 font-semibold">
                  support@skillconnectjk.gov.in
                </a>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-sm text-gray-500 mb-3">Available 9 AM - 6 PM</p>
                <button className="text-primary-600 font-semibold">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join thousands of J&K youth building their future through skill development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90">
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

