import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import Swal from "../lib/sweetalert2.all.js"

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
                showErrorMsg('Could not load books.')
            })
    }

    function handleFilterChange(filterBy) {
        setFilterBy({ ...filterBy })
    }
    
    function onRemoveBook(bookId) {
        Swal.fire(getSwalOpts())
            .then(response => {
                if (response.isConfirmed) {
                    bookService.remove(bookId)
                        .then(() => {
                            setBooks(prevBooks =>
                                prevBooks.filter(book => book.id !== bookId)
                            )
                            showSuccessMsg('Book removed successfully!')
                        })
                        .catch(err => {
                            console.error('Had issues with removing book:', err)
                            showErrorMsg('Could not remove the book.')
                        })
                }
            })
    }
    
    //TODO: Refactor -> find more elegant solution
    function getSwalOpts() {
        return {
            text: 'Do you want to remove this book?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            icon: null,  
            title: '',
            width: '300px'
        }
    }

    if (!books) return <img className="img-loader" src="/assets/img/books-loader.gif" />

    return (
        <section className="book-index">
            <section className="add-book-btn-container">
                <Link to="/book/edit">
                    <button className="btn-cta">Add a new book</button>
                </Link>
                <Link to="/book/add">
                    <button className="btn-cta">Add from Google Books</button>
                </Link>
            </section>


            <BookFilter
                filterBy={filterBy}
                handleFilterChange={handleFilterChange}
            />

            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}


