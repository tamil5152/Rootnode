import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Roadmap from "@/components/Roadmap";
import Services from "@/components/Services";
import Capabilities from "@/components/Capabilities";
import Compare from "@/components/Compare";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Roadmap />
        <Capabilities />
        <Compare />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
