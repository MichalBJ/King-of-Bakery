/*ovladanie tlačidiel uvodneho menu */
document.querySelectorAll(".main-menu > ul > li").forEach(function (li) {
    li.addEventListener('mouseover', function (ev) {
        let imgLeft = li.querySelector(".img-ornament-left");
        let imgRight = li.querySelector(".img-ornament-right");

        imgLeft.style.opacity = 1;
        imgRight.style.opacity = 1;

    });

    li.addEventListener('mouseout', function (ev) {
        let imgLeft = li.querySelector(".img-ornament-left");
        let imgRight = li.querySelector(".img-ornament-right");

        imgLeft.style.opacity = 0;
        imgRight.style.opacity = 0;
    });

    li.addEventListener('click', function () {
        let menuContainer = document.querySelector('.menu-container');
        let gameContainer = document.querySelector('.game-container');

        menuContainer.style.display = 'none';
        gameContainer.style.display = 'none';

        if (li.innerText === 'NOVÁ HRA') {
            gameContainer.style.display = 'block';
            settingNewGame()
            
        }
        
    });
});

/*tlačitka v sekcii game*/

/*tlačitko pre vyber produktu*/
document.querySelectorAll('.machine-body').forEach(function (item) {
    let menu = item.querySelector('.menu');
    let toggle = item.querySelector('.menu .toggle');

    toggle.addEventListener('click', function () {
        menu.classList.toggle('active');
    })
})



/*skuska animacie progresbaru*/
document.querySelectorAll('.machine-body').forEach(function (body) {
    let btn = body.querySelector('button');
    let progresBar = body.querySelector('.progres-bar');
    let progresLine = body.querySelector('.line');

    btn.addEventListener('click', function () {
        btn.style.display = 'none';
        progresBar.style.display = 'flex';
        let rychlost = parseInt(10000 / progresBar.offsetWidth);
        let cas = body.querySelector('.cas span');
        let newWidth = 0;
        let newCas = 20;

        console.log('hodnota', parseInt(1000 / progresBar.offsetWidth))
        console.log('rychlost', rychlost)

        let progresanimation = window.setInterval(() => {
            newWidth += 1;
            if (newWidth % (parseInt(1000 / rychlost) - 1) === 0) {
                newCas -= 1;
                cas.innerText = newCas;
                console.log('newcas', newCas)
            }

            if (newWidth < progresBar.offsetWidth) {
                progresLine.style.width = newWidth.toString() + 'px';
                console.log(progresLine.style.width)
            }
            else {
                clearInterval(progresanimation)
                btn.style.display = 'block';
                progresBar.style.display = 'none';
                progresLine.style.width = '0';
            }
        }, rychlost);
    })
})



/*animacia tlačitka pre uloženie hry */
document.querySelector(".show-button-save").addEventListener("click", function () {
    document.querySelector(".show-button-save").classList.toggle('rotate-button');
    document.querySelector(".save-game").classList.toggle('anim-save-game');
    document.querySelector(".save-game > h5").classList.toggle('show-text'); 
});


/*spušťanie rolety v sekcii sklad */
document.querySelectorAll(".wraper-in-storage").forEach(function (item) {
    let wrap = item;
    let toggle = item.querySelector('.caret');

    toggle.addEventListener('click', function () {
        wrap.classList.toggle('rollete');
        toggle.classList.toggle('caret-rotate')
    })
})


/* prepinanie sekcii pekareň, sklad, predjňa */
document.querySelectorAll(".in-game-nav ul li").forEach(function (item) {

    item.addEventListener('click', function () {

        let switchSection = '.' + item.title;

        document.querySelector(".bakery").style.display = 'none';
        document.querySelector(".storage").style.display = 'none';
        document.querySelector(".shop").style.display = 'none';
        document.querySelector(switchSection).style.display = 'grid';      
    })
})


/* Funkcie pre sekciu SKLAD */

/* Nakup strojov */
document.querySelectorAll('.machine .button-wraper .buy-button').forEach(function (button) {
    let btn = button

    btn.addEventListener('click', function () {
        if (btn.title.slice(0, 1) === 'm'){

            if (storage.money >= basicData.machines[btn.title]['price']){
                machines.buyNewMixer(btn.title);
                storage.removeMoney(basicData.machines[btn.title]['price']);
            }else {
                alert("Nemaš dostatok peňazi");
            }
            
        } else if (btn.title.slice(0, 1) === 'd'){

            if (storage.money >= basicData.machines[btn.title]['price']) {
                machines.buyNewDispenser(btn.title);
                storage.removeMoney(basicData.machines[btn.title]['price']);                
            } else {
                alert("Nemaš dostatok peňazi");
            }
            
        } else if (btn.title.slice(0, 1) === 'o'){
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


//consumptionTheRent()

//gameFunction.selectItemToMade()

setInterval(() => {
    createProduct.processOfMaking()

}, 1000);



console.log(window.screen.availWidth)