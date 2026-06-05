import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos, fetchVideos, fetchGifs } from '../api/mediaApi'
import { setLoading, setError, setResults } from '../redux/slices/searchSlice'
import ResultCard from './ResultCard'
import ScrollReveal from './ScrollReveal'

const SkeletonGrid = () => (
    <div className="skeleton-gallery">
        {Array.from({ length: 8 }).map((_, i) => (
            <ScrollReveal
                key={i}
                className="skeleton-item"
                variant="up"
                delay={(i % 6) + 1}
                threshold={0.05}
            >
                <div className="skeleton-item__img" />
                <div className="skeleton-item__body">
                    <div className="skeleton-line skeleton-line--long" />
                    <div className="skeleton-line skeleton-line--short" />
                </div>
            </ScrollReveal>
        ))}
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
            <ScrollReveal className="state state--center" variant="scale" delay={2}>
                <h2 className="state__title">Request failed</h2>
                <p className="state__text">
                    We couldn&apos;t reach the source. Check your connection and try again.
                </p>
            </ScrollReveal>
        )
    }

    if (loading) {
        return <SkeletonGrid />
    }

    if (results.length === 0) {
        return (
            <ScrollReveal className="state state--center" variant="scale" delay={2}>
                <h2 className="state__title">No matches</h2>
                <p className="state__text">
                    Nothing came back for that term. Try another word or switch media type.
                </p>
            </ScrollReveal>
        )
    }

    return (
        <div className="gallery">
            {results.map((elem, idx) => (
                <ScrollReveal
                    key={`${activeTab}-${elem.id}`}
                    className="gallery-item"
                    variant="up"
                    delay={(idx % 6) + 1}
                    threshold={0.08}
                >
                    <ResultCard item={elem} />
                </ScrollReveal>
            ))}
        </div>
    )
}

export default ResultsGrid
