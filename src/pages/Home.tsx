import React, { useEffect, useState } from 'react';
import { Hero } from '../components/home/Hero';
import { Marquee } from '../components/home/Marquee';
import { IntroStats } from '../components/home/IntroStats';
import { FeaturedStories } from '../components/home/FeaturedStories';
import { StickyServices } from '../components/home/StickyServices';
import { LatestFilms } from '../components/home/LatestFilms';
import { GearTeaser } from '../components/home/GearTeaser';
import { InstagramStrip } from '../components/home/InstagramStrip';
import { Testimonials } from '../components/home/Testimonials';
import { CtaBand } from '../components/home/CtaBand';
import { PageTransition } from '../components/common/PageTransition';
import { Preloader } from '../components/common/Preloader';
import { api } from '../lib/storage';
import {
  Film,
  Photo,
  Service,
  Equipment,
  Testimonial,
  InstagramPost,
  SiteSettings,
} from '../types';
import { initialSiteSettings } from '../lib/initialData';

export const Home: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [films, setFilms] = useState<Film[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [
          loadedSettings,
          loadedFilms,
          loadedPhotos,
          loadedServices,
          loadedEquipment,
          loadedReviews,
          loadedIg,
        ] = await Promise.all([
          api.getSiteSettings(),
          api.getFilms(),
          api.getPhotos(),
          api.getServices(),
          api.getEquipment(),
          api.getTestimonials(),
          api.getInstagramPosts(),
        ]);

        setSettings(loadedSettings);
        setFilms(loadedFilms);
        setPhotos(loadedPhotos);
        setServices(loadedServices);
        setEquipment(loadedEquipment);
        setTestimonials(loadedReviews);
        setInstagramPosts(loadedIg);
      } catch (e) {
        console.error('Failed to load home data', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadAll();

    const handleStorageUpdate = () => {
      loadAll();
    };
    window.addEventListener('adz_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('adz_storage_update', handleStorageUpdate);
  }, []);

  return (
    <>
      <Preloader />
      <PageTransition>
        <main className="w-full">
          {/* Hero Section */}
          <Hero settings={settings} />

          {/* Marquee Velocity Ribbon */}
          {settings.home_sections?.show_marquee !== false && <Marquee />}

          {/* Studio Philosophy & Stat Counters */}
          <IntroStats settings={settings} />

          {/* Featured Stories Horizontal Scroll */}
          {settings.home_sections?.show_featured_stories !== false && (
            <FeaturedStories films={films} photos={photos} />
          )}

          {/* Sticky Services on Desktop */}
          {settings.home_sections?.show_services_sticky !== false && services.length > 0 && (
            <StickyServices services={services} />
          )}

          {/* Latest Cinema Repertoire */}
          {settings.home_sections?.show_latest_films !== false && films.length > 0 && (
            <LatestFilms films={films} />
          )}

          {/* Gear Teaser */}
          {settings.home_sections?.show_gear_teaser !== false && equipment.length > 0 && (
            <GearTeaser equipment={equipment} />
          )}

          {/* Testimonials */}
          {settings.home_sections?.show_testimonials !== false && testimonials.length > 0 && (
            <Testimonials testimonials={testimonials} />
          )}

          {/* Instagram Strip */}
          {settings.home_sections?.show_instagram_strip !== false && instagramPosts.length > 0 && (
            <InstagramStrip posts={instagramPosts} />
          )}

          {/* Call to Action Band */}
          <CtaBand />
        </main>
      </PageTransition>
    </>
  );
};

