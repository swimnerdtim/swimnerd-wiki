import { useState, useEffect } from 'react'
import './App.css'

// Import all wiki content
import wikiData from './wikiData.json'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [filteredArticles, setFilteredArticles] = useState([])

  useEffect(() => {
    filterArticles()
  }, [searchTerm, selectedCategory])

  const filterArticles = () => {
    let filtered = wikiData.articles

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(term) ||
        article.description.toLowerCase().includes(term) ||
        article.content.toLowerCase().includes(term)
      )
    }

    setFilteredArticles(filtered)
  }

  const categories = ['all', 'Bob Bowman', 'Technique', 'Workouts', 'Coaching', 'Mental', 'Racing', 'Methodology']

  return (
    <div className="app">
      <header className="header">
        <h1>🏊‍♂️ Swimnerd Wiki</h1>
        <p className="subtitle">{wikiData.articles.length} articles • Expert coaching knowledge from 58 books</p>
      </header>

      {!selectedArticle ? (
        <>
          <div className="search-section">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
            <div className="category-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="articles-grid">
            {filteredArticles.length === 0 ? (
              <p className="no-results">No articles found</p>
            ) : (
              filteredArticles.map((article, idx) => (
                <div key={idx} className="article-card" onClick={() => setSelectedArticle(article)}>
                  <div className="article-category">{article.category}</div>
                  <h3>{article.title}</h3>
                  <p className="article-description">{article.description}</p>
                  <div className="article-meta">{article.size}</div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="article-view">
          <button className="back-btn" onClick={() => setSelectedArticle(null)}>
            ← Back to Articles
          </button>
          <div className="article-header">
            <div className="article-category">{selectedArticle.category}</div>
            <h2>{selectedArticle.title}</h2>
            <p className="article-description">{selectedArticle.description}</p>
            <div className="article-meta">{selectedArticle.size}</div>
          </div>
          <div className="article-content" dangerouslySetInnerHTML={{ __html: selectedArticle.contentHtml }} />
        </div>
      )}

      <footer className="footer">
        <p>Built by Swimnerd • <a href="https://swimnerd.com" target="_blank" rel="noopener">swimnerd.com</a></p>
      </footer>
    </div>
  )
}

export default App
