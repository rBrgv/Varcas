import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Varcas Enterprises</h3>
            </div>
            <p className="text-neutral-300 mb-3 leading-relaxed">
              Enterprise solutions for Solar, Telecom, and HR services.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Serving airports, educational institutions, and commercial facilities across Andhra Pradesh.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-neutral-300 hover:text-accent-400 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-neutral-300 hover:text-accent-400 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-300 hover:text-accent-400 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-neutral-300 hover:text-accent-400 transition-colors flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-neutral-300 hover:text-accent-400 transition-colors flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
            <address className="not-italic text-sm">
              <p className="font-semibold mb-1 text-neutral-200">Varcas Enterprises</p>
              <p className="mb-1 text-neutral-300">N Divakar Reddy – Proprietor</p>
              <p className="mb-1 text-neutral-300">5-5, RGT-SKHT Road</p>
              <p className="mb-1 text-neutral-300">Renigunta, Tirupati – 517520</p>
              <p className="mb-1 text-neutral-300">Andhra Pradesh, India</p>
              <p className="mt-3">
                <a
                  href="tel:+919346872545"
                  className="text-neutral-300 hover:text-accent-400 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 93468 72545
                </a>
              </p>
              <p className="mt-2">
                <a
                  href="mailto:varcasent@gmail.com"
                  className="text-neutral-300 hover:text-accent-400 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  varcasent@gmail.com
                </a>
              </p>
              <p className="mt-2">
                <a
                  href="https://www.varcasenterprises.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-accent-400 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  www.varcasenterprises.com
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="pt-8 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              &copy; {new Date().getFullYear()} Varcas Enterprises. All rights reserved.
            </p>
            <p className="text-neutral-400 text-sm">
              Proprietor: N Divakar Reddy
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

