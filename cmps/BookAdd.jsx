import { bookService } from '../services/book.service.js'
import { googleBookService } from '../services/google-book.service.js'
import { GoogleBookList } from './GoogleBookList.jsx'

const { useState } = React

export function BookAdd() {

    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])

    function onHandleChange({ target }) {
        const { value } = target
        setSearchText(value)
    }

    function onSearchGoogleBooks(ev) {
        ev.preventDefault()

        googleBookService.query(searchText)
            .then(books => {
                setSearchResults(books)
                console.log(books)
            })
            .catch(err => {
                console.error('Failed to search books:', err)
            })
    }

    function onAddGoogleBook(bookRawData) {
        bookService.addGoogleBook(bookRawData)
            .then(addedBook => {
                console.log(addedBook)
                // show success msg
            })
            .catch(err => {
                console.error('Had issues with adding book from Google:', err)
        })
    }
    
    return (
        <section className="book-add">
            <h2>Search Google Books to Add</h2>

            <form onSubmit={onSearchGoogleBooks}>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchText}
                    onChange={onHandleChange} 
                />
                <button type="submit">Search</button>
            </form>

            <GoogleBookList 
                booksRawData={searchResults} 
                onAddGoogleBook={onAddGoogleBook}
            />
        </section>
    )
}
