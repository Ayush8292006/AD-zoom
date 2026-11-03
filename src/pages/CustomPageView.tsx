import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { api } from '../lib/storage';
import { CustomPage } from '../types';
import { ArrowLeft } from 'lucide-react';

export const CustomPageView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<CustomPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getCustomPages().then((pages) => {
      const match = pages.find((p) => p.slug === slug);
      setPage(match || null);
      setIsLoading(false);
    });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center text-warmgrey text-xs uppercase tracking-widest">
        Loading Document...
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-ink flex flex-col items-center justify-center text-center p-6 text-offwhite">
        <h2 className="font-display text-4xl mb-4">Page Not Found</h2>
        <Link to="/" className="text-xs uppercase tracking-[0.2em] text-accent-orange">
          Return to Studio Home
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <main className="w-full pt-32 pb-24 text-offwhite bg-ink film-grain min-h-screen">
        <div className="max-w-4xl mx-auto px-5 lg:px-10">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-warmgrey hover:text-accent-orange transition-colors mb-8"
          >
            <ArrowLeft strokeWidth={1.25} className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          {/* Title */}
          <div className="space-y-4 mb-10 pb-8 border-b border-white/10">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
              — EDITORIAL PUBLICATION
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-light leading-tight">
              {page.title}
            </h1>
            {page.excerpt && (
              <p className="text-base text-warmgrey font-light leading-relaxed">
                {page.excerpt}
              </p>
            )}
          </div>

          {/* Optional Cover Image */}
          {page.cover_image && (
            <div className="mb-12 border border-white/10 overflow-hidden aspect-[16/9]">
              <img
                src={page.cover_image}
                alt={page.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content Body */}
          <article className="prose prose-invert max-w-none text-warmgrey font-light leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {page.content}
          </article>
        </div>
      </main>
    </PageTransition>
  );
};

