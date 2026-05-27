import React from 'react';
import ContactForm from '../components/ContactForm';
import { Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600 text-white overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="h-4 w-4 text-rose-300" />
                <span className="text-sm font-medium text-primary-100">Empowering Women Worldwide</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Together We Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-rose-100">Change</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-lg leading-relaxed">
                Inspiring women to reach new heights. We provide resources, community, and support to help women achieve their dreams and break barriers.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="px-8 py-4 bg-white text-primary-900 font-bold rounded-full hover:bg-primary-50 transition-colors flex items-center gap-2 shadow-lg shadow-primary-900/20"
                >
                  Join the Movement <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div id="contact" className="lg:ml-auto w-full max-w-md">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
