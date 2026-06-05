import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()
    const isActive = (path) => location.pathname === path

    return (
        <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
            <div className="page-container">
                <div className="nav-inner">
                    <Link
                        to="/"
                        className="flex items-center gap-3.5 group transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-offset-4 rounded-xl"
                    >
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] flex items-center justify-center font-display font-bold text-white text-base shadow-[var(--shadow-accent)] transition-all duration-300 group-hover:shadow-[0_12px_40px_rgba(232,96,46,0.4)] glow-effect">
                            M
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-[var(--text-primary)] leading-none">
                                Media<span className="text-gradient">Search</span>
                            </span>
                            <span className="text-[10px] sm:text-[11px] text-[var(--text-subtle)] tracking-[0.12em] uppercase font-medium">
                                Premium Discovery
                            </span>
                        </div>
                    </Link>

                    <div className="nav-pill">
                        <Link
                            to="/"
                            className={`nav-link ${isActive('/') ? 'nav-link--active' : ''}`}
                        >
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search
                        </Link>
                        <Link
                            to="/collection"
                            className={`nav-link ${isActive('/collection') ? 'nav-link--active' : ''}`}
                        >
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Collection
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
