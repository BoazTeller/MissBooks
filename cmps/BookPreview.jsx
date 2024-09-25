import { LongTxt } from "./LongTxt.jsx"

const { Link } = ReactRouterDOM

export function BookPreview({ book }) {

    function getDefaultUrl(ev) {
        ev.target.src = 'https://via.placeholder.com/150'
    }

    return (
        <article className="book-preview">
            <h3>{book.title}</h3>

            <Link to={`/book/${book.id}`}>
                <img src={book.thumbnail} alt={book.title} onError={getDefaultUrl} />
            </Link>

            {/* <p>{book.description}</p> */}
            <LongTxt txt={book.description} length={60} />
            
            <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            {book.isOnSale && <p>On Sale!</p>}
        </article>
    )
}
