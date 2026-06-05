import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CollectionCard from '../components/CollectionCard'
import { clearCollection } from '../redux/slices/collectionSlice'

const CollectionPage = () => {
    const dispatch = useDispatch()
    const collection = useSelector((state) => state.collection.items)

    const clearAll = () => {
        dispatch(clearCollection())
    }

    return (
        <main
            className="page-container min-h-screen pb-[var(--space-20)]"
            style={{ paddingTop: 'calc(var(--nav-height) + clamp(2.5rem, 5vw, 4rem))' }}
        >
            {collection.length > 0 && (
                <section className="section-stack">
                    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-8 slide-up">
                        <div className="flex flex-col gap-4">
                            <span className="section-eyebrow">Your library</span>
                            <h1 className="section-title text-left">
                                Saved <span className="text-gradient">collection</span>
                            </h1>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="chip chip--live">
                                    {collection.length} {collection.length === 1 ? 'item' : 'items'}
                                </span>
                                <span className="text-xs text-[var(--text-subtle)] uppercase tracking-wider font-medium">
                                    Synced locally
                                </span>
                            </div>
                        </div>
                        <button type="button" onClick={clearAll} className="btn-danger shrink-0">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Clear all
                        </button>
                    </header>

                    <div className="card-grid-wrap">
                        <div className="card-grid">
                            {collection.map((item, idx) => (
                                <div key={item.id} className={`card-grid-item stagger-${(idx % 6) + 1}`}>
                                    <CollectionCard item={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {collection.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--nav-height)-8rem)] text-center">
                    <div className="glass-effect state-panel scale-in premium-border">
                        <div className="state-icon state-icon--accent w-20 h-20">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5.5l2.35 4.77 5.27.77-3.81 3.72.9 5.25L12 17.5l-4.71 2.51.9-5.25-3.81-3.72 5.27-.77L12 5.5z" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                                Nothing saved yet
                            </h2>
                            <p className="section-desc text-base">
                                Save photos, videos, and GIFs from search results to build your personal library.
                            </p>
                        </div>
                        <Link to="/" className="btn-primary mt-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Start exploring
                        </Link>
                    </div>
                </div>
            )}
        </main>
    )
}

export default CollectionPage
