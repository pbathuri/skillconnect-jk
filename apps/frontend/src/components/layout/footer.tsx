import Link from 'next/link';
import { Phone, Mail, MapPin, Youtube, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
                SK
              </div>
              <span className="font-bold text-xl text-white">SkillConnect JK</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Empowering Jammu & Kashmir youth with outcome-linked skill development loans.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-500" />
                <span>support@skillconnectjk.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-500" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-500" />
                <span>Srinagar, J&K</span>
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-bold text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses" className="hover:text-amber-500 transition-colors">Browse Courses</Link></li>
              <li><Link href="/learn" className="hover:text-amber-500 transition-colors">Free Learning</Link></li>
              <li><Link href="/how-it-works" className="hover:text-amber-500 transition-colors">How It Works</Link></li>
              <li><Link href="/emi-calculator" className="hover:text-amber-500 transition-colors">EMI Calculator</Link></li>
              <li><Link href="/training-providers" className="hover:text-amber-500 transition-colors">Training Providers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-amber-500 transition-colors">Help Center</Link></li>
              <li><Link href="/faq" className="hover:text-amber-500 transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-amber-500 transition-colors">Contact Us</Link></li>
              <li><Link href="/grievance" className="hover:text-amber-500 transition-colors">Grievance Redressal</Link></li>
              <li><Link href="/bank-info" className="hover:text-amber-500 transition-colors">Bank Documentation</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/loan-agreement" className="hover:text-amber-500 transition-colors">Loan Agreement</Link></li>
              <li><Link href="/refund-policy" className="hover:text-amber-500 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Partners */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <p className="text-sm text-gray-400 mb-4">Supported by:</p>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <span className="bg-gray-800 px-4 py-2 rounded-lg">Government of J&K</span>
            <span className="bg-gray-800 px-4 py-2 rounded-lg">NSDC</span>
            <span className="bg-gray-800 px-4 py-2 rounded-lg">CGFSSD</span>
            <span className="bg-gray-800 px-4 py-2 rounded-lg">J&K Bank</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2024 SkillConnect JK. A Government of Jammu & Kashmir Initiative.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

