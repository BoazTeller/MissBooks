export function BookFilter() {

    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input 
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Search by title"
                    />
                </div>

                <div>
                    <label htmlFor="maxPrice">Max Price: </label>
                    <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        placeholder="Enter max price"
                    />
                </div>

                <button type="submit">Apply Filter</button>
            </form>
        </section>
    )
}
