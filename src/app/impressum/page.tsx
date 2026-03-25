import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum | ILS One',
  description: 'Legal information about i.AM Innovation Lab AG, the company behind ILS One.',
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-dark-950">
      <div className="container-narrow py-24 md:py-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-accent-400 transition-colors mb-12"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-dark-50 mb-4">Impressum</h1>
        <p className="text-dark-400 mb-12">
          Information pursuant to Art. 3 of the Swiss Federal Act on Unfair Competition (UWG).
        </p>

        <div className="space-y-10 text-dark-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">Company</h2>
            <ul className="space-y-1">
              <li>Company name: i.AM Innovation Lab AG</li>
              <li>Registered address: Löwenstrasse 29, 8001 Zürich, Switzerland</li>
              <li>Company number (UID): CHE-217.197.805</li>
              <li>VAT number: CHE-217.197.805 MWST</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">Authorized Representatives</h2>
            <ul className="space-y-1">
              <li>Pascal René Nägeli, Chairman</li>
              <li>Claudio Schneider Blank, Member of the Board of Directors</li>
              <li>Renato Schneeberger, Authorized Signatory</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">Contact</h2>
            <ul className="space-y-1">
              <li>
                Email:{' '}
                <a href="mailto:info@iam-lab.ch" className="text-accent-500 hover:text-accent-400 transition-colors">
                  info@iam-lab.ch
                </a>
              </li>
              <li>
                Phone:{' '}
                <a href="tel:+41782057685" className="text-accent-500 hover:text-accent-400 transition-colors">
                  +41 78 205 76 85
                </a>
              </li>
              <li>
                Website:{' '}
                <a
                  href="https://ils-one.ch"
                  className="text-accent-500 hover:text-accent-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ils-one.ch
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">Trade Register</h2>
            <p>
              i.AM Innovation Lab AG is registered in the commercial register of the Canton of Zürich, Switzerland.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">Editorial Responsibility</h2>
            <p>i.AM Innovation Lab AG is responsible for the content of this website.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-sm text-dark-500">© {new Date().getFullYear()} i.AM Innovation Lab AG. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}
