import { notFound } from 'next/navigation'
import { ExternalLink, TrendingUp, Users, ArrowLeft, Activity, Calendar } from 'lucide-react'
import Link from 'next/link'
import { pool } from '../../../lib/prisma' // Adjust dots if necessary to match your project root structure

async function getItemDetail(identifier: string) {
  try {
    const client = await pool.connect()
    const result = await client.query(
      `SELECT * FROM "LeaderboardItem" WHERE LOWER(slug) = LOWER($1) OR id = $1 LIMIT 1`,
      [identifier]
    )

    if (result.rows.length === 0) {
      client.release()
      return null
    }

    const item = result.rows[0]

    const historyResult = await client.query(
      `SELECT * FROM "HistoryItem" WHERE "leaderboardItemId" = $1 ORDER BY "recordedAt" DESC`,
      [item.id]
    )

    client.release()

    return {
      ...item,
      history: historyResult.rows
    }
  } catch (error) {
    console.error('Database query failed, falling back to mock/api data:', error)
    return null
  }
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const item = await getItemDetail(resolvedParams.slug)

  if (!item) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 pb-24">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Navigation */}
        <div>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Leaderboard
          </Link>
        </div>

        {/* Header Info */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
                  Rank #{item.currentRank}
                </span>
                <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full font-medium">
                  {item.category}
                </span>
                <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full font-medium">
                  {item.type}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{item.name}</h1>
            </div>

            <a 
              href={item.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              Visit Platform <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed border-t border-slate-800/80 pt-4">
            {item.description}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" /> Performance Score
              </div>
              <div className="text-xl font-bold text-cyan-400 mt-1">{item.score}</div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Monthly Growth
              </div>
              <div className="text-xl font-bold text-emerald-400 mt-1">+{item.growth}%</div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-400" /> Active Users
              </div>
              <div className="text-xl font-bold text-slate-200 mt-1">{item.users}</div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Previous Rank
              </div>
              <div className="text-xl font-bold text-white mt-1">#{item.previousRank}</div>
            </div>
          </div>
        </div>

        {/* Historical Performance Logs */}
        {item.history && item.history.length > 0 && (
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white">Historical Benchmark Logs</h3>
            <div className="space-y-2">
              {item.history.map((hist: any) => (
                <div key={hist.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex items-center justify-between text-xs md:text-sm">
                  <span className="text-slate-400">{hist.recordedAt}</span>
                  <div className="flex items-center gap-6">
                    <span className="text-slate-300">Rank: <strong className="text-white">#{hist.rank}</strong></span>
                    <span className="text-cyan-400">Score: <strong>{hist.score}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}