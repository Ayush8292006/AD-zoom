import React, { useState, useEffect } from 'react';
import { Service } from '../../types';
import { api } from '../../lib/storage';
import { Plus, Trash2, Edit } from 'lucide-react';

export const ServicesTab: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [showPrice, setShowPrice] = useState(true);
  const [price, setPrice] = useState('');

  useEffect(() => {
    api.getServices().then(setServices);
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setImageUrl('');
    setFeaturesText('');
    setShowPrice(true);
    setPrice('Starting from ₹1,50,000');
    setShowModal(true);
  };

  const handleOpenEdit = (srv: Service) => {
    setEditingId(srv.id);
    setTitle(srv.title);
    setSubtitle(srv.subtitle);
    setDescription(srv.description);
    setImageUrl(srv.image_url);
    setFeaturesText(srv.features.join('\n'));
    setShowPrice(srv.show_price);
    setPrice(srv.price || '');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const features = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    let updated: Service[] = [];

    if (editingId) {
      updated = services.map((s) =>
        s.id === editingId
          ? {
              ...s,
              title,
              subtitle,
              description,
              image_url: imageUrl || s.image_url,
              features,
              show_price: showPrice,
              price,
            }
          : s
      );
    } else {
      const newSrv: Service = {
        id: 'srv-' + Date.now(),
        title,
        subtitle,
        description,
        image_url: imageUrl || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
        features,
        show_price: showPrice,
        price,
        display_order: services.length + 1,
      };
      updated = [...services, newSrv];
    }

    setServices(updated);
    await api.saveServices(updated);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this service package?')) return;
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    await api.saveServices(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
        <div>
          <h2 className="font-display text-2xl text-ink">Services & Commissions</h2>
          <p className="text-xs text-warmgrey-dark">
            Manage packages, key deliverables, and optional public pricing tags.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
        >
          <Plus strokeWidth={1.5} className="w-4 h-4 text-accent-orange" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Grid */}
      <div className="space-y-4">
        {services.map((srv, idx) => (
          <div
            key={srv.id}
            className="p-5 bg-white border border-sand flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
          >
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 bg-sand/30 shrink-0 border border-sand overflow-hidden">
                <img src={srv.image_url} alt={srv.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-accent-orange font-medium">
                  <span>0{idx + 1}</span>
                  <span>•</span>
                  <span>{srv.subtitle}</span>
                </div>
                <h4 className="font-display text-xl text-ink">{srv.title}</h4>
                <p className="text-xs text-warmgrey-dark line-clamp-1 max-w-xl font-light">
                  {srv.description}
                </p>
                <div className="text-xs font-mono text-ink font-medium pt-1">
                  {srv.show_price ? srv.price || 'Price displayed' : 'Price hidden (On Request)'}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                type="button"
                onClick={() => handleOpenEdit(srv)}
                className="p-2 text-warmgrey hover:text-ink border border-sand"
                title="Edit service"
              >
                <Edit strokeWidth={1.5} className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(srv.id)}
                className="p-2 text-warmgrey hover:text-red-600 border border-sand"
                title="Delete service"
              >
                <Trash2 strokeWidth={1.5} className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-offwhite border border-sand p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sand pb-3">
              <h3 className="font-display text-xl text-ink">
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-xs uppercase tracking-wider text-warmgrey hover:text-ink"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wedding Photography"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Editorial & Raw Emotion"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Comprehensive description of this commission..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Deliverables / Highlights (one per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="Lead Senior Photographer + 2 Second Shooters&#10;Hand-bound Italian album&#10;800+ curated high-res frames"
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none resize-none"
                />
              </div>

              <div className="p-4 bg-sand/30 border border-sand space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="price-toggle"
                    checked={showPrice}
                    onChange={(e) => setShowPrice(e.target.checked)}
                    className="accent-accent-orange"
                  />
                  <label htmlFor="price-toggle" className="text-xs text-ink font-medium">
                    Show public price on website
                  </label>
                </div>

                {showPrice && (
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                      Price Label
                    </label>
                    <input
                      type="text"
                      placeholder="Starting from ₹1,75,000 / day"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-sand text-xs uppercase tracking-wider text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

