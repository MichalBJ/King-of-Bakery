import machines from "./machines.js";
import render from "./render.js";
import saveAndLoadGame from "./saveAndLoadGame.js";

const settingNewGame = function () {
    machines.buyNewMixer('mixerSHM200')
    machines.buyNewDispenser('dispenserDRC200')
    machines.buyNewOwen('owenHLN200')
    render.preRenderIngredients("eggs", 0)
}

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
            settingNewGame();
            
        } else if (li.innerText === 'POKRAČOVAŤ'){
            gameContainer.style.display = 'block';
            saveAndLoadGame.loadGame()
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


/*animacia tlačitka pre uloženie hry a samotne ulozenie */
document.querySelector(".show-button-save").addEventListener("click", function () {
    document.querySelector(".show-button-save").classList.toggle('rotate-button');
    document.querySelector(".save-game").classList.toggle('anim-save-game');
    document.querySelector(".save-game > h5").classList.toggle('show-text'); 
});

document.querySelector('.save-game').addEventListener('click', function () {
    saveAndLoadGame.saveGame()
    
})


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
        
        if (document.querySelector('[title="' + item.title + '"]').title === 'shop'){
            render.removeNewCustomerAlertElement()
        }

        
    })
})

