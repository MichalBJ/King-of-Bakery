import basicData from "./basicData.js";
import render from "./render.js";
import storage from "./storage.js";

class Player {
    constructor() {
        this.prestige = 0;
        this.haveRecepts = ['chlieb', 'rohlik', 'bageta']
    }

    addPrestige(howMany) {
        this.prestige += howMany
        render.preRenderPrestige()
    }

    removePrestige(howMany) {
        this.prestige -= howMany
        render.preRenderPrestige()
    }

    setValueOfQuantity() {
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

    ingrdiensCheckMoney(item, count) {
        let mustPay = basicData.ingredients[item]['price'] * count;
        if (storage.money >= mustPay) {
            return mustPay;
        }
    }

    buyIngrediens() {
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

    buyOverHeadCoast() {
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

    checkMoneyForRecept(receptName) {
        console.log('meno', receptName)
        if ((storage.money - basicData.recepts[receptName]['price']) >= 0) {
            return true
        }
    }

    buyRecept() {
        let user = this
        document.querySelectorAll('.recept').forEach(function (recept) {
            const lastItem = recept.querySelector('.recept-body').children[recept.querySelector('.recept-body').children.length - 1]

            if (lastItem.classList.contains('button-buy-recept')) {
                const buttonBuy = recept.querySelector('.button-buy-recept')
                console.log('tlacitko', buttonBuy)
                buttonBuy.addEventListener('click', function () {

                    let permission = user.checkMoneyForRecept(buttonBuy.title)
                    if (permission) {
                        user.haveRecepts.push(buttonBuy.title)
                        storage.removeMoney(basicData.recepts[buttonBuy.title]['price'])
                        buttonBuy.style.display = 'none'
                        render.preRenderProductImage()
                    } else {
                        alert('nemaš dosť penazi')
                    }
                })
            }
        })
    }
}

let player = new Player();

export default player;