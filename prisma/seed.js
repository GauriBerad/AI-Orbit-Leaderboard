const { Pool } = require('pg')
require('dotenv/config')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

async function main() {
  console.log('Seeding massive AI Orbit dataset (26 tools)...')
  
  const client = await pool.connect()
  try {
    await client.query(`DELETE FROM "RankingHistory";`)
    await client.query(`DELETE FROM "LeaderboardItem";`)

    const tools = [
      { id: '1', name: 'ChatGPT', slug: 'chatgpt', desc: 'Advanced AI assistant powered by OpenAI models.', logo: '/logos/chatgpt.png', url: 'https://openai.com', type: 'Tool', cat: 'Productivity', score: 98.4, growth: 24.5, rank: 1, prev: 2, users: '250M+' },
      { id: '2', name: 'Claude', slug: 'claude', desc: 'AI assistant by Anthropic focused on safety and deep analysis.', logo: '/logos/claude.png', url: 'https://claude.ai', type: 'Model', cat: 'Coding', score: 96.8, growth: 19.2, rank: 2, prev: 1, users: '100M+' },
      { id: '3', name: 'Midjourney', slug: 'midjourney', desc: 'State-of-the-art text-to-image generative AI system.', logo: '/logos/midjourney.png', url: 'https://midjourney.com', type: 'Tool', cat: 'Design', score: 94.2, growth: 31.0, rank: 3, prev: 4, users: '45M+' },
      { id: '4', name: 'Cursor', slug: 'cursor', desc: 'The AI-first code editor built for maximum developer productivity.', logo: '/logos/cursor.png', url: 'https://cursor.com', type: 'Tool', cat: 'Coding', score: 93.5, growth: 54.8, rank: 4, prev: 6, users: '15M+' },
      { id: '5', name: 'Perplexity', slug: 'perplexity', desc: 'Conversational AI search engine delivering sourced answers.', logo: '/logos/perplexity.png', url: 'https://perplexity.ai', type: 'Tool', cat: 'Search', score: 91.9, growth: 42.1, rank: 5, prev: 3, users: '80M+' },
      { id: '6', name: 'Llama 3', slug: 'llama-3', desc: 'Open-weights frontier large language model family by Meta.', logo: '/logos/meta.png', url: 'https://ai.meta.com', type: 'Model', cat: 'Open Source', score: 90.4, growth: 15.6, rank: 6, prev: 5, users: '120M+' },
      { id: '7', name: 'Gemini', slug: 'gemini', desc: 'Multimodal AI model family built natively by Google.', logo: '/logos/gemini.png', url: 'https://gemini.google.com', type: 'Model', cat: 'Productivity', score: 89.8, growth: 22.4, rank: 7, prev: 8, users: '150M+' },
      { id: '8', name: 'Stable Diffusion XL', slug: 'stable-diffusion-xl', desc: 'Powerful open-source latent diffusion image generator.', logo: '/logos/sdxl.png', url: 'https://stability.ai', type: 'Model', cat: 'Design', score: 88.5, growth: 12.0, rank: 8, prev: 7, users: '30M+' },
      { id: '9', name: 'GitHub Copilot', slug: 'github-copilot', desc: 'AI pair programmer that helps you write code faster.', logo: '/logos/copilot.png', url: 'https://github.com/features/copilot', type: 'Tool', cat: 'Coding', score: 87.9, growth: 18.3, rank: 9, prev: 10, users: '20M+' },
      { id: '10', name: 'ElevenLabs', slug: 'elevenlabs', desc: 'Generative voice AI platform for ultra-realistic speech synthesis.', logo: '/logos/elevenlabs.png', url: 'https://elevenlabs.io', type: 'Tool', cat: 'Audio', score: 86.7, growth: 35.2, rank: 10, prev: 12, users: '12M+' },
      { id: '11', name: 'Runway Gen-3', slug: 'runway-gen-3', desc: 'Multimodal AI system for cinematic video generation.', logo: '/logos/runway.png', url: 'https://runwayml.com', type: 'Tool', cat: 'Video', score: 85.4, growth: 48.6, rank: 11, prev: 15, users: '8M+' },
      { id: '12', name: 'Mistral Large', slug: 'mistral-large', desc: 'Top-tier reasoning model for complex multilingual tasks.', logo: '/logos/mistral.png', url: 'https://mistral.ai', type: 'Model', cat: 'Open Source', score: 84.9, growth: 28.1, rank: 12, prev: 11, users: '10M+' },
      { id: '13', name: 'Notion AI', slug: 'notion-ai', desc: 'Integrated AI assistant built directly inside your workspace docs.', logo: '/logos/notion.png', url: 'https://notion.so', type: 'Tool', cat: 'Productivity', score: 83.2, growth: 14.0, rank: 13, prev: 9, users: '25M+' },
      { id: '14', name: 'DeepSeek-R1', slug: 'deepseek-r1', desc: 'Advanced reasoning open-weights model matching frontier capabilities.', logo: '/logos/deepseek.png', url: 'https://deepseek.com', type: 'Model', cat: 'Coding', score: 82.8, growth: 89.5, rank: 14, prev: 25, users: '40M+' },
      { id: '15', name: 'Sora', slug: 'sora', desc: 'OpenAI model capable of generating realistic video from text prompts.', logo: '/logos/sora.png', url: 'https://openai.com/sora', type: 'Tool', cat: 'Video', score: 81.5, growth: 20.0, rank: 15, prev: 13, users: '5M+' },
      { id: '16', name: 'v0 by Vercel', slug: 'v0', desc: 'Generative UI system that creates production-ready frontend components.', logo: '/logos/v0.png', url: 'https://v0.dev', type: 'Tool', cat: 'Design', score: 80.1, growth: 61.2, rank: 16, prev: 20, users: '9M+' },
      // 10 Extra New Tools Added Below:
      { id: '17', name: 'Hugging Face', slug: 'hugging-face', desc: 'The AI community building the future of machine learning.', logo: '/logos/huggingface.png', url: 'https://huggingface.co', type: 'Platform', cat: 'Open Source', score: 79.4, growth: 25.0, rank: 17, prev: 19, users: '50M+' },
      { id: '18', name: 'Jasper AI', slug: 'jasper-ai', desc: 'AI content platform built for enterprise marketing teams.', logo: '/logos/jasper.png', url: 'https://jasper.ai', type: 'Tool', cat: 'Productivity', score: 78.2, growth: 8.4, rank: 18, prev: 14, users: '10M+' },
      { id: '19', name: 'Copy.ai', slug: 'copy-ai', desc: 'Go-to-market AI platform for modern sales and marketing workflows.', logo: '/logos/copyai.png', url: 'https://copy.ai', type: 'Tool', cat: 'Productivity', score: 77.6, growth: 11.2, rank: 19, prev: 17, users: '7M+' },
      { id: '20', name: 'Synthesia', slug: 'synthesia', desc: 'AI video generation platform using realistic digital avatars.', logo: '/logos/synthesia.png', url: 'https://synthesia.io', type: 'Tool', cat: 'Video', score: 76.9, growth: 33.5, rank: 20, prev: 22, users: '6M+' },
      { id: '21', name: 'Otter.ai', slug: 'otter-ai', desc: 'AI meeting assistant that records notes and action items automatically.', logo: '/logos/otter.png', url: 'https://otter.ai', type: 'Tool', cat: 'Productivity', score: 75.8, growth: 16.7, rank: 21, prev: 18, users: '15M+' },
      { id: '22', name: 'Claude 3.5 Sonnet', slug: 'claude-3-5-sonnet', desc: 'Industry-leading intelligence model balancing speed and deep context.', logo: '/logos/claude.png', url: 'https://anthropic.com', type: 'Model', cat: 'Coding', score: 74.5, growth: 65.0, rank: 22, prev: 28, users: '35M+' },
      { id: '23', name: 'Phind', slug: 'phind', desc: 'The AI search engine optimized specifically for developers.', logo: '/logos/phind.png', url: 'https://phind.com', type: 'Tool', cat: 'Search', score: 73.1, growth: 22.0, rank: 23, prev: 21, users: '4M+' },
      { id: '24', name: 'Leonardo.ai', slug: 'leonardo-ai', desc: 'Production-ready creative asset generation suite powered by AI.', logo: '/logos/leonardo.png', url: 'https://leonardo.ai', type: 'Tool', cat: 'Design', score: 72.4, growth: 39.8, rank: 24, prev: 27, users: '14M+' },
      { id: '25', name: 'Kling AI', slug: 'kling-ai', desc: 'Advanced video generation engine capable of complex physics.', logo: '/logos/kling.png', url: 'https://klingai.com', type: 'Tool', cat: 'Video', score: 71.9, growth: 95.4, rank: 25, prev: 35, users: '11M+' },
      { id: '26', name: 'Coze', slug: 'coze', desc: 'Next-gen platform for building custom AI bots and workflows.', logo: '/logos/coze.png', url: 'https://coze.com', type: 'Tool', cat: 'Productivity', score: 70.3, growth: 44.1, rank: 26, prev: 30, users: '9M+' }
    ]

    for (const t of tools) {
      await client.query(`
        INSERT INTO "LeaderboardItem" ("id", "name", "slug", "description", "logoUrl", "websiteUrl", "type", "category", "score", "growth", "currentRank", "previousRank", "users")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
      `, [t.id, t.name, t.slug, t.desc, t.logo, t.url, t.type, t.cat, t.score, t.growth, t.rank, t.prev, t.users])

      await client.query(`
        INSERT INTO "RankingHistory" ("id", "itemId", "rank", "score", "recordedAt")
        VALUES 
        (gen_random_uuid()::text, $1, $2 + 2, $3 - 4.0, 'Jan'),
        (gen_random_uuid()::text, $1, $2 + 1, $3 - 2.0, 'Feb'),
        (gen_random_uuid()::text, $1, $2, $3, 'Mar');
      `, [t.id, t.rank, t.score])
    }

    console.log('Successfully seeded 26 AI tools and models!')
  } finally {
    client.release()
    await pool.end()
  }
}

main()