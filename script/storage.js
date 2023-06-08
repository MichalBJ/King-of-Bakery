import render from "./render.js";

class Storage {

    constructor() {
        this.allProducts = {
            "finalProduct": {
                "chlieb": 0,
                "rohlik": 0,
                "bageta": 0,
                "croissant": 0,
                "makovnik": 0,
                "muffin": 0,
                "zemla": 0,
                "donut": 0,
                "siska": 0,
                "toast": 0
            },
            "dough": {
                "chlieb": 0,
                "rohlik": 0,
                "bageta": 0,
                "croissant": 0,
                "makovnik": 0,
                "muffin": 0,
                "zemla": 0,
                "donut": 0,
                "siska": 0,
                "toast": 0
            },
            "theTray": {
                "chlieb": 0,
                "rohlik": 0,
                "bageta": 0,
                "croissant": 0,
                "makovnik": 0,
                "muffin": 0,
                "zemla": 0,
                "donut": 0,
                "siska": 0,
                "toast": 0
            }
        }

        this.overHeadCosts = {
            "electricity": 6000,
            "theRent": 20
        }
        this.money = 0
        this.ingredients = {
            "flour": 13.8,
            "water": 9,
            "yeast": 360,
            "cumin": 360,
            "milk": 1.4,
            "oil": 0.8,
            "sugar": 0.14,
            "butter": 0,
            "eggs": 0,
            "poppy": 0,
            "chocolate": 0,
            "jam": 0
        }
    }

    addFinallProducts(item, howMany) {
        const typeToRender = 'finalProduct';
        this.allProducts['finalProduct'][item] += howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    removeFinallProducts(item, howMany) {
        const typeToRender = 'finalProduct';
        this.allProducts['finalProduct'][item] -= howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    addDough(item, howMany) {
        const typeToRender = 'dough'
        this.allProducts['dough'][item] += howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    removeDough(item, howMany) {
        const typeToRender = 'dough'
        this.allProducts['dough'][item] -= howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    addTheTray(item, howMany) {
        const typeToRender = 'theTray';
        this.allProducts['theTray'][item] += howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    removeTheTray(item, howMany) {
        const typeToRender = 'theTray';
        this.allProducts['theTray'][item] -= howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    addOverheadCosts(item, howMany) {
        this.overHeadCosts[item] += howMany;
        render.preRenderIngredients(item, this.overHeadCosts[item])
    }

    removeOverheadCosts(item, howMany) {
        this.overHeadCosts[item] -= howMany
        render.preRenderIngredients(item, this.overHeadCosts[item])
    }

    addIngredients(item, howMany) {
        this.ingredients[item] += howMany
        render.preRenderIngredients(item, this.ingredients[item])
    }

    removeIngredients(item, howMany) {
        this.ingredients[item] -= howMany
        render.preRenderIngredients(item, this.ingredients[item])
    }

    addMoney(howMany) {
        this.money += howMany
        render.preRenderMoney()
    }

    removeMoney(howMany) {
        this.money -= howMany
        render.preRenderMoney()
    }


}

let storage = new Storage();

export default storage;