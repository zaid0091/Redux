import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addCollection } from '../redux/slices/collectionSlice'
import { showAddedToast } from '../utils/toastNotifications'

const typeLabels = { photo: 'Photo', video: 'Video', gif: 'GIF' }

const ResultCard = ({ item }) => {
    const dispatch = useDispatch()

    const addToCollections = useCallback((e) => {
        e.preventDefault()
        dispatch(addCollection(item))
        showAddedToast()
    }, [dispatch, item])

    return (
        <article className="media-card">
            <div className="media-card__frame">
                {item.type === 'photo' && (
                    <img
                        className="media-card__media"
                        src={item.thumbnail}
                        alt={item.title || 'Photo'}
                        loading="lazy"
                    />
                )}
                {item.type === 'video' && (
                    <video
                        className="media-card__media"
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                )}
                {item.type === 'gif' && (
                    <img
                        className="media-card__media"
                        src={item.thumbnail}
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
                    <span className="media-card__note">Opens in new tab</span>
                    <button type="button" onClick={addToCollections} className="media-card__action">
                        Save
                    </button>
                </div>
            </div>
        </article>
    )
}

export default React.memo(ResultCard)
