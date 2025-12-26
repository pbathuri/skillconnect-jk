import Link from 'next/link';
import { 
  Star, 
  MapPin, 
  Users, 
  GraduationCap, 
  Award,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  Clock,
  Building2,
  Calendar,
  Briefcase,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

// This would come from API
const providerData = {
  id: 'niit-foundation',
  name: 'NIIT Foundation',
  type: 'IT Training Institute',
  tagline: 'Transforming Lives Through IT Education',
  description: `NIIT Foundation has been at the forefront of IT education in India for over 40 years. Our Srinagar center offers world-class training in software development, data science, and digital skills.

We are committed to providing industry-relevant skills that lead to employment. Our curriculum is designed in partnership with leading tech companies to ensure our students are job-ready from day one.`,
  location: 'Srinagar, J&K',
  address: 'Residency Road, Lal Chowk, Srinagar - 190001',
  rating: 4.9,
  reviews: 456,
  students: 5000,
  courseCount: 15,
  placement: 92,
  avgSalary: '₹32,000/month',
  established: '2008',
  tpScore: 95,
  verified: true,
  contact: {
    phone: '+91 194 XXX XXXX',
    email: 'srinagar@niitfoundation.org',
    website: 'www.niitfoundation.org',
  },
  images: [
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800',
  ],
  sectors: ['IT/ITeS', 'Digital Marketing', 'Data Science'],
  certifications: ['NSDC Partner', 'ISO 9001:2015', 'NASSCOM Certified'],
  facilities: [
    'Modern Computer Labs',
    'High-speed Internet',
    'Library & Study Rooms',
    'Placement Cell',
    'Soft Skills Training',
    'Industry Mentorship',
  ],
  courses: [
    {
      id: 'web-development',
      title: 'Full Stack Web Development',
      duration: '6 months',
      fee: 45000,
      enrolled: 245,
      rating: 4.8,
    },
    {
      id: 'data-science',
      title: 'Data Science & Analytics',
      duration: '8 months',
      fee: 65000,
      enrolled: 180,
      rating: 4.7,
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Professional',
      duration: '4 months',
      fee: 35000,
      enrolled: 312,
      rating: 4.6,
    },
  ],
  placementPartners: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'HCL', 'Tech Mahindra'],
  testimonials: [
    {
      name: 'Amir Khan',
      batch: '2023',
      course: 'Full Stack Development',
      company: 'TCS',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      text: 'NIIT Foundation completely transformed my career. The practical approach and placement support were excellent.',
    },
    {
      name: 'Fatima Bano',
      batch: '2023',
      course: 'Digital Marketing',
      company: 'Flipkart',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      text: 'The trainers are industry experts who bring real-world experience to the classroom.',
    },
  ],
};

export default function TrainingProviderDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            src={providerData.images[0]}
            alt={providerData.name}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {providerData.verified && (
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified Partner
                  </span>
                )}
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
                  TP Score: {providerData.tpScore}
                </span>
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
                {providerData.name}
              </h1>
              <p className="text-xl text-gray-300 mb-4">{providerData.tagline}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {providerData.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Est. {providerData.established}
                </span>
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  {providerData.rating} ({providerData.reviews} reviews)
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {providerData.certifications.map((cert) => (
                  <span key={cert} className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">
                    {cert}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{providerData.students.toLocaleString()}+</div>
                  <div className="text-sm text-gray-300">Students Trained</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{providerData.courseCount}</div>
                  <div className="text-sm text-gray-300">Courses</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{providerData.placement}%</div>
                  <div className="text-sm text-gray-300">Placement Rate</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{providerData.avgSalary}</div>
                  <div className="text-sm text-gray-300">Avg. Salary</div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="lg:w-80">
              <div className="bg-white rounded-2xl p-6 text-gray-900">
                <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <span className="text-sm">{providerData.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">{providerData.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">{providerData.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">{providerData.contact.website}</span>
                  </div>
                </div>
                <hr className="my-4" />
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  <Phone className="mr-2 h-4 w-4" />
                  Request Callback
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Facilities */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">About Us</h2>
              <p className="text-gray-600 whitespace-pre-line">{providerData.description}</p>
              
              <h3 className="font-bold text-gray-900 mt-8 mb-4">Sectors</h3>
              <div className="flex flex-wrap gap-2">
                {providerData.sectors.map((sector) => (
                  <span key={sector} className="bg-primary-50 text-primary-600 px-4 py-2 rounded-full font-medium">
                    {sector}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Facilities</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {providerData.facilities.map((facility) => (
                  <div key={facility} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-gray-900">Courses Offered</h2>
            <Link href={`/courses?provider=${params.id}`}>
              <Button variant="outline">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {providerData.courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="bg-white rounded-xl border p-6 card-hover"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.enrolled} enrolled
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-gray-900">₹{course.fee.toLocaleString()}</div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Partners */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Placement Partners
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {providerData.placementPartners.map((partner) => (
              <div key={partner} className="bg-gray-50 rounded-xl px-8 py-4 font-semibold text-gray-700">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-8 text-center">
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {providerData.testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-xl p-6 border">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.course} | Batch {testimonial.batch}
                    </p>
                    <p className="text-sm text-green-600 font-medium">Now at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Ready to Start Learning at {providerData.name}?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Browse courses, apply for a skill loan, and begin your career transformation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/courses?provider=${params.id}`}>
              <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90">
                <GraduationCap className="mr-2 h-5 w-5" />
                Browse Courses
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Apply for Loan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
