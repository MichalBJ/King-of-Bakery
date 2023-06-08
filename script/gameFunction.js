import basicData from "./basicData.js";
import createProduct from "./createProduct.js";
import customers from "./customers.js";
import setGameDifficulty from "./gameDifficulty.js";
import machines from "./machines.js";
import player from "./player.js";
import render from "./render.js";
import storage from "./storage.js";


const consumptionTheRent = function () {
    let lastTime = 3;
    setInterval(() => {
        let rent = storage.overHeadCosts['theRent']
        rent = rent - (1 / 60 / 10);
        storage.overHeadCosts['theRent'] = rent;
        render.preRenderIngredients('theRent', (Math.floor(rent) + 1));
        if (rent < 0) {
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

const mytesting = function () {
    let finalMoney = 0
    let pocetZakaznikov = 0
    for (let i = 0; i < 100; i++) {
        for (let i = 0; i < customers.howManyCustomersAtOnce(); i++) {
            customers.addNewCustomer()
        }
    }

    for (let i = 0; i < customers.customers.length; i++) {
        finalMoney += customers.customers[i].payMoney
        pocetZakaznikov = i
    }
}

/* Funkcie pre sekciu SKLAD */

/* Nakup strojov */
document.querySelectorAll('.machine .button-wraper .buy-button').forEach(function (button) {
    let btn = button

    btn.addEventListener('click', function () {
        if (btn.title.slice(0, 1) === 'm') {

            if (storage.money >= basicData.machines[btn.title]['price']) {
                machines.buyNewMixer(btn.title);
                storage.removeMoney(basicData.machines[btn.title]['price']);
            } else {
                alert("Nemaš dostatok peňazi");
            }

        } else if (btn.title.slice(0, 1) === 'd') {

            if (storage.money >= basicData.machines[btn.title]['price']) {
                machines.buyNewDispenser(btn.title);
                storage.removeMoney(basicData.machines[btn.title]['price']);
            } else {
                alert("Nemaš dostatok peňazi");
            }

        } else if (btn.title.slice(0, 1) === 'o') {
            if (storage.money >= basicData.machines[btn.title]['price']) {
                machines.buyNewOwen(btn.title);
                storage.removeMoney(basicData.machines[btn.title]['price']);
            } else {
                alert("Nemaš dostatok peňazi");
            }

        }
    })


})

/* Nakup ingrediencii a režnych nakladov */
player.setValueOfQuantity()
player.buyIngrediens();
player.buyOverHeadCoast();
player.buyRecept();



consumptionTheRent()

//gameFunction.selectItemToMade()

setInterval(() => {
    createProduct.processOfMaking()
    customers.timerToNewCustomer()
    customers.customerLife()
    setGameDifficulty.levelsUp()

}, 1000);



console.log(window.screen.availWidth)