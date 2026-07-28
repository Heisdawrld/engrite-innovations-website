import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { StatsBar } from "@/components/site/stats-bar";
import { Ticker } from "@/components/site/ticker";
import { About } from "@/components/site/about";
import { Projects } from "@/components/site/projects";
import { ProgressGallery } from "@/components/site/progress-gallery";
import { Invest } from "@/components/site/invest";
import { WhyUs } from "@/components/site/why-us";
import { Newsletter } from "@/components/site/newsletter";
import { Contact } from "@/components/site/contact";
import { FAQ } from "@/components/site/faq";
import { Testimonials } from "@/components/site/testimonials";
import { ClientTestimonials } from "@/components/site/client-testimonials";
import { DiasporaSection } from "@/components/site/diaspora-section";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#102357] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main" className="flex-1">
        <Hero />
        <StatsBar />
        <Ticker />
        <Projects />
        <ProgressGallery />
        <About />
        <Invest />
        <WhyUs />
        <DiasporaSection />
        <Testimonials />
        <ClientTestimonials />
        <FAQ />
        <Newsletter />
        <Contact />
      </main>

      <Footer />

      <WhatsAppFloat />
    </>
  );
}
