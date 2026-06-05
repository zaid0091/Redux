import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos, fetchVideos, fetchGifs } from '../api/mediaApi'
import { setLoading, setError, setResults } from '../redux/slices/searchSlice'
import ResultCard from './ResultCard'

const SkeletonGrid = () => (
    <div className="card-grid-wrap">
        <div className="skeleton-grid">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 80}ms` }} />
            ))}
        </div>
    </div>
)

const ResultsGrid = () => {
    const dispatch = useDispatch()
    const { query, activeTab, results, loading, error } = useSelector((store) => store.search)

    useEffect(function () {
        if (!query) return

        const controller = new AbortController()
        const signal = controller.signal

        const getData = async () => {
            try {
                dispatch(setLoading())
                let data = []

                if (activeTab === 'photos') {
                    const response = await fetchPhotos(query, 1, 20, signal)
                    data = response.results.map((item) => ({
                        id: item.id,
                        type: 'photo',
                        title: item.alt_description,
                        thumbnail: item.urls.small,
                        src: item.urls.full,
                        url: item.links.html,
                    }))
                }

                if (activeTab === 'videos') {
                    const response = await fetchVideos(query, 20, signal)
                    data = response.videos.map((item) => ({
                        id: item.id,
                        type: 'video',
                        title: item.user.name || 'video',
                        thumbnail: item.image,
                        src: item.video_files[0].link,
                        url: item.url,
                    }))
                }

                if (activeTab === 'gifs') {
                    const response = await fetchGifs(query, 20, signal)
                    data = response.data.map((item) => ({
                        id: item.id,
                        type: 'gif',
                        title: item.title || 'gif',
                        thumbnail: item.images.downsized.url,
                        src: item.url,
                        url: item.url,
                    }))
                }

                dispatch(setResults(data))
            } catch (err) {
                if (err.name === 'AbortError') return
                dispatch(setError(err.message))
            }
        }

        getData()
        return () => controller.abort()
    }, [query, activeTab, dispatch])

    if (error) {
        return (
            <div className="card-grid-wrap py-8">
                <div className="glass-effect state-panel premium-border">
                    <div className="state-icon state-icon--danger">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-display text-xl font-bold">Something went wrong</h2>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                            Check your connection or try again in a moment.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (loading) {
        return <SkeletonGrid />
    }

    if (results.length === 0) {
        return (
            <div className="card-grid-wrap py-8">
                <div className="glass-effect state-panel premium-border">
                    <div className="state-icon state-icon--accent">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM13.5 10.5h-6" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-display text-xl font-bold">No results found</h2>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                            Try a different keyword or switch media type above.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="card-grid-wrap">
            <div className="card-grid">
                {results.map((elem, idx) => (
                    <div key={elem.id} className={`card-grid-item stagger-${(idx % 6) + 1}`}>
                        <ResultCard item={elem} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResultsGrid
