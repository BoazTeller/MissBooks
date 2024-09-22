import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onSelectBook, onRemoveBook }) {

    return (
        <ul className="book-list container">
            {books.map((book) =>
                <li key={book.id}>
                    <BookPreview book={book} />

                    <section className="book-actions">
                        <button onClick={() => onSelectBook(book.id)}>Details</button>
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                    </section>
                </li>
            )}
        </ul>
    )
}

