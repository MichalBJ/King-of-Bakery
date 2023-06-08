import basicData from "./basicData.js";
import render from "./render.js";

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
        if (this.mixers.length > 0) {
            this.mixers.pop();
        } else {
            console.log('Nemaš žiadne mixery');
        }
    }

    buyNewDispenser(dispenserName) {
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

let machines = new Machines();

export default machines;