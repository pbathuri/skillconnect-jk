import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Banknote, 
  CheckCircle2,
  Building2,
  Calendar,
  GraduationCap,
  Briefcase,
  Play,
  FileText,
  Phone,
  ArrowRight,
  Share2,
  Heart,
  ChevronRight,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

// This would come from API in real implementation
const courseData = {
  id: 'web-development',
  title: 'Full Stack Web Development',
  provider: {
    name: 'NIIT Foundation',
    rating: 4.9,
    courses: 15,
    students: 5000,
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100',
  },
  location: 'Srinagar, J&K',
  address: 'Residency Road, Srinagar - 190001',
  duration: '6 months',
  fee: 45000,
  loanAmount: 45000,
  emiPerMonth: 1250,
  rating: 4.8,
  reviews: 245,
  enrolled: 1200,
  sector: 'IT/ITeS',
  image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
  video: 'https://www.youtube.com/embed/example',
  placement: '85%',
  avgSalary: '₹30,000/month',
  startDate: 'January 15, 2025',
  batchSize: 30,
  mode: 'Offline + Online Labs',
  certification: 'NSDC Certified',
  description: `This comprehensive Full Stack Web Development course is designed to transform beginners into job-ready web developers. Over 6 months, you'll master both front-end and back-end technologies, working on real-world projects that prepare you for the IT industry.

Our curriculum is aligned with industry standards and updated regularly to include the latest technologies. With hands-on practice, mentorship from industry experts, and placement support, you'll be well-prepared to start your career in web development.`,
  highlights: [
    'HTML5, CSS3, JavaScript fundamentals',
    'React.js & Node.js frameworks',
    'MongoDB & SQL databases',
    'Git version control & deployment',
    'API development & integration',
    '100% placement assistance',
    'Industry projects & portfolio building',
    'Soft skills & interview preparation',
  ],
  curriculum: [
    {
      month: 'Month 1-2',
      title: 'Frontend Fundamentals',
      topics: ['HTML5 & Semantic Web', 'CSS3 & Responsive Design', 'JavaScript Basics', 'DOM Manipulation'],
    },
    {
      month: 'Month 3',
      title: 'React.js',
      topics: ['React Components & Props', 'State Management', 'Hooks & Context API', 'React Router'],
    },
    {
      month: 'Month 4',
      title: 'Backend Development',
      topics: ['Node.js & Express.js', 'RESTful API Design', 'Authentication & Security', 'Database Integration'],
    },
    {
      month: 'Month 5',
      title: 'Databases & DevOps',
      topics: ['MongoDB & Mongoose', 'SQL Basics', 'Git & GitHub', 'Deployment Strategies'],
    },
    {
      month: 'Month 6',
      title: 'Projects & Placement',
      topics: ['Capstone Project', 'Portfolio Development', 'Interview Preparation', 'Industry Connect'],
    },
  ],
  eligibility: [
    'Minimum Class 12 pass',
    'Basic computer knowledge',
    'Age 18-35 years',
    'Domicile of Jammu & Kashmir',
    'Strong motivation to learn',
  ],
  placements: {
    companies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Local IT Startups'],
    roles: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Web Developer'],
    salaryRange: '₹18,000 - ₹45,000/month',
  },
  testimonials: [
    {
      name: 'Amir Khan',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      role: 'Frontend Developer at TCS',
      text: 'This course completely changed my career. The practical approach and placement support were excellent.',
      rating: 5,
    },
    {
      name: 'Fatima Bano',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      role: 'Full Stack Developer at Startup',
      text: 'The curriculum is very comprehensive. I went from zero knowledge to building full applications.',
      rating: 5,
    },
  ],
};

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            src={courseData.image}
            alt={courseData.title}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  {courseData.sector}
                </span>
                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Loan Available
                </span>
                <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  {courseData.certification}
                </span>
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                {courseData.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={courseData.provider.logo}
                  alt={courseData.provider.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <div className="font-semibold">{courseData.provider.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span>{courseData.provider.rating}</span>
                    <span>•</span>
                    <span>{courseData.provider.courses} courses</span>
                    <span>•</span>
                    <span>{courseData.provider.students}+ students</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {courseData.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {courseData.duration}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Starts {courseData.startDate}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {courseData.batchSize} seats/batch
                </span>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-lg">{courseData.rating}</span>
                  <span className="text-gray-300">({courseData.reviews} reviews)</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-300">{courseData.enrolled} enrolled</span>
              </div>
            </div>

            {/* Apply Card */}
            <div className="lg:w-96">
              <div className="bg-white rounded-2xl p-6 text-gray-900">
                <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={courseData.image}
                    alt={courseData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Course Fee</div>
                    <div className="text-3xl font-bold">₹{courseData.fee.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-600 font-medium">Loan Available</div>
                    <div className="text-sm text-gray-500">EMI from ₹{courseData.emiPerMonth}/mo</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <Link href={`/apply?course=${params.id}`}>
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" size="lg">
                      Apply for Loan
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full" size="lg">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Provider
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-primary-500">
                    <Heart className="h-4 w-4" />
                    Save
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary-500">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>

                <hr className="my-4" />

                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="font-bold text-green-600 text-lg">{courseData.placement}</div>
                    <div className="text-gray-600">Placement Rate</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="font-bold text-blue-600 text-lg">{courseData.avgSalary}</div>
                    <div className="text-gray-600">Avg. Salary</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {/* Description */}
              <div className="bg-white rounded-xl border p-6 mb-6">
                <h2 className="font-bold text-xl text-gray-900 mb-4">About This Course</h2>
                <p className="text-gray-600 whitespace-pre-line">{courseData.description}</p>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-xl border p-6 mb-6">
                <h2 className="font-bold text-xl text-gray-900 mb-4">What You'll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {courseData.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-xl border p-6 mb-6">
                <h2 className="font-bold text-xl text-gray-900 mb-4">Curriculum</h2>
                <div className="space-y-4">
                  {courseData.curriculum.map((module, index) => (
                    <details key={module.month} className="group" open={index === 0}>
                      <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer list-none">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{module.title}</div>
                            <div className="text-sm text-gray-500">{module.month}</div>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="p-4 pt-2">
                        <ul className="space-y-2 pl-14">
                          {module.topics.map((topic) => (
                            <li key={topic} className="flex items-center gap-2 text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Placements */}
              <div className="bg-white rounded-xl border p-6 mb-6">
                <h2 className="font-bold text-xl text-gray-900 mb-4">Placement Support</h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Hiring Partners</h3>
                    <div className="flex flex-wrap gap-2">
                      {courseData.placements.companies.map((company) => (
                        <span key={company} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Job Roles</h3>
                    <div className="flex flex-wrap gap-2">
                      {courseData.placements.roles.map((role) => (
                        <span key={role} className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Salary Range</h3>
                    <div className="text-2xl font-bold text-green-600">
                      {courseData.placements.salaryRange}
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="bg-white rounded-xl border p-6">
                <h2 className="font-bold text-xl text-gray-900 mb-4">Student Reviews</h2>
                <div className="space-y-4">
                  {courseData.testimonials.map((testimonial) => (
                    <div key={testimonial.name} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.role}</div>
                        </div>
                        <div className="ml-auto flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-amber-500 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 italic">"{testimonial.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <div className="space-y-6 sticky top-24">
                {/* Eligibility */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Eligibility</h3>
                  <ul className="space-y-3">
                    {courseData.eligibility.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Provider Info */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Training Provider</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={courseData.provider.logo}
                      alt={courseData.provider.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-semibold">{courseData.provider.name}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        {courseData.provider.rating} rating
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      {courseData.provider.courses} courses offered
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      {courseData.provider.students}+ students trained
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {courseData.address}
                    </div>
                  </div>
                  <Link href={`/training-providers/${courseData.provider.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button variant="outline" className="w-full mt-4">
                      View Provider Profile
                    </Button>
                  </Link>
                </div>

                {/* Loan Calculator */}
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
                  <h3 className="font-bold mb-4">Quick EMI Estimate</h3>
                  <div className="bg-white/10 rounded-lg p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">Loan Amount</span>
                      <span className="font-semibold">₹{courseData.loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">Interest Rate</span>
                      <span className="font-semibold">8.5% p.a.</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/80">Tenure</span>
                      <span className="font-semibold">36 months</span>
                    </div>
                    <hr className="border-white/20 my-3" />
                    <div className="flex justify-between">
                      <span className="text-white/80">EMI</span>
                      <span className="font-bold text-xl">~₹{courseData.emiPerMonth}/month</span>
                    </div>
                  </div>
                  <Link href="/emi-calculator">
                    <Button className="w-full bg-white text-primary-600 hover:bg-white/90">
                      Detailed Calculator
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
