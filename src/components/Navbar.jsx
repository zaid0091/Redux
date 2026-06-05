import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()
    const isActive = (path) => location.pathname === path

    return (
        <header className="site-nav">
            <div className="page-container">
                <div className="nav-inner">
                    <Link to="/" className="brand">
                        <span className="brand-name">MediaSearch</span>
                        <span className="brand-tag">Archive 01</span>
                    </Link>

                    <nav className="nav-links" aria-label="Main">
                        <Link
                            to="/"
                            className={`nav-item ${isActive('/') ? 'nav-item--active' : ''}`}
                        >
                            Search
                        </Link>
                        <Link
                            to="/collection"
                            className={`nav-item ${isActive('/collection') ? 'nav-item--active' : ''}`}
                        >
                            Collection
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar
