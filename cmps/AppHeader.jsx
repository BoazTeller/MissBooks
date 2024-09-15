
export function AppHeader({ setPage }) {

    function onSetPage(page) {
        setPage(page)
    }

    return (
        <header className="app-header full main-layout">
            <section>
                <h1>MissBooks</h1>

                <nav className="app-nav">
                    <a onClick={() => onSetPage('home')}>Home</a>
                    <a onClick={() => onSetPage('about')}>About</a>
                    <a onClick={() => onSetPage('book')}>Books</a>
                </nav>
            </section>
        </header>
    )
}