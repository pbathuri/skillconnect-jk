import Link from 'next/link';
import { 
  Star, 
  MapPin, 
  Users, 
  GraduationCap, 
  Award,
  CheckCircle2,
  ArrowRight,
  Search,
  Filter,
  Building2,
  TrendingUp,
  Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const providers = [
  {
    id: 'niit-foundation',
    name: 'NIIT Foundation',
    type: 'IT Training',
    location: 'Srinagar',
    rating: 4.9,
    reviews: 456,
    students: 5000,
    courses: 15,
    placement: 92,
    avgSalary: '₹32,000/month',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600',
    sectors: ['IT/ITeS', 'Digital Marketing'],
    highlights: ['NSDC Partner', 'ISO Certified', '15+ Years Experience'],
    tpScore: 95,
    verified: true,
  },
  {
    id: 'ihm-srinagar',
    name: 'IHM Srinagar',
    type: 'Hospitality Training',
    location: 'Srinagar',
    rating: 4.8,
    reviews: 289,
    students: 3000,
    courses: 8,
    placement: 95,
    avgSalary: '₹28,000/month',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
    sectors: ['Tourism & Hospitality'],
    highlights: ['Government Institute', 'Industry Tie-ups', 'Hostel Facility'],
    tpScore: 97,
    verified: true,
  },
  {
    id: 'aptech-jammu',
    name: 'Aptech Computer Education',
    type: 'IT Training',
    location: 'Jammu',
    rating: 4.7,
    reviews: 312,
    students: 4500,
    courses: 12,
    placement: 88,
    avgSalary: '₹30,000/month',
    image: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=600',
    sectors: ['IT/ITeS', 'Data Science'],
    highlights: ['40+ Years Legacy', 'Global Curriculum', 'Career Services'],
    tpScore: 92,
    verified: true,
  },
  {
    id: 'jk-handicrafts',
    name: 'J&K Handicrafts Development',
    type: 'Handicrafts Training',
    location: 'Srinagar',
    rating: 4.9,
    reviews: 178,
    students: 2000,
    courses: 10,
    placement: 75,
    avgSalary: '₹22,000/month',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    sectors: ['Handicrafts'],
    highlights: ['Traditional Arts', 'Export Linkage', 'Self-employment Focus'],
    tpScore: 90,
    verified: true,
  },
  {
    id: 'gmc-nursing',
    name: 'GMC Srinagar Nursing School',
    type: 'Healthcare Training',
    location: 'Srinagar',
    rating: 4.8,
    reviews: 203,
    students: 1500,
    courses: 5,
    placement: 90,
    avgSalary: '₹25,000/month',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600',
    sectors: ['Healthcare'],
    highlights: ['Hospital Training', 'Government Recognized', 'Clinical Experience'],
    tpScore: 94,
    verified: true,
  },
  {
    id: 'skuast-agri',
    name: 'SKUAST Kashmir',
    type: 'Agriculture Training',
    location: 'Shalimar, Srinagar',
    rating: 4.7,
    reviews: 145,
    students: 1200,
    courses: 6,
    placement: 70,
    avgSalary: '₹18,000/month',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600',
    sectors: ['Agriculture'],
    highlights: ['University Backed', 'Research Facilities', 'Field Training'],
    tpScore: 88,
    verified: true,
  },
];

const stats = [
  { label: 'Verified TPs', value: '50+', icon: CheckCircle2 },
  { label: 'Total Courses', value: '100+', icon: GraduationCap },
  { label: 'Students Trained', value: '15,000+', icon: Users },
  { label: 'Avg Placement', value: '85%', icon: TrendingUp },
];

export default function TrainingProvidersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 rounded-full px-4 py-2 mb-6">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-medium">All Training Providers Verified</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Training Providers
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Browse our network of 50+ verified training providers across J&K. All providers 
              are evaluated on placement rates, course quality, and student feedback.
            </p>
            
            {/* Search */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search training providers..."
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

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl border p-6 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Sectors</h3>
                <div className="space-y-2">
                  {['All Sectors', 'IT/ITeS', 'Tourism & Hospitality', 'Healthcare', 'Handicrafts', 'Agriculture', 'Electronics'].map((sector) => (
                    <label key={sector} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="rounded text-primary-500" defaultChecked={sector === 'All Sectors'} />
                      {sector}
                    </label>
                  ))}
                </div>

                <hr className="my-6" />

                <h3 className="font-bold text-gray-900 mb-4">Location</h3>
                <div className="space-y-2">
                  {['All Locations', 'Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur'].map((loc) => (
                    <label key={loc} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="rounded text-primary-500" defaultChecked={loc === 'All Locations'} />
                      {loc}
                    </label>
                  ))}
                </div>

                <hr className="my-6" />

                <h3 className="font-bold text-gray-900 mb-4">TP Score</h3>
                <div className="space-y-2">
                  {['90+ (Excellent)', '80-90 (Good)', '70-80 (Average)'].map((score) => (
                    <label key={score} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" className="rounded text-primary-500" />
                      {score}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Provider Cards */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-gray-900">{providers.length}</span> providers
                </p>
                <select className="px-4 py-2 border rounded-lg text-sm bg-white">
                  <option>Sort by: Highest Rated</option>
                  <option>Sort by: Most Students</option>
                  <option>Sort by: Best Placement</option>
                  <option>Sort by: TP Score</option>
                </select>
              </div>

              <div className="space-y-6">
                {providers.map((provider) => (
                  <Link
                    key={provider.id}
                    href={`/training-providers/${provider.id}`}
                    className="bg-white rounded-xl border overflow-hidden card-hover flex flex-col md:flex-row"
                  >
                    <div className="md:w-72 aspect-video md:aspect-auto">
                      <img
                        src={provider.image}
                        alt={provider.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-xl text-gray-900">{provider.name}</h3>
                            {provider.verified && (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <p className="text-muted-foreground">{provider.type}</p>
                        </div>
                        <div className="text-right">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                            TP Score: {provider.tpScore}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {provider.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-4 w-4" />
                          {provider.courses} courses
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {provider.students.toLocaleString()} students
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          {provider.rating} ({provider.reviews} reviews)
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {provider.sectors.map((sector) => (
                          <span key={sector} className="bg-primary-50 text-primary-600 text-xs px-3 py-1 rounded-full">
                            {sector}
                          </span>
                        ))}
                        {provider.highlights.map((highlight) => (
                          <span key={highlight} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex gap-6">
                          <div>
                            <div className="text-lg font-bold text-green-600">{provider.placement}%</div>
                            <div className="text-xs text-gray-500">Placement Rate</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-600">{provider.avgSalary}</div>
                            <div className="text-xs text-gray-500">Avg. Salary</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a TP CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Are You a Training Provider?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Partner with SkillConnect JK to reach more students and provide skill loans. 
            Get verified and start receiving loan-backed enrollments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/partner/apply">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90">
                <Building2 className="mr-2 h-5 w-5" />
                Become a Partner
              </Button>
            </Link>
            <Link href="/partner/guidelines">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
