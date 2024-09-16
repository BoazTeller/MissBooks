import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books }) {

    return (
        <ul className="book-list container">
            {books.map((book) =>
                <li key={book.id}>
                    <BookPreview key={book.id} book={book} />
                </li>
            )}
        </ul>
    )
}

