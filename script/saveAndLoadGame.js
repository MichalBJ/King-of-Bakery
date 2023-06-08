import createProduct from "./createProduct.js";
import customers from "./customers.js";
import setGameDifficulty from "./gameDifficulty.js";
import machines from "./machines.js";
import player from "./player.js";
import render from "./render.js";
import storage from "./storage.js";

class SaveAndLoadGame {
    saveGame() {
        let saveStorage = JSON.stringify(storage)
        let savePlayer = JSON.stringify(player)
        let saveMachines = JSON.stringify(machines)
        let saveCustomers = JSON.stringify(customers)
        let saveGameDificulty = JSON.stringify(setGameDifficulty)
        let saveCreateProduct = JSON.stringify(createProduct)

        localStorage.setItem('saveStorage', saveStorage)
        localStorage.setItem('savePlayer', savePlayer)
        localStorage.setItem('saveMachines', saveMachines)
        localStorage.setItem('saveCustomers', saveCustomers)
        localStorage.setItem('saveGameDificulty', saveGameDificulty)
        localStorage.setItem('saveCreateProduct', saveCreateProduct)

        render.saveSuccesAlert()
    }

    loadGame() {
        let loadStorage = JSON.parse(localStorage.getItem('saveStorage'))
        let loadPlayer = JSON.parse(localStorage.getItem('savePlayer'))
        let loadMachines = JSON.parse(localStorage.getItem('saveMachines'))
        let loadCustomers = JSON.parse(localStorage.getItem('saveCustomers'))
        let loadGameDificulty = JSON.parse(localStorage.getItem('saveGameDificulty'))
        let loadCreateProduct = JSON.parse(localStorage.getItem('saveCreateProduct'))

        for (let i = 0; i < Object.keys(storage).length; i++) {
            storage[Object.keys(storage)[i]] = loadStorage[Object.keys(loadStorage)[i]]
        }

        for (let i = 0; i < Object.keys(player).length; i++) {
            player[Object.keys(player)[i]] = loadPlayer[Object.keys(loadPlayer)[i]]
        }

        for (let i = 0; i < Object.keys(machines).length; i++) {
            machines[Object.keys(machines)[i]] = loadMachines[Object.keys(loadMachines)[i]]
        }

        for (let i = 0; i < Object.keys(customers).length; i++) {
            customers[Object.keys(customers)[i]] = loadCustomers[Object.keys(loadCustomers)[i]]
        }

        for (let i = 0; i < Object.keys(setGameDifficulty).length; i++) {
            setGameDifficulty[Object.keys(setGameDifficulty)[i]] = loadGameDificulty[Object.keys(loadGameDificulty)[i]]
        }

        for (let i = 0; i < Object.keys(createProduct).length; i++) {
            createProduct[Object.keys(createProduct)[i]] = loadCreateProduct[Object.keys(loadCreateProduct)[i]]
        }

        for (let i = 0; i < Object.keys(storage.allProducts).length; i++) {
            let section = Object.keys(storage.allProducts)[i]
            for (let a = 0; a < Object.keys(storage.allProducts[section]).length; a++) {
                render.preRenderProductOnInfoPanel(Object.keys(storage.allProducts[section])[a], section)
            }
        }

        render.preRenderIngredients(Object.keys(storage.overHeadCosts)[0], storage.overHeadCosts[Object.keys(storage.overHeadCosts)[0]])
        render.preRenderIngredients(Object.keys(storage.overHeadCosts)[1], storage.overHeadCosts[Object.keys(storage.overHeadCosts)[1]])
        render.preRenderMoney()

        for (let i = 0; i < Object.keys(storage.ingredients).length; i++) {
            let item = Object.keys(storage.ingredients)[i]
            let value = storage.ingredients[Object.keys(storage.ingredients)[i]]
            render.preRenderIngredients(item, value)
        }

        for (let i = 0; i < machines.machines.length; i++) {
            render.createMachineElement(machines.machines[i].industryName, machines.machines[i].id)
        }

        for (let i = 0; i < customers.customers.length; i++) {
            render.createHtmlElementsForCustomer(customers.customers[i])
        }
    }
}

let saveAndLoadGame = new SaveAndLoadGame();

export default saveAndLoadGame;