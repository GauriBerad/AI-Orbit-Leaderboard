import { notFound } from 'next/navigation'
import { ExternalLink, TrendingUp, Users, ArrowLeft, Activity, Calendar, ShieldCheck, Zap, Award, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const ITEMS_DATA = [
  { id: "1", name: "ChatGPT", slug: "chatgpt", description: "Advanced AI assistant powered by OpenAI models with state-of-the-art conversational reasoning, coding capabilities, and multi-modal understanding.", websiteUrl: "https://openai.com", type: "Tool", category: "Productivity", score: 98.4, growth: 24.5, currentRank: 1, previousRank: 2, users: "250M+", history: [{ id: "1", rank: 3, score: 94.4, recordedAt: "January" }, { id: "2", rank: 2, score: 96.4, recordedAt: "February" }, { id: "3", rank: 1, score: 98.4, recordedAt: "March" }] },
  { id: "2", name: "Claude", slug: "claude", description: "AI assistant by Anthropic focused on safety, constitutional alignment, and deep technical document analysis.", websiteUrl: "https://claude.ai", type: "Model", category: "Coding", score: 96.8, growth: 19.2, currentRank: 2, previousRank: 1, users: "100M+", history: [{ id: "1", rank: 4, score: 92.8, recordedAt: "January" }, { id: "2", rank: 3, score: 94.8, recordedAt: "February" }, { id: "3", rank: 2, score: 96.8, recordedAt: "March" }] },
  { id: "3", name: "Midjourney", slug: "midjourney", description: "State-of-the-art text-to-image generative AI system creating photorealistic and artistic visual media.", websiteUrl: "https://midjourney.com", type: "Tool", category: "Design", score: 94.2, growth: 31, currentRank: 3, previousRank: 4, users: "45M+", history: [{ id: "1", rank: 5, score: 90.2, recordedAt: "January" }, { id: "2", rank: 4, score: 92.2, recordedAt: "February" }, { id: "3", rank: 3, score: 94.2, recordedAt: "March" }] },
  { id: "4", name: "Cursor", slug: "cursor", description: "The AI-first code editor built on VS Code for maximum developer velocity and inline codebase indexing.", websiteUrl: "https://cursor.com", type: "Tool", category: "Coding", score: 93.5, growth: 54.8, currentRank: 4, previousRank: 6, users: "15M+", history: [{ id: "1", rank: 6, score: 89.5, recordedAt: "January" }, { id: "2", rank: 5, score: 91.5, recordedAt: "February" }, { id: "3", rank: 4, score: 93.5, recordedAt: "March" }] },
  { id: "5", name: "Perplexity", slug: "perplexity", description: "Conversational AI search engine delivering real-time web indexed answers with clear source citations.", websiteUrl: "https://perplexity.ai", type: "Tool", category: "Search", score: 91.9, growth: 42.1, currentRank: 5, previousRank: 3, users: "80M+", history: [{ id: "1", rank: 7, score: 87.9, recordedAt: "January" }, { id: "2", rank: 6, score: 89.9, recordedAt: "February" }, { id: "3", rank: 5, score: 91.9, recordedAt: "March" }] },
  { id: "6", name: "Llama 3", slug: "llama-3", description: "Open-weights frontier large language model family optimized for high performance and local deployment.", websiteUrl: "https://ai.meta.com", type: "Model", category: "Open Source", score: 90.4, growth: 15.6, currentRank: 6, previousRank: 5, users: "120M+", history: [{ id: "1", rank: 8, score: 86.4, recordedAt: "January" }, { id: "2", rank: 7, score: 88.4, recordedAt: "February" }, { id: "3", rank: 6, score: 90.4, recordedAt: "March" }] },
  { id: "7", name: "Gemini", slug: "gemini", description: "Multimodal AI model family built natively by Google with massive context window handling.", websiteUrl: "https://gemini.google.com", type: "Model", category: "Productivity", score: 89.8, growth: 22.4, currentRank: 7, previousRank: 8, users: "150M+", history: [{ id: "1", rank: 9, score: 85.8, recordedAt: "January" }, { id: "2", rank: 8, score: 87.8, recordedAt: "February" }, { id: "3", rank: 7, score: 89.8, recordedAt: "March" }] },
  { id: "8", name: "Stable Diffusion XL", slug: "stable-diffusion-xl", description: "Powerful open-source latent diffusion image generator with advanced prompt adherence.", websiteUrl: "https://stability.ai", type: "Model", category: "Design", score: 88.5, growth: 12, currentRank: 8, previousRank: 7, users: "30M+", history: [{ id: "1", rank: 10, score: 84.5, recordedAt: "January" }, { id: "2", rank: 9, score: 86.5, recordedAt: "February" }, { id: "3", rank: 8, score: 88.5, recordedAt: "March" }] },
  { id: "9", name: "GitHub Copilot", slug: "github-copilot", description: "AI pair programmer seamlessly integrated into IDE environments.", websiteUrl: "https://github.com/features/copilot", type: "Tool", category: "Coding", score: 87.9, growth: 18.3, currentRank: 9, previousRank: 10, users: "20M+", history: [{ id: "1", rank: 11, score: 83.9, recordedAt: "January" }, { id: "2", rank: 10, score: 85.9, recordedAt: "February" }, { id: "3", rank: 9, score: 87.9, recordedAt: "March" }] },
  { id: "10", name: "ElevenLabs", slug: "elevenlabs", description: "Generative voice AI platform for hyper-realistic speech synthesis and voice cloning.", websiteUrl: "https://elevenlabs.io", type: "Tool", category: "Audio", score: 86.7, growth: 35.2, currentRank: 10, previousRank: 12, users: "12M+", history: [{ id: "1", rank: 12, score: 82.7, recordedAt: "January" }, { id: "2", rank: 11, score: 84.7, recordedAt: "February" }, { id: "3", rank: 10, score: 86.7, recordedAt: "March" }] },
  { id: "11", name: "Runway Gen-3", slug: "runway-gen-3", description: "Multimodal cinematic AI system for high-fidelity video production and text-to-video generation.", websiteUrl: "https://runwayml.com", type: "Tool", category: "Video", score: 85.4, growth: 48.6, currentRank: 11, previousRank: 15, users: "8M+", history: [{ id: "1", rank: 13, score: 81.4, recordedAt: "January" }, { id: "2", rank: 12, score: 83.4, recordedAt: "February" }, { id: "3", rank: 11, score: 85.4, recordedAt: "March" }] },
  { id: "12", name: "Mistral Large", slug: "mistral-large", description: "Top-tier reasoning model built for complex multilingual tasks and enterprise applications.", websiteUrl: "https://mistral.ai", type: "Model", category: "Open Source", score: 84.9, growth: 28.1, currentRank: 12, previousRank: 11, users: "10M+", history: [{ id: "1", rank: 14, score: 80.9, recordedAt: "January" }, { id: "2", rank: 13, score: 82.9, recordedAt: "February" }, { id: "3", rank: 12, score: 84.9, recordedAt: "March" }] },
  { id: "13", name: "Notion AI", slug: "notion-ai", description: "Integrated workspace assistant for automated writing, summaries, and notes.", websiteUrl: "https://notion.so", type: "Tool", category: "Productivity", score: 83.2, growth: 14, currentRank: 13, previousRank: 9, users: "25M+", history: [{ id: "1", rank: 15, score: 79.2, recordedAt: "January" }, { id: "2", rank: 14, score: 81.2, recordedAt: "February" }, { id: "3", rank: 13, score: 83.2, recordedAt: "March" }] },
  { id: "14", name: "DeepSeek-R1", slug: "deepseek-r1", description: "Advanced open-weights reasoning model matching frontier analytical capabilities.", websiteUrl: "https://deepseek.com", type: "Model", category: "Coding", score: 82.8, growth: 89.5, currentRank: 14, previousRank: 25, users: "40M+", history: [{ id: "1", rank: 16, score: 78.8, recordedAt: "January" }, { id: "2", rank: 15, score: 80.8, recordedAt: "February" }, { id: "3", rank: 14, score: 82.8, recordedAt: "March" }] },
  { id: "15", name: "Sora", slug: "sora", description: "OpenAI video model capable of generating scenes with consistent physical interaction.", websiteUrl: "https://openai.com/sora", type: "Tool", category: "Video", score: 81.5, growth: 20, currentRank: 15, previousRank: 13, users: "5M+", history: [{ id: "1", rank: 17, score: 77.5, recordedAt: "January" }, { id: "2", rank: 16, score: 79.5, recordedAt: "February" }, { id: "3", rank: 15, score: 81.5, recordedAt: "March" }] },
  { id: "16", name: "v0 by Vercel", slug: "v0", description: "Generative UI system producing production-ready Tailwind frontend components.", websiteUrl: "https://v0.dev", type: "Tool", category: "Design", score: 80.1, growth: 61.2, currentRank: 16, previousRank: 20, users: "9M+", history: [{ id: "1", rank: 18, score: 76.1, recordedAt: "January" }, { id: "2", rank: 17, score: 78.1, recordedAt: "February" }, { id: "3", rank: 16, score: 80.1, recordedAt: "March" }] },
  { id: "17", name: "Hugging Face", slug: "hugging-face", description: "The central machine learning platform and model repository community.", websiteUrl: "https://huggingface.co", type: "Platform", category: "Open Source", score: 79.4, growth: 25, currentRank: 17, previousRank: 19, users: "50M+", history: [{ id: "1", rank: 19, score: 75.4, recordedAt: "January" }, { id: "2", rank: 18, score: 77.4, recordedAt: "February" }, { id: "3", rank: 17, score: 79.4, recordedAt: "March" }] },
  { id: "18", name: "Jasper AI", slug: "jasper-ai", description: "Enterprise marketing content platform designed for brand voice consistency.", websiteUrl: "https://jasper.ai", type: "Tool", category: "Productivity", score: 78.2, growth: 8.4, currentRank: 18, previousRank: 14, users: "10M+", history: [{ id: "1", rank: 20, score: 74.2, recordedAt: "January" }, { id: "2", rank: 19, score: 76.2, recordedAt: "February" }, { id: "3", rank: 18, score: 78.2, recordedAt: "March" }] },
  { id: "19", name: "Copy.ai", slug: "copy-ai", description: "Go-to-market AI automation platform for modern sales and outreach workflows.", websiteUrl: "https://copy.ai", type: "Tool", category: "Productivity", score: 77.6, growth: 11.2, currentRank: 19, previousRank: 17, users: "7M+", history: [{ id: "1", rank: 21, score: 73.6, recordedAt: "January" }, { id: "2", rank: 20, score: 75.6, recordedAt: "February" }, { id: "3", rank: 19, score: 77.6, recordedAt: "March" }] },
  { id: "20", name: "Synthesia", slug: "synthesia", description: "AI video generation platform utilizing realistic digital avatars for video creation.", websiteUrl: "https://synthesia.io", type: "Tool", category: "Video", score: 76.9, growth: 33.5, currentRank: 20, previousRank: 22, users: "6M+", history: [{ id: "1", rank: 22, score: 72.9, recordedAt: "January" }, { id: "2", rank: 21, score: 74.9, recordedAt: "February" }, { id: "3", rank: 20, score: 76.9, recordedAt: "March" }] },
  { id: "21", name: "Otter.ai", slug: "otter-ai", description: "Automated meeting assistant that records notes, transcribes audio, and summarizes key actions.", websiteUrl: "https://otter.ai", type: "Tool", category: "Productivity", score: 75.8, growth: 16.7, currentRank: 21, previousRank: 18, users: "15M+", history: [{ id: "1", rank: 23, score: 71.8, recordedAt: "January" }, { id: "2", rank: 22, score: 73.8, recordedAt: "February" }, { id: "3", rank: 21, score: 75.8, recordedAt: "March" }] },
  { id: "22", name: "Claude 3.5 Sonnet", slug: "claude-3-5-sonnet", description: "Industry-leading intelligence model balancing elite coding speed and complex contextual analysis.", websiteUrl: "https://anthropic.com", type: "Model", category: "Coding", score: 74.5, growth: 65, currentRank: 22, previousRank: 28, users: "35M+", history: [{ id: "1", rank: 24, score: 70.5, recordedAt: "January" }, { id: "2", rank: 23, score: 72.5, recordedAt: "February" }, { id: "3", rank: 22, score: 74.5, recordedAt: "March" }] },
  { id: "23", name: "Phind", slug: "phind", description: "Intelligent developer search engine designed for instant code answers.", websiteUrl: "https://phind.com", type: "Tool", category: "Search", score: 73.1, growth: 22, currentRank: 23, previousRank: 21, users: "4M+", history: [{ id: "1", rank: 25, score: 69.1, recordedAt: "January" }, { id: "2", rank: 24, score: 71.1, recordedAt: "February" }, { id: "3", rank: 23, score: 73.1, recordedAt: "March" }] },
  { id: "24", name: "Leonardo.ai", slug: "leonardo-ai", description: "Creative asset generation suite optimized for rapid artistic design.", websiteUrl: "https://leonardo.ai", type: "Tool", category: "Design", score: 72.4, growth: 39.8, currentRank: 24, previousRank: 27, users: "14M+", history: [{ id: "1", rank: 26, score: 68.4, recordedAt: "January" }, { id: "2", rank: 25, score: 70.4, recordedAt: "February" }, { id: "3", rank: 24, score: 72.4, recordedAt: "March" }] },
  { id: "25", name: "Kling AI", slug: "kling-ai", description: "Advanced video generation model capable of handling complex physics and lighting.", websiteUrl: "https://klingai.com", type: "Tool", category: "Video", score: 71.9, growth: 95.4, currentRank: 25, previousRank: 35, users: "11M+", history: [{ id: "1", rank: 27, score: 67.9, recordedAt: "January" }, { id: "2", rank: 26, score: 69.9, recordedAt: "February" }, { id: "3", rank: 25, score: 71.9, recordedAt: "March" }] },
  { id: "26", name: "Coze", slug: "coze", description: "Next-gen ecosystem for configuring custom conversational AI agents and workflows.", websiteUrl: "https://coze.com", type: "Tool", category: "Productivity", score: 70.3, growth: 44.1, currentRank: 26, previousRank: 30, users: "9M+", history: [{ id: "1", rank: 28, score: 66.3, recordedAt: "January" }, { id: "2", rank: 27, score: 68.3, recordedAt: "February" }, { id: "3", rank: 26, score: 70.3, recordedAt: "March" }] }
]

async function getItemDetail(identifier: string) {
  const matched = ITEMS_DATA.find(
    (item) => 
      item.slug.toLowerCase() === identifier.toLowerCase() || 
      item.id === identifier
  )
  return matched || null
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const item = await getItemDetail(resolvedParams.slug)

  if (!item) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 pb-24">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Back Navigation */}
        <div>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Leaderboard
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-slate-900/60 border border-slate-800/90 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3.5 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-sm">
                  <Award className="w-3.5 h-3.5" /> Rank #{item.currentRank} Ecosystem Leader
                </span>
                <span className="text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full font-medium">
                  {item.category}
                </span>
                <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full font-medium">
                  {item.type}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{item.name}</h1>
            </div>

            <a 
              href={item.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition-all flex items-center gap-2.5 shadow-lg shadow-cyan-500/25 whitespace-nowrap"
            >
              Visit Official Platform <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed border-t border-slate-800/80 pt-6">
            {item.description}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-2xl shadow-inner">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <Activity className="w-4 h-4 text-cyan-400" /> Performance Score
              </div>
              <div className="text-2xl font-black text-cyan-400 mt-2">{item.score} <span className="text-xs text-slate-500 font-normal">/ 100</span></div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-2xl shadow-inner">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Monthly Growth
              </div>
              <div className="text-2xl font-black text-emerald-400 mt-2">+{item.growth}%</div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-2xl shadow-inner">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-purple-400" /> Active Users
              </div>
              <div className="text-2xl font-black text-slate-100 mt-2">{item.users}</div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-2xl shadow-inner">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-amber-400" /> Previous Position
              </div>
              <div className="text-2xl font-black text-white mt-2">#{item.previousRank}</div>
            </div>
          </div>
        </div>

        {/* Detailed Insights & Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-sm">
              <Zap className="w-5 h-5" /> Ecosystem Highlights
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                Continuously benchmarked and tracked for high performance and uptime reliability.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                Strong market adoption across enterprise productivity and technical workflows.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                Featured prominently among the highest-rated tools in the {item.category} category.
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" /> Verified Reliability & Security
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                Strict adherence to data privacy guidelines and safe operational standards.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                Regular automated audits tracking response latency and algorithmic consistency.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                Active community backing with frequent updates and feature rollouts.
              </li>
            </ul>
          </div>
        </div>

        {/* Historical Performance Logs Timeline */}
        {item.history && item.history.length > 0 && (
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg">
              <BarChart3 className="w-5 h-5 text-cyan-400" /> Historical Benchmark Timeline
            </div>
            <div className="grid gap-3">
              {item.history.map((hist: any) => (
                <div key={hist.id} className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between text-sm transition-all hover:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-xs">
                      {hist.recordedAt.slice(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-white">{hist.recordedAt} Milestone Check</div>
                      <div className="text-xs text-slate-400">Verified platform performance evaluation</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-slate-300 text-xs md:text-sm">Rank: <strong className="text-white">#{hist.rank}</strong></span>
                    <span className="text-cyan-400 text-xs md:text-sm font-semibold">Score: <strong>{hist.score}</strong></span>
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