import React, { useState, useEffect } from 'react';
import { Equipment, EquipmentCategory } from '../../types';
import { api } from '../../lib/storage';
import { Plus, Trash2 } from 'lucide-react';

export const EquipmentTab: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<EquipmentCategory>('Cameras');
  const [model, setModel] = useState('');
  const [specs, setSpecs] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    api.getEquipment().then(setEquipment);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !model) return;

    const newItem: Equipment = {
      id: 'eq-' + Date.now(),
      name,
      category,
      model,
      specs,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      display_order: equipment.length + 1,
    };

    const updated = [...equipment, newItem];
    setEquipment(updated);
    await api.saveEquipment(updated);

    // Reset
    setName('');
    setModel('');
    setSpecs('');
    setImageUrl('');
    setShowAddModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this equipment entry?')) return;
    const updated = equipment.filter((eq) => eq.id !== id);
    setEquipment(updated);
    await api.saveEquipment(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
        <div>
          <h2 className="font-display text-2xl text-ink">Equipment & Cinema Optics</h2>
          <p className="text-xs text-warmgrey-dark">
            Showcase the cameras, anamorphic lenses, gimbals, and drones used in your productions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
        >
          <Plus strokeWidth={1.5} className="w-4 h-4 text-accent-orange" />
          <span>Add New Gear</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-sand p-4 flex flex-col justify-between shadow-sm space-y-3"
          >
            <div className="relative aspect-[4/3] bg-sand/30 overflow-hidden">
              <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-accent-orange block">
                {item.category}
              </span>
              <h4 className="font-display text-lg text-ink">{item.name}</h4>
              <p className="text-xs font-mono text-warmgrey-dark">{item.model}</p>
              <p className="text-xs text-warmgrey-dark font-light line-clamp-2 pt-1">{item.specs}</p>
            </div>

            <div className="pt-3 border-t border-sand flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="p-1.5 text-warmgrey hover:text-red-600 transition-colors"
              >
                <Trash2 strokeWidth={1.5} className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-offwhite border border-sand p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sand pb-3">
              <h3 className="font-display text-xl text-ink">Add Equipment</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs uppercase tracking-wider text-warmgrey hover:text-ink"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Equipment Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony FX6 Cinema Line"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as EquipmentCategory)}
                    className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                  >
                    <option value="Cameras">Cameras</option>
                    <option value="Lenses">Lenses</option>
                    <option value="Gimbals">Gimbals</option>
                    <option value="Drones">Drones</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                    Model
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full-Frame 4K 120p"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Image URL
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
                  Specs & Features
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Dual native ISO, 15+ stops dynamic range, S-Cinetone"
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none resize-none"
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
                  className="px-6 py-2 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black"
                >
                  Save Gear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

