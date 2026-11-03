import React, { useEffect, useState, useMemo } from 'react';
import { PageTransition } from '../components/common/PageTransition';
import { api } from '../lib/storage';
import { Equipment, EquipmentCategory } from '../types';

export const Gear: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  useEffect(() => {
    api.getEquipment().then(setEquipment);
  }, []);

  const categories: (EquipmentCategory | 'All')[] = [
    'All',
    'Cameras',
    'Lenses',
    'Gimbals',
    'Drones',
    'Lighting',
    'Accessories',
  ];

  const filteredGear = useMemo(() => {
    if (selectedCat === 'All') return equipment;
    return equipment.filter((eq) => eq.category.toLowerCase() === selectedCat.toLowerCase());
  }, [equipment, selectedCat]);

  return (
    <PageTransition>
      <main className="w-full pt-32 pb-24 text-offwhite bg-ink film-grain min-h-screen">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {/* Header */}
          <div className="mb-12 lg:mb-16 space-y-4 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
              — CINEMA PRODUCTION ARSENAL
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light leading-tight">
              Equipment & <span className="italic">Optics</span>
            </h1>
            <p className="text-warmgrey text-sm sm:text-base font-light leading-relaxed pt-2">
              We invest relentlessly in benchmark cinema optics, full-frame sensors, and aerial drones to ensure every microsecond of your celebrations is captured with broadcast fidelity.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto no-scrollbar pb-4 mb-12 border-b border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                  selectedCat === cat
                    ? 'bg-offwhite text-ink font-semibold'
                    : 'text-warmgrey hover:text-offwhite bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Equipment Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGear.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#141414] border border-white/10 p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-accent-orange/40 hover:shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent-orange font-medium">
                      {item.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-accent-orange transition-colors" />
                  </div>

                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/60 border border-white/5 mb-6">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="font-display text-2xl text-offwhite group-hover:text-accent-orange transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs font-mono text-warmgrey mt-1">
                    {item.model}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-wider text-warmgrey/60 block mb-1">
                    Specifications
                  </span>
                  <p className="text-xs text-warmgrey font-light leading-relaxed">
                    {item.specs}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

