import { notFound } from 'next/navigation'
import { ExternalLink, TrendingUp, Users, ArrowLeft, Activity, Calendar } from 'lucide-react'
import Link from 'next/link'

// Direct static data mirror so it never depends on internal network requests on Vercel
const ITEMS_DATA = [
  { id: "1", name: "ChatGPT", slug: "chatgpt", description: "Advanced AI assistant powered by OpenAI models.", websiteUrl: "https://openai.com", type: "Tool", category: "Productivity", score: 98.4, growth: 24.5, currentRank: 1, previousRank: 2, users: "250M+", history: [{ id: "1", rank: 1, score: 98.4, recordedAt: "Mar" }] },
  { id: "2", name: "Claude", slug: "claude", description: "AI assistant by Anthropic focused on safety and deep analysis.", websiteUrl: "https://claude.ai", type: "Model", category: "Coding", score: 96.8, growth: 19.2, currentRank: 2, previousRank: 1, users: "100M+", history: [{ id: "1", rank: 2, score: 96.8, recordedAt: "Mar" }] },
  { id: "3", name: "Midjourney", slug: "midjourney", description: "State-of-the-art text-to-image generative AI system.", websiteUrl: "https://midjourney.com", type: "Tool", category: "Design", score: 94.2, growth: 31, currentRank: 3, previousRank: 4, users: "45M+", history: [{ id: "1", rank: 3, score: 94.2, recordedAt: "Mar" }] },
  { id: "4", name: "Cursor", slug: "cursor", description: "The AI-first code editor built for maximum developer productivity.", websiteUrl: "https://cursor.com", type: "Tool", category: "Coding", score: 93.5, growth: 54.8, currentRank: 4, previousRank: 6, users: "15M+", history: [{ id: "1", rank: 4, score: 93.5, recordedAt: "Mar" }] },
  { id: "5", name: "Perplexity", slug: "perplexity", description: "Conversational AI search engine delivering sourced answers.", websiteUrl: "https://perplexity.ai", type: "Tool", category: "Search", score: 91.9, growth: 42.1, currentRank: 5, previousRank: 3, users: "80M+", history: [{ id: "1", rank: 5, score: 91.9, recordedAt: "Mar" }] },
  { id: "6", name: "Llama 3", slug: "llama-3", description: "Open-weights frontier large language model family by Meta.", websiteUrl: "https://ai.meta.com", type: "Model", category: "Open Source", score: 90.4, growth: 15.6, currentRank: 6, previousRank: 5, users: "120M+", history: [{ id: "1", rank: 6, score: 90.4, recordedAt: "Mar" }] },
  { id: "7", name: "Gemini", slug: "gemini", description: "Multimodal AI model family built natively by Google.", websiteUrl: "https://gemini.google.com", type: "Model", category: "Productivity", score: 89.8, growth: 22.4, currentRank: 7, previousRank: 8, users: "150M+", history: [{ id: "1", rank: 7, score: 89.8, recordedAt: "Mar" }] },
  { id: "8", name: "Stable Diffusion XL", slug: "stable-diffusion-xl", description: "Powerful open-source latent diffusion image generator.", websiteUrl: "https://stability.ai", type: "Model", category: "Design", score: 88.5, growth: 12, currentRank: 8, previousRank: 7, users: "30M+", history: [{ id: "1", rank: 8, score: 88.5, recordedAt: "Mar" }] },
  { id: "9", name: "GitHub Copilot", slug: "github-copilot", description: "AI pair programmer that helps you write code faster.", websiteUrl: "https://github.com/features/copilot", type: "Tool", category: "Coding", score: 87.9, growth: 18.3, currentRank: 9, previousRank: 10, users: "20M+", history: [{ id: "1", rank: 9, score: 87.9, recordedAt: "Mar" }] },
  { id: "10", name: "ElevenLabs", slug: "elevenlabs", description: "Generative voice AI platform for ultra-realistic speech synthesis.", websiteUrl: "https://elevenlabs.io", type: "Tool", category: "Audio", score: 86.7, growth: 35.2, currentRank: 10, previousRank: 12, users: "12M+", history: [{ id: "1", rank: 10, score: 86.7, recordedAt: "Mar" }] },
  { id: "11", name: "Runway Gen-3", slug: "runway-gen-3", description: "Multimodal AI system for cinematic video generation.", websiteUrl: "https://runwayml.com", type: "Tool", category: "Video", score: 85.4, growth: 48.6, currentRank: 11, previousRank: 15, users: "8M+", history: [{ id: "1", rank: 11, score: 85.4, recordedAt: "Mar" }] },
  { id: "12", name: "Mistral Large", slug: "mistral-large", description: "Top-tier reasoning model for complex multilingual tasks.", websiteUrl: "https://mistral.ai", type: "Model", category: "Open Source", score: 84.9, growth: 28.1, currentRank: 12, previousRank: 11, users: "10M+", history: [{ id: "1", rank: 12, score: 84.9, recordedAt: "Mar" }] },
  { id: "13", name: "Notion AI", slug: "notion-ai", description: "Integrated AI assistant built directly inside your workspace docs.", websiteUrl: "https://notion.so", type: "Tool", category: "Productivity", score: 83.2, growth: 14, currentRank: 13, previousRank: 9, users: "25M+", history: [{ id: "1", rank: 13, score: 83.2, recordedAt: "Mar" }] },
  { id: "14", name: "DeepSeek-R1", slug: "deepseek-r1", description: "Advanced reasoning open-weights model matching frontier capabilities.", websiteUrl: "https://deepseek.com", type: "Model", category: "Coding", score: 82.8, growth: 89.5, currentRank: 14, previousRank: 25, users: "40M+", history: [{ id: "1", rank: 14, score: 82.8, recordedAt: "Mar" }] },
  { id: "15", name: "Sora", slug: "sora", description: "OpenAI model capable of generating realistic video from text prompts.", websiteUrl: "https://openai.com/sora", type: "Tool", category: "Video", score: 81.5, growth: 20, currentRank: 15, previousRank: 13, users: "5M+", history: [{ id: "1", rank: 15, score: 81.5, recordedAt: "Mar" }] },
  { id: "16", name: "v0 by Vercel", slug: "v0", description: "Generative UI system that creates production-ready frontend components.", websiteUrl: "https://v0.dev", type: "Tool", category: "Design", score: 80.1, growth: 61.2, currentRank: 16, previousRank: 20, users: "9M+", history: [{ id: "1", rank: 16, score: 80.1, recordedAt: "Mar" }] },
  { id: "17", name: "Hugging Face", slug: "hugging-face", description: "The AI community building the future of machine learning.", websiteUrl: "https://huggingface.co", type: "Platform", category: "Open Source", score: 79.4, growth: 25, currentRank: 17, previousRank: 19, users: "50M+", history: [{ id: "1", rank: 17, score: 79.4, recordedAt: "Mar" }] },
  { id: "18", name: "Jasper AI", slug: "jasper-ai", description: "AI content platform built for enterprise marketing teams.", websiteUrl: "https://jasper.ai", type: "Tool", category: "Productivity", score: 78.2, growth: 8.4, currentRank: 18, previousRank: 14, users: "10M+", history: [{ id: "1", rank: 18, score: 78.2, recordedAt: "Mar" }] },
  { id: "19", name: "Copy.ai", slug: "copy-ai", description: "Go-to-market AI platform for modern sales and marketing workflows.", websiteUrl: "https://copy.ai", type: "Tool", category: "Productivity", score: 77.6, growth: 11.2, currentRank: 19, previousRank: 17, users: "7M+", history: [{ id: "1", rank: 19, score: 77.6, recordedAt: "Mar" }] },
  { id: "20", name: "Synthesia", slug: "synthesia", description: "AI video generation platform using realistic digital avatars.", websiteUrl: "https://synthesia.io", type: "Tool", category: "Video", score: 76.9, growth: 33.5, currentRank: 20, previousRank: 22, users: "6M+", history: [{ id: "1", rank: 20, score: 76.9, recordedAt: "Mar" }] },
  { id: "21", name: "Otter.ai", slug: "otter-ai", description: "AI meeting assistant that records notes and action items automatically.", websiteUrl: "https://otter.ai", type: "Tool", category: "Productivity", score: 75.8, growth: 16.7, currentRank: 21, previousRank: 18, users: "15M+", history: [{ id: "1", rank: 21, score: 75.8, recordedAt: "Mar" }] },
  { id: "22", name: "Claude 3.5 Sonnet", slug: "claude-3-5-sonnet", description: "Industry-leading intelligence model balancing speed and deep context.", websiteUrl: "https://anthropic.com", type: "Model", category: "Coding", score: 74.5, growth: 65, currentRank: 22, previousRank: 28, users: "35M+", history: [{ id: "1", rank: 22, score: 74.5, recordedAt: "Mar" }] },
  { id: "23", name: "Phind", slug: "phind", description: "The AI search engine optimized specifically for developers.", websiteUrl: "https://phind.com", type: "Tool", category: "Search", score: 73.1, growth: 22, currentRank: 23, previousRank: 21, users: "4M+", history: [{ id: "1", rank: 23, score: 73.1, recordedAt: "Mar" }] },
  { id: "24", name: "Leonardo.ai", slug: "leonardo-ai", description: "Production-ready creative asset generation suite powered by AI.", websiteUrl: "https://leonardo.ai", type: "Tool", category: "Design", score: 72.4, growth: 39.8, currentRank: 24, previousRank: 27, users: "14M+", history: [{ id: "1", rank: 24, score: 72.4, recordedAt: "Mar" }] },
  { id: "25", name: "Kling AI", slug: "kling-ai", description: "Advanced video generation engine capable of complex physics.", websiteUrl: "https://klingai.com", type: "Tool", category: "Video", score: 71.9, growth: 95.4, currentRank: 25, previousRank: 35, users: "11M+", history: [{ id: "1", rank: 25, score: 71.9, recordedAt: "Mar" }] },
  { id: "26", name: "Coze", slug: "coze", description: "Next-gen platform for building custom AI bots and workflows.", websiteUrl: "https://coze.com", type: "Tool", category: "Productivity", score: 70.3, growth: 44.1, currentRank: 26, previousRank: 30, users: "9M+", history: [{ id: "1", rank: 26, score: 70.3, recordedAt: "Mar" }] }
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

      </div>
    </main>
  )
}