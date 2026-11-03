import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../../types';
import { api } from '../../lib/storage';
import { Save, Check } from 'lucide-react';

export const ContentTab: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    api.getSiteSettings().then(setSettings);
  }, []);

  if (!settings) return <div className="text-xs text-warmgrey">Loading settings...</div>;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.saveSiteSettings(settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
        <div>
          <h2 className="font-display text-2xl text-ink">Content & Site Architecture</h2>
          <p className="text-xs text-warmgrey-dark">
            Edit live headlines, studio numbers, media assets, and enable/disable sections.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
        >
          {isSaved ? <Check strokeWidth={1.5} className="w-4 h-4 text-green-400" /> : <Save strokeWidth={1.5} className="w-4 h-4 text-accent-orange" />}
          <span>{isSaved ? 'Changes Published!' : 'Publish Changes'}</span>
        </button>
      </div>

      {/* Hero Section Settings */}
      <div className="bg-white border border-sand p-6 space-y-4 shadow-sm">
        <h3 className="font-display text-lg text-ink border-b border-sand pb-2">
          1. Hero Section Setup
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
              Hero Title (Line 1)
            </label>
            <input
              type="text"
              value={settings.hero_title_line1}
              onChange={(e) => setSettings({ ...settings, hero_title_line1: e.target.value })}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
              Hero Title (Line 2 - Italic Emphasis)
            </label>
            <input
              type="text"
              value={settings.hero_title_line2}
              onChange={(e) => setSettings({ ...settings, hero_title_line2: e.target.value })}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
            Hero Subtitle / Description
          </label>
          <input
            type="text"
            value={settings.hero_subtitle}
            onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
            className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
              Hero Background Image URL
            </label>
            <input
              type="url"
              value={settings.hero_image_url}
              onChange={(e) => setSettings({ ...settings, hero_image_url: e.target.value })}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
              Showreel Video URL (YouTube / Vimeo)
            </label>
            <input
              type="url"
              value={settings.hero_video_url || ''}
              onChange={(e) => setSettings({ ...settings, hero_video_url: e.target.value })}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
        </div>
      </div>

      {/* Studio Statement & Numbers */}
      <div className="bg-white border border-sand p-6 space-y-4 shadow-sm">
        <h3 className="font-display text-lg text-ink border-b border-sand pb-2">
          2. Studio Philosophy & Milestone Numbers
        </h3>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
            About Headline
          </label>
          <input
            type="text"
            value={settings.about_headline}
            onChange={(e) => setSettings({ ...settings, about_headline: e.target.value })}
            className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
            About Story Passage
          </label>
          <textarea
            rows={4}
            value={settings.about_story}
            onChange={(e) => setSettings({ ...settings, about_story: e.target.value })}
            className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-[10px] uppercase text-warmgrey-dark block">Years Active</label>
            <input
              type="text"
              value={settings.stats_years}
              onChange={(e) => setSettings({ ...settings, stats_years: e.target.value })}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase text-warmgrey-dark block">Weddings Shot</label>
            <input
              type="text"
              value={settings.stats_weddings}
              onChange={(e) => setSettings({ ...settings, stats_weddings: e.target.value })}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase text-warmgrey-dark block">Films Delivered</label>
            <input
              type="text"
              value={settings.stats_films}
              onChange={(e) => setSettings({ ...settings, stats_films: e.target.value })}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase text-warmgrey-dark block">Destinations</label>
            <input
              type="text"
              value={settings.stats_destinations}
              onChange={(e) => setSettings({ ...settings, stats_destinations: e.target.value })}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
        </div>
      </div>

      {/* Contact Coordinates */}
      <div className="bg-white border border-sand p-6 space-y-4 shadow-sm">
        <h3 className="font-display text-lg text-ink border-b border-sand pb-2">
          3. Studio Coordinates & Contact Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] uppercase text-warmgrey-dark block">Phone</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase text-warmgrey-dark block">WhatsApp Number (e.g. 919876543210)</label>
            <input
              type="text"
              value={settings.whatsapp_number}
              onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase text-warmgrey-dark block">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
            Studio Physical Address
          </label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
          />
        </div>
      </div>

      {/* Home Sections Toggle */}
      <div className="bg-white border border-sand p-6 space-y-4 shadow-sm">
        <h3 className="font-display text-lg text-ink border-b border-sand pb-2">
          4. Home Page Section Visibility
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-ink">
          {[
            { key: 'show_marquee', label: 'Scroll Velocity Marquee Strip' },
            { key: 'show_featured_stories', label: 'Featured Stories (Horizontal Scroll)' },
            { key: 'show_services_sticky', label: 'Services (Sticky Desktop List)' },
            { key: 'show_latest_films', label: 'Latest Cinematic Films Repertoire' },
            { key: 'show_gear_teaser', label: 'Cinema Gear & Optics Section' },
            { key: 'show_testimonials', label: 'Editorial Testimonials Grid' },
            { key: 'show_instagram_strip', label: 'Instagram Live Archive Strip' },
          ].map((item) => (
            <label key={item.key} className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={(settings.home_sections as any)?.[item.key] ?? true}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    home_sections: {
                      ...settings.home_sections,
                      [item.key]: e.target.checked,
                    },
                  })
                }
                className="accent-accent-orange"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </form>
  );
};

