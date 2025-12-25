import Link from 'next/link';
import { ArrowRight, GraduationCap, Banknote, Building2, Shield, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const sectors = [
  { name: 'IT/ITeS', icon: '💻', courses: 24, color: 'from-blue-500 to-cyan-400' },
  { name: 'Electronics', icon: '🔌', courses: 18, color: 'from-purple-500 to-pink-400' },
  { name: 'Tourism & Hospitality', icon: '🏨', courses: 15, color: 'from-amber-500 to-orange-400' },
  { name: 'Healthcare', icon: '🏥', courses: 12, color: 'from-emerald-500 to-teal-400' },
  { name: 'Handicrafts', icon: '🎨', courses: 20, color: 'from-rose-500 to-red-400' },
  { name: 'Agriculture', icon: '🌾', courses: 10, color: 'from-lime-500 to-green-400' },
];

const stats = [
  { label: 'Active Learners', value: '2,500+', icon: GraduationCap },
  { label: 'Courses Available', value: '100+', icon: Building2 },
  { label: 'Loans Disbursed', value: '₹5Cr+', icon: Banknote },
  { label: 'Success Rate', value: '85%', icon: Star },
];

const milestones = [
  { step: 'T0', title: 'Enrollment', percentage: '30%', description: 'Initial disbursement on enrollment' },
  { step: 'T1', title: '33% Completion', percentage: '30%', description: 'Second tranche at one-third progress' },
  { step: 'T2', title: '66% Completion', percentage: '20%', description: 'Third tranche at two-thirds progress' },
  { step: 'T3', title: 'Certification', percentage: '20%', description: 'Final disbursement on certification' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-bg hero-pattern">
        <div className="absolute inset-0 kashmir-pattern opacity-30" />
        <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="animate-pulse w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm font-medium">Now accepting applications across J&K</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering J&K Youth with
              <span className="block text-accent-300">Skill Development Loans</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get affordable credit from ₹5,000 to ₹1,50,000 for vocational training.
              No collateral needed. Pay only after you get placed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90 font-semibold text-lg px-8">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold text-lg px-8">
                  Apply for Loan
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>75% CGFSSD Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                <span>8.5% Interest Rate</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Skill Sector
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              High-demand sectors with strong placement records across Jammu & Kashmir
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {sectors.map((sector) => (
              <Link
                key={sector.name}
                href={`/courses?sector=${sector.name.toLowerCase().replace(/\s+/g, '_')}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 card-hover">
                  <div className={`absolute inset-0 bg-gradient-to-br ${sector.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div className="text-4xl mb-4">{sector.icon}</div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{sector.name}</h3>
                  <p className="text-muted-foreground text-sm">{sector.courses} courses</p>
                  <ChevronRight className="absolute bottom-6 right-6 h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Milestone Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Milestone-Based Disbursement
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Loan is released in stages as you progress through your course,
              ensuring accountability and reducing risk for everyone.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection line */}
              <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 hidden md:block" />
              <div className="absolute top-12 left-0 h-1 bg-primary-500 hidden md:block" style={{ width: '25%' }} />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.step} className="relative text-center">
                    <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                      index === 0 ? 'bg-primary-500' : 'bg-gray-300'
                    }`}>
                      {milestone.step}
                    </div>
                    <div className="mt-4">
                      <div className="text-2xl font-bold text-primary-500">{milestone.percentage}</div>
                      <h3 className="font-semibold text-gray-900 mt-1">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Skilling Journey?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of J&K youth who are building their future with SkillConnect.
            Apply today and get trained by the best institutes with our outcome-linked loans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 font-semibold text-lg px-8">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold text-lg px-8">
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

