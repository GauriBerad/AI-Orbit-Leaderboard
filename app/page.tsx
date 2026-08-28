'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TrendingUp, Users, ExternalLink, Sparkles, Search, Layers, Flame, Zap, Bookmark } from 'lucide-react'

interface HistoryItem {
  id: string
  rank: number
  score: number
  recordedAt: string
}

interface LeaderboardItem {
  id: string
  name: string
  slug: string
  description: string
  logoUrl: string
  websiteUrl: string
  type: string
  category: string
  score: number
  growth: number
  currentRank: number
  previousRank: number
  users: string
  history: HistoryItem[]
}

const CATEGORIES = ['All', 'Productivity', 'Coding', 'Design', 'Search', 'Open Source', 'Audio', 'Video']

export default function Home() {
  const [items, setItems] = useState<LeaderboardItem[]>([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState<'rank' | 'score' | 'growth'>('rank')
  const [loading, setLoading] = useState(true)
  
  // Comparison & Bookmarks States
  const [comparedIds, setComparedIds] = useState<string[]>([])
  const [showCompareModal, setShowCompareModal] = useState(false)
  const [bookmarks, setBookmarks] = useState<string[]>([])

  const router = useRouter()

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load leaderboard:', err)
        setLoading(false)
      })

    // Load saved bookmarks from localStorage
    const saved = JSON.parse(localStorage.getItem("ai_leaderboard_bookmarks") || "[]")
    setBookmarks(saved)
  }, [])

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    let updated
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter(b => b !== id)
    } else {
      updated = [...bookmarks, id]
    }
    setBookmarks(updated)
    localStorage.setItem("ai_leaderboard_bookmarks", JSON.stringify(updated))
  }

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (comparedIds.includes(id)) {
      setComparedIds(comparedIds.filter(i => i !== id))
    } else {
      if (comparedIds.length >= 3) {
        alert("You can compare up to 3 tools at a time.")
        return
      }
      setComparedIds([...comparedIds, id])
    }
  }

  // Filter items based on search and category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sort items based on selected dropdown option
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score
    if (sortBy === 'growth') return b.growth - a.growth
    return a.currentRank - b.currentRank
  })

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 pb-24">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-1 tracking-wide text-sm">
              <Sparkles className="w-4 h-4" />
              <span>AI ORBIT ECOSYSTEM</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Top AI Tools & Models</h1>
            <p className="text-slate-400 mt-1 text-sm md:text-base">Discover, compare, and track the highest-performing artificial intelligence platforms.</p>
          </div>
          
          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search tools, models..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
              />
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rank' | 'score' | 'growth')}
                className="w-full sm:w-auto bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-all cursor-pointer"
              >
                <option value="rank">Sort by: Default Rank</option>
                <option value="score">Sort by: Highest Score</option>
                <option value="growth">Sort by: Fastest Growth</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stats Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{items.length} Tracked</div>
              <div className="text-xs text-slate-400">Active AI Ecosystem Entities</div>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Kling AI (+95.4%)</div>
              <div className="text-xs text-slate-400">Fastest Growing This Month</div>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Real-Time</div>
              <div className="text-xs text-slate-400">Automated Benchmark Updates</div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content List */}
        {loading ? (
          <div className="text-center py-20 text-slate-500 animate-pulse">Loading ecosystem data...</div>
        ) : sortedItems.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-slate-900/20 rounded-2xl border border-slate-800/50">
            No AI systems found matching your search criteria.
          </div>
        ) : (
          <div className="grid gap-3">
            {sortedItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => router.push(`/leaderboard/${item.slug}`)}
                className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all shadow-xl cursor-pointer group"
              >
                {/* Rank, Name & Description */}
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-base shadow-sm ${
                    item.currentRank === 1 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                    item.currentRank === 2 ? 'bg-slate-300/20 text-slate-200 border border-slate-300/40' :
                    item.currentRank === 3 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/40' :
                    'bg-slate-800 text-slate-400 border border-slate-700/50'
                  }`}>
                    #{item.currentRank}
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-base md:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{item.name}</h2>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800/80 text-cyan-400 border border-slate-700 font-medium">
                        {item.category}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800/80 text-purple-400 border border-slate-700 font-medium">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-400 mt-1 line-clamp-1">{item.description}</p>
                  </div>
                </div>

                {/* Metrics & Actions */}
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800/80" onClick={(e) => e.stopPropagation()}>
                  <div className="text-right">
                    <div className="text-xs md:text-sm font-bold text-emerald-400 flex items-center justify-end gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +{item.growth}%
                    </div>
                    <div className="text-[11px] text-slate-500">Score: {item.score}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs md:text-sm font-semibold text-slate-200 flex items-center justify-end gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> {item.users}
                    </div>
                    <div className="text-[11px] text-slate-500">Users</div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Professional Bookmark Icon Button */}
                    <button
                      onClick={(e) => toggleBookmark(item.id, e)}
                      className={`p-2.5 rounded-xl border transition-colors flex items-center justify-center ${
                        bookmarks.includes(item.id)
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                          : 'bg-slate-800 border-slate-700/50 text-slate-400 hover:text-slate-200'
                      }`}
                      title="Bookmark Tool"
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarks.includes(item.id) ? 'fill-cyan-400' : ''}`} />
                    </button>

                    {/* Compare Button */}
                    <button
                      onClick={(e) => toggleCompare(item.id, e)}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        comparedIds.includes(item.id)
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                          : 'bg-slate-800 border-slate-700/50 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {comparedIds.includes(item.id) ? 'Comparing' : '+ Compare'}
                    </button>

                    <a 
                      href={item.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700/50"
                      title="Visit Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Floating Comparison Drawer */}
      {comparedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-cyan-500/50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 z-50">
          <div className="text-sm font-semibold text-slate-200">
            {comparedIds.length} tool{comparedIds.length > 1 ? 's' : ''} selected for comparison
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCompareModal(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              View Comparison
            </button>
            <button
              onClick={() => setComparedIds([])}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white">Side-by-Side Tool Comparison</h2>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="text-slate-400 hover:text-white text-sm font-semibold bg-slate-800 px-3 py-1.5 rounded-lg"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {items
                .filter(i => comparedIds.includes(i.id))
                .map(tool => (
                  <div key={tool.id} className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl space-y-4">
                    <div>
                      <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/20">{tool.category}</span>
                      <h3 className="text-lg font-bold text-white mt-2">{tool.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{tool.description}</p>
                    </div>

                    <div className="space-y-2 border-t border-slate-800 pt-4 text-xs">
                      <div className="flex justify-between"><span className="text-slate-500">Rank:</span> <span className="font-bold text-white">#{tool.currentRank}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Score:</span> <span className="font-bold text-cyan-400">{tool.score}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Growth:</span> <span className="font-bold text-emerald-400">+{tool.growth}%</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Active Users:</span> <span className="font-bold text-slate-200">{tool.users}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Type:</span> <span className="font-bold text-purple-400">{tool.type}</span></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}