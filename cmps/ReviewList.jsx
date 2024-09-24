import { ReviewPreview } from "./ReviewPreview.jsx" 

export function ReviewList({ book, onRemoveReview }) {

    if (!book.reviews || book.reviews.length === 0) {
        return <h3>No reviews yet...</h3>
    }

    return (
        <ul>
            {book.reviews.map((review, idx) => (
                <li key={idx}>
                    <ReviewPreview 
                        review={review} 
                        onRemoveReview={onRemoveReview}
                    />
                </li>
            ))}
        </ul>
    )
}

