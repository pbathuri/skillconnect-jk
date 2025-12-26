import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  GraduationCap, 
  Banknote, 
  Building2, 
  Shield, 
  ChevronRight, 
  Star,
  Play,
  BookOpen,
  Globe,
  Youtube,
  Award,
  Users,
  CheckCircle2,
  FileText,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const sectors = [
  { name: 'IT/ITeS', icon: '💻', courses: 24, color: 'from-blue-500 to-cyan-400', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400' },
  { name: 'Electronics', icon: '🔌', courses: 18, color: 'from-purple-500 to-pink-400', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' },
  { name: 'Tourism', icon: '🏨', courses: 15, color: 'from-amber-500 to-orange-400', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
  { name: 'Healthcare', icon: '🏥', courses: 12, color: 'from-emerald-500 to-teal-400', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400' },
  { name: 'Handicrafts', icon: '🎨', courses: 20, color: 'from-rose-500 to-red-400', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
  { name: 'Agriculture', icon: '🌾', courses: 10, color: 'from-lime-500 to-green-400', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' },
];

const stats = [
  { label: 'Active Learners', value: '2,500+', icon: GraduationCap },
  { label: 'Courses Available', value: '100+', icon: Building2 },
  { label: 'Loans Disbursed', value: '₹5Cr+', icon: Banknote },
  { label: 'Success Rate', value: '85%', icon: Star },
];

const freeResources = [
  {
    name: 'Khan Academy',
    description: 'Free world-class education in Math, Science, Computing',
    logo: 'https://cdn.kastatic.org/images/khan-logo-dark-background-2.png',
    url: 'https://www.khanacademy.org',
    languages: ['English', 'Hindi'],
    color: 'bg-green-500',
  },
  {
    name: 'Coursera',
    description: 'Free courses from top universities worldwide',
    logo: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-rebrand-logo-square.png',
    url: 'https://www.coursera.org',
    languages: ['English', 'Hindi'],
    color: 'bg-blue-600',
  },
  {
    name: 'NPTEL',
    description: 'IIT & IISc courses in Engineering & Science',
    logo: 'https://nptel.ac.in/assets/images/nptel_logo.png',
    url: 'https://nptel.ac.in',
    languages: ['English', 'Hindi'],
    color: 'bg-red-600',
  },
  {
    name: 'SWAYAM',
    description: 'Government of India free learning portal',
    logo: 'https://www.swayam.gov.in/assets/img/swayam_logo.png',
    url: 'https://swayam.gov.in',
    languages: ['English', 'Hindi', 'Regional'],
    color: 'bg-orange-500',
  },
];

const youtubeChannels = [
  {
    name: 'freeCodeCamp',
    subscribers: '9M+',
    topic: 'Web Development & Programming',
    thumbnail: 'https://yt3.googleusercontent.com/ytc/APkrFKaKwePjd6m6n_w3QN0nftNP4GBjlxnxJ39jKGVi=s176-c-k-c0x00ffffff-no-rj',
    url: 'https://youtube.com/@freecodecamp',
    language: 'English',
  },
  {
    name: 'Code With Harry',
    subscribers: '15M+',
    topic: 'Programming in Hindi',
    thumbnail: 'https://yt3.googleusercontent.com/ytc/APkrFKZU6Y93Q1L5pN77rVnIy_JkfU2HXPT0t4BZe4Lj=s176-c-k-c0x00ffffff-no-rj',
    url: 'https://youtube.com/@CodeWithHarry',
    language: 'Hindi',
  },
  {
    name: 'Apna College',
    subscribers: '6M+',
    topic: 'DSA & Web Development',
    thumbnail: 'https://yt3.googleusercontent.com/wg1TITEoPfxvBGfzuqWyt3bqm_qu35ZhMswUv3feetU3xNX_6wsAXZF40OlPIgY4TmqbqCmAZ1U=s176-c-k-c0x00ffffff-no-rj',
    url: 'https://youtube.com/@ApnaCollegeOfficial',
    language: 'Hindi',
  },
  {
    name: 'CS50 - Harvard',
    subscribers: '2M+',
    topic: 'Computer Science Fundamentals',
    thumbnail: 'https://yt3.googleusercontent.com/ytc/APkrFKbIuLiLPPIy_MNZYHx4A_2JOy1aZ6nJGxnM7VBH=s176-c-k-c0x00ffffff-no-rj',
    url: 'https://youtube.com/@cs50',
    language: 'English',
  },
  {
    name: 'MIT OpenCourseWare',
    subscribers: '5M+',
    topic: 'Engineering & Science',
    thumbnail: 'https://yt3.googleusercontent.com/ytc/APkrFKYeEiRcTOseFM7uSTFsmJHJNXeKv0cA_P9iuJMJ=s176-c-k-c0x00ffffff-no-rj',
    url: 'https://youtube.com/@mitocw',
    language: 'English',
  },
  {
    name: 'Telusko',
    subscribers: '2M+',
    topic: 'Java & Python Programming',
    thumbnail: 'https://yt3.googleusercontent.com/ytc/APkrFKad5qvd6LuCYmL6uI2vPaIsH80YNd9Kqpf_ENPj=s176-c-k-c0x00ffffff-no-rj',
    url: 'https://youtube.com/@Telusko',
    language: 'English/Hindi',
  },
];

const milestones = [
  { step: 'T0', title: 'Enrollment', percentage: '30%', description: 'Initial disbursement' },
  { step: 'T1', title: '33% Complete', percentage: '30%', description: 'First milestone' },
  { step: 'T2', title: '66% Complete', percentage: '20%', description: 'Second milestone' },
  { step: 'T3', title: 'Certified', percentage: '20%', description: 'Final disbursement' },
];

const bankPartners = [
  { name: 'J&K Bank', logo: '🏦', type: 'Primary Partner' },
  { name: 'SBI', logo: '🏛️', type: 'Coming Soon' },
  { name: 'PNB', logo: '🏛️', type: 'Coming Soon' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Kashmir imagery */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1920"
            alt="Kashmir Valley"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60" />
        </div>
        
        <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="animate-pulse w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm font-medium">Now accepting applications across J&K</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Skills,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Your Future</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
              Get affordable skill loans from ₹5,000 to ₹1,50,000. Learn from top institutes 
              and free online resources. Pay only after you're employed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/courses">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-lg px-8">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8">
                  <Play className="mr-2 h-5 w-5" />
                  Free Learning
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>75% CGFSSD Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Banknote className="h-5 w-5 text-amber-400" />
                <span>8.5% Interest Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-400" />
                <span>3-Month Moratorium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 text-primary-600 mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors with Images */}
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
                className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
              >
                <img
                  src={sector.image}
                  alt={sector.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-3xl mb-2">{sector.icon}</div>
                  <h3 className="font-bold text-xl text-white mb-1">{sector.name}</h3>
                  <p className="text-white/70 text-sm">{sector.courses} courses</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-6 w-6 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Free Learning Resources */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 mb-4">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">100% Free Resources</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Start Learning for Free
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access world-class education from top platforms. Build your skills before applying for a loan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {freeResources.map((resource) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border p-6 card-hover group"
              >
                <div className={`w-12 h-12 ${resource.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-500 transition-colors">
                  {resource.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">{resource.description}</p>
                <div className="flex flex-wrap gap-1">
                  {resource.languages.map((lang) => (
                    <span key={lang} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <Link href="/learn">
              <Button size="lg" variant="outline">
                View All Free Resources
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* YouTube Courses Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 rounded-full px-4 py-2 mb-4">
              <Youtube className="h-4 w-4" />
              <span className="text-sm font-medium">Free YouTube Courses</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Learn from the Best on YouTube
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Full courses from top educators in English, Hindi, and more. Start learning today!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubeChannels.map((channel) => (
              <a
                key={channel.name}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-red-500/50 transition-colors group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={channel.thumbnail}
                    alt={channel.name}
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-white group-hover:text-red-400 transition-colors">
                      {channel.name}
                    </h3>
                    <p className="text-sm text-gray-400">{channel.subscribers} subscribers</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">{channel.topic}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full">{channel.language}</span>
                  <Play className="h-5 w-5 text-red-400" />
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/learn#youtube">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Youtube className="mr-2 h-5 w-5" />
                Explore All Channels
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How Loans Work */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Milestone-Based Disbursement
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your loan is released in stages as you progress, keeping you motivated and accountable.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 hidden md:block" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.step} className="relative text-center">
                    <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br ${
                      index === 0 ? 'from-green-500 to-emerald-600' :
                      index === 1 ? 'from-blue-500 to-cyan-600' :
                      index === 2 ? 'from-purple-500 to-pink-600' :
                      'from-amber-500 to-orange-600'
                    }`}>
                      {milestone.step}
                    </div>
                    <div className="mt-4">
                      <div className="text-2xl font-bold text-gray-900">{milestone.percentage}</div>
                      <h3 className="font-semibold text-gray-700 mt-1">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/how-it-works">
              <Button size="lg" variant="outline">
                Learn More About Loans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bank Partners & Documentation */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Trusted by Leading Banks
              </h2>
              <p className="text-muted-foreground mb-8">
                Our loans are backed by the Credit Guarantee Fund for Skill Development (CGFSSD) 
                covering 75% of the outstanding principal. This makes lending risk-free for banks 
                and affordable for you.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {bankPartners.map((bank) => (
                  <div key={bank.name} className="bg-white rounded-xl p-6 text-center border">
                    <div className="text-4xl mb-2">{bank.logo}</div>
                    <h3 className="font-semibold text-gray-900">{bank.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{bank.type}</p>
                  </div>
                ))}
              </div>

              <Link href="/bank-info">
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  View Bank Documentation
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 border">
              <h3 className="font-bold text-xl text-gray-900 mb-6">Loan Features</h3>
              <div className="space-y-4">
                {[
                  { label: 'Loan Amount', value: '₹5,000 - ₹1,50,000' },
                  { label: 'Interest Rate', value: 'MCLR + 1-2% (≈8.5-10.5%)' },
                  { label: 'Tenure', value: '3-7 years' },
                  { label: 'Moratorium', value: 'Course + 3 months' },
                  { label: 'Collateral', value: 'Not Required' },
                  { label: 'Processing Fee', value: '0.5% (waived for pilot)' },
                  { label: 'CGFSSD Coverage', value: '75% of principal' },
                  { label: 'Step-up EMI', value: 'First 6 months at 50%' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-3 border-b last:border-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-muted-foreground">Real stories from J&K youth who transformed their careers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Amir Khan',
                location: 'Srinagar',
                course: 'Full Stack Development',
                salary: '₹35,000/month',
                company: 'TCS',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
                quote: 'SkillConnect helped me transition from unemployment to a tech career.',
              },
              {
                name: 'Fatima Bano',
                location: 'Jammu',
                course: 'Digital Marketing',
                salary: '₹28,000/month',
                company: 'Flipkart',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
                quote: 'The milestone system kept me motivated throughout the course.',
              },
              {
                name: 'Bilal Ahmad',
                location: 'Anantnag',
                course: 'Kashmiri Handicrafts',
                salary: '₹40,000/month',
                company: 'Self-employed',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
                quote: 'Now I export my Papier-mâché crafts worldwide through my own business.',
              },
            ].map((story) => (
              <div key={story.name} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">"{story.quote}"</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course</span>
                    <span className="font-medium">{story.course}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Now Earning</span>
                    <span className="font-medium text-green-600">{story.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Working at</span>
                    <span className="font-medium">{story.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join thousands of J&K youth who are building their future. Apply today and get 
            trained by the best with our outcome-linked loans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90 font-semibold text-lg px-8">
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

