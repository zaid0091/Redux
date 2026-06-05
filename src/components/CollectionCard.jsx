import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { removeCollection } from '../redux/slices/collectionSlice'
import { showRemovedToast } from '../utils/toastNotifications'

const typeLabels = { photo: 'Photo', video: 'Video', gif: 'GIF' }

const CollectionCard = ({ item }) => {
    const dispatch = useDispatch()

    const removeFromCollection = useCallback((e) => {
        e.preventDefault()
        dispatch(removeCollection(item.id))
        showRemovedToast()
    }, [dispatch, item.id])

    const mediaUrl = item.src || item.thumbnail || item.url || item.image || item.images?.downsized?.url || ''

    return (
        <article className="media-card">
            <div className="media-card__frame">
                {item.type === 'photo' && mediaUrl && (
                    <img
                        className="media-card__media"
                        src={mediaUrl}
                        alt={item.title || 'Photo'}
                        loading="lazy"
                    />
                )}
                {item.type === 'video' && mediaUrl && (
                    <video
                        className="media-card__media"
                        src={mediaUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                )}
                {item.type === 'gif' && mediaUrl && (
                    <img
                        className="media-card__media"
                        src={mediaUrl}
                        alt={item.title || 'GIF'}
                        loading="lazy"
                    />
                )}
                <span className="media-card__type">{typeLabels[item.type] || item.type}</span>
            </div>

            <div className="media-card__body">
                <h2 className="media-card__title">
                    <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${item.title || 'media'}`}
                    >
                        {item.title || 'Untitled'}
                    </a>
                </h2>

                <div className="media-card__actions">
                    <span className="media-card__note">In your library</span>
                    <button
                        type="button"
                        onClick={removeFromCollection}
                        className="media-card__action media-card__action--remove"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </article>
    )
}

export default React.memo(CollectionCard)
