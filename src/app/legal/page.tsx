import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal Notice | ILS One',
  description: 'Legal notice, disclaimer, and intellectual property information for ils-one.ch.',
};

export default function LegalNoticePage() {
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

        <h1 className="text-4xl md:text-5xl font-bold text-dark-50 mb-12">Legal Notice</h1>

        <div className="space-y-10 text-dark-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">Disclaimer</h2>
            <p>
              The content of this website has been prepared with care. However, i.AM Innovation Lab AG makes no
              representations or warranties, express or implied, regarding the accuracy, completeness, or timeliness of
              the information provided. Liability claims arising from the use of any information on this website,
              including information that may be incomplete or incorrect, are excluded to the extent permitted by
              applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">External Links</h2>
            <p>
              This website may contain links to third-party websites. We have no control over the content or
              availability of these external sites and accept no responsibility for them. The respective operators of
              linked websites are solely responsible for their content. At the time of linking, no legal violations were
              apparent. If we become aware of any infringement, the relevant link will be removed promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">Intellectual Property</h2>
            <p>
              All content on this website — including text, images, graphics, logos, and software — is the property of
              i.AM Innovation Lab AG or its licensors and is protected by applicable copyright and intellectual property
              laws. Any reproduction, distribution, or use of such content beyond the scope of copyright law requires the
              prior written consent of i.AM Innovation Lab AG.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">No Offer or Solicitation</h2>
            <p>
              The information on this website is for general informational purposes only. Nothing on this website
              constitutes an offer, solicitation, or recommendation to buy or sell any financial instrument, to enter
              into any transaction, or to engage in any legal or financial relationship. Professional advice should be
              sought before making any financial or legal decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark-100 mb-4">Applicable Law and Jurisdiction</h2>
            <p>
              These terms are governed by the laws of Switzerland. The exclusive place of jurisdiction is Zürich,
              Switzerland, unless mandatory statutory provisions dictate otherwise.
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
