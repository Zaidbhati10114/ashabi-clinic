'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Header from './Header';
import Footer from './Footer';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};
function ClaudeResult() {
  return (
    <main className="min-h-screen bg-[#faf7f2]">
      {/* NAV */}
      <Header ctaType="phone" phoneNumber="8856819580" />

      {/* ─── HERO ─── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Text */}
          <div>
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-4"
            >
              Homoeopathic Clinic · Est. 2008
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-6xl text-sage-800 leading-tight mb-2"
            >
              Ashabi
              <br />
              Clinic
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="font-display italic text-2xl text-sage-500 mb-6"
            >
              Gentle healing, trusted care.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-sm text-sage-600 leading-relaxed mb-8 max-w-sm"
            >
              A registered homoeopathic practice serving families in Sangli
              since 2008. Affordable, compassionate care — with medicines
              available right at our in-clinic pharmacy.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-sage-600 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-700 transition-colors"
              >
                Book Appointment
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 border border-sage-300 text-sage-700 text-sm font-medium px-6 py-3 rounded-full hover:bg-sage-50 transition-colors"
              >
                Learn More
              </a>
                          </motion.div>
            </div>

          {/* Doctor Photo Frame */}
          <motion.div
            variants={fadeUp}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-sage-100" />
              {/* Photo frame */}
              <div className="relative w-48 h-56 rounded-2xl overflow-hidden border-2 border-sage-200 shadow-md bg-warm">
                <Image
                  src="/doctor.png"
                  alt="Dr. Sahirabanu Faruk Bhati"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border border-sage-200 rounded-full px-4 py-1.5 shadow-sm whitespace-nowrap">
                <span className="text-xs font-medium text-sage-700">
                  Reg. No. 16878
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── DOCTOR INFO ─── */}
      <section id="about" className="bg-[#f0f5f0] py-14">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2"
            >
              About the Doctor
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl text-sage-800 mb-1"
            >
              Dr. Sahirabanu Faruk Bhati
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm text-sage-500 italic mb-6"
            >
              Registered as Dr. Saira Shikandar Mujawar · MCH Reg. No. 16878
            </motion.p>
            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-3 gap-6"
            >
              {[
                { label: 'Qualification', value: 'B.H.M.S., C.G.O.' },
                { label: 'Registered Since', value: '1989 (MCH Mumbai)' },
                { label: 'Practicing Since', value: '2008 at Ashabi Clinic' },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="bg-white rounded-xl p-5 border border-sage-100"
                >
                  <p className="text-xs text-sage-400 uppercase tracking-widest mb-1">
                    {item.label}
                  </p>
                  <p className="font-display text-xl text-sage-800">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2"
          >
            What We Offer
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl text-sage-800 mb-8"
          >
            Our Services
          </motion.h2>
          <motion.div
            variants={stagger}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-5"
          >
            {[
              {
                icon: '🌿',
                title: 'Homoeopathic Consultation',
                desc: 'Personalised remedy selection for acute and chronic conditions.',
              },
              {
                icon: '👶',
                title: 'Paediatric Care',
                desc: 'Safe, gentle treatment for children of all ages.',
              },
              {
                icon: '👩',
                title: "Women's Health",
                desc: 'Holistic support for hormonal, gynaecological, and general health.',
              },
              {
                icon: '🏠',
                title: 'Family Medicine',
                desc: 'Trusted care for every member of your family under one roof.',
              },
              {
                icon: '💊',
                title: 'In-Clinic Pharmacy',
                desc: 'Medicines available on-site at our rented medical shop — no extra trip needed.',
              },
              {
                icon: '📋',
                title: 'Follow-up Care',
                desc: 'Regular monitoring and treatment adjustments for long-term wellness.',
              },
            ].map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="bg-white border border-sage-100 rounded-xl p-5 hover:shadow-md hover:border-sage-300 transition-all"
              >
                <span className="text-2xl mb-3 block">{s.icon}</span>
                <h3 className="font-medium text-sage-800 mb-1 text-sm">
                  {s.title}
                </h3>
                <p className="text-xs text-sage-500 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── TIMINGS ─── */}
      <section className="bg-sage-700 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium tracking-[0.2em] text-sage-200 uppercase mb-2"
            >
              Visiting Hours
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl text-white mb-6"
            >
              Clinic Timings
            </motion.h2>
            <motion.div
              variants={stagger}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              {[
                { slot: 'Morning', time: '9:00 AM – 12:00 PM' },
                { slot: 'Evening', time: '5:00 PM – 8:00 PM' },
              ].map((t) => (
                <motion.div
                  key={t.slot}
                  variants={fadeUp}
                  className="bg-white/10 border border-white/20 rounded-xl px-8 py-4 text-center"
                >
                  <p className="text-sage-200 text-xs uppercase tracking-widest mb-1">
                    {t.slot}
                  </p>
                  <p className="font-display text-2xl text-white">{t.time}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="text-sage-300 text-xs mt-4">
              Sunday: Morning only &nbsp;·&nbsp; Closed on major holidays
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── MAP ─── */}
      <section id="location" className="max-w-5xl mx-auto px-6 py-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2"
          >
            Where We Are
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl text-sage-800 mb-6"
          >
            Find the Clinic
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="rounded-2xl overflow-hidden border border-sage-100 shadow-sm"
          >
            {/* Map iframe */}
            <div className="relative w-full h-64 sm:h-80">
              <iframe
                title="Ashabi Clinic Location"
                src={`https://maps.google.com/maps?q=16.841301757781988,74.58154669663469&z=16&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Bottom bar */}
            <div className="bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-sage-100">
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📍</span>
                <div>
                  <p className="text-sm font-medium text-sage-800">
                    Ashabi Clinic
                  </p>
                  <p className="text-xs text-sage-400">
                    Hanuman Nagar, 1st Lane, Sangli – 416 416
                  </p>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/P3aWojMz2JLYBbn87"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-sage-600 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-sage-700 transition-colors whitespace-nowrap shrink-0"
              >
                Get Directions →
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-14">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-[0.2em] text-sage-500 uppercase mb-2"
          >
            Find Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl text-sage-800 mb-8"
          >
            Contact & Location
          </motion.h2>
          <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-6">
            {/* Address Card */}
            <motion.div
              variants={fadeUp}
              className="bg-white border border-sage-100 rounded-xl p-6"
            >
              <h3 className="font-medium text-sage-700 text-sm mb-3 uppercase tracking-wider">
                Clinic Address
              </h3>
              <p className="font-display text-xl text-sage-800 leading-snug">
                Ashabi Clinic
                <br />
                Hanuman Nagar, 1st Lane
                <br />
                Sangli, Maharashtra
                <br />
                PIN – 416 416
              </p>
              {/* <p className="text-xs text-sage-400 mt-3">
                Near Mohite Hospital, 100 Ft Road, Gulab Colony
              </p> */}
            </motion.div>
            {/* Contact Card */}
            <motion.div
              variants={fadeUp}
              className="bg-white border border-sage-100 rounded-xl p-6 flex flex-col gap-4"
            >
              <h3 className="font-medium text-sage-700 text-sm uppercase tracking-wider">
                Get in Touch
              </h3>
              <a
                href="tel:+919880919789"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 group-hover:bg-sage-200 transition-colors">
                  📞
                </div>
                <div>
                  <p className="text-xs text-sage-400">Phone / WhatsApp</p>
                  <p className="font-medium text-sage-800 text-sm">
                    8856819580
                  </p>
                </div>
              </a>
              <a
                href="tel:+915617895"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 group-hover:bg-sage-200 transition-colors">
                  ☎️
                </div>
                <div>
                  <p className="text-xs text-sage-400">Clinic Landline</p>
                  <p className="font-medium text-sage-800 text-sm">9503148821</p>
                </div>
              </a>
              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-sage-100 flex items-center justify-center text-sage-600">
                  📍
                </div>
                <div>
                  <p className="text-xs text-sage-400">MCH Registration</p>
                  <p className="font-medium text-sage-800 text-sm">
                    Reg. No. 16878 · Maharashtra Council of Homoeopathy
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer />
    </main>
  );
}

export default ClaudeResult;
