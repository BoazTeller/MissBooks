import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { BookEdit } from "./BookEdit.jsx"

const { useState, useEffect, Fragment } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
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

    function onSaveBook(bookToSave) {
        bookService.save(bookToSave)
            .then(() => {
                setIsEdit(false)
                setSelectedBookId(null)
                loadBooks()
            })
            .catch(err => {
                console.error('Had issues with book save:', err)
            })
    }

    function onRemoveBook(bookId) {
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
    
    if (!books) return <img src="/assets/img/books-loader.gif" />
    
    return (
        <section className="book-index">
            {selectedBookId
                ? isEdit
                    ? <BookEdit
                          bookId={selectedBookId}
                          onSaveBook={onSaveBook}
                          onCancel={() => setIsEdit(false)}
                      />
                    : <BookDetails
                          bookId={selectedBookId}
                          onBack={() => setSelectedBookId(null)}
                          onEdit={() => setIsEdit(true)}
                      />
                : <Fragment>
                      <h2>Book Index</h2>
                      <BookFilter
                          filterBy={filterBy}
                          handleFilterChange={handleFilterChange}
                      />
                      {books.length 
                          ? <BookList
                                books={books}
                                onSelectBook={onSelectBook}
                                onRemoveBook={onRemoveBook}
                            />
                          : <h1>No books found...</h1>
                      }
                  </Fragment>
            }
        </section>
    )
}


