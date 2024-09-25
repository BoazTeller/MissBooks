import { bookService } from '../services/book.service.js'

const { useState } = React

// TODO: Refactor as Modal overlay 
export function AddReview({ onAddReview }) {

    const [review, setReview] = useState(bookService.getEmptyReview())

    function handleChange({ target }) {
        const { name: field, type } = target
        let { value } = target

        switch (type) {
            case 'number':
            case 'select-one':
                value = +value 
                break

            case 'date':
                // value = new Date(value).toLocaleDateString()
                break
        }

        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSubmitReview(ev) {
        ev.preventDefault()
        // TODO: Refactor with custom validity func instead of using pattern/disabled button
        onAddReview(review)
    }

    function generateStarOptions() {
        const options = []
        for (let i = 1; i <= 5; i++) {
            options.push(<option key={i} value={i}>{'★'.repeat(i)}</option>)
        }
        return options
    }

    return (
        <form onSubmit={onSubmitReview}>
            <label htmlFor="fullName">Full Name:</label>
            <input
                type="text"
                id="fullName"
                name="fullName"
                value={review.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                maxLength={50}
                required
                pattern="[A-Za-z\s]+"
                title="Please enter a valid name (letters only)."
            />

            <label htmlFor="rating">Rating:</label>
            <select
                id="rating"
                name="rating"
                value={review.rating} 
                onChange={handleChange}
                required 
            >
                {generateStarOptions()}
            </select>
            
            <label htmlFor="readAt">Read on:</label>
            <input
                type="date"
                id="readAt"
                name="readAt"
                value={review.readAt || ''}
                onChange={handleChange}
            />

            <button type="submit" disabled={!review.readAt}>Submit Review</button>
        </form>
    )
}
