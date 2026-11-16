import Nav from "./Nav";
import Hero from "./Hero";
import Services from "./Services";
import Roadmap from "./Roadmap";
import Capabilities from "./Capabilities";
import Compare from "./Compare";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Pricing from "./Pricing";
import Guarantee from "./Guarantee";
import Footer from "./Footer";
import ScrollManager from "./ScrollManager";

export default function HomePage() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Roadmap />
        <Pricing />
        <Guarantee />
        <Compare />
        <Testimonials />
        <FAQ />
        <Contact />
        <Capabilities />
      </main>
      <Footer />
    </>
  );
}
