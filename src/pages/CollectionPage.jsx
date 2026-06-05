import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CollectionCard from '../components/CollectionCard'
import ScrollReveal from '../components/ScrollReveal'
import { clearCollection } from '../redux/slices/collectionSlice'

const CollectionPage = () => {
    const dispatch = useDispatch()
    const collection = useSelector((state) => state.collection.items)

    const clearAll = () => {
        dispatch(clearCollection())
    }

    return (
        <main
            className="page-container"
            style={{
                paddingTop: 'calc(var(--nav-height) + clamp(2.5rem, 5vw, 4rem))',
                paddingBottom: 'var(--space-24)',
            }}
        >
            {collection.length > 0 && (
                <>
                    <ScrollReveal as="header" className="page-head" variant="up" delay={1}>
                        <div>
                            <p className="section-label">Library</p>
                            <h1 className="section-heading">Your collection</h1>
                            <div className="page-head__meta">
                                <span className="meta-pill">
                                    {collection.length} {collection.length === 1 ? 'piece' : 'pieces'}
                                </span>
                                <span className="meta-note">Stored locally</span>
                            </div>
                        </div>
                        <button type="button" onClick={clearAll} className="btn btn--ghost-danger">
                            Clear all
                        </button>
                    </ScrollReveal>

                    <div className="gallery">
                        {collection.map((item, idx) => (
                            <ScrollReveal
                                key={item.id}
                                className="gallery-item"
                                variant="up"
                                delay={(idx % 6) + 1}
                                threshold={0.08}
                            >
                                <CollectionCard item={item} />
                            </ScrollReveal>
                        ))}
                    </div>
                </>
            )}

            {collection.length === 0 && (
                <ScrollReveal
                    className="state state--center"
                    variant="scale"
                    delay={2}
                    style={{ marginTop: 'clamp(4rem, 12vw, 8rem)' }}
                >
                    <h2 className="state__title">Nothing saved</h2>
                    <p className="state__text">
                        Items you save from search will appear here — a personal archive of what caught your eye.
                    </p>
                    <Link to="/" className="btn btn--solid" style={{ marginTop: 'var(--space-4)' }}>
                        Start searching
                    </Link>
                </ScrollReveal>
            )}
        </main>
    )
}

export default CollectionPage
