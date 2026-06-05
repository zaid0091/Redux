import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import ResultsGrid from '../components/ResultsGrid'
import ResultCard from '../components/ResultCard'
import ScrollReveal from '../components/ScrollReveal'

const defaultQueries = ['nature', 'technology', 'travel', 'food', 'architecture', 'abstract', 'ocean', 'mountains']

const getRandomQuery = () => defaultQueries[Math.floor(Math.random() * defaultQueries.length)]

const HomePage = () => {
    const { query } = useSelector((store) => store.search)
    const [defaultQuery] = useState(getRandomQuery)

    return (
        <main>
            <SearchBar />
            {query !== '' ? (
                <section className="page-container" style={{ paddingBottom: 'var(--space-24)' }}>
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
        <section className="page-container section-divider" style={{ paddingBottom: 'var(--space-24)' }}>
            <header className="section-head section-head--center">
                <ScrollReveal as="p" className="section-label" variant="fade" delay={1}>
                    Curated preview
                </ScrollReveal>
                <ScrollReveal as="h2" className="section-heading" variant="up" delay={2}>
                    {label}
                </ScrollReveal>
                <ScrollReveal as="p" className="section-copy" variant="up" delay={3}>
                    A sample set to browse before you search. Refresh for a different theme.
                </ScrollReveal>
            </header>

            <div className="gallery">
                {results.map((item, idx) => (
                    <ScrollReveal
                        key={item.id}
                        className="gallery-item"
                        variant="up"
                        delay={(idx % 6) + 1}
                        threshold={0.08}
                    >
                        <ResultCard item={item} />
                    </ScrollReveal>
                ))}
            </div>
        </section>
    )
}

export default HomePage
