const API_URL = 'https://www.googleapis.com/books/v1/volumes'

export const googleBookService = {
    query
}

function query(searchText) {
    if (!searchText.trim()) return Promise.resolve([])

    const url = 
        `${API_URL}?q=${encodeURIComponent(searchText)}&printType=books&maxResults=10`
    
    return axios.get(url)
        .then(response => {
            return response.data.items
        })
        .catch(err => {
            console.error('Failed to fetch books from Google API:', err)
            throw new Error('Failed to fetch books from the Google API')
        })
}