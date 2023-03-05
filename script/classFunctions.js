class Storage {

    constructor() {
        this.finalProducts = {
            "bread": 0,
            "rohlik": 0,
            "bageta": 0,
            "croisant": 0,
            "makovnik": 0,
            "muffin": 0,
            "zemla": 0,
            "donut": 0,
            "siska": 0,
            "sendvic": 0
        }
        this.dough = {
            "bread": 0,
            "rohlik": 0,
            "bageta": 0,
            "croisant": 0,
            "makovnik": 0,
            "muffin": 0,
            "zemla": 0,
            "donut": 0,
            "siska": 0,
            "sendvic": 0
        }
        this.theTray = {
            "bread": 0,
            "rohlik": 0,
            "bageta": 0,
            "croisant": 0,
            "makovnik": 0,
            "muffin": 0,
            "zemla": 0,
            "donut": 0,
            "siska": 0,
            "sendvic": 0
        }
        this.overHeadCosts = {
            "electricity": 1000,
            "theRent": 1
        }
        this.money = 1000
        this.ingredients = {
            "flour": 0,
            "water": 0,
            "yeast": 0,
            "cumin": 0,
            "milk": 0,
            "oil": 0,
            "sugar": 0,
            "butter": 0,
            "eggs": 0,
            "poppy": 0,
            "chocolate": 0,
            "jam": 0
        }
    }

    addFinallProducts(item, howMany){
        this.finalProducts[item] += howMany
    }

    removeFinallProducts(item, howMany) {
        this.finalProducts[item] -= howMany
    }

    addDough(item, howMany) {
        this.dough[item] += howMany
    }

    removeDough(item, howMany) {
        this.dough[item] -= howMany
    }

    addTheTray(item, howMany) {
        this.theTray[item] += howMany
    }

    removeTheTray(item, howMany) {
        this.theTray[item] -= howMany
    }

    addOverheadCosts(item, howMany) {
        this.overHeadCosts[item] += howMany
    }

    removeOverheadCosts(item, howMany) {
        this.overHeadCosts[item] -= howMany
    }

    addIngredients(item, howMany) {
        this.ingredients[item] += howMany
    }

    removeIngredients(item, howMany) {
        this.ingredients[item] -= howMany
    }

    addMoney(howMany) {
        this.money += howMany.toFixed(2)
        render.preRenderMoney()
    }

    removeMoney(howMany) {
        this.money -= howMany.toFixed(2)
        render.preRenderMoney()
    }


}

class Machine {
    constructor(id, machineName, price, consumption, doAtOnce) {
        this.id = id;
        this.machineName = machineName;
        this.price = price;
        this.consumption = consumption;
        this.doAtOnce = doAtOnce;
        this.working = false;
    }
}

class Machines {

    constructor() {
        this.mixers = [];
        this.dispensers = [];
        this.owens = [] 
    }

    buyNewMixer(mixerName) {
        let newId = this.mixers.length + 1;
        let newMixer = new Machine(newId,
            basicData.machines[mixerName]['machineName'],
            basicData.machines[mixerName]['price'],
            basicData.machines[mixerName]['consuption'],
            basicData.machines[mixerName]['doAtOnce'],
        );
        this.mixers.push(newMixer);
        render.createMachineElement(mixerName);
    }

    sellMixer() {
        if (this.mixers.length > 0){
            this.mixers.pop();
        } else {
            console.log('Nemaš žiadne mixery');
        }
    }

    buyNewDispenser(dispenserName){
        let newId = this.dispensers.length + 1;
        let newDispenser = new Machine(newId,
            basicData.machines[dispenserName]['machineName'],
            basicData.machines[dispenserName]['price'],
            basicData.machines[dispenserName]['consuption'],
            basicData.machines[dispenserName]['doAtOnce'],
        );
        this.dispensers.push(newDispenser);
        render.createMachineElement(dispenserName);
    }

    sellDispenser() {
        if (this.dispensers.length > 0) {
            this.dispensers.pop();
        } else {
            console.log('Nemaš žiadne mixery');
        }
    }

    buyNewOwen(owenName) {
        let newId = this.owens.length + 1;
        let newOwen = new Machine(newId,
            basicData.machines[owenName]['machineName'],
            basicData.machines[owenName]['price'],
            basicData.machines[owenName]['consuption'],
            basicData.machines[owenName]['doAtOnce'],
        );
        this.owens.push(newOwen);
        render.createMachineElement(owenName);
    }

    sellOwen() {
        if (this.owens.length > 0) {
            this.owens.pop();
        } else {
            console.log('Nemaš žiadne mixery');
        }
    }
}


class Player {
    constructor(){
        this.prestige = 0;
    }

    setValueOfQuantity(){
        document.querySelectorAll('.buy-material').forEach(function (item) {
            let input = item.querySelector('input');
            input.value = 0;
            let plusBtn = item.querySelector('.plus-item');
            let minusBtn = item.querySelector('.minus-item');

            plusBtn.addEventListener('click', function () {
                input.value = parseInt(input.value) + 1;
                input.textContent = input.value;
            })

            minusBtn.addEventListener('click', function () {
                if (input.value > 0) {
                    input.value -= 1;
                    input.textContent = input.value;   
                }
            })  
        })
    }

    ingrdiensCheckMoney(item, count){
        let mustPay = basicData.ingredients[item]['price'] * count;
        if (storage.money >= mustPay){
            return mustPay;
            }
    }

    buyIngrediens(){
        const user = this;
        let buttonBuy = document.querySelectorAll('.buy-item-button');

        buttonBuy.forEach(function (btn) {
            btn.addEventListener('click', function () {
                let quantity = document.querySelector('input[name="' + btn.title + '"]');
                let mustPay = user.ingrdiensCheckMoney(btn.title, quantity.value);
                if (mustPay > 0) {
                    storage.removeMoney(mustPay)
                    storage.addIngredients(btn.title, parseInt(quantity.value))
                    render.preRenderIngredients(btn.title, storage.ingredients[btn.title])
                } else {
                    alert('!!!Nemaš dostatok peňazi alebo nič nekupuješ!!!')
                }
                quantity.value = 0;
                quantity.textContent = 0;
            })
        })  
    }

    overHeadCheckMoney(item, count) {
        let mustPay = basicData.overHeadCosts[item]['price'] * count;
        if (storage.money >= mustPay) {
            return mustPay;
        }
    }

    buyOverHeadCoast(){
        const user = this;
        let buttonBuy = document.querySelectorAll('.over-head-cost');
        
        buttonBuy.forEach(function (btn) {
            btn.addEventListener('click', function () {
                let quantity = document.querySelector('input[name="' + btn.title + '"]');
                let mustPay = user.overHeadCheckMoney(btn.title, quantity.value);
                if (mustPay > 0) {
                    storage.removeMoney(mustPay)
                    storage.addOverheadCosts(btn.title, parseInt(quantity.value))
                    render.preRenderIngredients(btn.title, storage.overHeadCosts[btn.title])
                } else {
                    alert('!!!Nemaš dostatok peňazi alebo nič nekupuješ!!!')
                }
                quantity.value = 0;
                quantity.textContent = 0;
            })
        })
    }
}

class Render{
    preRenderMoney(){
        document.querySelector('.many-and-prestige ul li .money').textContent = storage.money.toFixed(2);
    }

    createElement(element, className, text){
        let newElement = document.createElement(element);
        newElement.classList.add(className);
        newElement.textContent = text;
        return newElement
    }

    createMachineElement(machine){
        let mixers = document.querySelector(basicData.machines[machine]['position']);
        let machineBody = this.createElement('div', 'machine-body', '');
        machineBody.innerHTML = `<img src="${basicData.machines[machine]['img']}" alt="miesic200">
                            <div class="actual-doing">
                                <h4>${basicData.machines[machine]['machineName']}</h4>
                                <img src="img/products/bread.jpg">
                            </div>`

        let menu = this.createElement('div', 'menu', '');
        menu.innerHTML += `<li style="--i:0;">
                                    <a href='#'><img src="img/products/bread.jpg"></a>
                                </li>
                                <li style="--i:1;">
                                    <a href='#'><img src="img/products/rohlik.jpg"></a>
                                </li>
                                <li style="--i:2;">
                                    <a href='#'><img src="img/products/bageta.jpg"></a>
                                </li>
                                <li style="--i:3;">
                                    <a href='#'><img src="img/products/croisant.jpg"></a>
                                </li>
                                <li style="--i:4;">
                                    <a href='#'><img src="img/products/makovnik.jpg"></a>
                                </li>
                                <li style="--i:5;">
                                    <a href='#'><img src="img/products/muffin.jpg"></a>
                                </li>
                                <li style="--i:6;">
                                    <a href='#'><img src="img/products/zemla.jpg"></a>
                                </li>
                                <li style="--i:7;">
                                    <a href='#'><img src="img/products/donut.jpg"></a>
                                </li>
                                <li style="--i:8;">
                                    <a href='#'><img src="img/products/siska.jpg"></a>
                                </li>
                                <li style="--i:9;">
                                    <a href='#'><img src="img/products/sendvic.jpg"></a>
                                </li>`

        let toggle = this.createElement('div', 'toggle', 'Zvoľ produkt');
        toggle.addEventListener('click', function () {
            menu.classList.toggle('active');
        });
        menu.appendChild(toggle)
        machineBody.appendChild(menu)
        mixers.appendChild(machineBody)
    }

    preRenderIngredients(item, newValue){
        document.querySelectorAll('.' + item).forEach(function (item) {
            item.textContent = newValue
        });
    }

}

class BasicData {
    constructor(){
        this.machines = {
            'mixerSHM200':{
                'machineName': 'Mixer SHM 200',
                'price':250,
                'consuption': 200,
                'doAtOnce': 1,
                'img': 'img/machine/miesic/miesic200.jpg',
                'position': '.bakery-mixers'
            },
            'mixerSHM500': {
                'machineName': 'Mixer SHM 500',
                'price': 400,
                'consuption': 500,
                'doAtOnce': 2,
                'img': 'img/machine/miesic/miesic500.jpg',
                'position': '.bakery-mixers'
            },
            'mixerSHM1000': {
                'machineName': 'Mixer SHM 1000',
                'price': 650,
                'consuption': 700,
                'doAtOnce': 3,
                'img': 'img/machine/miesic/miesic1000.jpg',
                'position': '.bakery-mixers',
            },

            'dispenserDRC200': {
                'machineName': 'Davkovač DRC 200',
                'price': 250,
                'consuption': 150,
                'doAtOnce': 1,
                'img': 'img/machine/miesic/miesic200.jpg',
                'position': '.bakery-dispensers'
            },
            'dispenserDRC500': {
                'machineName': 'Davkovač DRC 500',
                'price': 400,
                'consuption': 400,
                'doAtOnce': 2,
                'img': 'img/machine/miesic/miesic500.jpg',
                'position': '.bakery-dispensers'
            },
            'dispenserDRC1000': {
                'machineName': 'Davkovač DRC 1000',
                'price': 650,
                'consuption': 550,
                'doAtOnce': 3,
                'img': 'img/machine/miesic/miesic1000.jpg',
                'position': '.bakery-dispensers'
            },
            
            'owenHLN200': {
                'machineName': 'Pec HLN 200',
                'price': 250,
                'consuption': 400,
                'doAtOnce': 1,
                'img': 'img/machine/miesic/miesic200.jpg',
                'position': '.bakery-owens'
            },
            'owenHLN500': {
                'machineName': 'Pec HLC 500',
                'price': 400,
                'consuption': 950,
                'doAtOnce': 2,
                'img': 'img/machine/miesic/miesic500.jpg',
                'position': '.bakery-owens'
            },
            'owenHLN1000': {
                'machineName': 'Pec HLN 1000',
                'price': 650,
                'consuption': 1400,
                'doAtOnce': 3,
                'img': 'img/machine/miesic/miesic500.jpg',
                'position': '.bakery-owens',
            },
        }
        this.ingredients = {
            "flour": {
                'price': 0.8,
                'quantity': 1
            },
            "water": {
                'price': 0.1,
                'quantity': 1
            },
            "yeast": {
                'price': 0.4,
                'quantity': 40
            },
            "cumin": {
                'price': 0.2,
                'quantity': 10
            },
            "milk": {
                'price': 0.65,
                'quantity': 1
            },
            "oil": {
                'price': 2,
                'quantity': 1
            },
            "sugar": {
                'price': 0.5,
                'quantity': 1
            },
            "butter": {
                'price': 2.1,
                'quantity': 250
            },
            "eggs": {
                'price': 0.2,
                'quantity': 1
            },
            "poppy": {
                'price': 1.8,
                'quantity': 500
            },
            "chocolate": {
                'price': 1.7,
                'quantity': 250
            },
            "jam": {
                'price': 2.35,
                'quantity': 400
            },
        }
        this.overHeadCosts = {
            'electricity': {
                'price': 0.3,
                'quantity': 1000
            },
            'theRent':{
                'price': 0.5,
                'quantity': 10
            }
        }
    }
}

const consumptionTheRent = function () {
    let lastTime = 3;
    setInterval(() => {
        let rent = storage.overHeadCosts['theRent']
        rent = rent - (1 / 60 / 10);
        storage.overHeadCosts['theRent'] = rent;
        render.preRenderIngredients('theRent', (Math.floor(rent) + 1));
        if (rent < 0){
            lastTime = lastTime - (1 / 60 / 10);
            document.querySelector('.overhead-costs ul li:last-child').innerHTML = `Budete vystahovany za: ${Math.floor(lastTime) + 1} min`
            document.querySelector('.overhead-costs ul li:last-child').style.color = 'red';
        } else {
            document.querySelector('.overhead-costs ul li:last-child').innerHTML = `Nájom: vyprši za: <span class="theRent">${Math.floor(rent) + 1}</span> min`
            document.querySelector('.overhead-costs ul li:last-child').style.color = 'white';
            lastTime = 3
        }
        console.log('rent', storage.overHeadCosts['theRent'])
    }, 100);
}


let storage = new Storage();
let machines = new Machines();
let basicData = new BasicData();
let render = new Render();
let player = new Player();













