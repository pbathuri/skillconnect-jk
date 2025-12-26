import Link from 'next/link';
import { 
  Youtube, 
  Globe, 
  BookOpen, 
  Code, 
  Cpu, 
  Heart, 
  Palette, 
  Hotel,
  Leaf,
  Play,
  ExternalLink,
  Star,
  Clock,
  Users,
  Filter,
  Search,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

// Comprehensive YouTube course data
const youtubeCoursesIT = [
  {
    title: 'Complete Web Development Course',
    channel: 'freeCodeCamp',
    duration: '11 hours',
    views: '5M+',
    language: 'English',
    thumbnail: 'https://i.ytimg.com/vi/zJSY8tbf_ys/maxresdefault.jpg',
    videoId: 'zJSY8tbf_ys',
    description: 'Learn HTML, CSS, JavaScript from scratch',
    level: 'Beginner',
  },
  {
    title: 'Complete Python Tutorial in Hindi',
    channel: 'Code With Harry',
    duration: '12 hours',
    views: '30M+',
    language: 'Hindi',
    thumbnail: 'https://i.ytimg.com/vi/gfDE2a7MKjA/maxresdefault.jpg',
    videoId: 'gfDE2a7MKjA',
    description: 'Python programming complete tutorial',
    level: 'Beginner',
  },
  {
    title: 'Data Structures and Algorithms',
    channel: 'Apna College',
    duration: '15 hours',
    views: '10M+',
    language: 'Hindi',
    thumbnail: 'https://i.ytimg.com/vi/8hly31xKli0/maxresdefault.jpg',
    videoId: '8hly31xKli0',
    description: 'Complete DSA course for placements',
    level: 'Intermediate',
  },
  {
    title: 'Introduction to Computer Science',
    channel: 'CS50 - Harvard',
    duration: '25 hours',
    views: '15M+',
    language: 'English',
    thumbnail: 'https://i.ytimg.com/vi/8mAITcNt710/maxresdefault.jpg',
    videoId: '8mAITcNt710',
    description: 'World-famous CS course from Harvard',
    level: 'Beginner',
  },
  {
    title: 'Full Stack Development with MERN',
    channel: 'Traversy Media',
    duration: '8 hours',
    views: '2M+',
    language: 'English',
    thumbnail: 'https://i.ytimg.com/vi/7CqJlxBYj-M/maxresdefault.jpg',
    videoId: '7CqJlxBYj-M',
    description: 'Build full stack apps with React & Node.js',
    level: 'Intermediate',
  },
  {
    title: 'React Complete Course 2024',
    channel: 'Codevolution',
    duration: '10 hours',
    views: '3M+',
    language: 'English',
    thumbnail: 'https://i.ytimg.com/vi/QFaFIcGhPoM/maxresdefault.jpg',
    videoId: 'QFaFIcGhPoM',
    description: 'Master React.js from basics to advanced',
    level: 'Intermediate',
  },
  {
    title: 'Java Full Course in Hindi',
    channel: 'Telusko',
    duration: '14 hours',
    views: '8M+',
    language: 'Hindi/English',
    thumbnail: 'https://i.ytimg.com/vi/ntLJmHOJ0ME/maxresdefault.jpg',
    videoId: 'ntLJmHOJ0ME',
    description: 'Complete Java programming course',
    level: 'Beginner',
  },
  {
    title: 'SQL Full Course',
    channel: 'Bro Code',
    duration: '4 hours',
    views: '5M+',
    language: 'English',
    thumbnail: 'https://i.ytimg.com/vi/5OdVJbNCSso/maxresdefault.jpg',
    videoId: '5OdVJbNCSso',
    description: 'Learn SQL for database management',
    level: 'Beginner',
  },
];

const youtubeCoursesOther = [
  {
    title: 'Digital Marketing Full Course',
    channel: 'Simplilearn',
    duration: '8 hours',
    views: '5M+',
    language: 'English',
    thumbnail: 'https://i.ytimg.com/vi/nU-IIXBWlS4/maxresdefault.jpg',
    videoId: 'nU-IIXBWlS4',
    description: 'Complete digital marketing tutorial',
    level: 'Beginner',
    sector: 'Marketing',
  },
  {
    title: 'Hotel Management Course',
    channel: 'GreyCampus',
    duration: '6 hours',
    views: '500K+',
    language: 'English',
    thumbnail: 'https://i.ytimg.com/vi/3YvXqAOdGUw/maxresdefault.jpg',
    videoId: '3YvXqAOdGUw',
    description: 'Learn hospitality management',
    level: 'Beginner',
    sector: 'Tourism',
  },
  {
    title: 'Graphic Design Masterclass',
    channel: 'GFXMentor',
    duration: '10 hours',
    views: '2M+',
    language: 'Hindi',
    thumbnail: 'https://i.ytimg.com/vi/niG3o2MsL6s/maxresdefault.jpg',
    videoId: 'niG3o2MsL6s',
    description: 'Learn Photoshop, Illustrator, and more',
    level: 'Beginner',
    sector: 'Design',
  },
  {
    title: 'Basic Electronics Course',
    channel: 'GreatScott!',
    duration: '3 hours',
    views: '2M+',
    language: 'English',
    thumbnail: 'https://i.ytimg.com/vi/xGQERX4YXhY/maxresdefault.jpg',
    videoId: 'xGQERX4YXhY',
    description: 'Electronics fundamentals explained',
    level: 'Beginner',
    sector: 'Electronics',
  },
  {
    title: 'Basic First Aid Training',
    channel: 'Red Cross',
    duration: '2 hours',
    views: '1M+',
    language: 'English',
    thumbnail: 'https://i.ytimg.com/vi/--EobPaqlc4/maxresdefault.jpg',
    videoId: '--EobPaqlc4',
    description: 'Essential first aid skills',
    level: 'Beginner',
    sector: 'Healthcare',
  },
  {
    title: 'Agriculture & Farming Basics',
    channel: 'IFFCO',
    duration: '4 hours',
    views: '500K+',
    language: 'Hindi',
    thumbnail: 'https://i.ytimg.com/vi/wYvxkP_vJO8/maxresdefault.jpg',
    videoId: 'wYvxkP_vJO8',
    description: 'Modern farming techniques',
    level: 'Beginner',
    sector: 'Agriculture',
  },
];

const freeResources = [
  {
    name: 'Khan Academy',
    description: 'Free world-class education for anyone, anywhere. Math, Science, Computing, Economics, and more.',
    logo: '📚',
    url: 'https://www.khanacademy.org',
    languages: ['English', 'Hindi'],
    subjects: ['Math', 'Science', 'Computing', 'Economics'],
    color: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Coursera',
    description: 'Free courses from top universities like Stanford, Yale, and IITs. Audit courses for free.',
    logo: '🎓',
    url: 'https://www.coursera.org',
    languages: ['English', 'Hindi'],
    subjects: ['Technology', 'Business', 'Data Science', 'Arts'],
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'NPTEL',
    description: 'Free courses from IITs and IISc. Perfect for engineering and science students.',
    logo: '🏛️',
    url: 'https://nptel.ac.in',
    languages: ['English', 'Hindi'],
    subjects: ['Engineering', 'Science', 'Management', 'Humanities'],
    color: 'from-red-500 to-rose-600',
  },
  {
    name: 'SWAYAM',
    description: 'Government of India free learning platform with courses from UGC, AICTE, NCERT, NIOS.',
    logo: '🇮🇳',
    url: 'https://swayam.gov.in',
    languages: ['English', 'Hindi', 'Regional'],
    subjects: ['All Subjects', 'School to PG Level'],
    color: 'from-orange-500 to-amber-600',
  },
  {
    name: 'edX',
    description: 'Free courses from Harvard, MIT, Berkeley and other top institutions worldwide.',
    logo: '🌐',
    url: 'https://www.edx.org',
    languages: ['English'],
    subjects: ['Computer Science', 'Business', 'Engineering', 'Medicine'],
    color: 'from-purple-500 to-violet-600',
  },
  {
    name: 'Google Digital Garage',
    description: 'Free courses on digital skills from Google. Get Google certifications.',
    logo: '🔍',
    url: 'https://learndigital.withgoogle.com/digitalgarage',
    languages: ['English', 'Hindi'],
    subjects: ['Digital Marketing', 'Data', 'Career Development'],
    color: 'from-cyan-500 to-teal-600',
  },
  {
    name: 'Microsoft Learn',
    description: 'Free learning paths for Azure, Office 365, programming, and Microsoft technologies.',
    logo: '💻',
    url: 'https://learn.microsoft.com',
    languages: ['English', 'Hindi'],
    subjects: ['Azure', 'Programming', 'Office', 'Security'],
    color: 'from-sky-500 to-blue-600',
  },
  {
    name: 'Udemy Free Courses',
    description: 'Thousands of free courses on programming, design, business, and personal development.',
    logo: '📖',
    url: 'https://www.udemy.com/courses/free/',
    languages: ['English', 'Hindi'],
    subjects: ['Programming', 'Design', 'Business', 'Photography'],
    color: 'from-pink-500 to-rose-600',
  },
];

const skillPlaylists = [
  {
    sector: 'IT/ITeS',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    playlists: [
      { title: 'Web Development', channel: 'freeCodeCamp', videos: 100, url: 'https://www.youtube.com/playlist?list=PLWKjhJtqVAblfum5WiQblKPwIbqYXkDoC' },
      { title: 'Python Programming', channel: 'Code With Harry', videos: 135, url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agwh1XjRt242xIpHhPT2llg' },
      { title: 'React.js Tutorial', channel: 'Codevolution', videos: 80, url: 'https://www.youtube.com/playlist?list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3' },
    ],
  },
  {
    sector: 'Electronics',
    icon: Cpu,
    color: 'from-purple-500 to-pink-500',
    playlists: [
      { title: 'Basic Electronics', channel: 'NPTEL', videos: 40, url: 'https://www.youtube.com/playlist?list=PLbMVogVj5nJQC7mzIhZl0wpJcGd_JKQNL' },
      { title: 'Arduino Projects', channel: 'Paul McWhorter', videos: 50, url: 'https://www.youtube.com/playlist?list=PLGs0VKk2DiYw-L-RibttcvK-WBZm8WLEP' },
    ],
  },
  {
    sector: 'Healthcare',
    icon: Heart,
    color: 'from-rose-500 to-red-500',
    playlists: [
      { title: 'Medical Assistant Training', channel: 'MedCerts', videos: 25, url: 'https://www.youtube.com/playlist?list=PLs7vJxhS_PZ0W5_8KpmH_X6kk7JnH2z9c' },
      { title: 'First Aid & CPR', channel: 'Red Cross', videos: 15, url: 'https://www.youtube.com/playlist?list=PLU8oLJxrA3L6Xr9L7K_5zzQC0D9E0JN0Y' },
    ],
  },
  {
    sector: 'Tourism & Hospitality',
    icon: Hotel,
    color: 'from-amber-500 to-orange-500',
    playlists: [
      { title: 'Hotel Management', channel: 'Hospitality Education', videos: 30, url: 'https://www.youtube.com/playlist?list=PLEiEAq2VkUUJ3f-EECshCBzqSmXJmWEzN' },
      { title: 'Tourism Marketing', channel: 'Tourism School', videos: 20, url: 'https://www.youtube.com/playlist?list=PLEiEAq2VkUUJ3f-EECshCBzqSmXJmWEzN' },
    ],
  },
  {
    sector: 'Handicrafts & Arts',
    icon: Palette,
    color: 'from-pink-500 to-fuchsia-500',
    playlists: [
      { title: 'Kashmiri Embroidery', channel: 'Kashmir Arts', videos: 15, url: 'https://www.youtube.com/results?search_query=kashmiri+embroidery+tutorial' },
      { title: 'Papier-mâché Making', channel: 'Indian Crafts', videos: 10, url: 'https://www.youtube.com/results?search_query=papier+mache+kashmir+tutorial' },
    ],
  },
  {
    sector: 'Agriculture',
    icon: Leaf,
    color: 'from-green-500 to-lime-500',
    playlists: [
      { title: 'Modern Farming', channel: 'IFFCO Kisan', videos: 50, url: 'https://www.youtube.com/c/IFFCOKisanSolutions' },
      { title: 'Organic Farming', channel: 'Krishi Vigyan', videos: 35, url: 'https://www.youtube.com/results?search_query=organic+farming+hindi' },
    ],
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="absolute inset-0 kashmir-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 rounded-full px-4 py-2 mb-6">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">100% Free Learning Resources</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              Start Learning Today,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Completely Free
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Access thousands of free courses from YouTube, Khan Academy, Coursera, and more. 
              Build your skills before applying for a loan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Youtube className="mr-2 h-5 w-5" />
                Explore YouTube Courses
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Globe className="mr-2 h-5 w-5" />
                Browse Free Platforms
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* IT/Programming YouTube Courses */}
      <section id="youtube" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Youtube className="h-6 w-6 text-red-600" />
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
                  IT & Programming Courses
                </h2>
              </div>
              <p className="text-muted-foreground">Full courses from top educators - English & Hindi</p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {youtubeCoursesIT.map((course) => (
              <a
                key={course.videoId}
                href={`https://www.youtube.com/watch?v=${course.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border overflow-hidden card-hover group"
              >
                <div className="relative aspect-video">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {course.duration}
                  </span>
                  <span className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${
                    course.language === 'Hindi' ? 'bg-orange-500' : 
                    course.language === 'Hindi/English' ? 'bg-purple-500' : 'bg-blue-500'
                  } text-white`}>
                    {course.language}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-500 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{course.channel}</p>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {course.views} views
                    </span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Other Sector YouTube Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Courses in Other Sectors
            </h2>
            <p className="text-muted-foreground">Healthcare, Tourism, Electronics, and more</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubeCoursesOther.map((course) => (
              <a
                key={course.videoId}
                href={`https://www.youtube.com/watch?v=${course.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border overflow-hidden card-hover group"
              >
                <div className="relative aspect-video">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <span className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {course.sector}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-500 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{course.channel} • {course.language}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Free Educational Platforms */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Free Educational Platforms
            </h2>
            <p className="text-muted-foreground">World-class education from top institutions - completely free</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeResources.map((resource) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border p-6 card-hover group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center text-3xl mb-4`}>
                  {resource.logo}
                </div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-500 transition-colors">
                  {resource.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4 line-clamp-2">{resource.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {resource.languages.map((lang) => (
                    <span key={lang} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-sm text-primary-500 font-medium">
                  Visit Platform
                  <ExternalLink className="ml-2 h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sector-wise Playlists */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">
              Curated Learning Paths by Sector
            </h2>
            <p className="text-gray-400">Complete YouTube playlists organized by skill sector</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillPlaylists.map((sector) => (
              <div key={sector.sector} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                <div className={`bg-gradient-to-r ${sector.color} p-4`}>
                  <div className="flex items-center gap-3">
                    <sector.icon className="h-6 w-6 text-white" />
                    <h3 className="font-bold text-lg text-white">{sector.sector}</h3>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {sector.playlists.map((playlist) => (
                    <a
                      key={playlist.title}
                      href={playlist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium text-white">{playlist.title}</h4>
                        <p className="text-sm text-gray-400">{playlist.channel} • {playlist.videos} videos</p>
                      </div>
                      <Play className="h-5 w-5 text-red-400" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Learn in Your Language
            </h2>
            <p className="text-muted-foreground">Resources available in multiple languages</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { language: 'English', flag: '🇬🇧', channels: 50, description: 'International resources' },
              { language: 'Hindi', flag: '🇮🇳', channels: 30, description: 'हिंदी में सीखें' },
              { language: 'Urdu', flag: '🌙', channels: 10, description: 'اردو میں سیکھیں' },
              { language: 'Kashmiri', flag: '🏔️', channels: 5, description: 'کٲشُر زبٲنۍ' },
            ].map((lang) => (
              <div key={lang.language} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{lang.flag}</div>
                <h3 className="font-bold text-gray-900">{lang.language}</h3>
                <p className="text-sm text-muted-foreground mt-1">{lang.description}</p>
                <p className="text-sm text-primary-500 mt-2">{lang.channels}+ channels</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Ready for Professional Certification?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            After building your basics with free resources, apply for a skill loan to get 
            professionally trained and certified by our partner training providers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90">
                <GraduationCap className="mr-2 h-5 w-5" />
                Browse Certified Courses
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn About Loans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

