import React, { useState, useEffect } from 'react';
import { CustomPage } from '../../types';
import { api } from '../../lib/storage';
import { Plus, Trash2, Edit, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CustomPagesTab: React.FC = () => {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [showInNav, setShowInNav] = useState(false);

  useEffect(() => {
    api.getCustomPages().then(setPages);
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setCoverImage('');
    setExcerpt('');
    setContent('');
    setShowInNav(false);
    setShowModal(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) return;

    let updated: CustomPage[] = [];

    if (editingId) {
      updated = pages.map((p) =>
        p.id === editingId
          ? {
              ...p,
              title,
              slug,
              cover_image: coverImage,
              excerpt,
              content,
              show_in_nav: showInNav,
            }
          : p
      );
    } else {
      const newPage: CustomPage = {
        id: 'page-' + Date.now(),
        title,
        slug,
        cover_image: coverImage,
        excerpt,
        content,
        show_in_nav: showInNav,
        is_published: true,
        created_at: new Date().toISOString(),
      };
      updated = [...pages, newPage];
    }

    setPages(updated);
    await api.saveCustomPages(updated);
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this custom page?')) return;
    const updated = pages.filter((p) => p.id !== id);
    setPages(updated);
    await api.saveCustomPages(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
        <div>
          <h2 className="font-display text-2xl text-ink">Custom Pages Builder</h2>
          <p className="text-xs text-warmgrey-dark">
            Create standalone editorial pages with clean custom URLs (e.g. /p/destination-logistics, /p/faq) that appear in the studio navigation without code changes.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
        >
          <Plus strokeWidth={1.5} className="w-4 h-4 text-accent-orange" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Pages List */}
      <div className="space-y-4">
        {pages.map((p) => (
          <div
            key={p.id}
            className="p-5 bg-white border border-sand flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-display text-xl text-ink">{p.title}</h4>
                {p.show_in_nav && (
                  <span className="px-2 py-0.5 bg-beige text-ink text-[10px] uppercase font-semibold">
                    In Nav
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-warmgrey-dark">
                /p/{p.slug}
              </p>
              {p.excerpt && (
                <p className="text-xs text-warmgrey-dark font-light line-clamp-1">{p.excerpt}</p>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to={`/p/${p.slug}`}
                target="_blank"
                className="p-2 text-warmgrey hover:text-ink border border-sand"
                title="View live page"
              >
                <ExternalLink strokeWidth={1.5} className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(p.id)}
                className="p-2 text-warmgrey hover:text-red-600 border border-sand"
                title="Delete page"
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
          <div className="w-full max-w-xl bg-offwhite border border-sand p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sand pb-3">
              <h3 className="font-display text-xl text-ink">
                {editingId ? 'Edit Page' : 'Create Custom Page'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-xs uppercase text-warmgrey">
                Cancel
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Page Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Wedding Investment Guide"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="investment-guide"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="nav-check"
                    checked={showInNav}
                    onChange={(e) => setShowInNav(e.target.checked)}
                    className="accent-accent-orange"
                  />
                  <label htmlFor="nav-check" className="text-xs text-ink font-medium">
                    Show in Navigation
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Short Excerpt
                </label>
                <input
                  type="text"
                  placeholder="One sentence summary of this page..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Content (Markdown / Text) *
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder="Write your article or guide paragraphs here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none font-mono"
                />
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
                  Save Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

