import { showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function BookFilter({ filterBy, handleFilterChange }) {

   const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        handleFilterChange(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name: field, type } = target
        let { value } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({...prevFilter, [field]: value}))
    }

    function onSubmit(ev) {
        ev.preventDefault()

        if (!isValidFilter) {
            return showErrorMsg('Please fill in at least one search criteria.')
        }

        handleFilterChange(filterByToEdit)
    }

    const { title, maxPrice, minPrice, category, pageCount, isOnSale } = filterByToEdit

    function isValidFilter() {
        return (
            !!title || 
            !!category || 
            isOnSale || 
            maxPrice > 0 || 
            minPrice > 0 || 
            pageCount > 0
        )
    }    

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
                        value={title}
                        onChange={handleChange}
                        placeholder="Search by title"
                    />
                </div>

                <div>
                    <label htmlFor="maxPrice">Max Price: </label>
                    <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        value={maxPrice || ''}
                        onChange={handleChange}
                        placeholder="Enter max price"
                        min="1"
                    />
                </div>

                <div>
                    <label htmlFor="minPrice">Min Price: </label>
                    <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        value={minPrice || ''}
                        onChange={handleChange}
                        placeholder="Enter min price"
                        min="1"
                    />
                </div>

                <div>
                    <label htmlFor="minPrice">Max Page Count: </label>
                    <input
                        type="number"
                        id="pageCount"
                        name="pageCount"
                        value={pageCount || ''}
                        onChange={handleChange}
                        placeholder="Enter max page count"
                        min="0"
                    />
                </div>

                {/* Temporarily disabled */}
                {/* Will be enabled after more interesting book genres will be added */}
                {/* <div>
                    <label htmlFor="category">Category: </label>
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Computers">Computers</option>
                        <option value="Hack">Hack</option>
                    </select>
                </div> */}

                <div>
                    <label htmlFor="isOnSale">On Sale: </label>
                    <input
                        type="checkbox"
                        id="isOnSale"
                        name="isOnSale"
                        checked={isOnSale}
                        onChange={handleChange}
                    />
                </div>

                {/* Temporarily disabled for easier user storage search */}
                {/* <button type="submit" disabled={!isValidFilter()}>Apply Filter</button> */}
            </form>
        </section>
    )
}
