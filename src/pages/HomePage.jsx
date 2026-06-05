import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import ResultsGrid from '../components/ResultsGrid'
import ResultCard from '../components/ResultCard'

const defaultQueries = ['nature', 'technology', 'travel', 'food', 'architecture', 'abstract', 'ocean', 'mountains']

const getRandomQuery = () => defaultQueries[Math.floor(Math.random() * defaultQueries.length)]

const HomePage = () => {
    const { query } = useSelector((store) => store.search)
    const [defaultQuery] = useState(getRandomQuery)

    return (
        <main className="pb-[var(--space-20)] sm:pb-[var(--space-24)]">
            <SearchBar />
            {query !== '' ? (
                <section className="fade-in page-container pb-[var(--space-16)] pt-[var(--space-4)]">
                    <Tabs />
                    <ResultsGrid />
                </section>
            ) : (
                <DefaultContent query={defaultQuery} />
            )}
        </main>
    )
}

const generateFallbackContent = (q) => {
    return Array.from({ length: 12 }, (_, i) => ({
        id: `${q}-${i}`,
        type: 'photo',
        title: `${q.charAt(0).toUpperCase() + q.slice(1)} — ${i + 1}`,
        thumbnail: `https://picsum.photos/seed/${q}${i}/400/500`,
        src: `https://picsum.photos/seed/${q}${i}/800/1000`,
        url: '#',
    }))
}

const DefaultContent = ({ query }) => {
    const results = useMemo(() => generateFallbackContent(query), [query])
    const label = query.charAt(0).toUpperCase() + query.slice(1)

    return (
        <section className="page-container pb-[var(--space-24)] featured-section section-stack">
            <header className="section-header">
                <span className="section-eyebrow">
                    <span className="chip-dot" aria-hidden />
                    Featured collection
                </span>
                <h2 className="section-title">
                    Explore <span className="text-gradient">{label}</span>
                </h2>
                <p className="section-desc">
                    Hand-picked {query} imagery to inspire your next search — refresh the page for a new theme.
                </p>
                <div className="chip chip--live">
                    <span className="chip-dot" aria-hidden />
                    Live preview
                </div>
            </header>

            <div className="card-grid-wrap">
                <div className="card-grid">
                    {results.map((item, idx) => (
                        <div key={item.id} className={`card-grid-item stagger-${(idx % 6) + 1}`}>
                            <ResultCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomePage
