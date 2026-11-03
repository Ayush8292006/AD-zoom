import React, { useState, useEffect } from 'react';
import { YouTubeVideo, InstagramPost } from '../../types';
import { api, getYouTubeId } from '../../lib/storage';
import { Plus, Trash2, Youtube, Instagram, Play } from 'lucide-react';

export const YouTubeInstagramTab: React.FC = () => {
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);

  // YouTube Form
  const [ytUrl, setYtUrl] = useState('');
  const [ytTitle, setYtTitle] = useState('');
  const [ytCategory, setYtCategory] = useState('Wedding Films');

  // Instagram Form
  const [igUrl, setIgUrl] = useState('');
  const [igThumb, setIgThumb] = useState('');
  const [igCaption, setIgCaption] = useState('');
  const [igType, setIgType] = useState<'reel' | 'post'>('reel');

  useEffect(() => {
    Promise.all([api.getYouTubeVideos(), api.getInstagramPosts()]).then(([yt, ig]) => {
      setYoutubeVideos(yt);
      setInstagramPosts(ig);
    });
  }, []);

  const handleAddYouTube = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = getYouTubeId(ytUrl);
    if (!id || !ytTitle) {
      alert('Please enter a valid YouTube URL and title');
      return;
    }

    const newVideo: YouTubeVideo = {
      id: 'yt-' + Date.now(),
      youtube_id: id,
      url: ytUrl,
      title: ytTitle,
      thumbnail_url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      category: ytCategory,
      display_order: youtubeVideos.length + 1,
    };

    const updated = [newVideo, ...youtubeVideos];
    setYoutubeVideos(updated);
    await api.saveYouTubeVideos(updated);
    setYtUrl('');
    setYtTitle('');
  };

  const handleDeleteYouTube = async (id: string) => {
    const updated = youtubeVideos.filter((v) => v.id !== id);
    setYoutubeVideos(updated);
    await api.saveYouTubeVideos(updated);
  };

  const handleAddInstagram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!igThumb) {
      alert('Please provide a preview image URL for this Instagram post');
      return;
    }

    const newPost: InstagramPost = {
      id: 'ig-' + Date.now(),
      caption: igCaption || 'AD Zoom Studio wedding moments',
      post_url: igUrl || 'https://instagram.com',
      thumbnail_url: igThumb,
      media_type: igType,
      display_order: instagramPosts.length + 1,
    };

    const updated = [newPost, ...instagramPosts];
    setInstagramPosts(updated);
    await api.saveInstagramPosts(updated);
    setIgUrl('');
    setIgThumb('');
    setIgCaption('');
  };

  const handleDeleteInstagram = async (id: string) => {
    const updated = instagramPosts.filter((p) => p.id !== id);
    setInstagramPosts(updated);
    await api.saveInstagramPosts(updated);
  };

  return (
    <div className="space-y-12">
      {/* YouTube Section */}
      <div className="space-y-6">
        <div className="pb-4 border-b border-sand">
          <div className="flex items-center space-x-2 text-red-600">
            <Youtube strokeWidth={1.5} className="w-5 h-5" />
            <h2 className="font-display text-2xl text-ink">YouTube Showcase</h2>
          </div>
          <p className="text-xs text-warmgrey-dark mt-1">
            Add YouTube videos by pasting the link. Video ID and high-res cover art are extracted automatically.
          </p>
        </div>

        {/* Add YouTube Form */}
        <form onSubmit={handleAddYouTube} className="grid grid-cols-1 sm:grid-cols-12 gap-3 max-w-4xl bg-white border border-sand p-4">
          <div className="sm:col-span-5">
            <input
              type="url"
              required
              placeholder="Paste YouTube Link (https://youtube.com/watch?v=...)"
              value={ytUrl}
              onChange={(e) => setYtUrl(e.target.value)}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
          <div className="sm:col-span-4">
            <input
              type="text"
              required
              placeholder="Video Title"
              value={ytTitle}
              onChange={(e) => setYtTitle(e.target.value)}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
          <div className="sm:col-span-3">
            <button
              type="submit"
              className="w-full py-2 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
            >
              Add Video
            </button>
          </div>
        </form>

        {/* YouTube Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {youtubeVideos.map((v) => (
            <div key={v.id} className="bg-white border border-sand p-3 space-y-2">
              <div className="relative aspect-video bg-sand/30 overflow-hidden">
                <img src={v.thumbnail_url} alt={v.title} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-display text-sm text-ink line-clamp-1">{v.title}</h4>
              <div className="flex justify-between items-center pt-2 border-t border-sand">
                <span className="text-[10px] font-mono text-warmgrey-dark">{v.youtube_id}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteYouTube(v.id)}
                  className="p-1 text-warmgrey hover:text-red-600"
                >
                  <Trash2 strokeWidth={1.5} className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instagram Section */}
      <div className="space-y-6 pt-6 border-t border-sand">
        <div className="pb-4 border-b border-sand">
          <div className="flex items-center space-x-2 text-pink-600">
            <Instagram strokeWidth={1.5} className="w-5 h-5" />
            <h2 className="font-display text-2xl text-ink">Instagram Curation</h2>
          </div>
          <p className="text-xs text-warmgrey-dark mt-1">
            Curate photo and reel highlights featured on the website’s live Instagram section.
          </p>
        </div>

        {/* Add Instagram Form */}
        <form onSubmit={handleAddInstagram} className="grid grid-cols-1 sm:grid-cols-12 gap-3 max-w-4xl bg-white border border-sand p-4">
          <div className="sm:col-span-4">
            <input
              type="url"
              required
              placeholder="Preview Image URL"
              value={igThumb}
              onChange={(e) => setIgThumb(e.target.value)}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
          <div className="sm:col-span-4">
            <input
              type="text"
              placeholder="Short Caption / Tags"
              value={igCaption}
              onChange={(e) => setIgCaption(e.target.value)}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <select
              value={igType}
              onChange={(e) => setIgType(e.target.value as any)}
              className="w-full bg-offwhite border border-sand px-3 py-2 text-xs text-ink outline-none"
            >
              <option value="reel">Reel</option>
              <option value="post">Post</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
            >
              Add Post
            </button>
          </div>
        </form>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramPosts.map((post) => (
            <div key={post.id} className="bg-white border border-sand p-2 space-y-2">
              <div className="relative aspect-square bg-sand/30 overflow-hidden">
                <img src={post.thumbnail_url} alt="Instagram Post" className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between items-center text-[10px] text-warmgrey-dark">
                <span>{post.media_type}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteInstagram(post.id)}
                  className="p-1 hover:text-red-600"
                >
                  <Trash2 strokeWidth={1.5} className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

