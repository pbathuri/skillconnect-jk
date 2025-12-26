import Link from 'next/link';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Building2, 
  GraduationCap,
  Award,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const values = [
  {
    title: 'Accessibility',
    description: 'Making skill development accessible to every youth in J&K, regardless of financial background.',
    icon: Users,
  },
  {
    title: 'Accountability',
    description: 'Milestone-based funding ensures both learners and providers are accountable for outcomes.',
    icon: Target,
  },
  {
    title: 'Quality',
    description: 'Only verified training providers with proven placement records are part of our network.',
    icon: Award,
  },
  {
    title: 'Transparency',
    description: 'Clear loan terms, progress tracking, and open communication throughout the journey.',
    icon: Eye,
  },
];

const timeline = [
  { year: '2023', title: 'Concept & Planning', description: 'Policy framework developed with stakeholder consultations' },
  { year: '2024 Q1', title: 'Pilot Design', description: 'Banking partnerships and TP onboarding initiated' },
  { year: '2024 Q2', title: 'Platform Launch', description: 'SkillConnect JK platform goes live with J&K Bank' },
  { year: '2024 Q3', title: 'First Batch', description: '500 learners enrolled in pilot phase across 5 districts' },
  { year: '2025', title: 'Scale-up', description: 'Multi-bank integration and pan-J&K expansion planned' },
];

const partners = [
  { name: 'Government of J&K', type: 'Government', logo: '🏛️' },
  { name: 'J&K Bank', type: 'Banking Partner', logo: '🏦' },
  { name: 'NSDC', type: 'Skill Partner', logo: '📚' },
  { name: 'CGFSSD', type: 'Guarantee Fund', logo: '🛡️' },
];

const team = [
  {
    name: 'Department of Skill Development',
    role: 'Government of J&K',
    description: 'Policy direction and oversight',
  },
  {
    name: 'J&K Bank',
    role: 'Primary Lending Partner',
    description: 'Loan processing and disbursement',
  },
  {
    name: 'NSDC',
    role: 'Skill Development Partner',
    description: 'Training provider verification',
  },
];

const impactStats = [
  { number: '2,500+', label: 'Youth Enrolled' },
  { number: '₹5 Cr+', label: 'Loans Disbursed' },
  { number: '50+', label: 'Training Providers' },
  { number: '85%', label: 'Placement Rate' },
  { number: '20', label: 'Districts Covered' },
  { number: '100+', label: 'Courses Available' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1920"
            alt="Kashmir Valley"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">A Government of J&K Initiative</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              Empowering J&K Youth Through
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Skill Development
              </span>
            </h1>
            <p className="text-lg text-gray-300">
              SkillConnect JK is an outcome-linked skilling credit platform designed to bridge the gap 
              between aspirations and opportunities for youth in Jammu & Kashmir.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary-600 mb-4">
                <Target className="h-6 w-6" />
                <span className="font-semibold">Our Mission</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
                Building a Skilled Workforce for a Prosperous J&K
              </h2>
              <p className="text-muted-foreground mb-6">
                Our mission is to democratize access to quality skill development by providing 
                affordable, outcome-linked loans that remove financial barriers and incentivize 
                completion. We aim to transform the economic landscape of J&K by creating 
                a generation of skilled, employed youth.
              </p>
              <ul className="space-y-3">
                {[
                  'Bridge the skill gap with industry-aligned training',
                  'Enable affordable access through innovative financing',
                  'Ensure quality through rigorous provider verification',
                  'Track outcomes and optimize continuously',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-secondary-600 mb-4">
                <Eye className="h-6 w-6" />
                <span className="font-semibold">Our Vision</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
                Every Youth Skilled, Every Dream Realized
              </h2>
              <p className="text-muted-foreground mb-6">
                We envision a J&K where no talented young person is held back by financial 
                constraints. Where quality skill development is a right, not a privilege. 
                Where every youth has the opportunity to build a dignified, prosperous future.
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">2025 Goals</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600">10,000</div>
                    <div className="text-sm text-gray-500">Learners Enrolled</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600">₹25 Cr</div>
                    <div className="text-sm text-gray-500">Loans Disbursed</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600">100</div>
                    <div className="text-sm text-gray-500">Training Providers</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600">90%</div>
                    <div className="text-sm text-gray-500">Placement Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at SkillConnect JK
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 border card-hover">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">Our Impact So Far</h2>
            <p className="text-white/80">Numbers that reflect our commitment to J&K youth</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-muted-foreground">From concept to implementation</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
              {timeline.map((item, index) => (
                <div key={item.year} className={`relative flex items-center gap-8 mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                    <div className="bg-primary-100 text-primary-600 text-sm font-bold px-3 py-1 rounded-full inline-block mb-2">
                      {item.year}
                    </div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary-500 border-4 border-white -translate-x-1/2" />
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-muted-foreground">Working together for a skilled J&K</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {partners.map((partner) => (
              <div key={partner.name} className="bg-white rounded-xl p-6 text-center border">
                <div className="text-5xl mb-4">{partner.logo}</div>
                <h3 className="font-bold text-gray-900">{partner.name}</h3>
                <p className="text-sm text-muted-foreground">{partner.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-400 mb-8">
              Have questions about SkillConnect JK? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <a href="mailto:support@skillconnectjk.gov.in" className="flex items-center gap-2 text-amber-400 hover:text-amber-300">
                <Mail className="h-5 w-5" />
                support@skillconnectjk.gov.in
              </a>
              <a href="tel:1800-XXX-XXXX" className="flex items-center gap-2 text-amber-400 hover:text-amber-300">
                <Phone className="h-5 w-5" />
                1800-XXX-XXXX (Toll Free)
              </a>
              <span className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-5 w-5" />
                Srinagar, Jammu & Kashmir
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/faq">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  View FAQs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
