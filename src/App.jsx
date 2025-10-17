import React from 'react';
import Navbar from './components/Navbar.jsx';
import WelcomeBanner from './components/WelcomeBanner.jsx';
import OurStory from './components/OurStory.jsx';
import EventDetails from './components/EventDetails.jsx';
import Activities from './components/Activities.jsx';
import PhotoGallery from './components/PhotoGallery.jsx';
import ParallaxDivider from './components/ParallaxDivider.jsx';
import Footer from './components/Footer.jsx';

// Images (optimized outputs in public/gallery)
const couplePhotoUrl = '/gallery/sandeaigo-1800.webp';
const beach = '/gallery/LA-1800.webp';

export default function App() {
  return (
    <div className="bg-cornsilk text-gray-800 font-sans">
      <Navbar />
      <main>
        <section id="home" className="relative">
          <WelcomeBanner imageSrc={couplePhotoUrl} welcomeText="Our Wedding" />
        </section>
        <section id="story" className="py-20 md:py-24 px-6 md:px-8">
          <OurStory />
        </section>
  <ParallaxDivider imageSrc={beach} />
        <section id="details" className="py-20 md:py-24 px-6 md:px-8">
          <EventDetails />
        </section>
        <section id="activities" className="py-20 md:py-24 px-6 md:px-8 bg-tropical-green/5">
          <Activities />
        </section>
        <section id="gallery" className="py-20 md:py-24 px-6 md:px-8">
          <PhotoGallery />
        </section>
      </main>
      <Footer />
    </div>
  );
}
