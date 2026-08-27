import { NextResponse } from 'next/server'
import { pool } from '@/lib/prisma'

export async function GET() {
  try {
    const client = await pool.connect()
    
    // Fetch all leaderboard items
    const itemsResult = await client.query('SELECT * FROM "LeaderboardItem" ORDER BY "currentRank" ASC;')
    const items = itemsResult.rows

    // Fetch history for each item
    for (let item of items) {
      const historyResult = await client.query('SELECT * FROM "RankingHistory" WHERE "itemId" = $1;', [item.id])
      item.history = historyResult.rows
    }

    client.release()
    return NextResponse.json(items)
  } catch (error) {
    console.error('Failed to fetch leaderboard items:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}