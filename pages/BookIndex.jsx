import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => {
                console.error('Failed to query books:', err)
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!books) return <h1>Loading...</h1>

    return (
        <section>
            <h2>Book Index</h2>
            <BookFilter 
                filterBy={filterBy} 
                onSetFilterBy={onSetFilterBy} 
            />
            <BookList
                books={books}
                filterBy={filterBy}
                onSetFilterBy={onSetFilterBy}
            />
        </section>
    )
}