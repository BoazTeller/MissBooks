import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack, onEdit }) {

    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [bookMetrics, setBookMetrics] = useState({
        readingLevel: '',
        vintageStatus: '',
        priceClass: ''
    })

    useEffect(() => {
        loadBook()
    }, []) 

    useEffect(() => {
        if (!book) return

        const calculatedBookMetrics = {
            readingLevel: getReadingLevel(book.pageCount),
            vintageStatus: getVintageStatus(book.publishedDate),
            priceClass: getPriceClass(book.listPrice.amount)
        }

        setBookMetrics(calculatedBookMetrics)
    }, [book])

    function loadBook() {
        setIsLoading(true)
        bookService.get(bookId)
            .then(book => {
                setBook(book)
            })
            .catch(err => {
                console.error('Had issues loading book details', err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function getReadingLevel(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        else if (pageCount > 200) return 'Decent Reading'
        else if (pageCount < 100) return 'Light Reading'
        return ''
    }

    function getVintageStatus(publishedDate) {
        const yearsOld = new Date().getFullYear() - publishedDate
        if (yearsOld > 10) return 'Vintage'
        else if (yearsOld < 1) return 'New'
        return ''
    }

    function getPriceClass(bookPrice) {
        if (bookPrice > 150) return 'red'
        if (bookPrice < 20) return 'green'
        return ''
    }

    function getDefaultUrl(ev) {
        ev.target.src = "/assets/img/book-placeholder.jpg"
    }

    // Show loading spinner while the book data is being fetched
    if (isLoading) return <img src="/assets/img/book-loader.gif" />

    // Destructure book properties for easy access in the JSX
    const {
        title, subtitle, authors, publishedDate, description,
        pageCount, categories, thumbnail, language, listPrice
    } = book
    const { amount, currencyCode, isOnSale } = listPrice

    return (
        <section className="book-details">
            <div className="book-header">
                <h2 className="book-title">{title}</h2>
                {subtitle && <h3 className="book-subtitle">{subtitle}</h3>}
                <img className="book-thumbnail" src={thumbnail} onError={getDefaultUrl} alt={`${title} cover`} />
            </div>

            <div className="book-info">
                <p>Authors: {authors.join(', ')}</p>
                <p>Published: {publishedDate} {bookMetrics.vintageStatus}</p>
                <p>Page Count: {pageCount} {bookMetrics.readingLevel}</p>
                <p>Categories: {categories.join(', ')}</p>
                <p>Description: {description}</p>
            </div>

            <div className={`book-price ${bookMetrics.priceClass}`}>
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
