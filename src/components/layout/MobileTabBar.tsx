import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Image, Film, Camera, Mail } from 'lucide-react';

export const MobileTabBar: React.FC = () => {
  const location = useLocation();

  const tabs = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Gallery', path: '/gallery', icon: Image },
    { label: 'Films', path: '/films', icon: Film },
    { label: 'Gear', path: '/gear', icon: Camera },
    { label: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E0E]/95 backdrop-blur-md border-t border-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-5 h-16 items-center px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(tab.path);

          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] group relative select-none"
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  strokeWidth={1.25}
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-offwhite' : 'text-warmgrey group-active:text-offwhite'
                  }`}
                />
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-accent-orange" />
                )}
              </div>

              <span
                className={`text-[9px] uppercase tracking-wider mt-1 transition-colors ${
                  isActive ? 'text-offwhite font-medium' : 'text-warmgrey'
                }`}
              >
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

