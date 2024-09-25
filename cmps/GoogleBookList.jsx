import { GoogleBookPreview } from "./GoogleBookPreview.jsx"

export function GoogleBookList({ booksRawData, onAddGoogleBook }) {

    if (!booksRawData || booksRawData.length === 0) return

    return (
        <ul className="google-book-list">
            {booksRawData.map(bookRawData => (
                <li key={bookRawData.id}>
                    <GoogleBookPreview 
                        bookRawData={bookRawData}
                        onAddGoogleBook={onAddGoogleBook}
                    />
                </li>
            ))}
        </ul>
    )
}
