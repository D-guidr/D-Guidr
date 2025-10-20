import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'

/**
 * UNIVERSAL SEARCH BAR COMPONENT
 * 
 * Features:
 * - Real-time search across users, posts, universities, jobs, content
 * - Intelligent result categorization
 * - Quick navigation to search results
 */
const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef(null)

  // Mock search data - replace with actual API calls
  const mockSearchData = {
    users: [
      { id: 1, name: 'John Schmidt', type: 'user', avatar: '/assets/images/profile-placeholders/user1.png' },
      { id: 2, name: 'Maria Garcia', type: 'user', avatar: '/assets/images/profile-placeholders/user2.png' }
    ],
    universities: [
      { id: 1, name: 'Technical University of Munich', type: 'university' },
      { id: 2, name: 'Heidelberg University', type: 'university' }
    ],
    jobs: [
      { id: 1, title: 'Software Developer Werkstudent', type: 'job', company: 'SAP' },
      { id: 2, title: 'Research Assistant', type: 'job', company: 'Max Planck Institute' }
    ],
    posts: [
      { id: 1, content: 'German visa application tips...', type: 'post' },
      { id: 2, content: 'Best cities for international students...', type: 'post' }
    ]
  }

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([])
      setShowResults(false)
      return
    }

    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredResults = []
      
      // Search across all categories
      Object.values(mockSearchData).forEach(category => {
        category.forEach(item => {
          if (JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())) {
            filteredResults.push(item)
          }
        })
      })
      
      setResults(filteredResults)
      setShowResults(true)
      setIsLoading(false)
    }, 300)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    handleSearch(value)
  }

  const handleResultClick = (result) => {
    setShowResults(false)
    setQuery('')
    
    // Navigate based on result type
    switch (result.type) {
      case 'user':
        navigate(`/profile/${result.id}`)
        break
      case 'university':
        navigate(`/universities/${result.id}`)
        break
      case 'job':
        navigate(`/jobs/${result.id}`)
        break
      case 'post':
        navigate(`/post/${result.id}`)
        break
      default:
        navigate('/search', { state: { query } })
    }
  }

  const getResultIcon = (type) => {
    switch (type) {
      case 'user': return '👤'
      case 'university': return '🏫'
      case 'job': return '💼'
      case 'post': return '📝'
      default: return '🔍'
    }
  }

  return (
    <div className="search-bar-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search users, universities, jobs, posts..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
          onFocus={() => query && setShowResults(true)}
        />
        {isLoading && (
          <div className="search-loading">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.slice(0, 8).map((result, index) => (
            <div
              key={`${result.type}-${result.id}-${index}`}
              className="search-result-item"
              onClick={() => handleResultClick(result)}
            >
              <span className="result-icon">{getResultIcon(result.type)}</span>
              <div className="result-content">
                <div className="result-title">
                  {result.name || result.title}
                </div>
                {result.company && (
                  <div className="result-subtitle">{result.company}</div>
                )}
                <div className="result-type">{result.type}</div>
              </div>
            </div>
          ))}
          
          {results.length > 8 && (
            <div 
              className="search-view-all"
              onClick={() => navigate('/search', { state: { query } })}
            >
              View all {results.length} results
            </div>
          )}
        </div>
      )}

      {showResults && query && results.length === 0 && !isLoading && (
        <div className="search-results">
          <div className="search-no-results">
            No results found for "{query}"
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar