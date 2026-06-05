import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../redux/slices/searchSlice'

const SUGGESTIONS = ['nature', 'architecture', 'ocean', 'abstract', 'travel', 'technology']

const SearchBar = () => {
    const [text, setText] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const dispatch = useDispatch()
    const { query } = useSelector((store) => store.search)

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        if (!text.trim()) return
        dispatch(setQuery(text.trim()))
        setText('')
    }, [dispatch, text])

    const handleSuggestion = useCallback((term) => {
        dispatch(setQuery(term))
    }, [dispatch])

    return (
        <section className="hero-section slide-up">
            <div className="hero-copy">
                <p className="section-eyebrow justify-center">
                    <span className="chip-dot" aria-hidden />
                    Curated media discovery
                </p>
                <h1 className="hero-title">
                    <span className="block text-[var(--text-primary)]">Search</span>
                    <span className="text-gradient block">everything</span>
                    <span className="hero-title-muted">in one place</span>
                </h1>
                <p className="hero-subtitle">
                    Photos, videos, and GIFs from premium sources — fast, focused, and beautifully presented.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="hero-form scale-in"
                role="search"
                aria-label="Media search"
            >
                <div className={`search-shell ${isFocused ? 'search-shell--focused' : ''}`}>
                    <svg
                        className="w-5 h-5 shrink-0 text-[var(--text-subtle)] transition-colors duration-300"
                        style={{ color: isFocused ? 'var(--accent)' : undefined }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        required
                        className="search-input"
                        type="search"
                        placeholder="Try nature, architecture, ocean…"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        aria-label="Search query"
                    />
                    <button type="submit" className="btn-primary shrink-0 px-5 sm:px-6">
                        Search
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
                <p className="hero-form-hint hidden sm:block">
                    Press <kbd className="px-1.5 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-muted)] font-mono text-[10px]">Enter</kbd> to search
                </p>
            </form>

            {!query && (
                <div className="hero-trending fade-in">
                    <span className="hero-trending-label">Trending</span>
                    <div className="hero-trending-chips">
                        {SUGGESTIONS.map((term) => (
                            <button
                                key={term}
                                type="button"
                                onClick={() => handleSuggestion(term)}
                                className="chip capitalize"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {query && (
                <div className="hero-trending fade-in" style={{ marginTop: 'var(--space-10)' }}>
                    <div className="chip chip--live">
                        <span className="chip-dot" aria-hidden />
                        Results for <strong className="text-[var(--text-primary)] font-semibold ml-1">&ldquo;{query}&rdquo;</strong>
                    </div>
                </div>
            )}
        </section>
    )
}

export default SearchBar
