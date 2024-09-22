export function BookPreview({ book }) {

    function getDefaultUrl(ev) {
        ev.target.src = 'https://via.placeholder.com/150'
    }

    return (
        <article className="book-preview">
            <h3>{book.title}</h3>
            <img src={book.thumbnail} alt={book.title} onError={getDefaultUrl} />
            <p>{book.description}</p>
            <p>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
            {book.isOnSale && <p>On Sale!</p>}
        </article>
    )
}
