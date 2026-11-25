import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import DemoBanner from './components/DemoBanner.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Locations from './components/Locations.jsx'
import Menu from './components/Menu.jsx'
import Navbar from './components/Navbar.jsx'
import Services from './components/Services.jsx'
import Testimonials from './components/Testimonials.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Locations />
        <Services />
        <About />
        <WhyChooseUs />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <DemoBanner />
    </>
  )
}
