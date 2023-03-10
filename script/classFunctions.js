class Storage {

    constructor() {
        this.allProducts = {
            "finalProduct": {
                "bread": 0,
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
                "bread": 0,
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
                "bread": 0,
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
            "electricity": 1000,
            "theRent": 1
        }
        this.money = 3000
        this.ingredients = {
            "flour": 1000,
            "water": 1000,
            "yeast": 1000,
            "cumin": 1000,
            "milk": 1000,
            "oil": 1000,
            "sugar": 1000,
            "butter": 1000,
            "eggs": 1000,
            "poppy": 1000,
            "chocolate": 1000,
            "jam": 1000
        }
    }

    addFinallProducts(item, howMany){
        this.allProducts['finalProduct'][item] += howMany
    }

    removeFinallProducts(item, howMany) {
        this.allProducts['finalProduct'][item] -= howMany
    }

    addDough(item, howMany){
        this.allProducts['dough'][item] += howMany
    }

    removeDough(item, howMany) {
        this.allProducts['dough'][item] -= howMany
    }

    addTheTray(item, howMany) {
        this.allProducts['theTray'][item] += howMany
    }

    removeTheTray(item, howMany) {
        this.allProducts['theTray'][item] -= howMany
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
        this.money += howMany.toFixed(2)
        render.preRenderMoney()
    }

    removeMoney(howMany) {
        this.money -= howMany.toFixed(2)
        render.preRenderMoney()
    }


}

class Machine {
    constructor(id, machineName, price, consumption, doAtOnce, producting, activity) {
        this.id = id;
        this.machineName = machineName;
        this.price = price;
        this.consumption = consumption;
        this.doAtOnce = doAtOnce;
        this.producting = producting;
        this.activity = activity;
        this.working = false;
        this.create = '';
        this.finishTime = 0;
        this.progresLineWidth = 0
    }
}

class Machines {

    constructor() {
        this.machines = []; 
    }

    buyNewMixer(mixerName) {
        basicData.idGenerator();
        let newId = basicData.id;
        let newMixer = new Machine(newId,
            basicData.machines[mixerName]['machineName'],
            basicData.machines[mixerName]['price'],
            basicData.machines[mixerName]['consuption'],
            basicData.machines[mixerName]['doAtOnce'],
            'dough',
            'kneading'
        );
        this.machines.push(newMixer);
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
        basicData.idGenerator();
        let newId = basicData.id;
        let newDispenser = new Machine(newId,
            basicData.machines[dispenserName]['machineName'],
            basicData.machines[dispenserName]['price'],
            basicData.machines[dispenserName]['consuption'],
            basicData.machines[dispenserName]['doAtOnce'],
            'theTray',
            'dosing'
        )
        this.machines.push(newDispenser);
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
        basicData.idGenerator();
        let newId = basicData.id;
        let newOwen = new Machine(newId,
            basicData.machines[owenName]['machineName'],
            basicData.machines[owenName]['price'],
            basicData.machines[owenName]['consuption'],
            basicData.machines[owenName]['doAtOnce'],
            'finalProduct',
            'baking'
        );
        this.machines.push(newOwen);
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
                    storage.addIngredients(btn.title, parseInt(quantity.value) * basicData.ingredients[btn.title]['quantity'])
                    
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
                    storage.addOverheadCosts(btn.title, parseInt(quantity.value) * basicData.overHeadCosts[btn.title]['quantity'])
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
        machineBody.id = basicData.id;
        let menu = this.createElement('div', 'menu', '');
        let li0 = this.createElement('li', 'none', '');
        let li1 = this.createElement('li', 'none', '');
        let li2 = this.createElement('li', 'none', '');
        let li3 = this.createElement('li', 'none', '');
        let li4 = this.createElement('li', 'none', '');
        let li5 = this.createElement('li', 'none', '');
        let li6 = this.createElement('li', 'none', '');
        let li7 = this.createElement('li', 'none', '');
        let li8 = this.createElement('li', 'none', '');
        let li9 = this.createElement('li', 'none', '');
        let a0 = this.createElement('a', basicData.id, '');
        let a1 = this.createElement('a', basicData.id, '');
        let a2 = this.createElement('a', basicData.id, '');
        let a3 = this.createElement('a', basicData.id, '');
        let a4 = this.createElement('a', basicData.id, '');
        let a5 = this.createElement('a', basicData.id, '');
        let a6 = this.createElement('a', basicData.id, '');
        let a7 = this.createElement('a', basicData.id, '');
        let a8 = this.createElement('a', basicData.id, '');
        let a9 = this.createElement('a', basicData.id, '');
        let img0 = this.createElement('img', 'none', '');
        let img1 = this.createElement('img', 'none', '');
        let img2 = this.createElement('img', 'none', '');
        let img3 = this.createElement('img', 'none', '');
        let img4 = this.createElement('img', 'none', '');
        let img5 = this.createElement('img', 'none', '');
        let img6 = this.createElement('img', 'none', '');
        let img7 = this.createElement('img', 'none', '');
        let img8 = this.createElement('img', 'none', '');
        let img9 = this.createElement('img', 'none', '');
        let buttonCreate = this.createElement('button', basicData.id, 'VYROBIŤ');
        let progresBar = this.createElement('div', 'progres-bar', '');
        let cas = this.createElement('div', 'cas', 'TIME');
        let span1 = this.createElement('span', 'time', '10');
        let span2 = this.createElement('span', 'none', 's');
        let progresLine = this.createElement('div', 'line', '');
        buttonCreate.type = 'button';
        li0.style = "--i:0;";
        li1.style = "--i:1;";
        li2.style = "--i:2;";
        li3.style = "--i:3;";
        li4.style = "--i:4;";
        li5.style = "--i:5;";
        li6.style = "--i:6;";
        li7.style = "--i:7;";
        li8.style = "--i:8;";
        li9.style = "--i:9;"; 
        a0.href = '#';
        a1.href = '#';
        a2.href = '#';
        a3.href = '#';
        a4.href = '#';
        a5.href = '#';
        a6.href = '#';
        a7.href = '#';
        a8.href = '#';
        a9.href = '#';
        a0.title = 'bread';
        a1.title = 'rohlik';
        a2.title = 'bageta';
        a3.title = 'zemla';
        a4.title = 'croissant';
        a5.title = 'makovnik';
        a6.title = 'donut';
        a7.title = 'toast';
        a8.title = 'siska';
        a9.title = 'muffin';

        img0.src = "img/products/bread.jpg";
        img1.src = "img/products/rohlik.jpg";
        img2.src = "img/products/bageta.jpg";
        img3.src = "img/products/zemla.jpg";
        img4.src = "img/products/croisant.jpg";
        img5.src = "img/products/makovnik.jpg";
        img6.src = "img/products/donut.jpg";
        img7.src = "img/products/sendvic.jpg";
        img8.src = "img/products/siska.jpg";
        img9.src = "img/products/muffin.jpg";

        a0.addEventListener('click', function () {
            createProduct.selectItemToMade(a0); 
        })

        a1.addEventListener('click', function () {
            createProduct.selectItemToMade(a1);
        })

        a2.addEventListener('click', function () {
            createProduct.selectItemToMade(a2);
        })

        a3.addEventListener('click', function () {
            createProduct.selectItemToMade(a3);
        })

        a4.addEventListener('click', function () {
            createProduct.selectItemToMade(a4);
        })

        a5.addEventListener('click', function () {
            createProduct.selectItemToMade(a5);
        })

        a6.addEventListener('click', function () {
            createProduct.selectItemToMade(a6);
        })

        a7.addEventListener('click', function () {
            createProduct.selectItemToMade(a7);
        })

        a8.addEventListener('click', function () {
            createProduct.selectItemToMade(a8);
        })

        a9.addEventListener('click', function () {
            createProduct.selectItemToMade(a9);
        })

        buttonCreate.addEventListener('click', function () {
            createProduct.setProductToMake(machineBody.id)
        })

        let toggle = this.createElement('div', 'toggle', 'Zvoľ produkt');

        toggle.addEventListener('click', function () {
            if (machines.machines.find(val => val.id === machineBody.id).working === false){
               menu.classList.toggle('active'); 
            }   
        });

        cas.appendChild(span1);
        cas.appendChild(span2);
        progresBar.appendChild(cas);
        progresBar.appendChild(progresLine);
        a0.appendChild(img0);
        a1.appendChild(img1);
        a2.appendChild(img2);
        a3.appendChild(img3);
        a4.appendChild(img4);
        a5.appendChild(img5);
        a6.appendChild(img6);
        a7.appendChild(img7);
        a8.appendChild(img8);
        a9.appendChild(img9);
        li0.appendChild(a0);
        li1.appendChild(a1);
        li2.appendChild(a2);
        li3.appendChild(a3);
        li4.appendChild(a4);
        li5.appendChild(a5);
        li6.appendChild(a6);
        li7.appendChild(a7);
        li8.appendChild(a8);
        li9.appendChild(a9);
        menu.appendChild(li0);
        menu.appendChild(li1);
        menu.appendChild(li2);
        menu.appendChild(li3);
        menu.appendChild(li4);
        menu.appendChild(li5);
        menu.appendChild(li6);
        menu.appendChild(li7);
        menu.appendChild(li8);
        menu.appendChild(li9);
        menu.appendChild(toggle)
        machineBody.appendChild(progresBar)
        machineBody.appendChild(buttonCreate)
        machineBody.appendChild(menu)
        mixers.appendChild(machineBody)
    }

    preRenderIngredients(item, newValue){
        document.querySelectorAll('.' + item).forEach(function (item) {
            item.textContent = newValue
        });
    }

    preRenderProductOnInfoPanel(i){
        document.querySelector('.' + machines.machines[i].producting + '-' + machines.machines[i].create).textContent = storage.allProducts[machines.machines[i].producting][machines.machines[i].create]
    }
}

class BasicData {
    constructor(){
        this.id;
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
                'quantity': 1
            }
        }
        this.recepts = {
            'bread': {
                'flour': 3,
                'water': 2.4,
                'cumin': 120,
                'yeast': 60,
                'kneading': 10,
                'dosing': 30,
                'baking': 90,
                'numberOfPieces': 6,
                'priceOfOnePiece': 1,
                'img': 'img/products/bread.jpg'
            },
            'rohlik':{
                'flour': 3,
                'milk': 0.4,
                'oil': 0.2,
                'yeast': 20,
                'kneading': 45,
                'dosing': 90,
                'baking': 90,
                'numberOfPieces': 16,
                'priceOfOnePiece': 1,
                'img': 'img/products/rohlik.jpg',
            },
            'bageta':{
                'flour': 1,
                'water': 0.6,
                'sugar': 0.04,
                'yeast': 40,
                'kneading': 60,
                'dosing': 60,
                'baking': 90,
                'numberOfPieces': 8,
                'priceOfOnePiece': 1,
                'img': 'img/products/bageta.jpg'
            },
            'zemla': {
                'flour': 0.75,  
                'butter': 75,
                'milk': 0.38,
                'yeast': 20,
                'kneading': 60,
                'dosing': 90,
                'baking': 60,
                'numberOfPieces': 12,
                'priceOfOnePiece': 1,
                'img': 'img/products/zemla.jpg'
            },
            'croissant': {
                'flour': 0.5,
                'milk': 0.5,
                'sugar': 0.05,
                'butter': 400,
                'eggs': 1,
                'yeast': 15,
                'kneading': 60,
                'dosing': 90,
                'baking': 60,
                'numberOfPieces': 12,
                'priceOfOnePiece': 1,
                'img': 'img/products/croisant.jpg'
            },
            'makovnik': {
                'flour': 2,
                'eggs': 12,
                'milk': 2.4,
                'sugar': 1.7,
                'poppy': 1700,
                'butter': 640,
                'kneading': 120,
                'dosing': 60,
                'baking': 90,
                'numberOfPieces': 8,
                'priceOfOnePiece': 1,
                'img': 'img/products/makovnik.jpg'
            },
            'donut': {
                'flour': 0.75,
                'butter': 180,
                'eggs': 5,
                'milk': 0.38,
                'sugar': 0.08,
                'yeast': 60,
                'chocolate': 230,
                'kneading': 120,
                'dosing': 90,
                'baking': 60,
                'numberOfPieces': 12,
                'priceOfOnePiece': 1,
                'img': 'img/products/donut.jpg'
            },
            'toast': {
                'flour': 3,
                'butter': 180,
                'water': 1.8,
                'eggs': 6,
                'yeast': 120,
                'kneading': 90,
                'dosing': 90,
                'baking': 60,
                'numberOfPieces': 6,
                'priceOfOnePiece': 1,
                'img': 'img/products/sendvic.jpg'
            },
            'siska': {
                'flour': 0.5,
                'eggs': 3,
                'milk': 0.3,
                'sugar': 0.08,
                'yeast': 20,
                'jam': 500,
                'kneading': 90,
                'dosing': 90,
                'baking': 60,
                'numberOfPieces': 12,
                'priceOfOnePiece': 1,
                'img': 'img/products/siska.jpg'
            },
            'muffin':{
                'flour': 0.5,
                'sugar': 0.2,
                'chocolate': 250,
                'eggs': 1,
                'oil': 0.2,
                'milk': 0.25,
                'kneading': 120,
                'dosing': 90,
                'baking': 60,
                'numberOfPieces': 12,
                'priceOfOnePiece': 1,
                'img': 'img/products/muffin.jpg'
            }
        }
    }

    idGenerator() {
        this.id = uuidv4();
    }
}

class CreateProduct {

    selectItemToMade(par){
        let machineElement = document.getElementById(par.className);
        let img = machineElement.querySelector('.actual-doing img');
        let h4 = machineElement.querySelector('.actual-doing h4');
        let menu = machineElement.querySelector('.menu');

        machines.machines.find(val => val.id === par.className).create = par.title
    
        img.src = basicData.recepts[par.title]['img'];
        img.style.display = 'block';
        h4.style.display = 'none';
        menu.classList.toggle('active');             
    }

    switchImageText(id){
        document.querySelector('[id="' + id + '"] .actual-doing img').style.display = 'none'
        document.querySelector('[id="' + id + '"] .actual-doing h4').style.display = 'block'
    }

    checkIngrediensForDough(machine){
        let permission = false;
        for (const property in basicData.recepts[machine.create]) {
            if (property === 'kneading') {
                break
            }

            if (storage.ingredients[property] > (basicData.recepts[machine.create][property] * machine.doAtOnce)) {
                permission = true
            } else {
                permission = false
                alert('Maš nedostatok: ' + property)
                break
            }
        }

        if (permission){
            const electricity = machine.consumption * (basicData.recepts[machine.create]['kneading'] / 60)

            if (storage.overHeadCosts['electricity'] > electricity) {
                permission = true;
            } else {
                permission = false;
                alert('Nemaš dostatok elektriky')
            }
        }
        return permission
    }

    checkDoughForTheTray(machine){
        if(storage.allProducts['dough'][machine.create] > 0) {
            return true
        }
    }

    setProductToMake(machineId) {
        const machine = machines.machines.find(val => val.id === machineId);

        console.log('meno pristroja', machine.machineName);
        console.log('chcem vyrobit', machine.create); // vyrobok
        console.log('ktora cast produktu', machine.producting); // typ

        if (machine.producting === 'dough') {
            if (this.checkIngrediensForDough(machine)) {
                console.log('mozem?', this.checkIngrediensForDough(machine))
                machines.machines.find(val => val.id === machineId).working = true;
                machines.machines.find(val => val.id === machineId).finishTime = basicData.recepts[machine.create][machine.activity]
            }
        }

        if (machine.producting === 'theTray') {
            if (this.checkDoughForTheTray(machine)) {
                machines.machines.find(val => val.id === machineId).working = true;
                machines.machines.find(val => val.id === machineId).finishTime = basicData.recepts[machine.create][machine.activity]
            }
        }
    }

    processOfMaking(){
        for(let i = 0; i < machines.machines.length; i++){
            if (machines.machines[i].working){
                let machine = document.querySelector('[id="' + machines.machines[i].id + '"]');
                let btn = machine.querySelector('button');
                let progresBar = machine.querySelector('.progres-bar');
                let progresLine = machine.querySelector('.line');
                let cas = machine.querySelector('.cas span');
                let newWidth = progresBar.offsetWidth / basicData.recepts[machines.machines[i].create][machines.machines[i].activity];

                machines.machines[i].progresLineWidth += newWidth;
                btn.style.display = 'none';
                progresBar.style.display = 'flex';

                machines.machines[i].finishTime -= 1;
                progresLine.style.width = machines.machines[i].progresLineWidth.toString() + 'px';
                cas.textContent = machines.machines[i].finishTime;

                console.log('cas', machines.machines[i].finishTime)
                console.log('produkt', machines.machines[i].producting)
                console.log('kolko', machines.machines[i].doAtOnce)

                if (machines.machines[i].finishTime === 0){
                    machines.machines[i].working = false;
                    btn.style.display = 'block';
                    progresBar.style.display = 'none';
                    progresLine.style.display = 0;
                    machines.machines[i].progresLineWidth = 0;
                    this.switchImageText(machines.machines[i].id)

                    if (machines.machines[i].producting === 'finalProduct'){
                        storage.addFinallProducts(machines.machines[i].create, basicData.recepts[machines.machines[i].create]['numberOfPieces'] * machines.machines[i].doAtOnce)
                        render.preRenderProductOnInfoPanel(i)
                    } 
                    if (machines.machines[i].producting === 'dough'){
                        storage.addDough(machines.machines[i].create, machines.machines[i].doAtOnce)
                        render.preRenderProductOnInfoPanel(i)
                    }
                    
                    if (machines.machines[i].producting === 'theTray') {
                        storage.addTheTray(machines.machines[i].create, machines.machines[i].doAtOnce)
                        render.preRenderProductOnInfoPanel(i)
                    }
                }
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
    }, 100);
}


const settingNewGame = function () {
    machines.buyNewMixer('mixerSHM200')
    machines.buyNewDispenser('dispenserDRC200')
    machines.buyNewOwen('owenHLN200')   
}


let storage = new Storage();
let machines = new Machines();
let basicData = new BasicData();
let render = new Render();
let player = new Player();
let createProduct = new CreateProduct();













