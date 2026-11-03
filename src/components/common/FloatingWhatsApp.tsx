import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '919876543210',
  defaultMessage = 'Hello AD Zoom Studio, I am interested in inquiring about photography & cinematography for an upcoming wedding.',
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside aria-label="Quick inquiry" className="fixed bottom-24 lg:bottom-8 right-5 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Enquiry"
        className="group relative flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-ink border border-white/20 text-offwhite shadow-2xl hover:border-accent-orange hover:text-accent-orange transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Subtle orange pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-accent-orange/20 animate-ping pointer-events-none opacity-50" />
        
        <MessageCircle strokeWidth={1.25} className="w-6 h-6 lg:w-7 lg:h-7" />

        {/* Hover label for desktop */}
        <span className="hidden lg:block absolute right-full mr-3 px-3 py-1.5 rounded-sm bg-ink border border-white/10 text-[10px] uppercase tracking-[0.2em] text-offwhite whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};

