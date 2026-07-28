import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Engrite Innovations handles website enquiries and subscriber information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar solid />
      <main className="min-h-screen bg-[#f7f7f2] pb-24 pt-36">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="eyebrow text-[#1f7f39]">Website policy</div>
          <h1 className="mt-5 font-serif text-[clamp(48px,7vw,82px)] leading-[0.92] tracking-[-0.04em] text-[#102357]">
            Privacy Notice
          </h1>
          <p className="mt-7 text-sm leading-[1.9] text-[#596174]">
            This notice explains how Engrite Innovations Ltd. uses information
            submitted through this website. It should be reviewed by the
            company’s legal adviser before final publication.
          </p>

          <div className="mt-12 space-y-10 text-sm leading-[1.9] text-[#596174]">
            <section>
              <h2 className="font-serif text-2xl text-[#102357]">Information we collect</h2>
              <p className="mt-3">
                We may collect your name, email address, phone number, property
                interests, preferred inspection time and any message you submit.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-[#102357]">How we use it</h2>
              <p className="mt-3">
                We use submitted information to respond to enquiries, arrange
                inspections, provide requested property information and send
                updates when you have asked to receive them.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-[#102357]">Sharing and retention</h2>
              <p className="mt-3">
                Information should be accessible only to authorised Engrite
                personnel and service providers supporting the enquiry process.
                It should be retained only for as long as required for the
                stated purpose and applicable legal obligations.
              </p>
            </section>
            <section>
              <h2 className="font-serif text-2xl text-[#102357]">Your choices</h2>
              <p className="mt-3">
                You may request access, correction or deletion of your submitted
                information, or opt out of marketing updates, by emailing{" "}
                <a className="text-[#102357] underline" href="mailto:engriteinnovations@gmail.com">
                  engriteinnovations@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
