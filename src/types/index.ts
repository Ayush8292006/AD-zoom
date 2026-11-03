export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  display_order: number;
}

export interface Photo {
  id: string;
  title: string;
  category: string;
  category_id?: string;
  image_url: string;
  alt_text: string;
  caption?: string;
  aspect_ratio?: 'square' | 'portrait' | 'landscape' | 'wide';
  is_featured: boolean;
  display_order: number;
  created_at?: string;
}

export interface Film {
  id: string;
  title: string;
  couple_name: string;
  location: string;
  event_date: string;
  category: string;
  video_type: 'youtube' | 'vimeo' | 'mp4';
  video_url: string;
  thumbnail_url: string;
  duration?: string;
  description: string;
  is_featured: boolean;
  display_order: number;
  still_frames?: string[];
  created_at?: string;
}

export type EquipmentCategory =
  | 'Cameras'
  | 'Lenses'
  | 'Gimbals'
  | 'Drones'
  | 'Lighting'
  | 'Accessories'
  | 'Other';

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  model: string;
  specs: string;
  image_url: string;
  display_order: number;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  features: string[];
  show_price: boolean;
  price?: string;
  display_order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  client_name: string;
  event_type: string;
  year: string;
  location: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  youtube_id: string;
  url: string;
  thumbnail_url: string;
  category?: string;
  display_order: number;
}

export interface InstagramPost {
  id: string;
  caption: string;
  post_url: string;
  thumbnail_url: string;
  media_type: 'reel' | 'post';
  display_order: number;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  event_type: string;
  event_date: string;
  location: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  cover_image?: string;
  excerpt?: string;
  content: string; // Markdown or rich HTML
  show_in_nav: boolean;
  is_published: boolean;
  created_at: string;
}

export interface SiteSettings {
  studio_name: string;
  tagline: string;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_subtitle: string;
  hero_image_url: string;
  hero_video_url?: string;
  about_headline: string;
  about_story: string;
  about_founder_name: string;
  about_founder_role: string;
  about_founder_image: string;
  stats_years: string;
  stats_weddings: string;
  stats_films: string;
  stats_destinations: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
  google_map_embed_url: string;
  instagram_url: string;
  youtube_url: string;
  business_hours: string;
  home_sections: {
    show_featured_stories: boolean;
    show_services_sticky: boolean;
    show_latest_films: boolean;
    show_gear_teaser: boolean;
    show_marquee: boolean;
    show_instagram_strip: boolean;
    show_testimonials: boolean;
  };
}

