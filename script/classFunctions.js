class Storage {

    constructor() {
        this.allProducts = {
            "finalProduct": {
                "chlieb": 20,
                "rohlik": 20,
                "bageta": 20,
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
            "electricity": 1000,
            "theRent": 1
        }
        this.money = 3000
        this.ingredients = {
            "flour": 100,
            "water": 100,
            "yeast": 1000,
            "cumin": 1000,
            "milk": 100,
            "oil": 100,
            "sugar": 100,
            "butter": 100,
            "eggs": 100,
            "poppy": 1000,
            "chocolate": 1000,
            "jam": 1000
        }
    }

    addFinallProducts(item, howMany){
        const typeToRender = 'finalProduct';
        this.allProducts['finalProduct'][machines.machines[item].create] += howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    removeFinallProducts(item, howMany) {
        const typeToRender = 'finalProduct';
        this.allProducts['finalProduct'][machines.machines[item].create] -= howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    addDough(item, howMany){
        const typeToRender = 'dough'
        this.allProducts['dough'][machines.machines[item].create] += howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    removeDough(item, howMany){
        const typeToRender = 'dough'
        if (typeof (item) === 'number'){
            this.allProducts['dough'][machines.machines[item].create] -= howMany
        } else {
           this.allProducts['dough'][item.create] -= howMany 
        }
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    addTheTray(item, howMany){
        const typeToRender = 'theTray';
        this.allProducts['theTray'][machines.machines[item].create] += howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    removeTheTray(item, howMany){
        const typeToRender = 'theTray';
        if (typeof (item) === 'number'){
            this.allProducts['theTray'][machines.machines[item].create] -= howMany
        }else{
            this.allProducts['theTray'][item.create] -= howMany 
        }
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
        console.log(howMany)
        this.money += howMany
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
        this.haveRecepts = ['chlieb', 'rohlik', 'bageta']   
    }

    addPrestige(howMany){
        this.prestige += howMany
        render.preRenderPrestige()
    }

    removePrestige(howMany){
        this.prestige -= howMany
        render.preRenderPrestige()
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
        document.querySelector('.money').textContent = storage.money.toFixed(2);
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
        a0.title = 'chlieb';
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
            createProduct.sentProductToMake(machineBody.id)
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
            item.textContent = newValue.toFixed(0)
        });
    }

    preRenderProductOnInfoPanel(i, whatTypeRender){

        if (typeof(i) === 'number'){
            document.querySelector('.' + whatTypeRender + '-' + machines.machines[i].create).textContent = storage.allProducts[whatTypeRender][machines.machines[i].create]
        }else{
            document.querySelector('.' + whatTypeRender + '-' + i.create).textContent = storage.allProducts[whatTypeRender][i.create]
        }
    }

    createHtmlElementsForCustomer(customer) {
        let shopSection = document.querySelector('.shop')
        let customerBody= this.createElement('div', 'customer', '')
        let customerHeader = this.createElement('div', 'customer-header', '')
        let foto = this.createElement('img', 'none', '')
        let nameWanted = this.createElement('div', 'name-wanted', '')
        let customerName = this.createElement('h3', 'none', customer.name)
        let p1 = this.createElement('p', 'none', 'Požaduje: ')
        let order = this.createElement('div', 'wanted', '')
        let requirementsLi = []
        for (let i = 0; i < Object.keys(customer.wanted).length; i++){
            let li = this.createElement('li', 'wanted-' + Object.keys(customer.wanted)[i] , '')
            requirementsLi.push(li)
        }
        let p2 = this.createElement('p', 'none', 'Hodnota nakupu: ')
        let span2 = this.createElement('span', 'oreder-price', customer.payMoney)
        let p3 = this.createElement('p', 'time-leave', 'Odide za: ')
        let span3 = this.createElement('span', 'oreder-time-remaining', customer.timeRemaining)
        let button = this.createElement('button', 'btn-sell-products', 'Predať')

        customerBody.id = customer.id
        foto.src = customer.foto

        for (let i=0; i < requirementsLi.length; i++){
            requirementsLi[i].innerHTML = `${Object.keys(customer.wanted)[i]} <span>${customer.wanted[Object.keys(customer.wanted)[i]]}</span> ks`
        }

        for(let i=0; i < requirementsLi.length; i++){
           order.appendChild(requirementsLi[i]) 
        }
        button.id = customer.id
        button.addEventListener('click', function () {
            customers.selProducts(button.id)
        })
        p2.appendChild(span2)
        p3.appendChild(span3) 
        nameWanted.appendChild(customerName)
        nameWanted.appendChild(p1)
        nameWanted.appendChild(order)
        nameWanted.appendChild(p2)
        nameWanted.appendChild(p3)
        nameWanted.appendChild(button)
        customerHeader.appendChild(foto)
        customerHeader.appendChild(nameWanted)
        customerBody.appendChild(customerHeader)
        shopSection.appendChild(customerBody)
    }

    preRenderPrestige(){
        document.querySelector('.prestige').textContent = player.prestige
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
            'chlieb': {
                'flour': 3,
                'water': 2.4,
                'cumin': 120,
                'yeast': 60,
                'kneading': 10,
                'dosing': 11,
                'baking': 11,
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
        this.menName = ['Lukáš', 'Martin', 'Peter', 'Ján', 'Michal', 'Maroš', 'Tomáš', 'Marián', 'Alex', 'Pavol', 'Juraj', 'Martin', 'Karol', 'Tibor', 'Andrej', 'Milan', 'Matej', 'Patrik', 'Adam']
        this.womenName = ['Lucia', 'Jana', 'Katarina', 'Ľudmila', 'Maria', 'Alena', 'Renata', 'Zuzana', 'Sandra', 'Ema', 'Terezka', 'Monika', 'Andrea', 'Marianna', 'Petra', 'Viktoria', 'Adela', 'Iveta', 'Ivana', 'Eva']
        this.menFoto = ['../img/people/men/m01.jpg', 
                        '../img/people/men/m02.jpg', 
                        '../img/people/men/m03.jpg', 
                        '../img/people/men/m04.jpg', 
                        '../img/people/men/m05.jpg', 
                        '../img/people/men/m06.jpg', 
                        '../img/people/men/m07.jpg', 
                        '../img/people/men/m08.jpg',]
        this.womenFoto = ['../img/people/women/w01.jpg',
                        '../img/people/women/w02.jpg',
                        '../img/people/women/w03.jpg',
                        '../img/people/women/w04.jpg',
                        '../img/people/women/w05.jpg',
                        '../img/people/women/w06.jpg',
                        '../img/people/women/w07.jpg',
                        '../img/people/women/w08.jpg',
                        '../img/people/women/w09.jpg',
                        '../img/people/women/w10.jpg',
                        '../img/people/women/w11.jpg',
                        '../img/people/women/w12.jpg',
                        '../img/people/women/w13.jpg',
                        '../img/people/women/w14.jpg'
                        ]
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

        machines.machines.find(machine => machine.id === par.className).create = par.title
    
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

            const result = storage.ingredients[property] - (basicData.recepts[machine.create][property] * machine.doAtOnce)

            if (result >= 0){
                permission = true
            } else {
                permission = false
                alert('Maš nedostatok: ' + property)
                break
            }
        }

        if (permission){
            const electricity = storage.overHeadCosts['electricity'] - (machine.consumption * (basicData.recepts[machine.create]['kneading'] / 60))

            if ( electricity >= 0 ) {
                permission = true;
            } else {
                permission = false;
                alert('Nemaš dostatok elektriky')
            }
        }
        return permission
    }

    checkDoughForTheTray(machine){
        const electricity = storage.overHeadCosts['electricity'] - (machine.consumption * (basicData.recepts[machine.create]['dosing'] / 60))
        const result = storage.allProducts['dough'][machine.create] - machine.doAtOnce
        if (result >= 0 && electricity >= 0 ) {
            return true
        }
    }

    checkTheTrayForFinalProduct(machine) {
        const electricity = storage.overHeadCosts['electricity'] - (machine.consumption * (basicData.recepts[machine.create]['baking'] / 60))
        const result = storage.allProducts['theTray'][machine.create] - machine.doAtOnce
        if ( result >= 0 &&  electricity >= 0) {
            return true
        }
    }

    sentProductToMake(machineId) {
        const machine = machines.machines.find(val => val.id === machineId);

        if (machine.producting === 'dough') {
            if (this.checkIngrediensForDough(machine)) {
                machines.machines.find(machine => machine.id === machineId).working = true;
                machines.machines.find(machine => machine.id === machineId).finishTime = basicData.recepts[machine.create][machine.activity]
                storage.removeOverheadCosts('electricity', machine.consumption * (basicData.recepts[machine.create]['kneading'] / 60))

                for(let property in basicData.recepts[machine.create]){
                    if (property === 'kneading'){
                        break
                    }else{
                        let item = property
                        let howMany = basicData.recepts[machine.create][property]
                        storage.removeIngredients(item, howMany)
                    }
                }
            }
        }

        if (machine.producting === 'theTray') {
            if (this.checkDoughForTheTray(machine)) {
                machines.machines.find(machine => machine.id === machineId).working = true;
                machines.machines.find(machine => machine.id === machineId).finishTime = basicData.recepts[machine.create][machine.activity]
                storage.removeDough(machine, machine.doAtOnce)
                storage.removeOverheadCosts('electricity', machine.consumption * (basicData.recepts[machine.create]['dosing'] / 60))
            }
        }

        if (machine.producting === 'finalProduct') {
            if (this.checkTheTrayForFinalProduct(machine)) {
                machines.machines.find(machine => machine.id === machineId).working = true;
                machines.machines.find(machine => machine.id === machineId).finishTime = basicData.recepts[machine.create][machine.activity]
                storage.removeTheTray(machine, machine.doAtOnce)
                storage.removeOverheadCosts('electricity', machine.consumption * (basicData.recepts[machine.create]['baking'] / 60))
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

                if (machines.machines[i].finishTime === 0){
                    machines.machines[i].working = false;
                    btn.style.display = 'block';
                    progresBar.style.display = 'none';
                    progresLine.style.display = 0;
                    machines.machines[i].progresLineWidth = 0;
                    this.switchImageText(machines.machines[i].id)

                    if (machines.machines[i].producting === 'finalProduct'){
                        storage.addFinallProducts(i, basicData.recepts[machines.machines[i].create]['numberOfPieces'] * machines.machines[i].doAtOnce)

                    } 
                    if (machines.machines[i].producting === 'dough'){
                        storage.addDough(i, machines.machines[i].doAtOnce)

                    }
                    
                    if (machines.machines[i].producting === 'theTray') {
                        storage.addTheTray(i, machines.machines[i].doAtOnce)

                    }
                }
            }
        }
    }
}

class Customer {
    constructor(id, name, foto, wanted, payMoney){
        this.id = id
        this.name = name
        this.foto = foto
        this.wanted = wanted
        this.payMoney = payMoney
        this.timeRemaining = 60
    }
}

class Customers {
    constructor(){
        this.customers = []
        this.timeToNewCustomer = 5
        this.gender = 0
        this.items = {}
        this.price = 0
        this.lastManName = -1
        this.lastManFoto = -1
        this.lastWomanName = -1
        this.lastWomanFoto = -1
        this.allRecepts = [...player.haveRecepts]
        this.rangeGroupA = 1  // tymto sa ovplyvňuje generovanie počtu kusov pre zakaznika produktov, ktoré majú na jednu davku 8 a menej kusov
        this.rangeGroupB = 1  // tymto sa ovplyvňuje generovanie počtu kusov pre zakaznika produktov, ktoré majú na jednu davku viac ako 8 kusov 
        this.countDificultA = 95
        this.countDificultB = 99
    }
    
    randomNumberGenerator(range){
          return Math.floor(Math.random()*range)
    }

    genderGenerator(){
        this.gender = this.randomNumberGenerator(2)
    }

    howManyPiecesGenerator(item){
        let pieces = 0
        let number = this.randomNumberGenerator(100);
        if (basicData.recepts[item]['numberOfPieces'] < 9){
            if (number <= 60){
                pieces = this.randomNumberGenerator((basicData.recepts[item]['numberOfPieces'] / 2) - 1) + 1
            } else if (number > 60 && number <= 85){
                pieces = this.randomNumberGenerator((basicData.recepts[item]['numberOfPieces'] / 2) + this.rangeGroupA) + 1
            } else if (number > 85 && number <= 97){
                pieces = this.randomNumberGenerator(basicData.recepts[item]['numberOfPieces'] + this.rangeGroupA) + 1
            }else{
                pieces = this.randomNumberGenerator(basicData.recepts[item]['numberOfPieces'] + this.rangeGroupA) + this.rangeGroupA
            }
        }else{
            if (number <= 60){
                pieces = this.randomNumberGenerator((basicData.recepts[item]['numberOfPieces'] / 2) - 2) + 1
            } else if (number > 60 && number <= 85) {
                pieces = this.randomNumberGenerator(basicData.recepts[item]['numberOfPieces'] / 2) + this.rangeGroupB
            } else if (number > 85 && number <= 97) {
                pieces = this.randomNumberGenerator((basicData.recepts[item]['numberOfPieces'] / 2) + Math.floor(basicData.recepts[item]['numberOfPieces'] / 4)) + this.rangeGroupB
            } else if (number > 97) {
                pieces = this.randomNumberGenerator(basicData.recepts[item]['numberOfPieces']) + this.rangeGroupB
            }
        }
        
        return pieces
    }

    setName(){
        let name = ''
        if (this.gender === 0){
            if (this.lastManName >= basicData.menName.length - 1){
                this.lastManName = 0
                name = basicData.menName[this.lastManName]
            }else{
                this.lastManName += 1
                name = basicData.menName[this.lastManName]
            }
        }else{
            if (this.lastWomanName > basicData.womenName.length - 1) {
                this.lastWomanName = 0
                name = basicData.womenName[this.lastWomanName]
            } else {
                this.lastWomanName += 1
                name = basicData.womenName[this.lastWomanName]
            }
        }
        return name
    }

    setFoto(){
        let foto = ''
        if (this.gender === 0) {
            if (this.lastManFoto >= basicData.menFoto.length - 1) {
                this.lastManFoto = 0
                foto = basicData.menFoto[this.lastManFoto]
            } else {
                this.lastManFoto += 1
                foto = basicData.menFoto[this.lastManFoto]
            }
        } else {
            if (this.lastWomanFoto >= basicData.womenFoto.length - 1) {
                this.lastWomanFoto = 0
                foto = basicData.womenFoto[this.lastWomanFoto]
            } else {
                this.lastWomanFoto += 1
                foto = basicData.womenFoto[this.lastWomanFoto]
            }
        } 
        return foto
    }

    createOrder(){
        this.allRecepts = [...player.haveRecepts]
        let countRequests = 0

        if (this.allRecepts.length < 6){
            countRequests = this.allRecepts.length
        }else{
            countRequests = 6
        }

        const howManyProducts = this.randomNumberGenerator(countRequests) + 1
        this.items = {}

        for (let i = 0; i < howManyProducts; i++){
            const newItem = this.allRecepts[this.randomNumberGenerator(this.allRecepts.length)]
            const numberOfItem = this.howManyPiecesGenerator(newItem)
            this.allRecepts.splice(this.allRecepts.findIndex(item => item === newItem), 1)
            this.items[newItem] = numberOfItem
        }
        return this.items
    }

    setOrderPrice(){
        this.price = 0
        for (let property in this.items){
            this.price += (basicData.recepts[property]['priceOfOnePiece'] * this.items[property])
        }
        return this.price 
    }

    addNewCustomer(){
        basicData.idGenerator();
        this.genderGenerator();
        const newCustomer = new Customer(basicData.id, this.setName(), this.setFoto(), this.createOrder(), this.setOrderPrice())
        this.customers.push(newCustomer)
        render.createHtmlElementsForCustomer(this.customers.at(-1))
    }

    howManyCustomersAtOnce(){
        const percent = this.randomNumberGenerator(100)
        let count = 1
        if(percent < this.countDificultA){
            count = 1
        }else if(percent >= this.countDificultA && percent < this.countDificultB ){
            count = 2
        }else if(percent >= this.countDificultB){
            count = 3
        }
        return count
    }

    timeGenerator(){
        let time = this.randomNumberGenerator(10) + 10
        return time
    }

    timerToNewCustomer(){
        if (this.timeToNewCustomer === 0){
            for (let i=0; i < this.howManyCustomersAtOnce(); i++){
                this.addNewCustomer()
            }
            this.timeToNewCustomer = this.timeGenerator()
        }else{
            this.timeToNewCustomer -= 1
        }
        document.querySelector('.timer-minutes').textContent = ('0' + Math.floor(this.timeToNewCustomer / 60)).slice(-2)
        document.querySelector('.timer-sekundes').textContent = ('0' + this.timeToNewCustomer % 60).slice(-2)
    }

    removeCustomers(customerID){
        let customer = document.getElementById(customerID)
        while (customer.hasChildNodes()) {
            customer.removeChild(customer.firstChild)
        }
        customer.remove()
        let customerIndex = customers.customers.findIndex(item => item === customerID)
        customers.customers.splice(customers.customers[customerIndex], 1)
    }

    customerLife(){
        let wasDelete=false
        for(let i=0; i < customers.customers.length; i++){
            if (wasDelete){
                i -= 1
                wasDelete = false
            }
            let customerElement = document.getElementById(customers.customers[i].id)
            customerElement.querySelector('.time-leave span').textContent = customers.customers[i].timeRemaining
            if(customers.customers[i].timeRemaining > 0){
                customers.customers[i].timeRemaining -= 1
                for(let a=0; a < Object.keys(customers.customers[i].wanted).length; a++){
                    let nameItem = Object.keys(customers.customers[i].wanted)[a]
                    let countItem = customers.customers[i].wanted[Object.keys(customers.customers[i].wanted)[a]]
                    if (countItem > storage.allProducts['finalProduct'][nameItem] ){
                        customerElement.querySelector('.wanted-' + nameItem).style.color = 'red';
                    }else{
                        customerElement.querySelector('.wanted-' + nameItem).style.color = 'white';
                    }
                }
            }else{
                wasDelete = true
                this.removeCustomers(customers.customers[i].id)
                player.removePrestige(1)
            }
        }
    }

    checkIfHaveAll(index){
        let permission = false
        for (let i = 0; i < Object.keys(customers.customers[index].wanted).length; i++){
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

    howManyPrestigeGet(index){
        const time = customers.customers[index].timeRemaining
        if(time > 50){
            player.addPrestige(3)
        }else if(time <= 50 && time > 20 ){
            player.addPrestige(2)
        }else{
            player.addPrestige(1)
        }
    }

    selProducts(customerID){
        const customerIndex = customers.customers.findIndex(value => value.id === customerID)
        if(this.checkIfHaveAll(customerIndex)){
            storage.addMoney(customers.customers[customerIndex].payMoney)
            this.howManyPrestigeGet(customerIndex) 
            this.removeCustomers(customerID)
        }else{
            alert('Niečo ti chyba!!!')
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
let customers = new Customers()
















