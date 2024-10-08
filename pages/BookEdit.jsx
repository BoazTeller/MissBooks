import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

export function BookEdit() {
    
    const { bookId } = useParams()
    const navigate = useNavigate()
    
    const [bookToEdit, setBookToEdit] = useState(null)

    useEffect(() => {
        if (bookId) {
            loadBook()
        } else {
            setBookToEdit(bookService.getEmptyBook())
        }
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(book => {
                setBookToEdit(book)
            })
            .catch(err => {
                console.error('Had issues loading book edit', err)
                showErrorMsg('Unable to load the book for editing.')
            })
    }

    function handleChange({ target }) {
        const { name: field, type } = target
        let { value } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prevBook => {
            //TODO: Find more elegant solutions for authors/listPrice editing
            if (field === 'authors') {
                return { 
                    ...prevBook, 
                    authors: value.split(',')
                                  .map(author => author.trim()) 
                }
            }

            if (field.startsWith('listPrice')) {
                return {
                    ...prevBook,
                    listPrice: {
                        ...prevBook.listPrice,
                        // listPrice.amount -> amount
                        [field.replace('listPrice.', '')]: value
                    }
                }
            }

            // If field isn't authors or listPrice then life is easy
            return { ...prevBook, [field]: value}
        })
    }

    function onSubmitEdit(ev) {
        ev.preventDefault()
        onSaveBook()
    }

    function onSaveBook() {
        bookService.save(bookToEdit)
            .then(() => {
                showSuccessMsg('Book saved successfully!')
                navigate('/book')
            })
            .catch(err => {
                console.error('Had issues with book save:', err)
                showErrorMsg('Failed to save the book.')
            })
    }

    if (!bookToEdit) return <h1>Loading book edit page...</h1>

    return (
        <section className="book-edit">
            <h2>Edit Book</h2>
            <form onSubmit={onSubmitEdit} className="book-edit-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={bookToEdit.title}
                        onChange={handleChange}
                        required
                        pattern="^[A-Za-z0-9\s\-'\:]+$"
                        title="Title must contain letters, numbers, or these special characters: - ' :" 
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="listPrice.amount"
                        value={bookToEdit.listPrice.amount || ''} 
                        onChange={handleChange}
                        required
                        min="1"
                        title="Price must be above 0"
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={bookToEdit.description}
                        onChange={handleChange}
                        required
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="authors">Authors:</label>
                    <input
                        type="text"
                        id="authors"
                        name="authors"
                        value={Array.isArray(bookToEdit.authors) ? 
                            bookToEdit.authors.join(', ') : ''}
                        onChange={handleChange}
                        required
                        pattern="^[A-Za-z\s,]+$" 
                        title="Authors must contain letters and spaces, separated by commas"
                    />
                </div>
    
                <div className="form-group">
                    <label htmlFor="publishedDate">Published Date:</label>
                    <input
                        type="number"
                        id="publishedDate"
                        name="publishedDate"
                        value={bookToEdit.publishedDate}
                        onChange={handleChange}
                        required
                        min="1450"
                        max={new Date().getFullYear()}
                        title={`Published date must be between 1450 and ${new Date().getFullYear()}`}
                    />
                </div>
    
                {/* <div className="form-group">
                    <label htmlFor="categories">Categories:</label>
                    <input
                        type="text"
                        id="categories"
                        name="categories"
                        value={Array.isArray(bookToEdit.categories) ? 
                            bookToEdit.categories.join(', ') : ''}
                        onChange={handleChange}
                        required
                        pattern="^[A-Za-z\s,]+$"
                        title="Categories must contain letters and spaces, separated by commas"
                    />
                </div> */}
    
                <div className="form-group">
                    <label htmlFor="isOnSale">On Sale:</label>
                    <input
                        type="checkbox"
                        id="isOnSale"
                        name="listPrice.isOnSale"
                        checked={bookToEdit.listPrice.isOnSale}
                        onChange={handleChange} 
                    />
                </div>
    
                <div className="form-actions">
                    <button type="submit">Save</button>

                    <Link to="/book">
                        <button>Back</button>
                    </Link>
                </div>
            </form>
        </section>
    )    
}