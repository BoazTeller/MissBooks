export function AppHeader({ onSetPage }) {
    const navLinks = [
        { title: 'Home', page: 'home' },
        { title: 'About', page: 'about' },
        { title: 'Books', page: 'book' }
    ]

    return (
        <header className="app-header full main-layout">
            <section>
                <h1>MissBooks</h1>

                <nav className="app-nav">
                    {navLinks.map(navLink =>
                        <a 
                            key={navLink.title}
                            onClick={(ev) => onSetPage(ev, navLink.page)}
                            className="nav-link"
                            title={`Go to ${navLink.title}`}
                        >
                            {navLink.title}    
                        </a>
                    )}
                </nav>
            </section>
        </header>
    )
}