import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/slices/searchSlice'
import ScrollReveal from './ScrollReveal'

const tabs = [
    {
        id: 'photos',
        label: 'Photos',
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
            </svg>
        ),
    },
    {
        id: 'videos',
        label: 'Videos',
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <rect x="3" y="5" width="14" height="14" rx="1.5" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 10l4-2v8l-4-2v-4z" />
            </svg>
        ),
    },
    {
        id: 'gifs',
        label: 'GIFs',
        icon: (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h10" />
            </svg>
        ),
    },
]

const Tabs = () => {
    const dispatch = useDispatch()
    const activeTab = useSelector((state) => state.search.activeTab)

    const handleTabClick = useCallback(
        (tabId) => dispatch(setActiveTab(tabId)),
        [dispatch],
    )

    return (
        <ScrollReveal variant="up" delay={1}>
            <div className="tabs" role="tablist" aria-label="Media type">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        className={`tab ${activeTab === tab.id ? 'tab--active' : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>
        </ScrollReveal>
    )
}

export default React.memo(Tabs)
