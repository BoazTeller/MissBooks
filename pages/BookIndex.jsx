import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
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

    function handleFilterChange(filterBy) {
        setFilterBy({ ...filterBy })
    }
    
    function onSelectBook(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return <h1>Loading...</h1>

    return (
        <section className="book-index">
            {selectedBookId 
                ? <BookDetails 
                      bookId={selectedBookId}
                      onBack={() => setSelectedBookId(null)}
                  />
                : <React.Fragment>
                      <h2>Book Index</h2>
                      <BookFilter 
                          filterBy={filterBy} 
                          handleFilterChange={handleFilterChange} 
                      />
                      <BookList
                          books={books}
                          onSelectBook={onSelectBook}
                      />
                  </React.Fragment>
            }
        </section>
    )
}