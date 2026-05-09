import React from 'react';
import Navbar from './components/Navbar';
import GlobalOrderButton from './components/GlobalOrderButton';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import IngredientsSection from './components/IngredientsSection';
import VariantsSection from './components/VariantsSection';
import HowToDrinkSection from './components/HowToDrinkSection';
import GallerySection from './components/GallerySection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <GlobalOrderButton />
      <main>
        <HeroSection />
        <AboutSection />
        <IngredientsSection />
        <VariantsSection />
        <HowToDrinkSection />
        <GallerySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

export default App;
