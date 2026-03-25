import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | ILS One',
  description: 'Privacy policy for ils-one.ch, operated by i.AM Innovation Lab AG.',
};

export default function PrivacyPolicyPage() {
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

        <h1 className="text-4xl md:text-5xl font-bold text-dark-50 mb-4">Privacy Policy</h1>
        <p className="text-dark-400 mb-12">Last updated: March 2026</p>

        <div className="space-y-10 text-dark-300 leading-relaxed">
          <p>
            i.AM Innovation Lab AG (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website
            ils-one.ch. This Privacy Policy explains how we handle information when you visit our website.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">1. Responsible Entity</h2>
            <p className="mb-2">The entity responsible for data processing on this website is:</p>
            <address className="not-italic">
              i.AM Innovation Lab AG
              <br />
              Löwenstrasse 29, 8001 Zürich, Switzerland
              <br />
              <a href="mailto:info@iam-lab.ch" className="text-accent-500 hover:text-accent-400 transition-colors">
                info@iam-lab.ch
              </a>
            </address>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">2. Data We Collect</h2>
            <p>
              Our website is primarily informational. We do not currently use analytics tools, tracking cookies, or
              advertising technologies. When you visit our website, your browser automatically transmits certain
              technical data to our web server. This includes your IP address, the date and time of your request, the
              page visited, browser type and version, and your operating system. This data is processed to deliver the
              website to you and to ensure its technical security. It is not combined with other data sources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">3. Contact Requests</h2>
            <p>
              If you contact us via email or through a contact form, we will process the personal data you provide (such
              as your name, email address, and message content) solely for the purpose of responding to your inquiry. We
              will not share this information with third parties unless required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">4. Hosting</h2>
            <p>
              This website is hosted by Vercel Inc. When you access our website, Vercel may process technical data such
              as your IP address as part of delivering the site. Vercel&apos;s servers may be located outside
              Switzerland. For more information, please refer to Vercel&apos;s privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">5. Cookies</h2>
            <p>
              This website does not currently use cookies for analytics or marketing purposes. Should this change in the
              future, we will update this policy and implement appropriate consent mechanisms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">6. Third-Party Services</h2>
            <p>
              We do not currently embed third-party analytics, advertising, or social media tracking tools on this
              website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">7. Data Retention</h2>
            <p>
              Technical server log data is retained only for as long as necessary to ensure the secure operation of the
              website. Personal data from contact inquiries is retained for as long as needed to process your request and
              is then deleted unless legal retention obligations apply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">8. Your Rights</h2>
            <p>
              Under the Swiss Federal Act on Data Protection (FADP) and, where applicable, the EU General Data
              Protection Regulation (GDPR), you have the right to access, rectify, delete, or restrict the processing of
              your personal data. You may also object to processing or request data portability. To exercise these
              rights, please contact us at{' '}
              <a href="mailto:info@iam-lab.ch" className="text-accent-500 hover:text-accent-400 transition-colors">
                info@iam-lab.ch
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The current version is always available on this page.
              We encourage you to review it periodically.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-sm text-dark-500">© {new Date().getFullYear()} i.AM Innovation Lab AG. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}
