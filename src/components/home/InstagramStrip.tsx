import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { InstagramPost } from '../../types';

interface InstagramStripProps {
  posts: InstagramPost[];
}

export const InstagramStrip: React.FC<InstagramStripProps> = ({ posts }) => {
  return (
    <section className="relative bg-ink text-offwhite py-20 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-8 flex flex-col sm:flex-row sm:items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block mb-1">
            — 06 / LIVE ARCHIVE
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-offwhite font-light">
            On the Ground <span className="italic">@adzoomstudio</span>
          </h3>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-offwhite hover:text-accent-orange transition-colors mt-3 sm:mt-0"
        >
          <Instagram strokeWidth={1.25} className="w-4 h-4" />
          <span>Follow along on Instagram</span>
          <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5 text-accent-orange" />
        </a>
      </div>

      {/* Grid of 6 square posts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 px-2">
        {posts.slice(0, 6).map((post) => (
          <a
            key={post.id}
            href={post.post_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden bg-black/40 block"
          >
            <img
              src={post.thumbnail_url}
              alt="AD Zoom Instagram Post"
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-110 filter grayscale-[25%] group-hover:grayscale-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
              <Instagram strokeWidth={1.25} className="w-6 h-6 text-accent-orange" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

