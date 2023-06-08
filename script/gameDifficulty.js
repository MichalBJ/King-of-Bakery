import player from "./player.js";

class SetGameDifficulty {
    constructor() {
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

    levelsUp() {
        if (player.prestige > 20 && this.levels['level1'] === true) {
            this.chanceTwoCustomers = 80
            this.chanceThreeCustomers = 90
            this.levels['level1'] = false
        }

        if (player.prestige > 40 && this.levels['level2'] === true) {
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

        if (player.prestige > 100 && this.levels['level5'] === true) {
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

let setGameDifficulty = new SetGameDifficulty();

export default setGameDifficulty;