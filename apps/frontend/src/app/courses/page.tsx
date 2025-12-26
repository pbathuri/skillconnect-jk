import Link from 'next/link';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Banknote, 
  ChevronRight,
  GraduationCap,
  Building2,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const sectors = [
  { id: 'all', name: 'All Sectors', count: 100 },
  { id: 'it_ites', name: 'IT/ITeS', count: 24, icon: '💻' },
  { id: 'electronics', name: 'Electronics', count: 18, icon: '🔌' },
  { id: 'tourism', name: 'Tourism & Hospitality', count: 15, icon: '🏨' },
  { id: 'healthcare', name: 'Healthcare', count: 12, icon: '🏥' },
  { id: 'handicrafts', name: 'Handicrafts', count: 20, icon: '🎨' },
  { id: 'agriculture', name: 'Agriculture', count: 10, icon: '🌾' },
];

const courses = [
  {
    id: 'web-development',
    title: 'Full Stack Web Development',
    provider: 'NIIT Foundation',
    location: 'Srinagar',
    duration: '6 months',
    fee: 45000,
    loanEligible: true,
    rating: 4.8,
    reviews: 245,
    enrolled: 1200,
    sector: 'IT/ITeS',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
    highlights: ['HTML, CSS, JavaScript', 'React.js & Node.js', 'Database Management', '100% Placement Assistance'],
    placement: '85%',
    avgSalary: '₹30,000/month',
  },
  {
    id: 'data-science',
    title: 'Data Science & Machine Learning',
    provider: 'Aptech',
    location: 'Jammu',
    duration: '8 months',
    fee: 65000,
    loanEligible: true,
    rating: 4.7,
    reviews: 189,
    enrolled: 800,
    sector: 'IT/ITeS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    highlights: ['Python & R', 'Machine Learning', 'Deep Learning', 'Big Data Analytics'],
    placement: '90%',
    avgSalary: '₹45,000/month',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Professional',
    provider: 'NIIT',
    location: 'Srinagar',
    duration: '4 months',
    fee: 35000,
    loanEligible: true,
    rating: 4.6,
    reviews: 312,
    enrolled: 1500,
    sector: 'IT/ITeS',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600',
    highlights: ['SEO & SEM', 'Social Media Marketing', 'Content Marketing', 'Google Ads Certification'],
    placement: '80%',
    avgSalary: '₹25,000/month',
  },
  {
    id: 'hotel-management',
    title: 'Hotel Management & Tourism',
    provider: 'IHM Srinagar',
    location: 'Srinagar',
    duration: '12 months',
    fee: 85000,
    loanEligible: true,
    rating: 4.9,
    reviews: 156,
    enrolled: 450,
    sector: 'Tourism & Hospitality',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    highlights: ['Front Office', 'Food & Beverage', 'Housekeeping', 'Event Management'],
    placement: '95%',
    avgSalary: '₹28,000/month',
  },
  {
    id: 'nursing-assistant',
    title: 'General Duty Assistant (Nursing)',
    provider: 'GMC Srinagar',
    location: 'Srinagar',
    duration: '6 months',
    fee: 30000,
    loanEligible: true,
    rating: 4.7,
    reviews: 203,
    enrolled: 600,
    sector: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600',
    highlights: ['Patient Care', 'Medical Terminology', 'First Aid', 'Hospital Procedures'],
    placement: '88%',
    avgSalary: '₹22,000/month',
  },
  {
    id: 'kashmiri-embroidery',
    title: 'Kashmiri Embroidery & Sozni',
    provider: 'JK Handicrafts',
    location: 'Srinagar',
    duration: '4 months',
    fee: 15000,
    loanEligible: true,
    rating: 4.9,
    reviews: 178,
    enrolled: 350,
    sector: 'Handicrafts',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    highlights: ['Traditional Sozni Work', 'Aari Embroidery', 'Pattern Design', 'Business Training'],
    placement: '70%',
    avgSalary: '₹20,000/month',
  },
  {
    id: 'electronics-repair',
    title: 'Mobile & Electronics Repair',
    provider: 'NSDC Partner',
    location: 'Jammu',
    duration: '3 months',
    fee: 25000,
    loanEligible: true,
    rating: 4.5,
    reviews: 267,
    enrolled: 900,
    sector: 'Electronics',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
    highlights: ['Smartphone Repair', 'Laptop Service', 'Circuit Analysis', 'Business Setup'],
    placement: '82%',
    avgSalary: '₹18,000/month',
  },
  {
    id: 'organic-farming',
    title: 'Organic Farming & Agri-Business',
    provider: 'SKUAST Kashmir',
    location: 'Srinagar',
    duration: '3 months',
    fee: 12000,
    loanEligible: true,
    rating: 4.6,
    reviews: 124,
    enrolled: 280,
    sector: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600',
    highlights: ['Organic Techniques', 'Saffron Cultivation', 'Apple Farming', 'Market Linkage'],
    placement: '65%',
    avgSalary: '₹15,000/month',
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Skill Development Courses
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Browse 100+ certified courses across high-demand sectors. Get trained by top 
              institutions with loan support up to ₹1,50,000.
            </p>
            
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, skills, or training providers..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl border p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Sectors</h3>
                <div className="space-y-2">
                  {sectors.map((sector) => (
                    <button
                      key={sector.id}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between hover:bg-gray-50 ${
                        sector.id === 'all' ? 'bg-primary-50 text-primary-600' : 'text-gray-600'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {sector.icon && <span>{sector.icon}</span>}
                        {sector.name}
                      </span>
                      <span className="text-xs text-gray-400">{sector.count}</span>
                    </button>
                  ))}
                </div>

                <hr className="my-6" />

                <h3 className="font-bold text-gray-900 mb-4">Location</h3>
                <div className="space-y-2">
                  {['All Locations', 'Srinagar', 'Jammu', 'Anantnag', 'Baramulla'].map((loc) => (
                    <label key={loc} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="rounded text-primary-500" />
                      {loc}
                    </label>
                  ))}
                </div>

                <hr className="my-6" />

                <h3 className="font-bold text-gray-900 mb-4">Duration</h3>
                <div className="space-y-2">
                  {['< 3 months', '3-6 months', '6-12 months', '> 12 months'].map((dur) => (
                    <label key={dur} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="rounded text-primary-500" />
                      {dur}
                    </label>
                  ))}
                </div>

                <hr className="my-6" />

                <h3 className="font-bold text-gray-900 mb-4">Fee Range</h3>
                <div className="space-y-2">
                  {['< ₹20,000', '₹20,000 - ₹50,000', '₹50,000 - ₹1,00,000', '> ₹1,00,000'].map((fee) => (
                    <label key={fee} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="rounded text-primary-500" />
                      {fee}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-gray-900">{courses.length}</span> courses
                </p>
                <select className="px-4 py-2 border rounded-lg text-sm bg-white">
                  <option>Sort by: Most Popular</option>
                  <option>Sort by: Highest Rated</option>
                  <option>Sort by: Lowest Fee</option>
                  <option>Sort by: Shortest Duration</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="bg-white rounded-xl border overflow-hidden card-hover group"
                  >
                    <div className="relative aspect-[16/9]">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-white/90 backdrop-blur-sm text-xs px-2 py-1 rounded-full font-medium">
                          {course.sector}
                        </span>
                        {course.loanEligible && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Loan Available
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-500 transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{course.provider}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {course.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.duration}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {course.highlights.slice(0, 3).map((h) => (
                          <span key={h} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {h}
                          </span>
                        ))}
                      </div>
                      <hr className="my-4" />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-bold text-gray-900">₹{course.fee.toLocaleString()}</div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="font-medium">{course.rating}</span>
                            <span className="text-gray-400">({course.reviews} reviews)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-green-600 font-semibold">{course.placement} Placement</div>
                          <div className="text-xs text-gray-500">{course.avgSalary}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Courses
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
