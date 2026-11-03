import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/common/PageTransition';
import { MagneticButton } from '../components/common/MagneticButton';

export const NotFound: React.FC = () => {
  return (
    <PageTransition>
      <main className="w-full min-h-screen bg-ink text-offwhite flex items-center justify-center p-6 film-grain text-center">
        <div className="max-w-lg space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-accent-orange font-medium block">
            — 404 / FRAME UNDISCOVERED
          </span>
          <h1 className="font-display text-6xl sm:text-8xl font-light">
            404
          </h1>
          <p className="text-warmgrey text-sm font-light leading-relaxed">
            The frame or passage you are searching for does not exist in our visual archive or has been re-indexed.
          </p>
          <div className="pt-4">
            <Link to="/">
              <MagneticButton variant="primary">
                Return to Studio Home
              </MagneticButton>
            </Link>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

