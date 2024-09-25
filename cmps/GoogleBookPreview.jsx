export function GoogleBookPreview({ bookRawData, onAddGoogleBook }) {

    const { volumeInfo: bookInfo } = bookRawData
    
    return (
        <article className="google-book-preview">
            {bookInfo.title}
            <button className="btn-add-from-google" onClick={() => onAddGoogleBook(bookRawData)}>+</button>
        </article>
    )
}