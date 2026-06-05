import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/slices/searchSlice'

const tabs = [
    {
        id: 'photos',
        label: 'Photos',
        icon: (
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14l2.5-3 3 4 2-2.5L18 15" />
                <circle cx="9" cy="9" r="1.5" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        id: 'videos',
        label: 'Videos',
        icon: (
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <rect x="3" y="5" width="14" height="14" rx="2" strokeWidth={2} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 10l4-2v8l-4-2v-4z" />
            </svg>
        ),
    },
    {
        id: 'gifs',
        label: 'GIFs',
        icon: (
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h10" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7v10M15 7v10" />
            </svg>
        ),
    },
]

const Tabs = () => {
    const dispatch = useDispatch()
    const activeTab = useSelector((state) => state.search.activeTab)

    const handleTabClick = useCallback(
        (tabId) => {
            dispatch(setActiveTab(tabId))
        },
        [dispatch],
    )

    return (
        <div className="flex justify-center mb-12 sm:mb-16 px-1 pt-2">
            <div className="tabs-shell glass-effect premium-border shadow-[var(--shadow-md)]" role="tablist" aria-label="Media type">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'tab-btn--active' : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default React.memo(Tabs)
