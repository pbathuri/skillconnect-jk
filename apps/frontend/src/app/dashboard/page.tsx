'use client';

import Link from 'next/link';
import {
  GraduationCap,
  Banknote,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  Bell,
  BookOpen,
  Award,
  Users,
  Download,
  Eye,
  Play,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

// Mock user data - would come from API
const userData = {
  name: 'Amir Khan',
  email: 'amir.khan@email.com',
  phone: '+91 9876543210',
  district: 'Srinagar',
  enrolledCourse: {
    name: 'Full Stack Web Development',
    provider: 'NIIT Foundation',
    progress: 45,
    startDate: '2024-09-15',
    endDate: '2025-03-15',
    nextClass: '2024-12-26 10:00 AM',
    currentModule: 'React.js Fundamentals',
  },
  loan: {
    amount: 45000,
    disbursed: 27000, // T0 + T1
    remaining: 18000,
    emi: 1250,
    status: 'Active',
    nextMilestone: 'T2 - 66% Completion',
    milestoneProgress: 68, // % to next milestone
  },
  attendance: 87,
  assessments: {
    completed: 5,
    total: 8,
    avgScore: 78,
  },
  notifications: [
    { id: 1, type: 'milestone', message: 'T2 milestone approaching! Maintain attendance.', time: '2 hours ago' },
    { id: 2, type: 'class', message: 'Tomorrow\'s class rescheduled to 11 AM', time: '1 day ago' },
    { id: 3, type: 'assessment', message: 'New assessment available: React Components', time: '2 days ago' },
  ],
  upcomingDeadlines: [
    { title: 'React Project Submission', date: '2024-12-28', type: 'assignment' },
    { title: 'Module 3 Assessment', date: '2024-12-30', type: 'assessment' },
    { title: 'T2 Milestone', date: '2025-01-05', type: 'milestone' },
  ],
};

const milestones = [
  { id: 'T0', name: 'Enrollment', status: 'completed', amount: 13500 },
  { id: 'T1', name: '33% Complete', status: 'completed', amount: 13500 },
  { id: 'T2', name: '66% Complete', status: 'current', amount: 9000 },
  { id: 'T3', name: 'Certification', status: 'pending', amount: 9000 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Welcome back, {userData.name}!</h1>
              <p className="text-gray-400">Here's your learning progress and loan status</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
              </Button>
              <Button className="bg-white text-gray-900 hover:bg-white/90">
                <FileText className="mr-2 h-4 w-4" />
                Download Statement
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Progress Card */}
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-bold text-xl text-gray-900">{userData.enrolledCourse.name}</h2>
                    <p className="text-muted-foreground">{userData.enrolledCourse.provider}</p>
                  </div>
                  <Link href="/courses/web-development">
                    <Button variant="outline" size="sm">
                      View Course
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Course Progress</span>
                    <span className="font-semibold text-gray-900">{userData.enrolledCourse.progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
                      style={{ width: `${userData.enrolledCourse.progress}%` }}
                    />
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{userData.attendance}%</div>
                    <div className="text-xs text-gray-500">Attendance</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{userData.assessments.avgScore}%</div>
                    <div className="text-xs text-gray-500">Avg. Score</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{userData.assessments.completed}/{userData.assessments.total}</div>
                    <div className="text-xs text-gray-500">Assessments</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-amber-600">A</div>
                    <div className="text-xs text-gray-500">Current Grade</div>
                  </div>
                </div>

                {/* Current Module */}
                <div className="mt-6 bg-primary-50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500 text-white flex items-center justify-center">
                      <Play className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Current: {userData.enrolledCourse.currentModule}</div>
                      <div className="text-sm text-gray-500">Next class: {userData.enrolledCourse.nextClass}</div>
                    </div>
                  </div>
                  <Button size="sm">Continue Learning</Button>
                </div>
              </div>

              {/* Loan & Milestone Card */}
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-xl text-gray-900">Loan Status</h2>
                  <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                    {userData.loan.status}
                  </span>
                </div>

                {/* Loan Summary */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Total Loan</div>
                    <div className="text-xl font-bold text-gray-900">₹{userData.loan.amount.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Disbursed</div>
                    <div className="text-xl font-bold text-green-600">₹{userData.loan.disbursed.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Remaining</div>
                    <div className="text-xl font-bold text-blue-600">₹{userData.loan.remaining.toLocaleString()}</div>
                  </div>
                </div>

                {/* Milestone Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-muted-foreground">Next Milestone: {userData.loan.nextMilestone}</span>
                    <span className="font-semibold text-primary-600">{userData.loan.milestoneProgress}% complete</span>
                  </div>
                  <div className="flex gap-2">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className="flex-1 text-center">
                        <div className={`h-2 rounded-full mb-2 ${milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'current' ? 'bg-primary-500' :
                              'bg-gray-200'
                          }`} />
                        <div className="text-xs font-medium text-gray-900">{milestone.id}</div>
                        <div className="text-xs text-gray-500">{milestone.name}</div>
                        <div className={`text-xs ${milestone.status === 'completed' ? 'text-green-600' :
                            milestone.status === 'current' ? 'text-primary-600' :
                              'text-gray-400'
                          }`}>
                          ₹{milestone.amount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EMI Info */}
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-amber-800">EMI starts after moratorium (3 months post-course)</div>
                      <div className="font-bold text-amber-900">Expected EMI: ₹{userData.loan.emi}/month</div>
                    </div>
                    <Link href="/bank-info">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Free Learning Resources */}
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-xl text-gray-900">Supplement Your Learning</h2>
                  <Link href="/learn">
                    <Button variant="outline" size="sm">
                      View All
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Free YouTube courses to help you master your current topics
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { title: 'React.js Full Course', channel: 'freeCodeCamp', duration: '12h', url: 'https://youtube.com' },
                    { title: 'JavaScript Tutorial', channel: 'Code With Harry', duration: '8h', url: 'https://youtube.com' },
                    { title: 'CSS Masterclass', channel: 'Traversy Media', duration: '4h', url: 'https://youtube.com' },
                  ].map((video) => (
                    <a
                      key={video.title}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Play className="h-4 w-4 text-red-500" />
                        <span className="text-xs text-gray-500">{video.duration}</span>
                      </div>
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-2">{video.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{video.channel}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Loan Agreement
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Certificate
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View Attendance Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Contact Trainer
                  </Button>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-xl border p-6">
                <h3 className="font-bold text-gray-900 mb-4">Recent Notifications</h3>
                <div className="space-y-4">
                  {userData.notifications.map((notif) => (
                    <div key={notif.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notif.type === 'milestone' ? 'bg-green-100 text-green-600' :
                          notif.type === 'class' ? 'bg-blue-100 text-blue-600' :
                            'bg-amber-100 text-amber-600'
                        }`}>
                        {notif.type === 'milestone' ? <Award className="h-4 w-4" /> :
                          notif.type === 'class' ? <Calendar className="h-4 w-4" /> :
                            <FileText className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-xl border p-6">
                <h3 className="font-bold text-gray-900 mb-4">Upcoming Deadlines</h3>
                <div className="space-y-3">
                  {userData.upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${deadline.type === 'milestone' ? 'bg-green-500' :
                          deadline.type === 'assessment' ? 'bg-amber-500' :
                            'bg-blue-500'
                        }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                        <p className="text-xs text-gray-500">{deadline.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
                <h3 className="font-bold mb-2">Need Help?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Our support team is here to assist you with any questions.
                </p>
                <Link href="/help">
                  <Button className="w-full bg-white text-primary-600 hover:bg-white/90">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
