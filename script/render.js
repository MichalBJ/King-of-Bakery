import basicData from "./basicData.js";
import customers from "./customers.js";
import player from "./player.js";
import machines from "./machines.js";
import createProduct from "./createProduct.js";
import storage from "./storage.js";

class Render {
    preRenderMoney() {
        document.querySelector('.money').textContent = storage.money.toFixed(2);
    }

    createElement(element, className, text) {
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

        for (let i = 0; i < 10; i++) {
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

        for (let i = 0; i < li.length; i++) {
            li[i].style = "--i:" + i + ";"
        }

        for (let i = 0; i < a.length; i++) {
            a[i].href = "#"
            a[i].title = basicData.allReceptsName[i]
        }

        for (let i = 0; i < img.length; i++) {
            if (i < player.haveRecepts.length) {
                img[i].src = "img/products/" + player.haveRecepts[i] + ".jpg"
                img[i].title = player.haveRecepts[i]
            } else {
                img[i].src = "img/products/noproduct.jpg";
                img[i].title = 'noProduct'
            }
        }

        a.forEach(function (button) {
            button.addEventListener('click', function () {
                let img = button.querySelector('img')
                if (img.title != 'noProduct') {
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

        for (let i = 0; i < a.length; i++) {
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

    preRenderIngredients(item, newValue) {
        document.querySelectorAll('.' + item).forEach(function (item) {
            item.textContent = newValue.toFixed(2)
        });
    }

    preRenderProductOnInfoPanel(item, whatTypeRender) {
        if (typeof (i) === 'number') {
            document.querySelector('.' + whatTypeRender + '-' + item).textContent = storage.allProducts[whatTypeRender][item]
        } else {
            document.querySelector('.' + whatTypeRender + '-' + item).textContent = storage.allProducts[whatTypeRender][item]
        }
    }

    createHtmlElementsForCustomer(customer) {
        let shopSection = document.querySelector('.shop')
        let customerBody = this.createElement('div', 'customer', '')
        let customerHeader = this.createElement('div', 'customer-header', '')
        let foto = this.createElement('img', 'none', '')
        let nameWanted = this.createElement('div', 'name-wanted', '')
        let customerName = this.createElement('h3', 'none', customer.name)
        let p1 = this.createElement('p', 'none', 'Požaduje: ')
        let order = this.createElement('div', 'wanted', '')
        let requirementsLi = []
        for (let i = 0; i < Object.keys(customer.wanted).length; i++) {
            let li = this.createElement('li', 'wanted-' + Object.keys(customer.wanted)[i], '')
            requirementsLi.push(li)
        }
        let p2 = this.createElement('p', 'none', 'Hodnota nakupu: ')
        let span2 = this.createElement('span', 'oreder-price', customer.payMoney.toFixed(2))
        let p3 = this.createElement('p', 'time-leave', 'Odide za: ')
        let span3 = this.createElement('span', 'oreder-time-remaining', customer.timeRemaining)
        let button = this.createElement('button', 'btn-sell-products', 'Predať')

        customerBody.id = customer.id
        foto.src = customer.foto

        for (let i = 0; i < requirementsLi.length; i++) {
            requirementsLi[i].innerHTML = `${Object.keys(customer.wanted)[i]} <span>${customer.wanted[Object.keys(customer.wanted)[i]]}</span> ks`
        }

        for (let i = 0; i < requirementsLi.length; i++) {
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

    preRenderPrestige() {
        document.querySelector('.prestige').textContent = player.prestige
    }

    newCustomerAlertElement() {
        let shopButton = document.querySelector('[title="shop"]');
        let customerAlert = this.createElement('div', 'customer-alert', '');
        let p = this.createElement('p', 'none', '+1')
        customerAlert.appendChild(p)
        shopButton.append(customerAlert)
    }

    removeNewCustomerAlertElement() {
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

    preRenderProductImage() {
        for (let i = 0; i < machines.machines.length; i++) {
            let machine = document.getElementById(machines.machines[i].id)
            let receptImage = 0
            machine.querySelectorAll('.menu li a img').forEach(function (image) {
                if (receptImage < player.haveRecepts.length) {
                    image.src = "img/products/" + player.haveRecepts[receptImage] + ".jpg"
                    image.title = player.haveRecepts[receptImage]
                    receptImage += 1
                } else {
                    image.src = "img/products/noproduct.jpg";
                    image.title = 'noProduct'
                    receptImage += 1
                }
            })
        }
    }

    saveSuccesAlert() {
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

let render = new Render();

export default render;