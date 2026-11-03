import React, { useState, useEffect } from 'react';
import { Photo, Category } from '../../types';
import { api, compressImage } from '../../lib/storage';
import { Plus, Trash2, Star, UploadCloud, Image as ImageIcon } from 'lucide-react';

interface PhotosTabProps {
  categories: Category[];
}

export const PhotosTab: React.FC<PhotosTabProps> = ({ categories }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(categories[0]?.name || 'Wedding');
  const [newCaption, setNewCaption] = useState('');
  const [newAltText, setNewAltText] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    api.getPhotos().then(setPhotos);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const file = files[0];
      // Compress client side before saving
      const compressedDataUrl = await compressImage(file, 1800, 0.82);
      setNewImageUrl(compressedDataUrl);
      if (!newTitle) {
        setNewTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    } catch (err) {
      console.error('Failed to compress image', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl || !newTitle) return;

    const newPhoto: Photo = {
      id: 'photo-' + Date.now(),
      title: newTitle,
      category: newCategory,
      image_url: newImageUrl,
      alt_text: newAltText || newTitle,
      caption: newCaption,
      is_featured: isFeatured,
      display_order: photos.length + 1,
    };

    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    await api.savePhotos(updated);

    // Reset Form
    setNewTitle('');
    setNewCaption('');
    setNewAltText('');
    setNewImageUrl('');
    setIsFeatured(false);
    setShowAddModal(false);
  };

  const handleDeletePhoto = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this frame?')) return;
    const updated = photos.filter((p) => p.id !== id);
    setPhotos(updated);
    await api.savePhotos(updated);
  };

  const handleToggleFeatured = async (id: string) => {
    const updated = photos.map((p) => (p.id === id ? { ...p, is_featured: !p.is_featured } : p));
    setPhotos(updated);
    await api.savePhotos(updated);
  };

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
        <div>
          <h2 className="font-display text-2xl text-ink">Photography Archive</h2>
          <p className="text-xs text-warmgrey-dark">
            Manage high-resolution gallery frames, assign editorial categories, and select featured works.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
        >
          <Plus strokeWidth={1.5} className="w-4 h-4 text-accent-orange" />
          <span>Add New Photograph</span>
        </button>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative bg-white border border-sand p-3 flex flex-col justify-between shadow-sm"
          >
            <div className="relative aspect-[4/3] bg-sand/30 overflow-hidden mb-3">
              <img
                src={photo.image_url}
                alt={photo.alt_text}
                className="w-full h-full object-cover"
              />
              {photo.is_featured && (
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-accent-orange text-offwhite text-[9px] uppercase tracking-widest font-semibold">
                  Featured
                </span>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-accent-orange block">
                {photo.category}
              </span>
              <h4 className="font-display text-base text-ink line-clamp-1">{photo.title}</h4>
              {photo.caption && (
                <p className="text-xs text-warmgrey-dark line-clamp-1">{photo.caption}</p>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-sand flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleFeatured(photo.id)}
                className={`p-1.5 rounded transition-colors ${
                  photo.is_featured ? 'text-accent-orange' : 'text-warmgrey hover:text-ink'
                }`}
                title="Toggle Featured"
              >
                <Star strokeWidth={1.5} className={`w-4 h-4 ${photo.is_featured ? 'fill-current' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => handleDeletePhoto(photo.id)}
                className="p-1.5 text-warmgrey hover:text-red-600 transition-colors"
                title="Delete photo"
              >
                <Trash2 strokeWidth={1.5} className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-offwhite border border-sand p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sand pb-3">
              <h3 className="font-display text-xl text-ink">Upload Photograph</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs uppercase tracking-wider text-warmgrey hover:text-ink"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSavePhoto} className="space-y-4">
              {/* File upload or URL */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Image Source
                </label>
                <div className="border-2 border-dashed border-sand p-6 text-center cursor-pointer hover:border-accent-orange transition-colors relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <UploadCloud strokeWidth={1.25} className="w-8 h-8 text-accent-orange mx-auto mb-2" />
                  <p className="text-xs text-ink font-medium">
                    {isUploading ? 'Compressing Client-side...' : 'Click or Drag & Drop image here'}
                  </p>
                  <p className="text-[10px] text-warmgrey mt-1">
                    Auto-compressed to WebP before storing
                  </p>
                </div>

                <div className="text-center text-xs text-warmgrey">— OR PASTE IMAGE URL —</div>

                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              {newImageUrl && (
                <div className="w-24 h-24 border border-sand overflow-hidden">
                  <img src={newImageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Phere at Udaipur Palace"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-accent-orange"
                  />
                  <label htmlFor="featured-check" className="text-xs text-ink">
                    Mark as Featured
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Caption / Venue
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunlit vows beside Lake Pichola"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Alt Text for Accessibility & SEO
                </label>
                <input
                  type="text"
                  placeholder="Descriptive alt text for Google SEO"
                  value={newAltText}
                  onChange={(e) => setNewAltText(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-sand text-xs uppercase tracking-wider text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newImageUrl || !newTitle}
                  className="px-6 py-2 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black disabled:opacity-50"
                >
                  Save Frame
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

