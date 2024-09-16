const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

   const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    // Temporarily disabled to prevent filtering on every input change, 
    // enabling filtering only on submit
    // useEffect(() => {
    //     onSetFilterBy(filterByToEdit)
    // }, [filterByToEdit])

    function handleChange({ target }) {
        const { name: field, type } = target
        let { value } = target

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({...prevFilter, [field]: value}))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { title, maxPrice } = filterByToEdit
    const isValid = title || maxPrice

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
                    />
                </div>

                <button type="submit" disabled={!isValid}>Apply Filter</button>
            </form>
        </section>
    )
}
