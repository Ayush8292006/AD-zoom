import React, { useState } from 'react';
import { Category } from '../../types';
import { api } from '../../lib/storage';
import { Plus, Trash2, Edit2, Check } from 'lucide-react';

interface CategoriesTabProps {
  categories: Category[];
  onCategoriesUpdated: () => void;
}

export const CategoriesTab: React.FC<CategoriesTabProps> = ({
  categories,
  onCategoriesUpdated,
}) => {
  const [newCatName, setNewCatName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat: Category = {
      id: 'cat-' + Date.now(),
      name: newCatName.trim(),
      slug: newCatName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      display_order: categories.length + 1,
    };

    const updated = [...categories, newCat];
    await api.saveCategories(updated);
    setNewCatName('');
    onCategoriesUpdated();
  };

  const handleStartEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editingName.trim()) return;
    const updated = categories.map((c) =>
      c.id === id
        ? {
            ...c,
            name: editingName.trim(),
            slug: editingName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          }
        : c
    );
    await api.saveCategories(updated);
    setEditingId(null);
    onCategoriesUpdated();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this category? Photos under this category will retain their label.'))
      return;
    const updated = categories.filter((c) => c.id !== id);
    await api.saveCategories(updated);
    onCategoriesUpdated();
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-sand">
        <h2 className="font-display text-2xl text-ink">Gallery Categories</h2>
        <p className="text-xs text-warmgrey-dark">
          Define curated visual categories that appear as interactive filter tabs on the public photo gallery.
        </p>
      </div>

      {/* Add New Category Form */}
      <form onSubmit={handleAddCategory} className="flex gap-3 max-w-md">
        <input
          type="text"
          placeholder="New Category Name (e.g. Sangeet & Haldi)"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          className="flex-1 bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors flex items-center space-x-1.5"
        >
          <Plus strokeWidth={1.5} className="w-4 h-4 text-accent-orange" />
          <span>Add</span>
        </button>
      </form>

      {/* Categories List */}
      <div className="space-y-2 max-w-xl">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            className="flex items-center justify-between p-3.5 bg-white border border-sand shadow-sm"
          >
            {editingId === cat.id ? (
              <div className="flex items-center space-x-2 flex-1 mr-4">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="w-full bg-offwhite border border-sand px-2 py-1 text-xs text-ink outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => handleSaveEdit(cat.id)}
                  className="p-1.5 text-accent-orange hover:bg-beige"
                >
                  <Check strokeWidth={1.5} className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-warmgrey">0{idx + 1}</span>
                <span className="font-medium text-xs text-ink uppercase tracking-wider">
                  {cat.name}
                </span>
                <span className="text-[10px] text-warmgrey font-mono">({cat.slug})</span>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleStartEdit(cat)}
                className="p-1.5 text-warmgrey hover:text-ink"
                title="Rename category"
              >
                <Edit2 strokeWidth={1.5} className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(cat.id)}
                className="p-1.5 text-warmgrey hover:text-red-600"
                title="Delete category"
              >
                <Trash2 strokeWidth={1.5} className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

