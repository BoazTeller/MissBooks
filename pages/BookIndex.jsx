import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

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

    function handleFilterChange(filterBy) {
        setFilterBy({ ...filterBy })
    }
    
    function onRemoveBook(bookId) {
        const isConfirmed = prompt('Are you sure?')
        if (!isConfirmed) return

        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => 
                    prevBooks.filter(book => book.id !== bookId)
                )
            })
            .catch(err => {
                console.error('Had issues with removing book:', err)
            })
    }    

    function onAddGoogleBook() {
        bookService.addGoogleBook(book)
            .then(addedBook => {
                console.log(addedBook)
                // show success msg
            })
            .catch(err => {
                console.error('Had issues with adding book from Google:', err)
        })
    }
    
    if (!books) return <img src="/assets/img/books-loader.gif" />


    return (
        <section className="book-index">
            <BookFilter
                filterBy={filterBy}
                handleFilterChange={handleFilterChange}
            />

            <Link to="/book/edit"><button>Add a new book</button></Link>
            <Link to="/book/add"><button>Add from Google Books</button></Link>
            
            {books.length 
                ? <BookList
                    books={books}
                    onRemoveBook={onRemoveBook}
                />
                : <h1>No books found...</h1>
            }
        </section>
    )
}


