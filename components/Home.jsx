import Hero from './Hero.jsx'
import ServicesPreview from './ServicesPreview.jsx'
import CTABanner from './CTABanner.jsx'
import WorkPreview from './WorkPreview.jsx'
import FAQ from './FAQ.jsx'
import Contact from './Contact.jsx'

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <CTABanner />
      <WorkPreview />
      <FAQ />
      <Contact />
    </main>
  )
}
