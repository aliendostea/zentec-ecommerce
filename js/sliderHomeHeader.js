
const DOMStringSliders ={
    boxChangeImg: '#headerBoxImg',
    btnDots: '.slider__box-dots__btn',
    btnDotsActive: 'slider__box-dots--active',
    btnSlider: 'slider-btn',
    numberCurrentCarousel: '#sliderNumbersCurrent',
    spanWrapperTittle: '#spanWrapperTittle',
    spanLettersTittle: '#spanLettersTittle'
}

var slide = 0,
    slides = document.querySelectorAll(`${DOMStringSliders.boxChangeImg}> img`),
    numSlides = slides.length,

    //Functions!!
    currentSlide = function () {
        var itemToShow = Math.abs(slide % numSlides);
        [].forEach.call(slides, function (el, index) {
            // console.log('-------------------- show', index); ///// esto se muestra como 4 veces a la vez en la consola.log

            sliderboxDotsChangeCurrent(itemToShow);
            functionChangeNumberSlider(itemToShow);
            addDisplayNoneToTitleFunction(index);        
            el.classList.add('display-none-important'); ////slideActive este es el que se le pone el display none para quitarlo y poner el otro
        });

        addClassToTitleFunction(itemToShow);        
        addClassToImgFunction(slides[itemToShow]);
        resetProgress();
        resetInterval();
    },
    next = function () {
        slide++;
        currentSlide();
    },
    prev = function () {
        slide--;
        currentSlide();
    },
    resetProgress = function () {
        var elm = document.querySelector('.slider__progressbar__item'),
            newone = elm.cloneNode(true),
            x = elm.parentNode.replaceChild(newone, elm);
    },
    resetslide = function () {
        var elm = document.querySelector(`${DOMStringSliders.boxChangeImg}> img`),
            newone = elm.cloneNode(true),
            x = elm.parentNode.replaceChild(newone, elm);
    },
    resetInterval = function () {
        clearInterval(autonext);
        autonext = setInterval(function () {
            slide++;
            currentSlide();
        }, 10000);
    },
    autonext = setInterval(function () {
        next();
    }, 10000);

function addClassToImgFunction(currentElementShow) {
    currentElementShow.classList.remove('display-none-important');
    currentElementShow.classList.add('fade-in');    
}

function addClassToTitleFunction(currentElementShow ) {
    document.querySelector(DOMStringSliders.spanWrapperTittle).children[currentElementShow].classList.remove('display-none-important');
    document.querySelector(DOMStringSliders.spanWrapperTittle).children[currentElementShow].classList.add('fade-in');
    document.querySelector(DOMStringSliders.spanWrapperTittle).children[currentElementShow].classList.add('slide-top');
}
function addDisplayNoneToTitleFunction(numbCurrent) {
    //  numbCurrent = numbCurrent - 1;
      document.querySelector(DOMStringSliders.spanWrapperTittle).children[numbCurrent].classList.add('display-none-important');
      document.querySelector(DOMStringSliders.spanWrapperTittle).children[numbCurrent].classList.remove('slide-top');

    /*
     console.log(document.querySelector(DOMStringSliders.spanWrapperTittle).lastElementChild);
    
    numbCurrent = numbCurrent - 1;

    if (numbCurrent == -1) {
        console.log('es -1   ----------', document.querySelector(DOMStringSliders.spanWrapperTittle).children);
        // document.querySelector(DOMStringSliders.spanWrapperTittle).children[numbCurrent].classList.add('display-none-important');
        numbCurrent = 0;
        document.querySelector(DOMStringSliders.spanWrapperTittle).lastElementChild.classList.add('display-none-important');
    } else {
        console.log('es otro ----------', numbCurrent);
        document.querySelector(DOMStringSliders.spanWrapperTittle).children[numbCurrent].classList.add('display-none-important');
    }
    */
    
}

function functionChangeNumberSlider(numbCurrent) {
    document.querySelector(`${DOMStringSliders.numberCurrentCarousel}`).innerHTML = numbCurrent +1;
}

function sliderboxDotsChangeCurrent(numbCurrent) {
    document.querySelector(`.${DOMStringSliders.btnDotsActive}`).classList.remove(`${DOMStringSliders.btnDotsActive}`);
    document.querySelector(`.slider__box-dots`).children[numbCurrent].classList.add(`${DOMStringSliders.btnDotsActive}`);
}

let allDotsSlidersNodes = document.querySelectorAll(DOMStringSliders.btnDots);
let allDotsSlidersArray = Array.prototype.slice.call(allDotsSlidersNodes);

allDotsSlidersArray.forEach((element, index) => {
    element.addEventListener('click', function () {
        slide = index;
        document.querySelector(`.${DOMStringSliders.btnDotsActive}`).classList.remove(`${DOMStringSliders.btnDotsActive}`);
        element.classList.add(`${DOMStringSliders.btnDotsActive}`); 
        currentSlide();
    }, false);    
});



let allBtnSliderNodes = document.querySelectorAll("[id^='slider-btn']");
let btnNexPrevious = Array.prototype.slice.call(allBtnSliderNodes);

btnNexPrevious.forEach((element, index, array) => {
    element.addEventListener('click', function () {

        if (array[0].id === element.id) {
            prev();
        } else if (array[1].id === element.id) {
            next();
        }

    }, false);
});




/*


var slide = 0,
    slides = document.querySelectorAll('#slides > li'),
    numSlides = slides.length,

    //Functions!!
    currentSlide = function () {
        var itemToShow = Math.abs(slide % numSlides);
        [].forEach.call(slides, function (el) {
            el.classList.remove('slideActive')
        });
        slides[itemToShow].classList.add('slideActive');
        resetProgress();
        resetInterval();
    },
    next = function () {
        slide++;
        currentSlide();
    },
    prev = function () {
        slide--;
        currentSlide();
    },
    resetProgress = function () {
        var elm = document.querySelector('.progressbar'),
            newone = elm.cloneNode(true),
            x = elm.parentNode.replaceChild(newone, elm);
    },
    resetslide = function () {
        var elm = document.querySelector('#slides > li'),
            newone = elm.cloneNode(true),
            x = elm.parentNode.replaceChild(newone, elm);
    },
    resetInterval = function () {
        clearInterval(autonext);
        autonext = setInterval(function () {
            slide++;
            currentSlide();
        }, 10000);
    },
    autonext = setInterval(function () {
        next();
    }, 10000);



*/

//Buttons
/*
document.querySelector('#first').addEventListener('click', function () {
    slide = 0;
    currentSlide();
}, false);
document.querySelector('#second').addEventListener('click', function () {
    slide = 1;
    currentSlide();
}, false);
document.querySelector('#third').addEventListener('click', function () {
    slide = 2;
    currentSlide();
}, false);
document.querySelector('#fourth').addEventListener('click', function () {
    slide = 3;
    currentSlide();
}, false);
document.querySelector('#fifth').addEventListener('click', function () {
    slide = 4;
    currentSlide();
}, false);
document.querySelector('#sixth').addEventListener('click', function () {
    slide = 5;
    currentSlide();
}, false);
*/


/*
document.querySelector('#slider-btn-next').addEventListener('click', function () {
    next();
}, false);
document.querySelector('#slider-btn-previous').addEventListener('click', function () {
    prev();
}, false);
*/