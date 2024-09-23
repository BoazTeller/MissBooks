export function GoogleBookPreview({ bookRawData, onAddGoogleBook }) {
    const { volumeInfo: bookInfo } = bookRawData
    // {bookInfo.authors.join(', ')}
    return (
        <article className="google-book-preview">
            {bookInfo.title}
            <button onClick={() => onAddGoogleBook(bookRawData)}>Add to Library</button>
        </article>
    )
}