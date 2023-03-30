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

    addFinallProducts(item, howMany){
        const typeToRender = 'finalProduct';
        this.allProducts['finalProduct'][item] += howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    removeFinallProducts(item, howMany) {
        const typeToRender = 'finalProduct';
        this.allProducts['finalProduct'][item] -= howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    addDough(item, howMany){
        const typeToRender = 'dough'
        this.allProducts['dough'][item] += howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    removeDough(item, howMany){
        const typeToRender = 'dough'
        this.allProducts['dough'][item] -= howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    addTheTray(item, howMany){
        const typeToRender = 'theTray';
        this.allProducts['theTray'][item] += howMany
        render.preRenderProductOnInfoPanel(item, typeToRender)
    }

    removeTheTray(item, howMany){
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

class Machine {
    constructor(id, machineName, industryName, price, consumption, doAtOnce, producting, activity) {
        this.id = id;
        this.machineName = machineName;
        this.industryName = industryName;
        this.price = price;
        this.consumption = consumption;
        this.doAtOnce = doAtOnce;
        this.producting = producting;
        this.activity = activity;
        this.working = false;
        this.create = '';
        this.timeToCreate = 0
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
            basicData.machines[mixerName]['industryName'],
            basicData.machines[mixerName]['price'],
            basicData.machines[mixerName]['consuption'],
            basicData.machines[mixerName]['doAtOnce'],
            'dough',
            'kneading'
        );
        this.machines.push(newMixer);
        render.createMachineElement(mixerName, machines.machines[machines.machines.length - 1].id);
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
            basicData.machines[dispenserName]['industryName'],
            basicData.machines[dispenserName]['price'],
            basicData.machines[dispenserName]['consuption'],
            basicData.machines[dispenserName]['doAtOnce'],
            'theTray',
            'dosing'
        )
        this.machines.push(newDispenser);
        render.createMachineElement(dispenserName, machines.machines[machines.machines.length - 1].id);
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
            basicData.machines[owenName]['industryName'],
            basicData.machines[owenName]['price'],
            basicData.machines[owenName]['consuption'],
            basicData.machines[owenName]['doAtOnce'],
            'finalProduct',
            'baking'
        );
        this.machines.push(newOwen);
        render.createMachineElement(owenName, machines.machines[machines.machines.length - 1].id);
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

    checkMoneyForRecept(receptName){
        console.log('meno', receptName)
        if ((storage.money - basicData.recepts[receptName]['price'])>= 0){
            return true
        }
    }

    buyRecept(){
        let user = this
        document.querySelectorAll('.recept').forEach(function (recept) {
            const lastItem = recept.querySelector('.recept-body').children[recept.querySelector('.recept-body').children.length - 1]

            if (lastItem.classList.contains('button-buy-recept')){
                const buttonBuy = recept.querySelector('.button-buy-recept')
                console.log('tlacitko', buttonBuy)
                buttonBuy.addEventListener('click', function () {

                let permission = user.checkMoneyForRecept(buttonBuy.title)
                if(permission){
                    user.haveRecepts.push(buttonBuy.title)
                    storage.removeMoney(basicData.recepts[buttonBuy.title]['price'])
                    buttonBuy.style.display = 'none'
                    render.preRenderProductImage()
                }else{
                    alert('nemaš dosť penazi')
                }
            }) 
            }
            

           
            
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

    createMachineElement(machine, id) {
        let user = this
        let mixers = document.querySelector(basicData.machines[machine]['position']);
        let machineBody = this.createElement('div', 'machine-body', '');
        machineBody.innerHTML = `<img src="${basicData.machines[machine]['img']}" alt="miesic200">
                            <div class="actual-doing">
                                <h4>${basicData.machines[machine]['machineName']}</h4>
                                <img src="img/products/chlieb.jpg">
                            </div>`
        machineBody.id = id;
        let menu = this.createElement('div', 'menu', '');
        let li = []
        let a = []
        let img = []

        for(let i=0; i < 10; i++){
            let newLi = user.createElement('li', 'none', '')
            li.push(newLi)
        }

        for (let i = 0; i < 10; i++) {
            let newA = user.createElement('a', id, '')
            a.push(newA)
        }

        for (let i = 0; i < 10; i++) {
            let newImg = user.createElement('img', 'none', '')
            img.push(newImg)
        }
        
        let buttonCreate = this.createElement('button', id, 'VYROBIŤ');
        let progresBar = this.createElement('div', 'progres-bar', '');
        let cas = this.createElement('div', 'cas', 'TIME');
        let span1 = this.createElement('span', 'time', '10');
        let span2 = this.createElement('span', 'none', 's');
        let progresLine = this.createElement('div', 'line', '');
        buttonCreate.type = 'button';

        for(let i=0; i < li.length; i++){
            li[i].style = "--i:" + i +";"
        }

        for (let i = 0; i < a.length; i++) {
            a[i].href = "#"
            a[i].title = basicData.allReceptsName[i]
        }

        for (let i = 0; i < img.length; i++){
            if(i < player.haveRecepts.length){
                img[i].src = "img/products/"+ player.haveRecepts[i] + ".jpg"
                img[i].title = player.haveRecepts[i]
            }else{
                img[i].src = "img/products/noproduct.jpg";
                img[i].title = 'noProduct'     
            }  
        }

        a.forEach(function (button) {
            button.addEventListener('click', function () {
                let img = button.querySelector('img')
                if (img.title != 'noProduct'){ 
                    createProduct.selectItemToMade(button);
                }
            })
        })

        buttonCreate.addEventListener('click', function () {
            createProduct.sentProductToMake(machineBody.id)
        })

        let toggle = this.createElement('div', 'toggle', 'Zvoľ produkt');

        toggle.addEventListener('click', function () {
            if (machines.machines.find(val => val.id === machineBody.id).working === false) {
                menu.classList.toggle('active');
            }
        });

        cas.appendChild(span1);
        cas.appendChild(span2);
        progresBar.appendChild(cas);
        progresBar.appendChild(progresLine);

        for(let i=0; i < a.length; i++){
            a[i].appendChild(img[i])
        }

        for (let i = 0; i < li.length; i++) {
            li[i].appendChild(a[i])
        }

        for (let i = 0; i < li.length; i++) {
            menu.appendChild(li[i])
        }
        
        menu.appendChild(toggle)
        machineBody.appendChild(progresBar)
        machineBody.appendChild(buttonCreate)
        machineBody.appendChild(menu)
        mixers.appendChild(machineBody)
    }

    preRenderIngredients(item, newValue){
        document.querySelectorAll('.' + item).forEach(function (item) {
            item.textContent = newValue.toFixed(2)
        });
    }

    preRenderProductOnInfoPanel(item, whatTypeRender){
        if (typeof(i) === 'number'){
            document.querySelector('.' + whatTypeRender + '-' + item).textContent = storage.allProducts[whatTypeRender][item]
        }else{
            document.querySelector('.' + whatTypeRender + '-' + item).textContent = storage.allProducts[whatTypeRender][item]
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
        let span2 = this.createElement('span', 'oreder-price', customer.payMoney.toFixed(2))
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

    newCustomerAlertElement(){
        let shopButton = document.querySelector('[title="shop"]');
        let customerAlert = this.createElement('div', 'customer-alert', '');
        let p = this.createElement('p', 'none', '+1')
        customerAlert.appendChild(p)
        shopButton.append(customerAlert)
    }

    removeNewCustomerAlertElement(){
        let shopButton = document.querySelector('[title="shop"]');
        while (shopButton.hasChildNodes()) {
            shopButton.removeChild(shopButton.firstChild)
        }
        shopButton.textContent = 'PREDAJŇA'
    }

    progresLineProperWidth() {
        for (let i = 0; i < machines.machines.length; i++) {
            if (machines.machines[i].working) {
                let machine = document.querySelector('[id="' + machines.machines[i].id + '"]');
                let progresLine = machine.querySelector('.line');
                progresLine.style.width = machines.machines[i].progresLineWidth.toString() + 'px';
            }
        }
    }

    preRenderProductImage(){
        for(let i=0; i<machines.machines.length; i++){
            let machine = document.getElementById(machines.machines[i].id)
            let receptImage = 0
            machine.querySelectorAll('.menu li a img').forEach(function (image) {
                if (receptImage < player.haveRecepts.length) {
                    image.src = "img/products/" + player.haveRecepts[receptImage] + ".jpg"
                    image.title = player.haveRecepts[receptImage]
                    receptImage +=1
                } else {
                    image.src = "img/products/noproduct.jpg";
                    image.title = 'noProduct'
                    receptImage += 1
                }  
            })  
        }
    }

    saveSuccesAlert(){
        let place = document.querySelector('.banner-img');
        let saveBlock = this.createElement('div', 'succes-save-alert', '');
        let text = this.createElement('h3', 'none', 'Hra úspešne uložena');
        saveBlock.appendChild(text)
        place.appendChild(saveBlock)

        setTimeout(() => {
            text.remove()
            saveBlock.remove()
        }, 1000);
    }
}

class BasicData {
    constructor(){
        this.id;
        this.machines = {
            'mixerSHM200':{
                'machineName': 'Mixer SHM 200',
                'industryName': 'mixerSHM200',
                'price':55,
                'consuption': 200,
                'doAtOnce': 1,
                'img': 'img/machine/miesic/miesic200.jpg',
                'position': '.bakery-mixers'
            },
            'mixerSHM500': {
                'machineName': 'Mixer SHM 500',
                'industryName': 'mixerSHM500',
                'price': 120,
                'consuption': 500,
                'doAtOnce': 2,
                'img': 'img/machine/miesic/miesic500.jpg',
                'position': '.bakery-mixers'
            },
            'mixerSHM1000': {
                'machineName': 'Mixer SHM 1000',
                'industryName': 'mixerSHM1000',
                'price': 190,
                'consuption': 700,
                'doAtOnce': 3,
                'img': 'img/machine/miesic/miesic1000.jpg',
                'position': '.bakery-mixers',
            },

            'dispenserDRC200': {
                'machineName': 'Davkovač DRC 200',
                'industryName': 'dispenserDRC200',
                'price': 55,
                'consuption': 150,
                'doAtOnce': 1,
                'img': 'img/machine/miesic/miesic200.jpg',
                'position': '.bakery-dispensers'
            },
            'dispenserDRC500': {
                'machineName': 'Davkovač DRC 500',
                'industryName': 'dispenserDRC500',
                'price': 120,
                'consuption': 400,
                'doAtOnce': 2,
                'img': 'img/machine/miesic/miesic500.jpg',
                'position': '.bakery-dispensers'
            },
            'dispenserDRC1000': {
                'machineName': 'Davkovač DRC 1000',
                'industryName': 'dispenserDRC1000',
                'price': 190,
                'consuption': 550,
                'doAtOnce': 3,
                'img': 'img/machine/miesic/miesic1000.jpg',
                'position': '.bakery-dispensers'
            },
            
            'owenHLN200': {
                'machineName': 'Pec HLN 200',
                'industryName': 'owenHLN200',
                'price': 55,
                'consuption': 400,
                'doAtOnce': 1,
                'img': 'img/machine/miesic/miesic200.jpg',
                'position': '.bakery-owens'
            },
            'owenHLN500': {
                'machineName': 'Pec HLN 500',
                'industryName': 'owenHLN500',
                'price': 120,
                'consuption': 950,
                'doAtOnce': 2,
                'img': 'img/machine/miesic/miesic500.jpg',
                'position': '.bakery-owens'
            },
            'owenHLN1000': {
                'machineName': 'Pec HLN 1000',
                'industryName': 'owenHLN1000',
                'price': 190,
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
                'quantity': 30
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
                'kneading': 50,
                'dosing': 30,
                'baking': 70,
                'numberOfPieces': 6,
                'priceOfOnePiece': 1.76,
                'img': 'img/products/chlieb.jpg'
            },
            'rohlik':{
                'flour': 0.6,
                'milk': 0.4,
                'oil': 0.2,
                'yeast': 20,
                'kneading': 45,
                'dosing': 60,
                'baking': 20,
                'numberOfPieces': 16,
                'priceOfOnePiece': 0.25,
                'img': 'img/products/rohlik.jpg',
            },
            'bageta':{
                'flour': 1,
                'water': 0.6,
                'sugar': 0.04,
                'yeast': 40,
                'kneading': 50,
                'dosing': 20,
                'baking': 45,
                'numberOfPieces': 8,
                'priceOfOnePiece': 0.38,
                'img': 'img/products/bageta.jpg'
            },
            'zemla': {
                'flour': 0.75,  
                'butter': 75,
                'milk': 0.38,
                'yeast': 20,
                'kneading': 45,
                'dosing': 50,
                'baking': 25,
                'numberOfPieces': 12,
                'priceOfOnePiece': 0.28,
                'img': 'img/products/zemla.jpg',
                'price': 50,
            },
            'croissant': {
                'flour': 0.5,
                'milk': 0.5,
                'sugar': 0.05,
                'butter': 400,
                'eggs': 1,
                'yeast': 15,
                'kneading': 60,
                'dosing': 50,
                'baking': 15,
                'numberOfPieces': 12,
                'priceOfOnePiece': 0.49,
                'img': 'img/products/croissant.jpg',
                'price': 35,
            },
            'makovnik': {
                'flour': 2,
                'eggs': 12,
                'milk': 2.4,
                'sugar': 1.7,
                'poppy': 1700,
                'butter': 640,
                'kneading': 75,
                'dosing': 90,
                'baking': 50,
                'numberOfPieces': 8,
                'priceOfOnePiece': 3.16,
                'img': 'img/products/makovnik.jpg',
                'price': 40,

            },
            'donut': {
                'flour': 0.75,
                'butter': 180,
                'eggs': 5,
                'milk': 0.38,
                'sugar': 0.08,
                'yeast': 60,
                'chocolate': 230,
                'kneading': 30,
                'dosing': 70,
                'baking': 40,
                'numberOfPieces': 12,
                'priceOfOnePiece': 0.69,
                'img': 'img/products/donut.jpg',
                'price': 55,
            },
            'toast': {
                'flour': 3,
                'butter': 180,
                'water': 1.8,
                'eggs': 6,
                'yeast': 120,
                'kneading': 30,
                'dosing': 40,
                'baking': 40,
                'numberOfPieces': 6,
                'priceOfOnePiece': 1.42,
                'img': 'img/products/toast.jpg',
                'price': 65,
            },
            'siska': {
                'flour': 0.5,
                'eggs': 3,
                'milk': 0.3,
                'sugar': 0.08,
                'yeast': 20,
                'jam': 500,
                'kneading': 40,
                'dosing': 75,
                'baking': 50,
                'numberOfPieces': 12,
                'priceOfOnePiece': 0.63,
                'img': 'img/products/siska.jpg',
                'price': 60,
            },
            'muffin':{
                'flour': 0.5,
                'sugar': 0.2,
                'chocolate': 250,
                'eggs': 1,
                'oil': 0.2,
                'milk': 0.25,
                'kneading': 60,
                'dosing': 90,
                'baking': 30,
                'numberOfPieces': 12,
                'priceOfOnePiece': 0.51,
                'img': 'img/products/muffin.jpg',
                'price': 45,
            }
        }
        this.menName = ['Lukáš', 'Martin', 'Peter', 'Ján', 'Michal', 'Maroš', 'Tomáš', 'Marián', 'Alex', 'Pavol', 'Juraj', 'Martin', 'Karol', 'Tibor', 'Andrej', 'Milan', 'Matej', 'Patrik', 'Adam']
        this.womenName = ['Lucia', 'Jana', 'Katarina', 'Ľudmila', 'Maria', 'Alena', 'Renata', 'Zuzana', 'Sandra', 'Ema', 'Terezka', 'Monika', 'Andrea', 'Marianna', 'Petra', 'Viktoria', 'Adela', 'Iveta', 'Ivana', 'Eva']
        this.menFoto = ['img/people/men/m01.jpg', 
                        'img/people/men/m02.jpg', 
                        'img/people/men/m03.jpg', 
                        'img/people/men/m04.jpg', 
                        'img/people/men/m05.jpg', 
                        'img/people/men/m06.jpg', 
                        'img/people/men/m07.jpg', 
                        'img/people/men/m08.jpg',]
        this.womenFoto = ['img/people/women/w01.jpg',
                        'img/people/women/w02.jpg',
                        'img/people/women/w03.jpg',
                        'img/people/women/w04.jpg',
                        'img/people/women/w05.jpg',
                        'img/people/women/w06.jpg',
                        'img/people/women/w07.jpg',
                        'img/people/women/w08.jpg',
                        'img/people/women/w09.jpg',
                        'img/people/women/w10.jpg',
                        'img/people/women/w11.jpg',
                        'img/people/women/w12.jpg',
                        'img/people/women/w13.jpg',
                        'img/people/women/w14.jpg'
                        ]
        this.allReceptsName = ['chlieb', 'rohlik', 'bageta', 'croissant', 'makovnik', 'muffin', 'zemla', 'donut', 'siska', 'toast']
    }

    idGenerator() {
        this.id = uuidv4();
    }
}

class CreateProduct {
    constructor (){
        this.newWidth = 0
        this.offsetWidth = 150
    }

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
                machines.machines.find(machine => machine.id === machineId).timeToCreate = basicData.recepts[machine.create][machine.activity]
                storage.removeOverheadCosts('electricity', machine.consumption * (basicData.recepts[machine.create]['kneading'] / 60))

                for(let property in basicData.recepts[machine.create]){
                    if (property === 'kneading'){
                        break
                    }else{
                        let item = property
                        let howMany = basicData.recepts[machine.create][property] * machine.doAtOnce
                        storage.removeIngredients(item, howMany)
                    }
                }
            }
        }

        if (machine.producting === 'theTray') {
            if (this.checkDoughForTheTray(machine)) {
                machines.machines.find(machine => machine.id === machineId).working = true;
                machines.machines.find(machine => machine.id === machineId).finishTime = basicData.recepts[machine.create][machine.activity]
                machines.machines.find(machine => machine.id === machineId).timeToCreate = basicData.recepts[machine.create][machine.activity]
                storage.removeDough(machine.create, machine.doAtOnce)
                storage.removeOverheadCosts('electricity', machine.consumption * (basicData.recepts[machine.create]['dosing'] / 60))
            }
        }

        if (machine.producting === 'finalProduct') {
            if (this.checkTheTrayForFinalProduct(machine)) {
                machines.machines.find(machine => machine.id === machineId).working = true;
                machines.machines.find(machine => machine.id === machineId).finishTime = basicData.recepts[machine.create][machine.activity]
                machines.machines.find(machine => machine.id === machineId).timeToCreate = basicData.recepts[machine.create][machine.activity]
                storage.removeTheTray(machine.create, machine.doAtOnce)
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
                this.newWidth = this.offsetWidth / basicData.recepts[machines.machines[i].create][machines.machines[i].activity];

                machines.machines[i].progresLineWidth = this.newWidth * Math.abs(machines.machines[i].finishTime - machines.machines[i].timeToCreate);
                btn.style.display = 'none';
                progresBar.style.display = 'flex';
                machines.machines[i].finishTime -= 1; 
                cas.textContent = machines.machines[i].finishTime;
                progresLine.style.width = machines.machines[i].progresLineWidth.toString() + 'px';
                
                if (machines.machines[i].finishTime === 0){
                    machines.machines[i].working = false;
                    btn.style.display = 'block';
                    progresBar.style.display = 'none';
                    machines.machines[i].progresLineWidth = 0;
                    this.switchImageText(machines.machines[i].id)

                    if (machines.machines[i].producting === 'finalProduct'){
                        let item = machines.machines[i].create
                        let howMany = basicData.recepts[machines.machines[i].create]['numberOfPieces'] * machines.machines[i].doAtOnce
                        storage.addFinallProducts(item, howMany)

                    } 
                    if (machines.machines[i].producting === 'dough'){
                            storage.addDough(machines.machines[i].create, machines.machines[i].doAtOnce )
                    }
                    
                    if (machines.machines[i].producting === 'theTray') {
                            storage.addTheTray(machines.machines[i].create, machines.machines[i].doAtOnce)
                    }

                    machines.machines[i].create = ''
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
        this.waiting = true
    }
}

class Customers {
    constructor(){
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
    
    randomNumberGenerator(range){
        return Math.floor(Math.random()*range)
    }

    genderGenerator(){
        this.gender = this.randomNumberGenerator(2)
    }

    howManyPiecesGenerator(item){
        let pieces = 0
        let val = this.randomNumberGenerator(100);
        if (basicData.recepts[item]['numberOfPieces'] < 9){
            if (val < 60){
                pieces = this.randomNumberGenerator((basicData.recepts[item]['numberOfPieces'] / 2) - 1) + 1
            } else if (val >= 60 && val <= 85){
                pieces = this.randomNumberGenerator((basicData.recepts[item]['numberOfPieces'] / 2) + setGameDifficulty.productRangeGroupA) + 1
            } else if (val >= 86 && val <= 97){
                pieces = this.randomNumberGenerator(basicData.recepts[item]['numberOfPieces'] + setGameDifficulty.productRangeGroupA) + 1
            } else if (val >= 98){
                pieces = this.randomNumberGenerator(basicData.recepts[item]['numberOfPieces'] + setGameDifficulty.productRangeGroupA) + 1
            }
        }else{
            if (val < 60){
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

    setName(){
        let name = ''
        if (this.gender === 0){
            if (this.lastManName === basicData.menName.length - 1){
                this.lastManName = 0
                name = basicData.menName[this.lastManName]
            }else{
                this.lastManName += 1
                name = basicData.menName[this.lastManName]   
            }
        }else{
            if (this.lastWomanName === basicData.womenName.length - 1) {
                this.lastWomanName = 0
                name = basicData.womenName[this.lastWomanName]
            } else {
                this.lastWomanName += 1
                name = basicData.womenName[this.lastWomanName]                
            }
        }
        console.log('muži meno', this.lastManName)
        console.log('ženy meno', this.lastWomanName)
        console.log('muzi dlzka', basicData.menName.length)
        console.log('ženx dlzka', basicData.womenName.length)
        return name
    }

    setFoto(){
        let foto = ''
        console.log('gender', this.gender)
       
        if (this.gender === 0) {
            if (this.lastManFoto === basicData.menFoto.length - 1) {
                this.lastManFoto = 0
                foto = basicData.menFoto[this.lastManFoto]
            } else{
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

    createOrder(){
        let allRecepts = [...this.allReceptsHaveToHave]
        let countRequests = 0

        if (allRecepts.length < 6){
            countRequests = allRecepts.length
        }else{
            countRequests = 6
        }

        const howManyProducts = this.randomNumberGenerator(countRequests) + 1
        this.items = {}

        for (let i = 0; i < howManyProducts; i++){
            const newItem = allRecepts[this.randomNumberGenerator(allRecepts.length)]
            const numberOfItem = this.howManyPiecesGenerator(newItem)
            allRecepts.splice(allRecepts.findIndex(item => item === newItem), 1)
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
        if(percent < setGameDifficulty.chanceTwoCustomers){
            count = 1
        } else if (percent >= setGameDifficulty.chanceTwoCustomers && percent < setGameDifficulty.chanceThreeCustomers ){
            count = 2
        } else if (percent >= setGameDifficulty.chanceThreeCustomers && percent < setGameDifficulty.chanceFourCustomers){
            count = 3
        } else if (percent >= setGameDifficulty.chanceFourCustomers)
            count = 4
        return count
    }

    timeGenerator(){
        let time = this.randomNumberGenerator(setGameDifficulty.rangeTime) + setGameDifficulty.minTime
        return time
    }

    timerToNewCustomer(){
        if (this.timeToNewCustomer === 0){
            const howManyCustomers = this.howManyCustomersAtOnce()
            for (let i = 0; i < howManyCustomers; i++){
                this.addNewCustomer()
            }
            this.timeToNewCustomer = this.timeGenerator()
            render.newCustomerAlertElement()
        }else{
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

    deleteSoldProducts(index){
        for (let i = 0; i < Object.keys(customers.customers[index].wanted).length; i++){
            let nameItem = Object.keys(customers.customers[index].wanted)[i]
            let countItem = customers.customers[index].wanted[Object.keys(customers.customers[index].wanted)[i]]
            storage.removeFinallProducts(nameItem, countItem)
        }
    }

    selProducts(customerID){
        const customerIndex = customers.customers.findIndex(value => value.id === customerID)
        if(this.checkIfHaveAll(customerIndex)){
            storage.addMoney(customers.customers[customerIndex].payMoney)
            this.howManyPrestigeGet(customerIndex)
            this.deleteSoldProducts(customerIndex) 
            this.removeCustomers(customerID)
        }else{
            alert('Niečo ti chyba!!!')
        }
    }

    
}

class SetGameDifficulty{
    constructor(){
        this.levels = {
            'level1': true,
            'level2': true,
            'level3': true,
            'level4': true,
            'level5': true,
            'level6': true,
            'level7': true,
            'level8': true,
            'level9': true,
            'level10': true,
            'level11': true,
            'level12': true,
            'level13': true,
            'level14': true,
            'level15': true,
            'level16': true,
            'level17': true,
            'level18': true,
            'level19': true,
            'level20': true,
            'level21': true,
            'level22': true,
            'level23': true,
            'level24': true,
            'level25': true,
            'level26': true,
            'level27': true,
        }
        this.productRangeGroupA = 1 //ovplyvnuje nastavenie počtu kusov produktov ktorých z jednej davky nevznikne viac ako 8 kusov
        this.productRangeGroupB = 1 //ovplyvnuje nastavenie počtu kusov produktov ktorých z jednej davky vznikne viac ako 8 kusov
        this.minTime = 45
        this.rangeTime = 40
        this.chanceTwoCustomers = 85
        this.chanceThreeCustomers = 90
        this.chanceFourCustomers = 99
        this.plusNextRecepts = 3 
    }

    levelsUp(){
        if(player.prestige > 20 && this.levels['level1'] === true){
            this.chanceTwoCustomers = 80
            this.chanceThreeCustomers = 90
            this.levels['level1'] = false
        }

        if (player.prestige > 40 && this.levels['level2'] === true){
            this.minTime = 40
            this.levels['level2'] = false
        }

        if (player.prestige > 60 && this.levels['level3'] === true) {
            this.chanceTwoCustomers = 75
            this.chanceThreeCustomers = 85
            this.levels['level3'] = false
        }

        if (player.prestige > 80 && this.levels['level4'] === true) {
            this.productRangeGroupA = 2
            this.productRangeGroupB = 2
            this.levels['level4'] = false
        }

        if (player.prestige > 100 && this.levels['level5'] === true){
            customers.allReceptsHaveToHave.push(basicData.allReceptsName[this.plusNextRecepts])
            this.levels['level5'] = false
            this.plusNextRecepts += 1
            //plus croassant
        }

        if (player.prestige > 120 && this.levels['level6'] === true) {
            this.chanceTwoCustomers = 70
            this.chanceThreeCustomers = 80
            this.chanceFourCustomers = 95
            this.levels['level6'] = false
        }

        if (player.prestige > 140 && this.levels['level7'] === true) {
            this.minTime = 35
            this.levels['level7'] = false
        }

        if (player.prestige > 160 && this.levels['level8'] === true) {
            this.productRangeGroupA = 3
            this.productRangeGroupB = 3
            this.levels['level8'] = false
        }

        if (player.prestige > 180 && this.levels['level9'] === true) {
            customers.allReceptsHaveToHave.push(basicData.allReceptsName[this.plusNextRecepts])
            this.levels['level9'] = false
            this.plusNextRecepts += 1
            //plus makovnik
        }

        if (player.prestige > 200 && this.levels['level10'] === true) {
            this.chanceTwoCustomers = 65
            this.chanceThreeCustomers = 75
            this.chanceFourCustomers = 90
            this.levels['level10'] = false
        }

        if (player.prestige > 220 && this.levels['level11'] === true) {
            this.minTime = 35
            this.levels['level11'] = false
        }

        if (player.prestige > 240 && this.levels['level12'] === true) {
            this.productRangeGroupA = 4
            this.productRangeGroupB = 4
            this.levels['level12'] = false
        }

        if (player.prestige > 260 && this.levels['level13'] === true) {
            customers.allReceptsHaveToHave.push(basicData.allReceptsName[this.plusNextRecepts])
            this.levels['level13'] = false
            this.plusNextRecepts += 1
            //plus muffin
        }

        if (player.prestige > 280 && this.levels['level14'] === true) {
            this.chanceTwoCustomers = 60
            this.chanceThreeCustomers = 70
            this.chanceFourCustomers = 85
            this.levels['level14'] = false
        }

        if (player.prestige > 300 && this.levels['level15'] === true) {
            this.minTime = 30
            this.levels['level15'] = false
        }

        if (player.prestige > 320 && this.levels['level16'] === true) {
            this.productRangeGroupA = 5
            this.productRangeGroupB = 5
            this.levels['level16'] = false
        }

        if (player.prestige > 340 && this.levels['level17'] === true) {
            customers.allReceptsHaveToHave.push(basicData.allReceptsName[this.plusNextRecepts])
            this.levels['level17'] = false
            this.plusNextRecepts += 1
            //plus zemla
        }

        if (player.prestige > 400 && this.levels['level18'] === true) {
            customers.allReceptsHaveToHave.push(basicData.allReceptsName[this.plusNextRecepts])
            this.levels['level18'] = false
            this.plusNextRecepts += 1
            //donut
        }

        if (player.prestige > 420 && this.levels['level19'] === true) {
            this.chanceTwoCustomers = 55
            this.chanceThreeCustomers = 65
            this.chanceFourCustomers = 80
            this.levels['level19'] = false
        }

        if (player.prestige > 440 && this.levels['level20'] === true) {
            this.minTime = 25
            this.levels['level20'] = false
        }

        if (player.prestige > 480 && this.levels['level21'] === true) {
            customers.allReceptsHaveToHave.push(basicData.allReceptsName[this.plusNextRecepts])
            this.levels['level21'] = false
            this.plusNextRecepts += 1
            //siska
        }

        if (player.prestige > 560 && this.levels['level22'] === true) {
            customers.allReceptsHaveToHave.push(basicData.allReceptsName[this.plusNextRecepts])
            this.levels['level22'] = false
            this.plusNextRecepts += 1
            //toast
        }

        if (player.prestige > 600 && this.levels['level23'] === true) {
            this.chanceTwoCustomers = 50
            this.chanceThreeCustomers = 60
            this.chanceFourCustomers = 75
            this.levels['level23'] = false
        }

        if (player.prestige > 640 && this.levels['level24'] === true) {
            this.productRangeGroupA = 6
            this.productRangeGroupB = 6
            this.levels['level24'] = false
        }

        if (player.prestige > 680 && this.levels['level20'] === true) {
            this.minTime = 20
            this.levels['level20'] = false
        }
    }
}

class SaveAndLoadGame{
    saveGame(){
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

    loadGame(){
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

        for(let i=0; i < Object.keys(storage.allProducts).length; i++){
            let section = Object.keys(storage.allProducts)[i]
            for(let a=0; a < Object.keys(storage.allProducts[section]).length; a++){
                render.preRenderProductOnInfoPanel(Object.keys(storage.allProducts[section])[a], section)
            }
        }

        render.preRenderIngredients(Object.keys(storage.overHeadCosts)[0], storage.overHeadCosts[Object.keys(storage.overHeadCosts)[0]])
        render.preRenderIngredients(Object.keys(storage.overHeadCosts)[1], storage.overHeadCosts[Object.keys(storage.overHeadCosts)[1]])
        render.preRenderMoney()

        for(let i=0; i < Object.keys(storage.ingredients).length; i++){
            let item = Object.keys(storage.ingredients)[i]
            let value = storage.ingredients[Object.keys(storage.ingredients)[i]]
            render.preRenderIngredients(item, value)    
        }

        for(let i=0; i < machines.machines.length; i++){
            render.createMachineElement(machines.machines[i].industryName, machines.machines[i].id)
        }

        for(let i=0; i < customers.customers.length; i++){
            render.createHtmlElementsForCustomer(customers.customers[i])
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

const mytesting = function(){
    let finalMoney = 0
    let pocetZakaznikov = 0
    for(let i=0; i < 100; i++){
        for (let i = 0; i < customers.howManyCustomersAtOnce(); i++) {
            customers.addNewCustomer()
        }
    }

    for(let i=0; i < customers.customers.length; i++){
        finalMoney += customers.customers[i].payMoney
        pocetZakaznikov = i
    }
    console.log('Pocet zakaznikov', pocetZakaznikov + 1)
    console.log('zarobene prachy', finalMoney)
}


let storage = new Storage();
let machines = new Machines();
let basicData = new BasicData();
let render = new Render();
let player = new Player();
let createProduct = new CreateProduct();
let customers = new Customers()
let setGameDifficulty = new SetGameDifficulty()
let saveAndLoadGame = new SaveAndLoadGame()


















