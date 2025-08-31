"use client"

import {
  Header,
  Hero,
  Features,
  Stats,
  CallToAction,
  Footer
} from './components'

export default function ModernBeeKeeperLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <Hero />
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <Features />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <Stats />
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <CallToAction />
        </div>
      </section>

      <Footer />
    </div>
  )
}
