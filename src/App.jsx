import { useState } from 'react';
import { Camera, Heart, MessageCircle, Share2, Search, Bell, Menu, PlusSquare } from 'lucide-react';
import './index.css';

const MOCK_FEED = [
  {
    id: 1,
    user: 'luna_the_golden',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=100',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600',
    likes: 1245,
    caption: 'Just caught the biggest stick! 🪵🐾 #goldenretriever',
    time: '2 hours ago'
  },
  {
    id: 2,
    user: 'whiskers_chronicles',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=100',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600',
    likes: 892,
    caption: 'Sunbathing is a full-time job. ☀️😺 #catsofinstagram',
    time: '5 hours ago'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Mobile-first Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">Pawfile</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-slate-600 hover:text-slate-900 transition"><Search className="w-6 h-6"/></button>
            <button className="text-slate-600 hover:text-slate-900 transition relative">
              <Bell className="w-6 h-6"/>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
              <img src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=100" alt="Profile" className="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      </header>

      {/* Main Feed */}
      <main className="max-w-xl mx-auto pb-24">
        {/* Stories Scroller */}
        <div className="px-4 py-4 flex gap-4 overflow-x-auto no-scrollbar border-b border-slate-200 bg-white">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center relative bg-slate-50">
                <PlusSquare className="w-6 h-6 text-slate-400" />
              </div>
              <span className="text-xs font-medium text-slate-500">Add Story</span>
            </div>
            {MOCK_FEED.map(post => (
              <div key={post.id} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 to-orange-500">
                  <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-white">
                     <img src={post.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-700 w-16 truncate text-center">{post.user}</span>
              </div>
            ))}
        </div>

        {/* Posts */}
        <div className="divide-y divide-slate-100">
          {MOCK_FEED.map((post) => (
            <article key={post.id} className="bg-white pt-4 pb-6">
              <div className="px-4 flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover border border-slate-200"/>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{post.user}</h3>
                    <p className="text-xs text-slate-500">{post.time}</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600"><Menu className="w-5 h-5"/></button>
              </div>
              
              <div className="w-full aspect-square bg-slate-100 overflow-hidden">
                <img src={post.image} alt="Post content" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out" />
              </div>

              <div className="px-4 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <button className="text-slate-900 hover:text-rose-500 transition-colors"><Heart className="w-7 h-7"/></button>
                    <button className="text-slate-900 hover:text-blue-500 transition-colors"><MessageCircle className="w-7 h-7"/></button>
                    <button className="text-slate-900 hover:text-emerald-500 transition-colors"><Share2 className="w-7 h-7"/></button>
                  </div>
                </div>
                <div className="font-bold text-sm mb-1">{post.likes.toLocaleString()} likes</div>
                <p className="text-sm">
                  <span className="font-bold mr-2">{post.user}</span>
                  {post.caption}
                </p>
                <button className="text-slate-500 text-sm mt-2 font-medium">View all 48 comments</button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
