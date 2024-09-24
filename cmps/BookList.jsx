import { BookPreview } from "./BookPreview.jsx"

const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {

    return (
        <ul className="book-list container">
            {books.map((book) =>
                <li key={book.id}>
                    <BookPreview book={book} />

                    <section className="book-actions">
                        <Link to={`/book/edit/${book.id}`}>
                            <button>Edit</button>
                        </Link>

                        <Link to={`/book/${book.id}`}>
                            <button>Details</button>
                        </Link>

                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                    </section>
                </li>
            )}
        </ul>
    )
}

