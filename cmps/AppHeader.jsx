const { useNavigate } = ReactRouter
const { NavLink } = ReactRouterDOM

export function AppHeader() {

    const navigate = useNavigate()

    const navLinks = [
        { title: 'Home', path: '' },
        { title: 'About', path: 'about' },
        { title: 'Books', path: 'book' }
    ]

    function onNavigateHome() {
        navigate('/')
    }

    return (
        <header className="app-header full main-layout">
            <section>
                <h1 onClick={onNavigateHome}>MissBooks</h1>

                <nav className="app-nav">
                    {navLinks.map(navLink => 
                        <NavLink
                            key={navLink.path}
                            to={`/${navLink.path}`}
                            className="nav-link"
                            title={`Go to ${navLink.title}`}
                        >
                            {navLink.title}
                        </NavLink>
                    )}
                </nav>
            </section>
        </header>
    )
}