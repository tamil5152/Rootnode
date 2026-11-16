import Nav from "./Nav";
import Hero from "./Hero";
import Services from "./Services";
import Roadmap from "./Roadmap";
import Capabilities from "./Capabilities";
import Compare from "./Compare";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Contact from "./Contact";
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
