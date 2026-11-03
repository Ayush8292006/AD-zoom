import React, { useEffect, useState } from 'react';
import { PageTransition } from '../components/common/PageTransition';
import { api } from '../lib/storage';
import { InstagramPost } from '../types';
import { Instagram, ArrowUpRight, Play } from 'lucide-react';

export const InstagramPage: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    api.getInstagramPosts().then(setPosts);
  }, []);

  return (
    <PageTransition>
      <main className="w-full pt-32 pb-24 text-offwhite bg-ink film-grain min-h-screen">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-20 pb-8 border-b border-white/10 gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
                — INSTAGRAM JOURNAL
              </span>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light leading-tight">
                Daily Visuals <span className="italic">@adzoomstudio</span>
              </h1>
              <p className="text-warmgrey text-sm sm:text-base font-light leading-relaxed">
                Raw glimpses from behind the lens, unreleased stills, and candid reels from our wedding tours.
              </p>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-6 py-3.5 bg-offwhite text-ink hover:bg-white hover:text-accent-orange text-xs uppercase tracking-[0.2em] font-medium transition-all"
            >
              <Instagram strokeWidth={1.5} className="w-4 h-4 text-accent-orange" />
              <span>Follow @adzoomstudio</span>
              <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5 text-accent-orange" />
            </a>
          </div>

          {/* Instagram Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.post_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-[#141414] border border-white/10 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-black/60">
                  <img
                    src={post.thumbnail_url}
                    alt="AD Zoom Instagram Story"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                  {/* Reel Indicator */}
                  {post.media_type === 'reel' && (
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-ink/70 backdrop-blur-sm border border-white/10 text-offwhite">
                      <Play strokeWidth={1.5} className="w-3.5 h-3.5 fill-current" />
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-accent-orange">
                    <span>{post.media_type === 'reel' ? 'Instagram Reel' : 'Instagram Post'}</span>
                    <ArrowUpRight strokeWidth={1.25} className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-warmgrey font-light line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

