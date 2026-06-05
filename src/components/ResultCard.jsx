import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addCollection } from '../redux/slices/collectionSlice'
import { showAddedToast } from '../utils/toastNotifications'

const typeLabels = { photo: 'Photo', video: 'Video', gif: 'GIF' }

const ResultCard = ({ item }) => {
    const dispatch = useDispatch()

    const addToCollections = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addCollection(item))
        showAddedToast()
    }, [dispatch, item])

    return (
        <article className="premium-card group card-hover premium-border">
            <div className="premium-card__media">
                {item.type === 'photo' && (
                    <img
                        className="premium-card__image"
                        src={item.thumbnail}
                        alt={item.title || 'Photo'}
                        loading="lazy"
                    />
                )}
                {item.type === 'video' && (
                    <video
                        className="premium-card__image"
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                )}
                {item.type === 'gif' && (
                    <img
                        className="premium-card__image"
                        src={item.thumbnail}
                        alt={item.title || 'GIF'}
                        loading="lazy"
                    />
                )}

                <span className="premium-card__badge">{typeLabels[item.type] || item.type}</span>
                <div className="premium-card__media-overlay" />
            </div>

            <div className="premium-card__content">
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-card__link"
                    aria-label={`Open ${item.title || 'media'}`}
                >
                    <h2 className="premium-card__title">{item.title || 'Untitled'}</h2>
                </a>

                <div className="premium-card__footer">
                    <span className="premium-card__meta">Tap to open in a new tab</span>
                    <button
                        type="button"
                        onClick={addToCollections}
                        className="premium-card__button"
                    >
                        Save
                    </button>
                </div>
            </div>
        </article>
    )
}

export default React.memo(ResultCard)
