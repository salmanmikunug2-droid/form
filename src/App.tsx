/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Send, 
  Loader2, 
  ChevronRight,
  Mail,
  Phone,
  User,
  MessageSquare,
  DollarSign
} from 'lucide-react';

// --- CONFIGURATION ---
const API_URL = "YOUR_AIRTABLE_WEBHOOK_URL_HERE"; 
// Note for user: Replace with your actual Airtable Webhook URL

enum FormStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  budget: string;
  needs: string;
}

const INITIAL_FORM_DATA: FormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  budget: '',
  needs: ''
};

export default function App() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(FormStatus.LOADING);
    setErrorMessage('');

    try {
      // Mapping logic as requested
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        needs: formData.needs
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form. Please try again later.');
      }

      setStatus(FormStatus.SUCCESS);
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus(FormStatus.ERROR);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-bento-bg text-slate-900 font-sans selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
            <span className="font-bold text-xl tracking-tight text-slate-800">NexusLead</span>
          </div>
          <button 
            onClick={scrollToForm}
            className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Hero + Shared Benefits Grid */}
          <div className="col-span-1 md:col-span-6 space-y-6">
            {/* Bento Hero Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bento-card p-8 md:p-12 bg-indigo-600 text-white border-none relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-6 uppercase tracking-wider backdrop-blur-sm">
                  <ShieldCheck size={14} />
                  Trusted by 500+ Businesses
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                  Scale your revenue with <span className="text-indigo-200">quality leads.</span>
                </h1>
                <p className="text-lg text-indigo-100 leading-relaxed max-w-lg mb-8">
                  Our data-driven acquisition engine finds the customers your business needs. Join 500+ teams growing faster today.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-indigo-300" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-indigo-100 italic">"Highly recommended"</span>
                </div>
              </div>
            </motion.section>

            {/* Bento Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Users className="text-indigo-600" />,
                  title: "High Intent",
                  desc: "Verified data ensuring high conversion rates."
                },
                {
                  icon: <TrendingUp className="text-indigo-600" />,
                  title: "Fast Delivery",
                  desc: "Leads delivered to your CRM within 5 minutes."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="bento-card p-6"
                >
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold mb-2 text-slate-800">{benefit.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Benefit Detail Bento Block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bento-card p-6 border-l-4 border-l-indigo-600 bg-indigo-50/30"
            >
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-indigo-600" />
                Verified Intelligence
              </h3>
              <p className="text-sm text-slate-600">
                Every inquiry is screened for accuracy and budget alignment before reaching you.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Lead Form Section */}
          <div ref={formRef} className="col-span-1 md:col-span-6 h-full">
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bento-card p-8 md:p-10 h-full flex flex-col"
            >
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Get a Custom Quote</h2>
                <p className="text-slate-500 text-sm">Tell us about your requirements and we'll connect with you.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">First Name *</label>
                    <input
                      required
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      placeholder="Jane"
                      className="form-input focus:form-input-focus"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Name *</label>
                    <input
                      required
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="form-input focus:form-input-focus"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@company.com"
                      className="form-input focus:form-input-focus"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Phone *</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 000-0000"
                      className="form-input focus:form-input-focus"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Project Budget</label>
                  <select
                    required
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="form-input focus:form-input-focus appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
                  >
                    <option value="" disabled>Select range</option>
                    <option value="0-1k">$0 – $1,000</option>
                    <option value="1k-5k">$1,000 – $5,000</option>
                    <option value="5k-10k">$5,000 – $10,000</option>
                    <option value="10k+">$10,000+</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer Needs *</label>
                  <textarea
                    required
                    name="needs"
                    value={formData.needs}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Tell us about your requirements..."
                    className="form-input focus:form-input-focus h-24 resize-none"
                  />
                </div>

                <button
                  disabled={status === FormStatus.LOADING}
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 text-white rounded-lg font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {status === FormStatus.LOADING ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Connecting...
                    </>
                  ) : (
                    <>
                      Connect With Sales
                      <Send size={16} />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {status === FormStatus.SUCCESS && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-center mt-4"
                    >
                      <p className="text-emerald-700 font-medium">Thank you! We'll contact you shortly.</p>
                    </motion.div>
                  )}
                  {status === FormStatus.ERROR && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-rose-50 border border-rose-200 p-4 rounded-lg text-center mt-4"
                    >
                      <p className="text-rose-700 font-medium text-sm">{errorMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center opacity-40 grayscale filter scale-90">
                <span className="font-bold text-lg tracking-tighter">FORBES</span>
                <span className="font-bold text-lg tracking-tighter">TECHCRUNCH</span>
                <span className="font-bold text-lg tracking-tighter">WIRED</span>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-[10px]">N</div>
            <span className="font-bold text-lg tracking-tight text-slate-800">NexusLead</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} NexusLead Solutions Inc.
          </p>
          <div className="flex gap-8 text-sm text-slate-400 font-medium">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

