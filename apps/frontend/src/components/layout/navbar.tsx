'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Courses', href: '/courses' },
  { label: 'Free Learning', href: '/learn' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Training Providers', href: '/training-providers' },
  { label: 'Bank Info', href: '/bank-info' },
  { label: 'About', href: '/about' },
];

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'ur', label: 'اردو' },
  { code: 'ks', label: 'کٲشُر' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
              SK
            </div>
            <span className="font-bold text-xl hidden sm:block">SkillConnect JK</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-primary-500 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 p-2">
                <Globe className="h-5 w-5" />
                <span className="hidden sm:inline text-sm">{languages.find(l => l.code === currentLang)?.label}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border py-2 w-32 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setCurrentLang(lang.code)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      currentLang === lang.code ? 'text-primary-500 font-medium' : 'text-gray-600'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2" />
              <Link href="/auth/login" className="px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">
                Log In
              </Link>
              <Link href="/auth/register" className="px-4">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

