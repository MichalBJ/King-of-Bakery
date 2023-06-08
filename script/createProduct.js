import machines from "./machines.js";
import basicData from "./basicData.js";
import storage from "./storage.js";

class CreateProduct {
    constructor() {
        this.newWidth = 0
        this.offsetWidth = 150
    }

    selectItemToMade(par) {
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

    switchImageText(id) {
        document.querySelector('[id="' + id + '"] .actual-doing img').style.display = 'none'
        document.querySelector('[id="' + id + '"] .actual-doing h4').style.display = 'block'
    }

    checkIngrediensForDough(machine) {
        let permission = false;
        for (const property in basicData.recepts[machine.create]) {
            if (property === 'kneading') {
                break
            }

            const result = storage.ingredients[property] - (basicData.recepts[machine.create][property] * machine.doAtOnce)

            if (result >= 0) {
                permission = true
            } else {
                permission = false
                alert('Maš nedostatok: ' + property)
                break
            }
        }

        if (permission) {
            const electricity = storage.overHeadCosts['electricity'] - (machine.consumption * (basicData.recepts[machine.create]['kneading'] / 60))

            if (electricity >= 0) {
                permission = true;
            } else {
                permission = false;
                alert('Nemaš dostatok elektriky')
            }
        }
        return permission
    }

    checkDoughForTheTray(machine) {
        const electricity = storage.overHeadCosts['electricity'] - (machine.consumption * (basicData.recepts[machine.create]['dosing'] / 60))
        const result = storage.allProducts['dough'][machine.create] - machine.doAtOnce
        if (result >= 0 && electricity >= 0) {
            return true
        }
    }

    checkTheTrayForFinalProduct(machine) {
        const electricity = storage.overHeadCosts['electricity'] - (machine.consumption * (basicData.recepts[machine.create]['baking'] / 60))
        const result = storage.allProducts['theTray'][machine.create] - machine.doAtOnce
        if (result >= 0 && electricity >= 0) {
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

                for (let property in basicData.recepts[machine.create]) {
                    if (property === 'kneading') {
                        break
                    } else {
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

    processOfMaking() {
        for (let i = 0; i < machines.machines.length; i++) {
            if (machines.machines[i].working) {
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

                if (machines.machines[i].finishTime === 0) {
                    machines.machines[i].working = false;
                    btn.style.display = 'block';
                    progresBar.style.display = 'none';
                    machines.machines[i].progresLineWidth = 0;
                    this.switchImageText(machines.machines[i].id)

                    if (machines.machines[i].producting === 'finalProduct') {
                        let item = machines.machines[i].create
                        let howMany = basicData.recepts[machines.machines[i].create]['numberOfPieces'] * machines.machines[i].doAtOnce
                        storage.addFinallProducts(item, howMany)

                    }
                    if (machines.machines[i].producting === 'dough') {
                        storage.addDough(machines.machines[i].create, machines.machines[i].doAtOnce)
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

let createProduct = new CreateProduct();

export default createProduct;