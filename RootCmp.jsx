import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'

const { useState } = React

export function App() {
    const [page, setPage] = useState('home')

    function onSetPage(ev, page) {
        ev.preventDefault()
        setPage(page)
    }

    return (
        <section className="app">
            <AppHeader onSetPage={onSetPage} />

            <main className="container Amain-layout">
                {page === 'home' && <HomePage />}    
                {page === 'about' && <AboutUs />}  
                {page === 'book' && <BookIndex />}    
            </main>
        </section>
    )
}