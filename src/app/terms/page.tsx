import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Important information about property content and investment illustrations on the Engrite website.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar solid />
      <main className="min-h-screen bg-[#f7f7f2] pb-24 pt-36">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="eyebrow text-[#1f7f39]">Important information</div>
          <h1 className="mt-5 font-serif text-[clamp(48px,7vw,82px)] leading-[0.92] tracking-[-0.04em] text-[#102357]">
            Website Terms
          </h1>
          <p className="mt-7 text-sm leading-[1.9] text-[#596174]">
            These website terms are a plain-language starting point and should
            be reviewed by the company’s legal adviser before final publication.
          </p>

          <div className="mt-12 space-y-10 text-sm leading-[1.9] text-[#596174]">
            <section>
              <h2 className="font-serif text-2xl text-[#102357]">General information</h2>
              <p className="mt-3">
                Website content is provided for general information and does not
                constitute legal, tax, financial or investment advice.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-[#102357]">Property information</h2>
              <p className="mt-3">
                Prices, availability, specifications, completion estimates,
                renders and payment schedules may change. The current offer
                document and executed agreement take precedence over website
                content.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-[#102357]">Returns and projections</h2>
              <p className="mt-3">
                Rental yields, appreciation figures and calculator outputs are
                illustrations based on stated assumptions. Actual results can
                vary and are not guaranteed.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-[#102357]">Independent advice</h2>
              <p className="mt-3">
                Prospective buyers should verify all project documents and seek
                independent legal, tax and financial advice before making a
                payment or signing an agreement.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
