import React, { useEffect, useState } from 'react';
import { PageTransition } from '../components/common/PageTransition';
import { VideoModal } from '../components/common/VideoModal';
import { api } from '../lib/storage';
import { YouTubeVideo } from '../types';
import { Youtube, Play, ArrowUpRight } from 'lucide-react';

export const YouTubePage: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    api.getYouTubeVideos().then(setVideos);
  }, []);

  return (
    <>
      <PageTransition>
        <main className="w-full pt-32 pb-24 text-offwhite bg-ink film-grain min-h-screen">
          <div className="max-w-7xl mx-auto px-5 lg:px-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-20 pb-8 border-b border-white/10 gap-6">
              <div className="space-y-4 max-w-2xl">
                <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
                  — OFFICIAL BROADCAST CHANNEL
                </span>
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light leading-tight">
                  YouTube <span className="italic">Cinema</span>
                </h1>
                <p className="text-warmgrey text-sm sm:text-base font-light leading-relaxed">
                  Full 4K wedding films, behind-the-scenes cinematography breakdowns, and equipment rig tours.
                </p>
              </div>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-6 py-3.5 bg-[#FF0000]/10 border border-[#FF0000]/30 hover:bg-[#FF0000] text-offwhite text-xs uppercase tracking-[0.2em] font-medium transition-all"
              >
                <Youtube strokeWidth={1.5} className="w-4 h-4" />
                <span>Subscribe on YouTube</span>
                <ArrowUpRight strokeWidth={1.25} className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((vid, idx) => (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideo(vid)}
                  className="group bg-[#141414] border border-white/10 overflow-hidden cursor-pointer"
                  data-cursor="play"
                  data-cursor-text="WATCH"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <img
                      src={
                        vid.thumbnail_url ||
                        `https://img.youtube.com/vi/${vid.youtube_id}/maxresdefault.jpg`
                      }
                      alt={vid.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-white/30 bg-ink/70 flex items-center justify-center text-offwhite group-hover:border-accent-orange group-hover:text-accent-orange group-hover:scale-110 transition-all">
                        <Play strokeWidth={1.5} className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-accent-orange">
                      <span>0{idx + 1}</span>
                      <span>•</span>
                      <span>{vid.category || 'Cinema'}</span>
                    </div>
                    <h3 className="font-display text-2xl text-offwhite group-hover:italic transition-all">
                      {vid.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </PageTransition>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          isOpen={Boolean(activeVideo)}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.url || activeVideo.youtube_id}
          videoType="youtube"
          title={activeVideo.title}
        />
      )}
    </>
  );
};

