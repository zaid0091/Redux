import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { removeCollection } from '../redux/slices/collectionSlice'
import { showRemovedToast } from '../utils/toastNotifications'

const typeLabels = { photo: 'Photo', video: 'Video', gif: 'GIF' }

const CollectionCard = ({ item }) => {
    const dispatch = useDispatch()

    const removeFromCollection = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(removeCollection(item.id))
        showRemovedToast()
    }, [dispatch, item.id])

    const mediaUrl = item.src || item.thumbnail || item.url || item.image || item.images?.downsized?.url || ''
    const isVideo = item.type === 'video'

    return (
        <article className="premium-card group card-hover premium-border">
            <div className="premium-card__media">
                {item.type === 'photo' && mediaUrl && (
                    <img
                        className="premium-card__image"
                        src={mediaUrl}
                        alt={item.title || 'Photo'}
                        loading="lazy"
                    />
                )}
                {isVideo && mediaUrl && (
                    <video
                        className="premium-card__image"
                        src={mediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                )}
                {item.type === 'gif' && mediaUrl && (
                    <img
                        className="premium-card__image"
                        src={mediaUrl}
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
                    <span className="premium-card__meta">Saved to your library</span>
                    <button
                        type="button"
                        onClick={removeFromCollection}
                        className="premium-card__button premium-card__button--danger"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </article>
    )
}

export default React.memo(CollectionCard)
