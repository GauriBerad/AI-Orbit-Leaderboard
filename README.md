# AI Orbit Leaderboard

A production-ready module built for AI Orbit to discover, compare, and track the global AI ecosystem in real time.

[Live Demo](https://ai-orbit-leaderboard.vercel.app/)

## Overview
This application features a high-performance ecosystem leaderboard displaying top-tier AI tools and models. It includes real-time search, dynamic sorting, category filtering, and individual deep-dive detail pages with historical tracking.

## Features
* **Real-Time Rankings:** Live tracking of AI platforms with performance metrics, growth trends, and active user counts.
* **Interactive Filtering & Sorting:** Instant search by name or description, category filter pills, and dynamic sorting by default rank, highest score, or fastest growth.
* **Detail Views:** Dedicated dynamic routes (`/leaderboard/[slug]`) showcasing historical ranking progression and direct external links.
* **Design System:** Built with a minimal, dark-mode aesthetic (`bg-slate-950`), custom cards, and typography aligned with the AI Orbit visual guidelines.

## Tech Stack
* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide Icons
* **Backend:** Next.js API Routes, Node.js, PostgreSQL (`pg`)
* **Database:** Neon PostgreSQL
* **Deployment:** Vercel

## Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/GauriBerad/AI-Orbit-Leaderboard.git](https://github.com/GauriBerad/AI-Orbit-Leaderboard.git)
   cd AI-Orbit-Leaderboard