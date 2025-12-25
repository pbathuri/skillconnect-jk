import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Platform: [
    { name: 'Browse Courses', href: '/courses' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'EMI Calculator', href: '/emi-calculator' },
    { name: 'Training Providers', href: '/training-providers' },
  ],
  Support: [
    { name: 'Help Center', href: '/help' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Grievance Redressal', href: '/grievance' },
  ],
  Legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Loan Agreement', href: '/loan-terms' },
    { name: 'Refund Policy', href: '/refund' },
  ],
  Partners: [
    { name: 'For Training Providers', href: '/partners/tp' },
    { name: 'For Banks', href: '/partners/banks' },
    { name: 'For Employers', href: '/partners/employers' },
    { name: 'API Documentation', href: '/api-docs' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white">SkillConnect</span>
                <span className="text-primary-400 font-bold ml-1">JK</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Empowering Jammu & Kashmir youth with outcome-linked skill development loans.
              Building a skilled workforce for a prosperous future.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary-400" />
                <span>support@skillconnectjk.gov.in</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary-400" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span>Srinagar, Jammu & Kashmir</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2024 SkillConnect JK. A Government of J&K Initiative.
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-500">Supported by:</span>
              <span className="text-sm">NSDC</span>
              <span className="text-sm">CGFSSD</span>
              <span className="text-sm">PSU Banks</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

