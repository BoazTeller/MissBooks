import { utilService } from '../services/util.service.js'
import { bookService } from '../services/book.service.js'
import { googleBookService } from '../services/google-book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { GoogleBookList } from '../cmps/GoogleBookList.jsx'

const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

// TODO: Refactor as Modal overlay 
export function BookAdd() {

    const [searchResults, setSearchResults] = useState([])

    const searchInputRef = useRef()
    const debouncedSearch = useRef(
        utilService.debounce((searchText) => searchGoogleBooks(searchText), 500)
    )

    // Set focus to search input when cmp loads
    useEffect(() => {
        searchInputRef.current.focus()
    }, [])

    function onHandleChange({ target }) {
        const { value: searchText } = target        
        debouncedSearch.current(searchText)
    }

    // Note: Rename to loadGoogleBooks?
    function searchGoogleBooks(searchText) {
        googleBookService.query(searchText)
            .then(books => {
                setSearchResults(books)
            })
            .catch(err => {
                console.error('Failed to search books:', err)
                showErrorMsg('Could not complete the search.')
            })
    }

    function onAddGoogleBook(bookRawData) {
        bookService.addGoogleBook(bookRawData)
            .then(() => {
                showSuccessMsg('Book added successfully!') 
            })
            .catch(err => {
                console.error('Had issues with adding book from Google:', err)
                showErrorMsg('Failed to add the book.')
        })
    }
    
    return (
        <section className="book-add">
            <h2>Search Google Books</h2>

            <form>
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search by book title"
                    onChange={onHandleChange} 
                    maxLength="100" 
                    pattern=".*\S.*"
                    title="Please enter at least one character"
                />
            </form>
            
            <Link to="/book">
                Return to Books
            </Link>

            <GoogleBookList 
                booksRawData={searchResults} 
                onAddGoogleBook={onAddGoogleBook}
            />
        </section>
    )
}
