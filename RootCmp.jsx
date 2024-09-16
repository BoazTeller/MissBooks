import { AppHeader } from './cmps/AppHeader.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { AboutUs } from './pages/AboutUs.jsx'

const { useState } = React

export function App() {
    const [page, setPage] = useState('home')

    return (
        <section className="app">
            <AppHeader setPage={setPage} />

            <main className="container main-layout">
                {page === 'home' && <HomePage />}    
                {page === 'about' && <AboutUs />}  
                {page === 'book' && <BookIndex />}    
            </main>
        </section>
    )
}