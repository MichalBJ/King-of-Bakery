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
        console.log(li.textContent);

        if (li.innerText === 'NOVÁ HRA') {
            console.log(li.textContent);
            gameContainer.style.display = 'block';
            
        }
        
    });
});

/*tlačitka v sekcii game*/

/*tlačitko pre vyber produktu*/
document.querySelectorAll('.machine-body').forEach(function (item) {
    let menu = item.querySelector('.menu');
    let toggle = item.querySelector('.toggle');

    toggle.addEventListener('click', function () {
    menu.classList.toggle('active');
    })
})



/*skuska animacie progresbaru*/
let machineBody = document.querySelector('.machine-body');
let startButton = machineBody.querySelector('button');
let progresBar = machineBody.querySelector('.progres-bar');
let progresLine = machineBody.querySelector('.line');


startButton.addEventListener('click', function () {
    startButton.style.display = 'none';
    progresBar.style.display = 'flex';
    let rychlost = parseInt(10000 / progresBar.offsetWidth);
    let cas = machineBody.querySelector('.cas span');
    let newWidth = 0;
    let newCas = 10;

    console.log('hodnota', parseInt(1000 / progresBar.offsetWidth))
    console.log('rychlost', rychlost)

    let progresanimation = setInterval(() => {
        newWidth += 1;
        if (newWidth % (parseInt(1000 / rychlost ) - 1) === 0){
            newCas -= 1;
            cas.innerText = newCas;
            console.log('newcas', newCas)
        }
            
        if (newWidth < progresBar.offsetWidth){
        progresLine.style.width = newWidth.toString() + 'px';
        console.log(progresLine.style.width)
        }
        else {  
            clearInterval(progresanimation)
            startButton.style.display = 'block';
            progresBar.style.display = 'none';
            progresLine.style.width = '0';
        }
    }, rychlost);
})


/**animacia tlačitka pre uloženie hry */
document.querySelector(".show-button-save").addEventListener("click", function () {
    document.querySelector(".show-button-save").classList.toggle('rotate-button');
    document.querySelector(".save-game").classList.toggle('anim-save-game');
    document.querySelector(".save-game > h5").classList.toggle('show-text'); 
});





console.log(window.screen.availWidth)