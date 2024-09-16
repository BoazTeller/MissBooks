import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => {
                setBook(book)
            })
            .catch(err => {
                console.error('Had issues loading book details', err)
            })
    }

    if (!book) return <h1>Loading book...</h1>

    const { title, subtitle, description, authors, publishedDate, 
            pageCount, categories, thumbnail, listPrice } = book
    const { amount, currencyCode, isOnSale } = listPrice

    return (
        <section className="book-details">
            <div className="book-header">
                <h2 className="book-title">{title}</h2>
                <h3 className="book-subtitle">{subtitle}</h3>
                <img className="book-thumbnail" src={thumbnail} alt={`${title} cover`} />
            </div>

            <div className="book-info">
                <p><strong>Authors:</strong> {authors.join(', ')}</p>
                <p><strong>Published:</strong> {publishedDate}</p>
                <p><strong>Page Count:</strong> {pageCount}</p>
                <p><strong>Categories:</strong> {categories.join(', ')}</p>
                <p><strong>Description:</strong> {description}</p>
            </div>

            <div className="book-price">
                <p>Price: {listPrice.amount} {listPrice.currencyCode}</p>
                {listPrice.isOnSale && <p className="on-sale">On Sale!</p>}
            </div>

            <button onClick={onBack}>Back</button>
        </section>
    )
}
