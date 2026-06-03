'use client';

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, MapPin, Award, Clock, ShoppingBag } from 'lucide-react';

const AshabiClinicLanding = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-teal-700 tracking-tight">
            ASHABI CLINIC
          </h1>
          <a
            href="tel:9860919789"
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-teal-700 transition"
          >
            <Phone size={16} /> Call Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-6"
        >
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold uppercase tracking-widest">
            Established 2008
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Compassionate Care for{' '}
            <span className="text-teal-600">Your Family’s Health.</span>
          </h2>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-slate-700">
              Dr. Sahirabanu Faruk Bhati
            </p>
            <p className="text-sm text-slate-500 italic">
              Registered as Dr. Saira Shikandar Mujawar{' '}
            </p>
            <p className="text-slate-600 max-w-md">
              Providing expert homeopathic and general medical consultation in
              Sangli for over 15 years.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Award className="text-teal-600" size={20} />
              <span>B.H.M.S., C.G.O. </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Award className="text-teal-600" size={20} />
              <span>Reg No. 16878 [cite: 33, 46]</span>
            </div>
          </div>
        </motion.div>

        {/* Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="w-64 h-80 relative z-10 rounded-2xl overflow-hidden border-8 border-white shadow-2xl">
            <Image
              src="/public/doctor.png"
              alt="Dr. Sahirabanu Faruk Bhati"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-64 h-80 bg-teal-200 rounded-2xl -z-10"></div>
        </motion.div>
      </section>

      {/* Services & Medical Shop */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4"
            >
              <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white">
                <Clock size={24} />
              </div>
              <h3 className="text-2xl font-bold">The Clinic</h3>
              <p className="text-slate-600">
                A registered medical facility since 2008 specializing in
                Homeopathy and Biochemic treatments[cite: 11]. Dedicated to
                personalized patient care and long-term wellness.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-teal-600 text-white space-y-4 shadow-xl"
            >
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-2xl font-bold">Medical Shop</h3>
              <p className="text-teal-50">
                Conveniently located adjacent to the clinic, our rented medical
                shop ensures all prescribed medicines and healthcare essentials
                are readily available for our patients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Visit Us</h2>
            <div className="space-y-3">
              <p className="flex items-start gap-3 text-slate-300">
                <MapPin className="text-teal-400 shrink-0" size={20} />
                <span>
                  Hanuman Nagar, 1st Lane,
                  <br />
                  Sangli, Maharashtra 416416
                </span>
              </p>
              <p className="flex items-center gap-3 text-slate-300">
                <Phone className="text-teal-400 shrink-0" size={20} />
                <span>+91 98609 19789 [cite: 44]</span>
              </p>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-teal-50 transition shadow-lg">
              Get Directions
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© 2026 Ashabi Clinic. All rights reserved.</p>
        <p className="mt-1">
          Maharashtra Council of Homoeopathy Registered Practitioner [cite: 1]
        </p>
      </footer>
    </div>
  );
};

export default AshabiClinicLanding;