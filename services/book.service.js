import { getDemoBooks } from './book-demo-data.js'
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    addGoogleBook,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            books = _getFilteredBooks(books, filterBy)
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function addGoogleBook(googleBook) {
    console.log(googleBook)
    return query()  
        .then(books => {
            const isBookExists = books.some(b => b.id === googleBook.id)
            if (isBookExists) {
                throw new Error('Book already exists')
            }

            const preparedBook = prepareBookData(googleBook)
            return storageService.post(BOOK_KEY, preparedBook)
        })
}

function _getFilteredBooks(books, filterBy) {
    if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        books = books.filter(book => regExp.test(book.title))
    }
    if (filterBy.maxPrice) {
        books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
    }
    if (filterBy.minPrice) {
        books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
    }
    if (filterBy.category) {
        books = books.filter(book => book.categories.includes(filterBy.category))
    }
    if (filterBy.isOnSale) {
        books = books.filter(book => book.listPrice.isOnSale)
    }

    return books
}

function getDefaultFilter() {
    return {
        title: '',
        maxPrice: 0
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = getDemoBooks()
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function prepareBookData(bookRawData) {
    const { volumeInfo: bookInfo, id } = bookRawData

    return {
        id: id || '',
        title: bookInfo.title || '',
        subtitle: bookInfo.subtitle || '',
        authors: bookInfo.authors || [],
        publishedDate: bookInfo.publishedDate ? 
            bookInfo.publishedDate.slice(0, 4) : '',
        description: bookInfo.description || '',
        pageCount: bookInfo.pageCount || 0,
        categories: bookInfo.categories || [],
        thumbnail: bookInfo.imageLinks ? 
            bookInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150x150',
        language: bookInfo.language || '',
        listPrice: {
            amount: utilService.getRandomIntInclusive(10, 500), 
            currencyCode: 'USD', 
            isOnSale: Math.random() < 0.25
        }
    }
}

function getEmptyBook() {
    return {
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: new Date().getFullYear(), 
        pageCount: 0,
        categories: [],
        thumbnail: 'https://via.placeholder.com/150', 
        language: 'en',
        listPrice: {
            amount: 0,
            currencyCode: 'EUR', 
            isOnSale: false
        }
    }
}