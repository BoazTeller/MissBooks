import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack, onEdit }) {

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

    const {
        title, subtitle, authors, publishedDate, description,
        pageCount, categories, thumbnail, language, listPrice
    } = book
    const { amount, currencyCode, isOnSale } = listPrice

    function getReadingLevel() {
        if (pageCount > 500) return 'Serious Reading'
        else if (pageCount > 200) return 'Decent Reading'
        else if (pageCount < 100) return 'Light Reading'
        return ''
    }

    function getVintageStatus() {
        const yearsOld = new Date().getFullYear() - publishedDate
        if (yearsOld > 10) return 'Vintage'
        else if (yearsOld < 1) return 'New'
        return ''
    }

    function getPriceColorClass() {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
        return ''
    }

    return (
        <section className="book-details">
            <div className="book-header">
                <h2 className="book-title">{title}</h2>
                {subtitle && <h3 className="book-subtitle">{subtitle}</h3>}
                <img className="book-thumbnail" src={thumbnail} alt={`${title} cover`} />
            </div>

            <div className="book-info">
                <p>Authors: {authors.join(', ')}</p>
                <p>Published: {publishedDate} {getVintageStatus()}</p>
                <p>Page Count: {pageCount} {getReadingLevel()}</p>
                <p>Categories: {categories.join(', ')}</p>
                <p>Description: {description}</p>
            </div>

            <div className={`book-price ${getPriceColorClass()}`}>
                <p>Price: {amount} {currencyCode}</p>
                {isOnSale && <p className="on-sale">On Sale!</p>}
            </div>

            <div className="action-btns container">
                <button onClick={onBack}>Back</button>
                <button onClick={onEdit}>Edit</button>
            </div>
        </section>
    )
}
