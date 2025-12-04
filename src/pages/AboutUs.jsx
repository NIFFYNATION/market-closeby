import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br mt-18 sm:mt-38 from-primary to-secondary text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Market Closeby — Your everyday marketplace, closer than ever.</h1>
          <p className="mt-4 text-base md:text-lg opacity-90">Our mission is simple: help people find, buy, and receive what they need from trusted local and nationwide sellers-fast, fairly, and with joy.</p>
          <div className="mt-8 flex flex-col md:flex-row text-center gap-4">
            <Link to="/signup" className="bg-white text-primary font-semibold px-6 py-3 rounded-full shadow hover:shadow-lg transition">Start shopping</Link>
            <Link to="/seller-landing-page" className="border border-white/90 text-white px-6 py-3 rounded-full hover:bg-white/10 transition">Sell on Market Closeby</Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              We started Market Closeby with a simple belief: everyday shopping should feel effortless and human. No endless scrolling without trust. No waiting for deliveries that never arrive. Just real products from real people—nearby or nationwide—delivered quickly and reliably.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              In 2021, a small team of builders and sellers met over late-night coffees and countless prototypes. We listened to what buyers and vendors truly wanted: speed, fairness, and transparency. Today, Market Closeby brings those values to life with a marketplace that champions local merchants, streamlines logistics, and puts customers first.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              We’re still the same passionate crew—curious, slightly playful, and obsessed with great service. Every order, every chat, every tiny tweak is our way of making your day easier.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <img src="/public/imgs/order-now.svg" alt="Order now" className="w-full h-44 object-contain" />
            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex items-start gap-3"><img src="/icons/lightning-fast.svg" alt="Fast" className="w-6 h-6" /><span>Same-day and next-day delivery options in supported regions.</span></li>
              <li className="flex items-start gap-3"><img src="/icons/verified-user.svg" alt="Verified" className="w-6 h-6" /><span>Verified sellers and simple dispute resolution.</span></li>
              <li className="flex items-start gap-3"><img src="/icons/wallet-bold.svg" alt="Fair pricing" className="w-6 h-6" /><span>Fair pricing with transparent fees—no surprises.</span></li>
              <li className="flex items-start gap-3"><img src="/icons/heart-fill.svg" alt="Care" className="w-6 h-6" /><span>Friendly human support when you need it most.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What We Believe</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '/icons/heart-fill.svg', title: 'People First', text: 'We design for humans—clear pricing, quick support, and honest policies.' },
              { icon: '/icons/lightning-fast.svg', title: 'Speed Matters', text: 'Delivery that respects your time, from same-day to reliable scheduled drops.' },
              { icon: '/icons/verified-user.svg', title: 'Trust by Default', text: 'Verified sellers, secure payments, and reviews you can count on.' },
              { icon: '/icons/shipping-filled.svg', title: 'Local + Nationwide', text: 'Discover nearby gems and nationwide favorites—all in one place.' },
            ].map((v) => (
              <div key={v.title} className="p-6 rounded-xl border border-gray-100 shadow-sm bg-gray-50">
                <img src={v.icon} alt={v.title} className="w-8 h-8" />
                <h3 className="mt-3 font-semibold text-gray-900">{v.title}</h3>
                <p className="mt-2 text-gray-700">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How It Works</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {[
            { icon: '/icons/search.svg', title: 'Search & Discover', text: 'Find products, stores, and deals near you or nationwide.' },
            { icon: '/icons/options.svg', title: 'Compare & Choose', text: 'Check reviews, delivery options, and pricing before you buy.' },
            { icon: '/icons/cart.svg', title: 'Order Securely', text: 'Use secure payments and get instant order updates.' },
            { icon: '/icons/shipping-filled.svg', title: 'Track & Receive', text: 'Track your package live and enjoy quick delivery.' },
          ].map((s) => (
            <div key={s.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <img src={s.icon} alt={s.title} className="w-8 h-8" />
              <h3 className="mt-3 font-semibold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-gray-700">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Numbers that matter</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: '1M+', label: 'Products discovered' },
              { stat: '5,000+', label: 'Active sellers' },
              { stat: '98%', label: 'On-time deliveries' },
              { stat: '24/7', label: 'Customer support' },
            ].map((n) => (
              <div key={n.label} className="p-6 rounded-xl border border-gray-100 shadow-sm bg-gray-50 text-center">
                <div className="text-3xl font-extrabold text-primary">{n.stat}</div>
                <div className="mt-2 text-gray-700">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Meet the team</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              We’re a small team of designers, engineers, operators, and vendor success champions. We debate kindly, we ship fast, and we celebrate the little wins that make your day better. We believe good marketplaces feel like friendly neighborhoods—welcoming, fair, and full of great finds.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900">Founders</h3>
            <p className="mt-2 text-gray-700">Ada & Tobi—product nerds with big hearts. They started Market Closeby to bring buyers and sellers closer, one delightful delivery at a time.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Ready to join the marketplace that cares?</h2>
            <p className="mt-2 opacity-90">Create an account in minutes and start shopping or selling today.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/signup" className="bg-white text-primary font-semibold px-6 py-3 rounded-full shadow hover:shadow-lg transition">Get started</Link>
            <Link to="/contact" className="border border-white/90 text-white px-6 py-3 rounded-full hover:bg-white/10 transition">Talk to us</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;

