import { bookService } from '../services/book.service.js'

const { useState } = React

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
                value = new Date(value).toLocaleDateString('en-GB')
                break
        }

        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()

        // Add validity checks

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
        <form onSubmit={onSubmit}>
            <label htmlFor="fullName">Full Name:</label>
            <input
                type="text"
                id="fullName"
                name="fullName"
                value={review.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
            />

            <label htmlFor="rating">Rating:</label>
            <select
                id="rating"
                name="rating"
                value={review.rating} 
                onChange={handleChange}
            >
                {generateStarOptions()}
            </select>
            

            <label htmlFor="readAt">Read on:</label>
            <input
                type="date"
                id="readAt"
                name="readAt"
                value={review.readAt}
                onChange={handleChange}
            />

            <button type="submit">Submit Review</button>
        </form>
    )
}
