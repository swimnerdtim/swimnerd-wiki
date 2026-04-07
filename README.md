# 🏊‍♂️ Swimnerd Wiki

Searchable knowledge base of swimming coaching wisdom.

## 📚 What's Inside

- **Bob Bowman's Coaching Philosophy** - Evolution from "Hammer" to empathy-driven coaching
- **Training Methodologies** - Leon Marchand & Michael Phelps approaches
- **Golden Rules** - Performance planning, visualization, goal setting
- **Technique Guides** - Freestyle breathing, stroke mechanics
- **Championship Training** - Texas NCAA 2025 breakdown
- **Workouts** - Masters sets, sprint training, progressive speed work
- **Taper Strategies** - Peaking for major meets

## 🔍 Features

- **Instant Search** - Client-side search across all articles
- **Category Filtering** - Browse by topic (Bob Bowman, Technique, Workouts, etc.)
- **Clean Reading** - Distraction-free article view
- **Mobile Responsive** - Works on all devices

## 🚀 Live Site

**https://swimnerdtim.github.io/swimnerd-wiki/**

## 📊 Stats

- **11 articles** 
- **188KB** of coaching knowledge
- Based on Inside with Brett Hawke podcast transcripts
- Auto-deployed via GitHub Actions

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build wiki data from markdown files
npm run build-data

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📁 Structure

```
swimnerd-wiki/
├── wiki/                  # Markdown content
│   ├── coaches/
│   │   └── bob-bowman/   # Bob Bowman articles
│   ├── technique/         # Technique guides
│   ├── workouts/          # Training sets
│   └── methodology/       # Training strategies
├── src/
│   ├── App.jsx           # Main React app
│   ├── App.css           # Styling
│   └── wikiData.json     # Generated from markdown
└── build-wiki-data.js    # Markdown → JSON converter
```

## 📝 Adding Content

1. Add markdown files to `wiki/` directory
2. Run `npm run build-data` to regenerate JSON
3. Commit and push - site auto-deploys

## 🎨 Tech Stack

- React + Vite
- Client-side search (no backend needed)
- GitHub Pages hosting
- Marked.js for markdown rendering

---

**Built by Swimnerd** • [swimnerd.com](https://swimnerd.com)
