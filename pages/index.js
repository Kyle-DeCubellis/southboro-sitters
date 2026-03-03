import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'

function useOnScreen(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return visible
}

function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef()
  const visible = useOnScreen(ref)
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const team = [
  { name: 'Ella', emoji: '\u{1F3A8}', specialty: 'Arts & Crafts', desc: 'Can turn a cardboard box into a castle. Loves painting, collages, and slime.' },
  { name: 'Mia', emoji: '\u{1F3C3}', specialty: 'Games & Sports', desc: 'Tag, relay races, obstacle courses\u2014she keeps everyone moving and laughing.' },
  { name: 'Riley', emoji: '\u{1F4DA}', specialty: 'Stories & Imagination', desc: 'Builds entire worlds with stuffed animals. Great at reading aloud and make-believe.' },
  { name: 'Natalie', emoji: '\u{1F3B5}', specialty: 'Music & Dance', desc: 'Freeze dance champion. Brings the energy and always gets kids giggling.' },
]

const testimonials = [
  { quote: 'My two kids were so entertained I actually finished a full chapter of my book. First time in months.', parent: 'Sarah M.', kids: 'Mom of 2, ages 4 & 6' },
  { quote: 'They showed up with craft supplies and a plan. My daughter still talks about the friendship bracelets they made.', parent: 'Jennifer L.', kids: 'Mom of 1, age 5' },
  { quote: 'I was skeptical, but these girls are genuinely great with kids. Professional beyond their years.', parent: 'Amanda K.', kids: 'Mom of 3, ages 3, 5 & 7' },
]

const faqs = [
  { q: 'What exactly is a mother\u2019s helper?', a: 'We play with and entertain your kids while you\u2019re home. Think of it as having a fun, responsible friend over for your children\u2014giving you breathing room to work, cook, or just take a break. You\u2019re always in the house.' },
  { q: 'Will a parent always be home?', a: 'Always. That\u2019s the whole model. We\u2019re not babysitters\u2014we\u2019re helpers. You stay home and we keep the kids happily occupied so you can focus on other things.' },
  { q: 'What ages do you work with?', a: 'We\u2019re best with kids ages 2\u20137. Old enough to play games and do crafts, young enough to think we\u2019re the coolest people ever.' },
  { q: 'How much does it cost?', a: '$12\u2013$15/hour depending on the number of kids. Way less than a traditional babysitter, and your kids get a playmate instead of a screen.' },
  { q: 'What if my child gets upset?', a: 'We come get you immediately. You\u2019re right there in the house\u2014that\u2019s the beauty of the mother\u2019s helper model. No guessing, no worry.' },
  { q: 'How do I book?', a: 'Use our Calendly link to pick a time that works. We\u2019ll send you a quick questionnaire about house rules, allergies, and favorite activities before we arrive.' },
]

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
        <title>Southboro Sitters | Mother's Helpers in Southborough, MA</title>
        <meta name="description" content="Southboro Sitters provides trusted mother's helper services in Southborough, MA. Four experienced helpers keep your kids entertained with crafts, games, and outdoor fun while you're home." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Southboro Sitters | Mother's Helpers in Southborough, MA" />
        <meta property="og:description" content="Trusted, affordable mother's helpers for Southborough families. Crafts, games, outdoor fun\u2014while you stay home and relax." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/images/logo.png" />
      </Head>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-warm-cream/95 backdrop-blur-md border-b border-sage/15 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Southboro Sitters" width={140} height={48} className="h-10 w-auto" priority />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {['About', 'How It Works', 'Team', 'Reviews', 'FAQ', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="nav-link text-sm font-medium text-charcoal/70 hover:text-sage transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="btn-primary text-sm py-2 px-5">Book Now</a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
            <span className={`block w-6 h-0.5 bg-charcoal transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-charcoal transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-charcoal transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-sage/15 bg-warm-cream px-6 py-4 space-y-3">
            {['About', 'How It Works', 'Team', 'Reviews', 'FAQ', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} onClick={() => setMenuOpen(false)} className="block text-charcoal/70 hover:text-sage font-medium">
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-warm-cream via-warm-cream to-sage/8 overflow-hidden">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-sage/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-terra/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-[30%] w-48 h-48 bg-terra/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/10 border border-sage/20 text-sage text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              Now booking in Southborough, MA
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold text-charcoal mb-6 leading-[1.1] max-w-3xl">
              Your kids get a <span className="text-sage">playmate.</span><br />
              You get a <span className="text-terra">break.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-charcoal/60 max-w-2xl mb-10 leading-relaxed">
              We're four Woodward School 3rd graders who keep your kids entertained with crafts, games, and outdoor fun&mdash;while you stay home and breathe.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://calendly.com/kyle-opsdev/mothers-helpers" target="_blank" rel="noopener noreferrer" className="btn-primary text-center text-lg px-10 py-4">
                Book a Session
              </a>
              <a href="#how-it-works" className="btn-secondary text-center text-lg px-10 py-4">
                See How It Works
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-16 flex flex-wrap gap-8 text-charcoal/50 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-sage font-bold text-lg">{'\u2713'}</span>
                Parent always home
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sage font-bold text-lg">{'\u2713'}</span>
                $12&ndash;$15/hr
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sage font-bold text-lg">{'\u2713'}</span>
                Ages 2&ndash;7
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sage font-bold text-lg">{'\u2713'}</span>
                Weekends & afternoons
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-sm font-semibold text-sage uppercase tracking-widest">About Us</span>
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mt-3 mb-6">
                Not babysitters. Playmates.
              </h2>
              <p className="text-lg text-charcoal/60 leading-relaxed">
                We started Southboro Sitters because our parents' friends kept asking us to come play with their kids. Turns out we're really good at it. We bring the crafts, the energy, and the imagination&mdash;you stay home and finally get things done.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '4', label: 'Dedicated helpers' },
              { number: '20+', label: 'Happy families' },
              { number: '100%', label: 'Parent present' },
              { number: '$12', label: 'Starting rate/hr' },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-warm-cream/50">
                  <div className="text-3xl md:text-4xl font-bold text-sage mb-1">{stat.number}</div>
                  <div className="text-sm text-charcoal/50 font-medium">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-warm-cream">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-sage uppercase tracking-widest">How It Works</span>
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mt-3">Three simple steps</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Book a Time', desc: 'Pick a slot on our Calendly. Weekday afternoons or weekend mornings\u2014whatever works for your family.', icon: '\u{1F4C5}' },
              { step: '2', title: 'We Show Up Ready', desc: 'We arrive with craft supplies, game ideas, and a plan. You give us the house rules and we take it from there.', icon: '\u{1F3E0}' },
              { step: '3', title: 'You Relax', desc: 'Work from home, cook dinner, read a book, or just sit in silence for once. We\u2019ve got the kids covered.', icon: '\u2615' },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.15}>
                <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-sage/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute -top-4 -left-2 w-10 h-10 rounded-full bg-sage text-warm-cream flex items-center justify-center font-bold text-lg shadow-md">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-4 mt-2">{item.icon}</div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">{item.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES DETAIL */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <span className="text-sm font-semibold text-sage uppercase tracking-widest">What We Bring</span>
                <h2 className="text-4xl font-bold text-charcoal mt-3 mb-8">Every visit is planned</h2>
                <div className="space-y-5">
                  {[
                    { icon: '\u{1F3A8}', title: 'Crafts & creative projects', desc: 'Painting, friendship bracelets, slime, building\u2014we bring the supplies.' },
                    { icon: '\u{26BD}', title: 'Active outdoor play', desc: 'Tag, relay races, chalk art, bubbles\u2014we get energy out.' },
                    { icon: '\u{1F3B2}', title: 'Games & imagination', desc: 'Board games, hide and seek, scavenger hunts, make-believe worlds.' },
                    { icon: '\u{1F4D6}', title: 'Reading & quiet time', desc: 'We can wind things down with stories and calm activities too.' },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center text-2xl">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-charcoal mb-1">{item.title}</h4>
                        <p className="text-sm text-charcoal/60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-sage/5 to-terra/5 rounded-3xl p-10 border border-sage/15">
                <h3 className="text-2xl font-bold text-charcoal mb-2">The Safety Promise</h3>
                <p className="text-charcoal/50 mb-8 text-sm">What makes the mother's helper model work</p>
                <div className="space-y-4">
                  {[
                    'You\u2019re always home\u2014always in control',
                    'We never leave the property with your kids',
                    'We follow your house rules exactly',
                    'Any issue, we come to you immediately',
                    'We give 24hr notice if someone can\u2019t make it',
                    'Allergies, routines, and preferences are collected upfront',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center mt-0.5">
                        <span className="text-sage text-xs font-bold">{'\u2713'}</span>
                      </div>
                      <span className="text-charcoal/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 bg-warm-cream">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-sage uppercase tracking-widest">Meet the Team</span>
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mt-3 mb-4">Four helpers. Four specialties.</h2>
              <p className="text-charcoal/50 max-w-xl mx-auto">Each of us brings something different. Together, we can match any kid&apos;s energy and interests.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex justify-center mb-12">
              <div className="relative rounded-3xl overflow-hidden shadow-xl max-w-lg w-full">
                <Image src="/images/cofounders.png" alt="Ella, Mia, Riley, and Natalie - the Southboro Sitters team" width={600} height={400} className="w-full h-auto" />
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage/10 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center group">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sage/20 to-terra/20 flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {member.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-1">{member.name}</h3>
                  <p className="text-sage text-sm font-semibold mb-3">{member.specialty}</p>
                  <p className="text-charcoal/50 text-sm leading-relaxed">{member.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="py-24 bg-charcoal text-warm-cream">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-sage uppercase tracking-widest">What Parents Say</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3">Trusted by Southborough families</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-terra text-lg">{'\u2605'}</span>
                    ))}
                  </div>
                  <p className="text-warm-cream/80 leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-warm-cream">{t.parent}</p>
                    <p className="text-warm-cream/40 text-sm">{t.kids}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-sage uppercase tracking-widest">Pricing</span>
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mt-3 mb-4">Simple, fair rates</h2>
              <p className="text-charcoal/50">No hidden fees. No long-term commitment.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border-2 border-sage/20 p-8 hover:border-sage/40 transition-colors">
                <h3 className="text-lg font-bold text-charcoal mb-1">1&ndash;2 Kids</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-sage">$12</span>
                  <span className="text-charcoal/40">/hour</span>
                </div>
                <ul className="space-y-2 text-sm text-charcoal/60">
                  <li className="flex items-center gap-2"><span className="text-sage">{'\u2713'}</span> 2&ndash;3 hour sessions</li>
                  <li className="flex items-center gap-2"><span className="text-sage">{'\u2713'}</span> Craft supplies included</li>
                  <li className="flex items-center gap-2"><span className="text-sage">{'\u2713'}</span> Weekday & weekend slots</li>
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-terra/30 bg-terra/3 p-8 relative">
                <span className="absolute -top-3 right-6 bg-terra text-warm-cream text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                <h3 className="text-lg font-bold text-charcoal mb-1">3+ Kids</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-terra">$15</span>
                  <span className="text-charcoal/40">/hour</span>
                </div>
                <ul className="space-y-2 text-sm text-charcoal/60">
                  <li className="flex items-center gap-2"><span className="text-terra">{'\u2713'}</span> 2&ndash;3 hour sessions</li>
                  <li className="flex items-center gap-2"><span className="text-terra">{'\u2713'}</span> Extra helper included</li>
                  <li className="flex items-center gap-2"><span className="text-terra">{'\u2713'}</span> Perfect for playdates</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-warm-cream">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-sage uppercase tracking-widest">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mt-3">Common questions</h2>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-sage/15 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-6 text-left font-bold text-charcoal hover:text-sage transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-sage text-xl transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48 pb-6' : 'max-h-0'}`}>
                    <p className="px-6 text-charcoal/60 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-sage uppercase tracking-widest">Get Started</span>
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mt-3 mb-4">Ready to book?</h2>
              <p className="text-charcoal/50 max-w-xl mx-auto">Pick a time on Calendly, or send us a message and we'll get back to you within 24 hours.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <FadeIn>
              <div className="bg-warm-cream/50 border border-sage/15 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-charcoal mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-charcoal text-sm font-semibold mb-1.5">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-sage/30 rounded-xl px-4 py-3 bg-white text-sm" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-charcoal text-sm font-semibold mb-1.5">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-sage/30 rounded-xl px-4 py-3 bg-white text-sm" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-charcoal text-sm font-semibold mb-1.5">Phone <span className="text-charcoal/30 font-normal">(optional)</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-sage/30 rounded-xl px-4 py-3 bg-white text-sm" placeholder="(508) 555-0123" />
                  </div>
                  <div>
                    <label className="block text-charcoal text-sm font-semibold mb-1.5">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="3" className="w-full border border-sage/30 rounded-xl px-4 py-3 bg-white text-sm" placeholder="Tell us about your kids and what you're looking for..." />
                  </div>
                  <button type="submit" className="btn-primary w-full py-3.5">Send Message</button>
                  {submitted && (
                    <p className="text-sage font-semibold text-center text-sm animate-fade-in">
                      {'\u2713'} Message sent! We'll be in touch soon.
                    </p>
                  )}
                </form>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-col gap-6">
                <div className="bg-gradient-to-br from-sage to-sage/80 rounded-2xl p-8 text-warm-cream flex-1 flex flex-col justify-center">
                  <div className="text-4xl mb-4">{'\u{1F4C5}'}</div>
                  <h3 className="text-2xl font-bold mb-2">Book on Calendly</h3>
                  <p className="text-warm-cream/70 mb-6 text-sm leading-relaxed">See our real-time availability and book a session in seconds. No back-and-forth needed.</p>
                  <a href="https://calendly.com/kyle-opsdev/mothers-helpers" target="_blank" rel="noopener noreferrer" className="inline-block bg-warm-cream text-sage font-semibold rounded-xl px-6 py-3 text-center hover:bg-white transition-colors text-sm">
                    View Available Times
                  </a>
                </div>

                <div className="bg-warm-cream/50 border border-sage/15 rounded-2xl p-8">
                  <h4 className="font-bold text-charcoal mb-4">Quick details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-charcoal/50">Service area</span>
                      <span className="text-charcoal font-medium">Southborough, MA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/50">Session length</span>
                      <span className="text-charcoal font-medium">2&ndash;3 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/50">Availability</span>
                      <span className="text-charcoal font-medium">Weekends & weekday afternoons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/50">Ages served</span>
                      <span className="text-charcoal font-medium">2&ndash;7 years old</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal/50">Email</span>
                      <a href="mailto:kyle.opsdev@gmail.com" className="text-sage font-medium hover:underline">kyle.opsdev@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal text-warm-cream py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/images/logo.png" alt="Southboro Sitters" width={120} height={40} className="h-8 w-auto brightness-200" />
              </div>
              <p className="text-warm-cream/50 text-sm leading-relaxed max-w-sm">
                Trusted mother's helper service in Southborough, MA. Four Woodward School 3rd graders keeping kids entertained while parents stay home and relax.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-warm-cream/70">Quick Links</h4>
              <ul className="space-y-2 text-sm text-warm-cream/50">
                <li><a href="#about" className="hover:text-sage transition-colors">About</a></li>
                <li><a href="#how-it-works" className="hover:text-sage transition-colors">How It Works</a></li>
                <li><a href="#team" className="hover:text-sage transition-colors">Meet the Team</a></li>
                <li><a href="#faq" className="hover:text-sage transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-warm-cream/70">Contact</h4>
              <ul className="space-y-2 text-sm text-warm-cream/50">
                <li><a href="mailto:kyle.opsdev@gmail.com" className="hover:text-sage transition-colors">kyle.opsdev@gmail.com</a></li>
                <li><a href="https://calendly.com/kyle-opsdev/mothers-helpers" target="_blank" rel="noopener noreferrer" className="hover:text-sage transition-colors">Book on Calendly</a></li>
                <li>Southborough, MA 01772</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-warm-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-warm-cream/30">
            <p>&copy; {new Date().getFullYear()} Southboro Sitters. All rights reserved.</p>
            <p>Serving families in Southborough, Ashland, Hopkinton & Westborough</p>
          </div>
        </div>
      </footer>
    </>
  )
}
