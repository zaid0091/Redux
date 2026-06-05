import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../redux/slices/searchSlice'
import ScrollReveal from './ScrollReveal'

const SUGGESTIONS = ['nature', 'architecture', 'ocean', 'abstract', 'travel', 'technology']

const SearchBar = () => {
    const [text, setText] = useState('')
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
        <section className="hero">
            <ScrollReveal as="p" className="hero-eyebrow" variant="fade" delay={1}>
                Photos · Videos · GIFs
            </ScrollReveal>

            <ScrollReveal as="h1" className="hero-title" variant="up" delay={2}>
                Find what <span className="hero-title__accent">matters</span>
            </ScrollReveal>

            <ScrollReveal as="p" className="hero-lead" variant="up" delay={3}>
                A quiet search experience for visual media — no clutter, no noise. Just results worth keeping.
            </ScrollReveal>

            <ScrollReveal className="search-block" variant="up" delay={4}>
                <form onSubmit={handleSubmit} role="search" aria-label="Media search">
                    <div className="search-field">
                        <div className="search-field__input-wrap">
                            <input
                                required
                                className="search-field__input"
                                type="search"
                                placeholder="Search by keyword"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                aria-label="Search query"
                            />
                        </div>
                        <button type="submit" className="search-field__submit">
                            Search
                        </button>
                    </div>
                    <p className="search-hint">Press Enter to begin</p>
                </form>
            </ScrollReveal>

            {!query && (
                <ScrollReveal className="suggestions" variant="up" delay={5}>
                    <p className="suggestions__label">Suggestions</p>
                    <div className="suggestions__list">
                        {SUGGESTIONS.map((term) => (
                            <button
                                key={term}
                                type="button"
                                onClick={() => handleSuggestion(term)}
                                className="suggestion capitalize"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>
            )}

            {query && (
                <ScrollReveal as="p" className="query-badge" variant="fade" delay={1}>
                    Showing results for <strong>&ldquo;{query}&rdquo;</strong>
                </ScrollReveal>
            )}
        </section>
    )
}

export default SearchBar
