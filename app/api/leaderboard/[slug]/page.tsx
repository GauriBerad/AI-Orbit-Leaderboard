'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, TrendingUp, Users, ExternalLink, Sparkles, Award, Globe, ShieldCheck } from 'lucide-react'

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

export default function DetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug

  const [item, setItem] = useState<LeaderboardItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    // Fetch all items and find the one matching the slug
    fetch('/api/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const found = data.find((i: LeaderboardItem) => i.slug === slug)
          setItem(found || null)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load item details:', err)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center animate-pulse">
        Loading AI profile details...
      </div>
    )
  }

  if (!item) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">AI Tool Not Found</h1>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-cyan-400 hover:border-cyan-500 transition-colors"
        >
          Back to Leaderboard
        </button>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Button */}
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Leaderboard
        </button>

        {/* Header Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl font-bold text-cyan-400 shadow-inner">
                {item.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white">{item.name}</h1>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 font-medium">
                    {item.category}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-purple-400 border border-slate-700 font-medium">
                    {item.type}
                  </span>
                </div>
                <p className="text-slate-400 mt-2 text-sm md:text-base leading-relaxed">{item.description}</p>
              </div>
            </div>

            <a 
              href={item.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-cyan-500/10"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Current Rank
              </div>
              <div className="text-2xl font-bold text-white">#{item.currentRank}</div>
            </div>

            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Overall Score
              </div>
              <div className="text-2xl font-bold text-white">{item.score} <span className="text-xs text-slate-500 font-normal">/ 100</span></div>
            </div>

            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Growth Metric
              </div>
              <div className="text-2xl font-bold text-emerald-400">+{item.growth}%</div>
            </div>

            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-blue-400" /> Active Users
              </div>
              <div className="text-2xl font-bold text-white">{item.users}</div>
            </div>
          </div>
        </div>

        {/* Historical Progression Section */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" /> Historical Performance & Ranking
          </h2>
          
          <div className="space-y-3">
            {item.history && item.history.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {item.history.map((h) => (
                  <div key={h.id} className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl text-center">
                    <div className="text-xs text-slate-400 uppercase tracking-wider">{h.recordedAt}</div>
                    <div className="text-xl font-bold text-white mt-1">Rank #{h.rank}</div>
                    <div className="text-xs text-cyan-400 mt-0.5">Score: {h.score}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No historical data points recorded yet.</p>
            )}
          </div>
        </div>

      </div>
    </main>
  )
}