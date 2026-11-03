import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Image as ImageIcon,
  FolderTree,
  Film,
  Camera,
  Layers,
  Share2,
  MessageSquareQuote,
  Sliders,
  FileText,
  Inbox,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { PhotosTab } from './tabs/PhotosTab';
import { CategoriesTab } from './tabs/CategoriesTab';
import { FilmsTab } from './tabs/FilmsTab';
import { EquipmentTab } from './tabs/EquipmentTab';
import { ServicesTab } from './tabs/ServicesTab';
import { YouTubeInstagramTab } from './tabs/YouTubeInstagramTab';
import { TestimonialsTab } from './tabs/TestimonialsTab';
import { ContentTab } from './tabs/ContentTab';
import { CustomPagesTab } from './tabs/CustomPagesTab';
import { EnquiriesTab } from './tabs/EnquiriesTab';
import { api } from '../lib/storage';
import { Category, Enquiry } from '../types';

interface AdminLayoutProps {
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('photos');
  const [categories, setCategories] = useState<Category[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const loadBase = () => {
    Promise.all([api.getCategories(), api.getEnquiries()]).then(([c, e]) => {
      setCategories(c);
      setEnquiries(e);
    });
  };

  useEffect(() => {
    loadBase();
    const handleStorageUpdate = () => loadBase();
    window.addEventListener('adz_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('adz_storage_update', handleStorageUpdate);
  }, []);

  const unreadCount = enquiries.filter((e) => e.status === 'unread').length;

  const tabs = [
    { id: 'photos', label: 'Photos', icon: ImageIcon },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'films', label: 'Films & Cinema', icon: Film },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'equipment', label: 'Gear & Optics', icon: Camera },
    { id: 'socials', label: 'YouTube & Reels', icon: Share2 },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'content', label: 'Site Content', icon: Sliders },
    { id: 'custom-pages', label: 'Custom Pages', icon: FileText },
    { id: 'enquiries', label: 'Inquiries', icon: Inbox, badge: unreadCount },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adz_admin_authenticated');
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-offwhite text-ink flex flex-col selection:bg-accent-orange selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-sand px-5 lg:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1 text-ink"
            aria-label="Toggle admin navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-sand">
              <img src="/logo.png" alt="AD Zoom Studio" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-display text-lg tracking-wide uppercase font-medium block leading-none">
                AD Zoom
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-accent-orange font-semibold">
                Studio CMS
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-5">
          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-warmgrey-dark hover:text-ink transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink strokeWidth={1.25} className="w-3.5 h-3.5 text-accent-orange" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-warmgrey-dark hover:text-red-600 transition-colors"
          >
            <LogOut strokeWidth={1.25} className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 gap-8">
        {/* Sidebar Nav for Desktop */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-1">
          <div className="text-[10px] uppercase tracking-[0.25em] text-warmgrey-dark px-3 pb-2 font-medium">
            Management Modules
          </div>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs uppercase tracking-wider transition-all text-left ${
                  isActive
                    ? 'bg-ink text-offwhite font-medium shadow-sm'
                    : 'text-warmgrey-dark hover:text-ink hover:bg-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon strokeWidth={1.25} className="w-4 h-4 text-accent-orange" />
                  <span>{tab.label}</span>
                </div>
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="px-1.5 py-0.2 bg-accent-orange text-white text-[10px] font-mono rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm flex">
            <div className="w-72 bg-offwhite h-full p-6 space-y-2 overflow-y-auto">
              <div className="flex justify-between items-center pb-4 border-b border-sand">
                <span className="font-display text-lg text-ink">CMS Modules</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-5 h-5 text-ink" />
                </button>
              </div>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs uppercase tracking-wider transition-all text-left ${
                      isActive ? 'bg-ink text-offwhite font-medium' : 'text-warmgrey-dark'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon strokeWidth={1.25} className="w-4 h-4 text-accent-orange" />
                      <span>{tab.label}</span>
                    </div>
                    {Boolean(tab.badge && tab.badge > 0) && (
                      <span className="px-1.5 py-0.2 bg-accent-orange text-white text-[10px] font-mono rounded-full">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
          </div>
        )}

        {/* Tab Content Display */}
        <main className="flex-1 min-w-0">
          {activeTab === 'photos' && <PhotosTab categories={categories} />}
          {activeTab === 'categories' && (
            <CategoriesTab categories={categories} onCategoriesUpdated={loadBase} />
          )}
          {activeTab === 'films' && <FilmsTab />}
          {activeTab === 'services' && <ServicesTab />}
          {activeTab === 'equipment' && <EquipmentTab />}
          {activeTab === 'socials' && <YouTubeInstagramTab />}
          {activeTab === 'testimonials' && <TestimonialsTab />}
          {activeTab === 'content' && <ContentTab />}
          {activeTab === 'custom-pages' && <CustomPagesTab />}
          {activeTab === 'enquiries' && <EnquiriesTab />}
        </main>
      </div>
    </div>
  );
};

