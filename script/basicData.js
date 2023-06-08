class BasicData {
    constructor() {
        this.id;
        this.machines = {
            'mixerSHM200': {
                'machineName': 'Mixer SHM 200',
                'industryName': 'mixerSHM200',
                'price': 55,
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
            'theRent': {
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
            'rohlik': {
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
            'bageta': {
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
            'muffin': {
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

let basicData = new BasicData();

export default basicData;