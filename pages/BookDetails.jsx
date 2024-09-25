import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import Swal from "../lib/sweetalert2.all.js"

import { AddReview } from "../cmps/AddReview.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"

const { useState, useEffect } = React
const { useParams } = ReactRouter
const { Link } = ReactRouterDOM

export function BookDetails() {
    
    const { bookId } = useParams()
    
    const [book, setBook] = useState(null)
    const [isBookLoading, setIsBookLoading] = useState(true)
    const [bookMetrics, setBookMetrics] = useState({
        readingLevel: '',
        vintageStatus: '',
        priceClass: ''
    })

    useEffect(() => {
        loadBook()
    }, [bookId]) 

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
        setIsBookLoading(true)
        bookService.get(bookId)
            .then(book => {
                setBook(book)
            })
            .catch(err => {
                console.error('Had issues loading book details', err)
                showErrorMsg('Book not found.')
            })
            .finally(() => {
                setIsBookLoading(false)
            })
    }

    function onAddReview(review) {
        bookService.addReview(bookId, review)
            .then((savedBook) => {
                setBook(savedBook)
                showSuccessMsg('Review added!')
            })
            .catch(error => {
                console.error('Failed to add review:', error)
                showErrorMsg('Failed to add review.')
            })
    }

    function onRemoveReview(reviewId) {
        Swal.fire(getSwalOpts())
            .then((result) => {
                if (result.isConfirmed) {
                    bookService.removeReview(bookId, reviewId)
                        .then((savedBook) => {
                            setBook(savedBook)
                            showSuccessMsg('Review removed!')
                        })
                        .catch(error => {
                            console.error('Failed to remove review:', error)
                            showErrorMsg('Failed to remove review.')
                        })
                }
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
    
    //TODO: Refactor -> find more elegant solution
    function getSwalOpts() {
        return {
            text: 'Do you want to remove this review?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            icon: null,  
            title: '',
            width: '300px',
            theme: 'dark'
        }
    }

    // Show loading spinner while the book data is being fetched
    if (isBookLoading) return <img className="img-loader" src="/assets/img/book-loader.gif" />

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
                <p><span>Authors:</span> {authors.join(', ')}</p>
                <p><span>Page Count:</span> {pageCount} {bookMetrics.readingLevel && `(${bookMetrics.readingLevel})`} </p>
                <p><span>Categories:</span> {categories.join(', ')}</p>
                <p><span>Description:</span> <LongTxt txt={description} /></p>
            </div>

            <div className={`book-price ${bookMetrics.priceClass}`}>
                <p>Price: {amount} {currencyCode} {isOnSale && <span className="on-sale">On Sale!</span>}</p>
            </div>
            
            <div className="review-list-container">
                <ReviewList 
                    book={book} 
                    onRemoveReview={onRemoveReview} 
                />
            </div>

            <div className="add-review-container">
                <h3>Add A Review</h3>
                <AddReview onAddReview={onAddReview} />
            </div>

            <div className="action-btns container">
                <Link to="/book">
                    <button>Back</button>
                </Link>

                <Link to={`/book/${book.prevBookId}`}>
                    <button>Previous</button>
                </Link>

                <Link to={`/book/${book.nextBookId}`}>
                    <button>Next</button>
                </Link>
            </div>
        </section>
    )
}
