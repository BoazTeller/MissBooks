import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const CAR_KEY = 'carDB'
var gFilterBy = { txt: '', minSpeed: 0 }
_createCars()

export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getNextCarId,
    getFilterBy,
    setFilterBy
}

function query() {
    return storageService.query(CAR_KEY)
        .then(cars => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                cars = cars.filter(car => regex.test(car.vendor))
            }
            if (gFilterBy.minSpeed) {
                cars = cars.filter(car => car.maxSpeed >= gFilterBy.minSpeed)
            }
            return cars
        })
}

function get(carId) {
    return storageService.get(CAR_KEY, carId)
}

function remove(carId) {
    return storageService.remove(CAR_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(CAR_KEY, car)
    } else {
        return storageService.post(CAR_KEY, car)
    }
}

function getEmptyCar(vendor = '', maxSpeed = 0) {
    return { id: '', vendor, maxSpeed }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextCarId(carId) {
    return storageService.query(CAR_KEY)
        .then(cars => {
            let nextCarIdx = cars.findIndex(car => car.id === carId) + 1
            if (nextCarIdx === cars.length) nextCarIdx = 0
            return cars[nextCarIdx].id
        })
}

function _createCars() {
    let cars = utilService.loadFromStorage(CAR_KEY)
    if (!cars || !cars.length) {
        cars = []
        cars.push(_createCar('audu', 300))
        cars.push(_createCar('fiak', 120))
        cars.push(_createCar('subali', 100))
        cars.push(_createCar('mitsu', 150))
        utilService.saveToStorage(CAR_KEY, cars)
    }
}

function _createCar(vendor, maxSpeed = 250) {
    const car = getEmptyCar(vendor, maxSpeed)
    car.id = utilService.makeId()
    return car
}

function getEmptyBook() {
    return {
      title: '',
      description: '',
      thumbnail: utilService.getRandomImg(),
      listPrice: {
        amount: 0,
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.5 ? true : false,
      },
    }
  }
  

function _createBook(title, price) {
    const book = _getEmptyBook()
  
    book.id = utilService.makeId()
    book.title = title
    book.listPrice.amount = price
  
    book.subtitle = utilService.makeLorem(5)
    book.authors = ['Barbara Cartland'] // Demo data
    book.pageCount = 800 // Demo data
    book.language = 'en' // Demo data
    book.description = utilService.makeLorem(20)
    book.categories = ['Action', 'Romantic'] // Demo data
    return book
  }