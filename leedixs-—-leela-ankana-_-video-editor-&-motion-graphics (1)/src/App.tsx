/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { MarqueeDivider } from './components/MarqueeDivider';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-[#c4b5fd]/30 selection:text-white">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          {/* Hero Section with Dedicated Profile Photo Section & Upload */}
          <Hero />

          {/* Marquee Accent Ribbon */}
          <MarqueeDivider text="LEEDIXS · SHORT-FORM EDITS · AFTER EFFECTS · MOTION GRAPHICS · VISUAL STORYTELLING · SOUND ARCHITECTURE ·" />

          {/* Video Portfolio Gallery (Short-Form & Motion Graphics) */}
          <Portfolio />

          {/* Behind The Edits - About Section */}
          <About />

          {/* Core Toolkit & Skills Section */}
          <Skills />

          {/* Services Section */}
          <Services />

          {/* Contact & Project Inquiry Section (Email, Instagram, LinkedIn) */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Lightbox Cinema Video Player Modal */}
        <VideoPlayerModal />
      </div>
    </PortfolioProvider>
  );
}
