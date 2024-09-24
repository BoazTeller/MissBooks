
export function ReviewPreview({ review, onRemoveReview }) {
    
    const { id: reviewId, fullName, rating, readAt } = review

    return (
        <article className="review-preview">
            <span>{fullName}</span>
            <span>{'⭐️'.repeat(rating)}</span>
            <span>{readAt}</span>
            <button onClick={() => onRemoveReview(reviewId)}>X</button>
        </article>
    )
}
