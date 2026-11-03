import {
  Category,
  Photo,
  Film,
  Equipment,
  Service,
  Testimonial,
  YouTubeVideo,
  InstagramPost,
  SiteSettings,
  CustomPage,
  Enquiry,
} from '../types';
import {
  initialCategories,
  initialPhotos,
  initialFilms,
  initialEquipment,
  initialServices,
  initialTestimonials,
  initialYouTubeVideos,
  initialInstagramPosts,
  initialSiteSettings,
  initialCustomPages,
  initialEnquiries,
} from './initialData';
import { supabase, isSupabaseConfigured } from './supabase';

// Local storage keys
const STORAGE_KEYS = {
  CATEGORIES: 'adz_categories',
  PHOTOS: 'adz_photos',
  FILMS: 'adz_films',
  EQUIPMENT: 'adz_equipment',
  SERVICES: 'adz_services',
  TESTIMONIALS: 'adz_testimonials',
  YOUTUBE: 'adz_youtube',
  INSTAGRAM: 'adz_instagram',
  SETTINGS: 'adz_settings',
  CUSTOM_PAGES: 'adz_custom_pages',
  ENQUIRIES: 'adz_enquiries',
  AUTH: 'adz_auth_token',
};

// Generic Local Storage loader with fallback
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to load key: ${key}`, e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Dispatch event so other components can re-render reactively
    window.dispatchEvent(new CustomEvent('adz_storage_update', { detail: { key } }));
  } catch (e) {
    console.error(`Failed to save key: ${key}`, e);
  }
}

// Client-Side Image Compression
export async function compressImage(file: File, maxDim = 1800, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export as WebP or JPEG
        const dataUrl = canvas.toDataURL('image/webp', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = e.target?.result as string;
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

// Export CSV for Enquiries
export function exportEnquiriesCSV(enquiries: Enquiry[]): void {
  const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Event Type', 'Event Date', 'Location', 'Status', 'Message'];
  const rows = enquiries.map((enq) => [
    enq.id,
    new Date(enq.created_at).toLocaleDateString(),
    `"${enq.name.replace(/"/g, '""')}"`,
    `"${enq.phone.replace(/"/g, '""')}"`,
    `"${enq.email.replace(/"/g, '""')}"`,
    `"${enq.event_type.replace(/"/g, '""')}"`,
    enq.event_date,
    `"${enq.location.replace(/"/g, '""')}"`,
    enq.status,
    `"${enq.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ad_zoom_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// YouTube ID parser
export function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Data Store API
export const api = {
  // Photos
  getPhotos: async (): Promise<Photo[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('photos').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, fallback to local', err);
      }
    }
    return loadFromStorage(STORAGE_KEYS.PHOTOS, initialPhotos);
  },
  savePhotos: async (photos: Photo[]): Promise<void> => {
    saveToStorage(STORAGE_KEYS.PHOTOS, photos);
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('categories').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, fallback to local', err);
      }
    }
    return loadFromStorage(STORAGE_KEYS.CATEGORIES, initialCategories);
  },
  saveCategories: async (categories: Category[]): Promise<void> => {
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
  },

  // Films
  getFilms: async (): Promise<Film[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('films').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, fallback to local', err);
      }
    }
    return loadFromStorage(STORAGE_KEYS.FILMS, initialFilms);
  },
  saveFilms: async (films: Film[]): Promise<void> => {
    saveToStorage(STORAGE_KEYS.FILMS, films);
  },

  // Equipment
  getEquipment: async (): Promise<Equipment[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('equipment').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, fallback to local', err);
      }
    }
    return loadFromStorage(STORAGE_KEYS.EQUIPMENT, initialEquipment);
  },
  saveEquipment: async (eq: Equipment[]): Promise<void> => {
    saveToStorage(STORAGE_KEYS.EQUIPMENT, eq);
  },

  // Services
  getServices: async (): Promise<Service[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('services').select('*').order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, fallback to local', err);
      }
    }
    return loadFromStorage(STORAGE_KEYS.SERVICES, initialServices);
  },
  saveServices: async (srv: Service[]): Promise<void> => {
    saveToStorage(STORAGE_KEYS.SERVICES, srv);
  },

  // Testimonials
  getTestimonials: async (): Promise<Testimonial[]> => {
    return loadFromStorage(STORAGE_KEYS.TESTIMONIALS, initialTestimonials);
  },
  saveTestimonials: async (testimonials: Testimonial[]): Promise<void> => {
    saveToStorage(STORAGE_KEYS.TESTIMONIALS, testimonials);
  },

  // YouTube
  getYouTubeVideos: async (): Promise<YouTubeVideo[]> => {
    return loadFromStorage(STORAGE_KEYS.YOUTUBE, initialYouTubeVideos);
  },
  saveYouTubeVideos: async (videos: YouTubeVideo[]): Promise<void> => {
    saveToStorage(STORAGE_KEYS.YOUTUBE, videos);
  },

  // Instagram
  getInstagramPosts: async (): Promise<InstagramPost[]> => {
    return loadFromStorage(STORAGE_KEYS.INSTAGRAM, initialInstagramPosts);
  },
  saveInstagramPosts: async (posts: InstagramPost[]): Promise<void> => {
    saveToStorage(STORAGE_KEYS.INSTAGRAM, posts);
  },

  // Site Settings
  getSiteSettings: async (): Promise<SiteSettings> => {
    return loadFromStorage(STORAGE_KEYS.SETTINGS, initialSiteSettings);
  },
  saveSiteSettings: async (settings: SiteSettings): Promise<void> => {
    saveToStorage(STORAGE_KEYS.SETTINGS, settings);
  },

  // Custom Pages
  getCustomPages: async (): Promise<CustomPage[]> => {
    return loadFromStorage(STORAGE_KEYS.CUSTOM_PAGES, initialCustomPages);
  },
  saveCustomPages: async (pages: CustomPage[]): Promise<void> => {
    saveToStorage(STORAGE_KEYS.CUSTOM_PAGES, pages);
  },

  // Enquiries
  getEnquiries: async (): Promise<Enquiry[]> => {
    return loadFromStorage(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
  },
  addEnquiry: async (enquiry: Omit<Enquiry, 'id' | 'created_at' | 'status'>): Promise<Enquiry> => {
    const newEnq: Enquiry = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      status: 'unread',
      created_at: new Date().toISOString(),
    };
    const list = loadFromStorage<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
    list.unshift(newEnq);
    saveToStorage(STORAGE_KEYS.ENQUIRIES, list);
    return newEnq;
  },
  updateEnquiryStatus: async (id: string, status: 'unread' | 'read' | 'replied'): Promise<void> => {
    const list = loadFromStorage<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
    const updated = list.map((e) => (e.id === id ? { ...e, status } : e));
    saveToStorage(STORAGE_KEYS.ENQUIRIES, updated);
  },
  deleteEnquiry: async (id: string): Promise<void> => {
    const list = loadFromStorage<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, initialEnquiries);
    saveToStorage(
      STORAGE_KEYS.ENQUIRIES,
      list.filter((e) => e.id !== id)
    );
  },
};

