import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onSelectBook }) {

    return (
        <ul className="book-list container">
            {books.map((book) =>
                <li key={book.id}>
                    <BookPreview key={book.id} book={book} />
                    <section className="book-actions">
                        <button onClick={() => onSelectBook(book.id)}>Details</button>
                    </section>
                </li>
            )}
        </ul>
    )
}

