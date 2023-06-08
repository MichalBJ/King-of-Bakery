import basicData from "./basicData.js";
import setGameDifficulty from "./gameDifficulty.js";
import player from "./player.js";
import render from "./render.js";
import storage from "./storage.js";

class Customer {
    constructor(id, name, foto, wanted, payMoney) {
        this.id = id
        this.name = name
        this.foto = foto
        this.wanted = wanted
        this.payMoney = payMoney
        this.timeRemaining = 60
        this.waiting = true
    }
}

class Customers {
    constructor() {
        this.customers = []
        this.timeToNewCustomer = 320
        this.gender = 0
        this.items = {}
        this.price = 0
        this.lastManName = -1
        this.lastManFoto = -1
        this.lastWomanName = -1
        this.lastWomanFoto = -1
        this.allReceptsHaveToHave = ['chlieb', 'rohlik', 'bageta']
    }

    randomNumberGenerator(range) {
        return Math.floor(Math.random() * range)
    }

    genderGenerator() {
        this.gender = this.randomNumberGenerator(2)
    }

    howManyPiecesGenerator(item) {
        let pieces = 0
        let val = this.randomNumberGenerator(100);
        if (basicData.recepts[item]['numberOfPieces'] < 9) {
            if (val < 60) {
                pieces = this.randomNumberGenerator((basicData.recepts[item]['numberOfPieces'] / 2) - 1) + 1
            } else if (val >= 60 && val <= 85) {
                pieces = this.randomNumberGenerator((basicData.recepts[item]['numberOfPieces'] / 2) + setGameDifficulty.productRangeGroupA) + 1
            } else if (val >= 86 && val <= 97) {
                pieces = this.randomNumberGenerator(basicData.recepts[item]['numberOfPieces'] + setGameDifficulty.productRangeGroupA) + 1
            } else if (val >= 98) {
                pieces = this.randomNumberGenerator(basicData.recepts[item]['numberOfPieces'] + setGameDifficulty.productRangeGroupA) + 1
            }
        } else {
            if (val < 60) {
                pieces = this.randomNumberGenerator((basicData.recepts[item]['numberOfPieces'] / 2) - 2) + 1
            } else if (val >= 60 && val <= 85) {
                pieces = this.randomNumberGenerator(basicData.recepts[item]['numberOfPieces'] / 2) + setGameDifficulty.productRangeGroupB
            } else if (val >= 86 && val <= 97) {
                pieces = this.randomNumberGenerator((basicData.recepts[item]['numberOfPieces'] / 2) + Math.floor(basicData.recepts[item]['numberOfPieces'] / 4)) + setGameDifficulty.productRangeGroupB
            } else if (val >= 98) {
                pieces = this.randomNumberGenerator(basicData.recepts[item]['numberOfPieces']) + setGameDifficulty.productRangeGroupB
            }
        }
        return pieces
    }

    setName() {
        let name = ''
        if (this.gender === 0) {
            if (this.lastManName === basicData.menName.length - 1) {
                this.lastManName = 0
                name = basicData.menName[this.lastManName]
            } else {
                this.lastManName += 1
                name = basicData.menName[this.lastManName]
            }
        } else {
            if (this.lastWomanName === basicData.womenName.length - 1) {
                this.lastWomanName = 0
                name = basicData.womenName[this.lastWomanName]
            } else {
                this.lastWomanName += 1
                name = basicData.womenName[this.lastWomanName]
            }
        }
        return name
    }

    setFoto() {
        let foto = ''
        if (this.gender === 0) {
            if (this.lastManFoto === basicData.menFoto.length - 1) {
                this.lastManFoto = 0
                foto = basicData.menFoto[this.lastManFoto]
            } else {
                this.lastManFoto += 1
                foto = basicData.menFoto[this.lastManFoto]
            }
        } else {
            if (this.lastWomanFoto === basicData.womenFoto.length - 1) {
                this.lastWomanFoto = 0
                foto = basicData.womenFoto[this.lastWomanFoto]
            } else {
                this.lastWomanFoto += 1
                foto = basicData.womenFoto[this.lastWomanFoto]
            }
        }

        return foto
    }

    createOrder() {
        let allRecepts = [...this.allReceptsHaveToHave]
        let countRequests = 0

        if (allRecepts.length < 6) {
            countRequests = allRecepts.length
        } else {
            countRequests = 6
        }

        const howManyProducts = this.randomNumberGenerator(countRequests) + 1
        this.items = {}

        for (let i = 0; i < howManyProducts; i++) {
            const newItem = allRecepts[this.randomNumberGenerator(allRecepts.length)]
            const numberOfItem = this.howManyPiecesGenerator(newItem)
            allRecepts.splice(allRecepts.findIndex(item => item === newItem), 1)
            this.items[newItem] = numberOfItem
        }
        return this.items
    }

    setOrderPrice() {
        this.price = 0
        for (let property in this.items) {
            this.price += (basicData.recepts[property]['priceOfOnePiece'] * this.items[property])
        }
        return this.price
    }

    addNewCustomer() {
        basicData.idGenerator();
        this.genderGenerator();
        const newCustomer = new Customer(basicData.id, this.setName(), this.setFoto(), this.createOrder(), this.setOrderPrice())
        this.customers.push(newCustomer)
        render.createHtmlElementsForCustomer(this.customers.at(-1))
    }

    howManyCustomersAtOnce() {
        const percent = this.randomNumberGenerator(100)
        let count = 1
        if (percent < setGameDifficulty.chanceTwoCustomers) {
            count = 1
        } else if (percent >= setGameDifficulty.chanceTwoCustomers && percent < setGameDifficulty.chanceThreeCustomers) {
            count = 2
        } else if (percent >= setGameDifficulty.chanceThreeCustomers && percent < setGameDifficulty.chanceFourCustomers) {
            count = 3
        } else if (percent >= setGameDifficulty.chanceFourCustomers)
            count = 4
        return count
    }

    timeGenerator() {
        let time = this.randomNumberGenerator(setGameDifficulty.rangeTime) + setGameDifficulty.minTime
        return time
    }

    timerToNewCustomer() {
        if (this.timeToNewCustomer === 0) {
            const howManyCustomers = this.howManyCustomersAtOnce()
            for (let i = 0; i < howManyCustomers; i++) {
                this.addNewCustomer()
            }
            this.timeToNewCustomer = this.timeGenerator()
            render.newCustomerAlertElement()
        } else {
            this.timeToNewCustomer -= 1
        }
        document.querySelector('.timer-minutes').textContent = ('0' + Math.floor(this.timeToNewCustomer / 60)).slice(-2)
        document.querySelector('.timer-sekundes').textContent = ('0' + this.timeToNewCustomer % 60).slice(-2)
    }

    removeCustomers(customerID) {
        let customer = document.getElementById(customerID)
        while (customer.hasChildNodes()) {
            customer.removeChild(customer.firstChild)
        }
        customer.remove()
        let customerIndex = customers.customers.findIndex(item => item.id === customerID)
        customers.customers.splice(customerIndex, 1)
    }

    customerLife() {
        let wasDelete = false
        for (let i = 0; i < customers.customers.length; i++) {
            if (wasDelete) {
                i -= 1
                wasDelete = false
            }
            let customerElement = document.getElementById(customers.customers[i].id)
            customerElement.querySelector('.time-leave span').textContent = customers.customers[i].timeRemaining
            if (customers.customers[i].timeRemaining > 0) {
                customers.customers[i].timeRemaining -= 1
                for (let a = 0; a < Object.keys(customers.customers[i].wanted).length; a++) {
                    let nameItem = Object.keys(customers.customers[i].wanted)[a]
                    let countItem = customers.customers[i].wanted[Object.keys(customers.customers[i].wanted)[a]]
                    if (countItem > storage.allProducts['finalProduct'][nameItem]) {
                        customerElement.querySelector('.wanted-' + nameItem).style.color = 'red';
                    } else {
                        customerElement.querySelector('.wanted-' + nameItem).style.color = 'white';
                    }
                }
            } else {
                wasDelete = true
                this.removeCustomers(customers.customers[i].id)
                player.removePrestige(1)
            }
        }
    }

    checkIfHaveAll(index) {
        let permission = false
        for (let i = 0; i < Object.keys(customers.customers[index].wanted).length; i++) {
            let nameItem = Object.keys(customers.customers[index].wanted)[i]
            let countItem = customers.customers[index].wanted[Object.keys(customers.customers[index].wanted)[i]]
            if (storage.allProducts['finalProduct'][nameItem] >= countItem) {
                permission = true
            } else {
                permission = false
                break
            }
        }
        return permission
    }

    howManyPrestigeGet(index) {
        const time = customers.customers[index].timeRemaining
        if (time > 50) {
            player.addPrestige(3)
        } else if (time <= 50 && time > 20) {
            player.addPrestige(2)
        } else {
            player.addPrestige(1)
        }
    }

    deleteSoldProducts(index) {
        for (let i = 0; i < Object.keys(customers.customers[index].wanted).length; i++) {
            let nameItem = Object.keys(customers.customers[index].wanted)[i]
            let countItem = customers.customers[index].wanted[Object.keys(customers.customers[index].wanted)[i]]
            storage.removeFinallProducts(nameItem, countItem)
        }
    }

    selProducts(customerID) {
        const customerIndex = customers.customers.findIndex(value => value.id === customerID)
        if (this.checkIfHaveAll(customerIndex)) {
            storage.addMoney(customers.customers[customerIndex].payMoney)
            this.howManyPrestigeGet(customerIndex)
            this.deleteSoldProducts(customerIndex)
            this.removeCustomers(customerID)
        } else {
            alert('Niečo ti chyba!!!')
        }
    }
}

let customers = new Customers();

export default customers;