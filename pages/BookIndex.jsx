import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(books => setBooks(books))
            .catch(err => {
                console.error('Failed to query books:', err)
            })
    }

    if (!books) return <h1>Loading...</h1>

    return (
        <section>
            <h2>Book Index</h2>
            <BookList
                books={books}
            />
        </section>
    )
}