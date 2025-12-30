'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-neutral-300 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900"></div>

      {/* Very subtle orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-500/6 rounded-full blur-3xl"></div>

      <div className="container-custom py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-5">
            <div className="mb-6">
              <div className="relative h-16 rounded-lg inline-block">
                <Image
                  src="/dvlogowhite.png"
                  alt="datavruti Logo"
                  width={280}
                  height={96}
                  className="object-contain h-full w-auto"
                />
              </div>
            </div>
            <p className="text-neutral-400 mb-8 leading-relaxed text-base">
              Connecting companies with exceptional data talent. We specialize in hiring data engineers, data scientists, and analytics professionals.
            </p>
            <div className="flex gap-3">
              {/* Social media links */}
              <a href="https://api.whatsapp.com/send/?phone=919378092086&text=Hi+datavruti+Team%2C%0AGot+your+reference+from+the+website.+Can+we+chat%3F&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="group relative w-11 h-11 bg-slate-800 hover:bg-gradient-to-br hover:from-green-600 hover:to-green-700 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/30 hover:scale-110 transform overflow-hidden" aria-label="WhatsApp">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                <svg className="relative h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>

              <a href="https://in.linkedin.com/company/datavruti" target="_blank" rel="noopener noreferrer" className="group relative w-11 h-11 bg-slate-800 hover:bg-gradient-to-br hover:from-accent-600 hover:to-accent-700 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-accent-500/30 hover:scale-110 transform overflow-hidden" aria-label="LinkedIn">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                <svg className="relative h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-white font-bold mb-6 text-base font-heading tracking-wide">QUICK LINKS</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-white transition-all duration-200 flex items-center gap-2 group">
                  <span className="text-accent-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-400 hover:text-white transition-all duration-200 flex items-center gap-2 group">
                  <span className="text-accent-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-neutral-400 hover:text-white transition-all duration-200 flex items-center gap-2 group">
                  <span className="text-accent-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/candidates" className="text-neutral-400 hover:text-white transition-all duration-200 flex items-center gap-2 group">
                  <span className="text-accent-500 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  For Candidates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-4">
            <h4 className="text-white font-bold mb-6 text-base font-heading tracking-wide">GET IN TOUCH</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:sales@datavruti.com" className="text-neutral-400 hover:text-white transition-all duration-200 flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-slate-800 group-hover:bg-accent-600 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-neutral-500 mb-1">Email</div>
                    <div className="font-medium">sales@datavruti.com</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://api.whatsapp.com/send/?phone=919378092086&text=Hi+datavruti+Team%2C%0AGot+your+reference+from+the+website.+Can+we+chat%3F&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-all duration-200 flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-slate-800 group-hover:bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-neutral-500 mb-1">WhatsApp</div>
                    <div className="font-medium">+91 9378092086</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="text-neutral-400 transition-all duration-200 flex items-start gap-3 group">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-neutral-500 mb-1">Office</div>
                    <div className="font-medium text-sm leading-relaxed">
                      B-1302 Karmyog Heights,<br />
                      S. V. Desai Marg, Navrangpura,<br />
                      Ahmedabad 380009, Gujarat, India
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm text-center md:text-left font-semibold">
              © {currentYear} Reflion Tech Private Limited. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-4">
                <Link href="/terms-of-service" className="text-neutral-400 hover:text-white text-sm transition-colors duration-200">
                  Terms Of Service
                </Link>
                <span className="text-neutral-600">|</span>
                <Link href="/privacy-policy" className="text-neutral-400 hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
