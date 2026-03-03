import React, { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Head>
        <title>Southboro Sitters | Playmates for Busy Families</title>
        <meta name="description" content="Professional sitter service in Southborough, MA." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav className="sticky top-0 z-50 bg-warm-cream/95 backdrop-blur border-b border-sage/20 pb-shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-sage">Southboro Sitters</h1>
          <div className="flex gap-6 text-sm">
            <a href="#about" className="text-charcoal hover:text-sage">About</a>
            <a href="#services" className="text-charcoal hover:text-sage">Services</a>
            <a href="#faq" className="text-charcoal hover:text-sage">FAQ</a>
            <a href="#contact" className="text-charcoal hover:text-sage">Contact</a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[600px] bg-gradient-to-br from-warm-cream via-warm-cream to-sage/5 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-terra/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-sage/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold text-charcoal mb-6">
              Fun Playmates for Busy Families
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mb-8 font-body">
              Four responsible 3rd graders ready to keep your kids engaged with crafts, games, and outdoor fun.
            </p>
          </div>

          <div className="animate-fade-in-delay-1 flex gap-4">
            <a href="#contact" className="btn-primary">Schedule a Chat</a>
            <a href="#services" className="btn-secondary">Learn More</a>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/50 backdrop-blur border-2 border-sage/30 rounded-lg p-8 hand-drawn text-center">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="font-bold text-charcoal mb-2">Crafts & Projects</h3>
              <p className="text-sm text-charcoal/60">Creative activities that keep kids engaged</p>
            </div>
            <div className="bg-white/50 backdrop-blur border-2 border-sage/30 rounded-lg p-8 hand-drawn text-center">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="font-bold text-charcoal mb-2">Games & Outdoor Time</h3>
              <p className="text-sm text-charcoal/60">Fun, active play that tires them out</p>
            </div>
            <div className="bg-white/50 backdrop-blur border-2 border-sage/30 rounded-lg p-8 hand-drawn text-center">
              <div className="text-4xl mb-3">🏠</div>
              <h3 className="font-bold text-charcoal mb-2">You Stay Home</h3>
              <p className="text-sm text-charcoal/60">Parent always present—we're here to help</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white border-t-2 border-sage/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal mb-12">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-charcoal/70 mb-6 leading-relaxed">
                We're four 3rd graders at Woodward School—Ella, Mia, Riley, and Natalie. We grew up playing with our own younger siblings and cousins, and we're great at keeping kids entertained.
              </p>
              <p className="text-lg text-charcoal/70 leading-relaxed">
                Think of us as babysitters-in-training with all the reliability and none of the high cost. We're local, trustworthy, and we love hanging out with kids.
              </p>
            </div>
            <div className="bg-terra/10 border-2 border-terra/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-charcoal mb-6">The Team</h3>
              <div className="space-y-4">
                {['Ella', 'Mia', 'Riley', 'Natalie'].map((name) => (
                  <div key={name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center text-sm font-bold text-sage">
                      {name[0]}
                    </div>
                    <span className="text-charcoal font-semibold">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-warm-cream border-t-2 border-sage/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">What We Do</h3>
              <ul className="space-y-3 text-lg text-charcoal/70">
                <li className="flex gap-3"><span className="text-terra font-bold">✓</span><span>Keep your kids engaged with crafts, games, activities</span></li>
                <li className="flex gap-3"><span className="text-terra font-bold">✓</span><span>Help with snacks (following your instructions)</span></li>
                <li className="flex gap-3"><span className="text-terra font-bold">✓</span><span>Outdoor play and active time</span></li>
                <li className="flex gap-3"><span className="text-terra font-bold">✓</span><span>Follow your house rules exactly</span></li>
                <li className="flex gap-3"><span className="text-terra font-bold">✓</span><span>Tell you if anything seems off</span></li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">Realistic Time Commitment</h3>
              <div className="space-y-4">
                <div className="bg-white border-2 border-sage/30 rounded-lg p-6">
                  <h4 className="font-bold text-charcoal mb-2">Weekend Morning</h4>
                  <p className="text-charcoal/60">Saturday or Sunday, 9am–12pm</p>
                </div>
                <div className="bg-white border-2 border-sage/30 rounded-lg p-6">
                  <h4 className="font-bold text-charcoal mb-2">Afternoon Half-Day</h4>
                  <p className="text-charcoal/60">Weekday 1pm–4pm or weekend 1pm–5pm</p>
                </div>
                <div className="bg-white border-2 border-sage/30 rounded-lg p-6">
                  <h4 className="font-bold text-charcoal mb-2">Flexible Booking</h4>
                  <p className="text-charcoal/60">Use Calendly to find times that work</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white border-t-2 border-sage/20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal mb-12">FAQ</h2>
          <div className="space-y-6">
            <details className="group border-2 border-sage/30 rounded-lg p-6 cursor-pointer hover:border-sage/50">
              <summary className="flex justify-between items-center font-bold text-charcoal text-lg">What's a mother's helper?<span className="group-open:rotate-180">▼</span></summary>
              <p className="text-charcoal/70 mt-4">A mother's helper plays with your kids while you're home. You're always present—we give you breathing room to work or do chores.</p>
            </details>

            <details className="group border-2 border-sage/30 rounded-lg p-6 cursor-pointer hover:border-sage/50">
              <summary className="flex justify-between items-center font-bold text-charcoal text-lg">Do you take kids outside?<span className="group-open:rotate-180">▼</span></summary>
              <p className="text-charcoal/70 mt-4">We stay at your home. We can do yard activities with your permission, but never leave the property.</p>
            </details>

            <details className="group border-2 border-sage/30 rounded-lg p-6 cursor-pointer hover:border-sage/50">
              <summary className="flex justify-between items-center font-bold text-charcoal text-lg">Are you CPR certified?<span className="group-open:rotate-180">▼</span></summary>
              <p className="text-charcoal/70 mt-4">No—that's normal for mother's helpers. You're home and present for medical needs. We're here to entertain and keep kids safe.</p>
            </details>

            <details className="group border-2 border-sage/30 rounded-lg p-6 cursor-pointer hover:border-sage/50">
              <summary className="flex justify-between items-center font-bold text-charcoal text-lg">What's your experience?<span className="group-open:rotate-180">▼</span></summary>
              <p className="text-charcoal/70 mt-4">We all have younger siblings and cousins. We're great at crafts, games, and keeping kids happy and engaged.</p>
            </details>

            <details className="group border-2 border-sage/30 rounded-lg p-6 cursor-pointer hover:border-sage/50">
              <summary className="flex justify-between items-center font-bold text-charcoal text-lg">How do we schedule?<span className="group-open:rotate-180">▼</span></summary>
              <p className="text-charcoal/70 mt-4">We use Calendly. You see available times and book directly. We'll collect house rules before each visit.</p>
            </details>

            <details className="group border-2 border-sage/30 rounded-lg p-6 cursor-pointer hover:border-sage/50">
              <summary className="flex justify-between items-center font-bold text-charcoal text-lg">What if something goes wrong?<span className="group-open:rotate-180">▼</span></summary>
              <p className="text-charcoal/70 mt-4">You're home, so you're in control. If a kid gets upset, we ask for your help immediately.</p>
            </details>

            <details className="group border-2 border-sage/30 rounded-lg p-6 cursor-pointer hover:border-sage/50">
              <summary className="flex justify-between items-center font-bold text-charcoal text-lg">How reliable are you?<span className="group-open:rotate-180">▼</span></summary>
              <p className="text-charcoal/70 mt-4">We take this seriously. If someone gets sick, we give 24hr notice and connect you with another helper.</p>
            </details>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-warm-cream border-t-2 border-sage/20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-charcoal mb-4">Let's Connect</h2>
          <p className="text-lg text-charcoal/70 mb-12">Have questions? Fill out the form or use Calendly to book.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white border-2 border-sage/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-charcoal mb-6">Quick Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-charcoal font-semibold mb-2">Your Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border-2 border-sage/30 rounded-lg px-4 py-2" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-charcoal font-semibold mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border-2 border-sage/30 rounded-lg px-4 py-2" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block text-charcoal font-semibold mb-2">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-2 border-sage/30 rounded-lg px-4 py-2" placeholder="(123) 456-7890" />
                </div>
                <div>
                  <label className="block text-charcoal font-semibold mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full border-2 border-sage/30 rounded-lg px-4 py-2" placeholder="Tell us about your family..." />
                </div>
                <button type="submit" className="btn-primary w-full">Send Inquiry</button>
                {submitted && <p className="text-sage font-semibold text-center">✓ Thanks! We'll be in touch.</p>}
              </form>
            </div>

            <div className="bg-white border-2 border-terra/30 rounded-lg p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-charcoal mb-4">Schedule Directly</h3>
              <p className="text-charcoal/70 mb-6">See our available times and book using Calendly.</p>
              <a href="https://calendly.com/kyle-opsdev/mothers-helpers" target="_blank" rel="noopener noreferrer" className="btn-primary text-center">Open Calendly</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-charcoal text-warm-cream py-12 border-t-4 border-sage">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div><h3 className="text-lg font-bold mb-3">Southboro Sitters</h3><p className="text-warm-cream/70">Four 3rd graders making parenting easier.</p></div>
            <div><h4 className="font-bold mb-3">Quick Links</h4><ul className="space-y-2 text-sm text-warm-cream/70"><li><a href="#about">About</a></li><li><a href="#services">Services</a></li><li><a href="#faq">FAQ</a></li></ul></div>
            <div><h4 className="font-bold mb-3">Get Started</h4><a href="mailto:kyle.opsdev@gmail.com" className="text-terra hover:text-clay font-semibold">Email us</a></div>
          </div>
          <div className="border-t border-warm-cream/20 pt-8 text-center text-sm text-warm-cream/50"><p>&copy; 2025 Southboro Sitters.</p></div>
        </div>
      </footer>
    </>
  )
}
