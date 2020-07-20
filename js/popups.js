
openPopupOverlay = () => {
    let popupOverlay = document.querySelector('.popup-overlay');
    popupOverlay.classList.add('popup-overlay--active');
    closePopupWithKeydownFunction(popupOverlay, 'popup-overlay--active');
}

function closePopupOverlayOnclick (e) {

    if (e.target.id.includes(this.id) || e.target.id === 'popup-btn-x' || e.target == this.querySelector('button.btn-round span')) {
        this.classList.remove('popup-overlay--active');
    }
    closePopupWithKeydownFunction(this, 'popup-overlay--active');
   
};

function openNavAsideOverlay () {
    let navAsideOverlay, allLinksArray, allLinksNodes, navAsideHtml;
    
    navAsideOverlay = document.querySelector('#nav-aside-overlay');
    navAsideOverlay.classList.add('nav-aside__overlay--active');
    navAsideOverlay.children[0].classList.add('nav-aside--active');
    
    console.log(navAsideOverlay.firstElementChild);
    /// se llama a la function del html navAside 
    navAsideHtml = navAsideHtmlFunction();

    /// se insertan en el html con innerHTML en el padre de los elementos, todos los elementos del nav
    navAsideOverlay.firstElementChild.innerHTML = navAsideHtml;

    allLinksNodes = document.querySelectorAll('.nav-aside__link');
    allLinksArray = Array.prototype.slice.call(allLinksNodes);

    allLinksArray.forEach((element, index) => {
         element.children[0].classList.add('link-span-nav-aside');
    });

    closePopupWithKeydownFunction(navAsideOverlay, 'nav-aside__overlay--active');
}
function navAsideHtmlFunction() {
    return `
            <div class="nav-aside__redes">
                <a href="https://www.instagram.com/somoszentec/" class="btn btn__link">
                        <img src="/img/icon-instagram.svg" alt="instagram Zentec">
                </a>
                <a href="https://www.instagram.com/somoszentec/" class="btn btn__link">
                    <img src="/img/icon-facebook.svg" alt="facebook Zentec">
                </a>
            </div>
            <a href="/index.html" class="nav-aside__link"><span>Home</span></a>
            <a href="/index.html#about-us" class="nav-aside__link"><span>¿Quienes somos?</span></a>
            <a href="/products/index.html" class="nav-aside__link"><span>Productos</span></a>
            <a href="/contact.html" class="nav-aside__link"><span>Contactar</span></a>
            <div class="nav-aside__box">
                <span class="paragraph">Llámanos al:</span>
                <span class="nav-aside__numbers">+58 (241) 814 29 13 <br> +58 (414) 018 08 38</span>
            </div>
            <button id="nav-aside-btn-x" class="btn btn-round"><span class="btn-round__lines-x"></span></button>
            <img class="nav-aside__logo" src="/img/zentec-logo-brown.svg" alt="Logo Zentec">
            `;
}


function closeNavAsideOverlay(e) {
    let allLinksNodes;
    if (e.target.id.includes(this.id) || e.target.id === 'nav-aside-btn-x' || e.target == this.querySelector('button.btn-round span')) {
        ////se puede hacer una function que cierre todos los popups, se le pasa la clase y el elemento
        this.classList.remove('nav-aside__overlay--active');
        this.children[0].classList.remove('nav-aside--active');

        allLinksNodes = document.querySelectorAll('.nav-aside__link');
        allLinksArray = Array.prototype.slice.call(allLinksNodes);

        allLinksArray.forEach((element, index) => {
            element.children[0].classList.remove('link-span-nav-aside');
        });
    }
}

document.querySelector('#btn-nav-hamb').addEventListener('click', openNavAsideOverlay);
document.querySelector('#nav-aside-overlay').addEventListener('click', closeNavAsideOverlay);


/// esto esta puesto en linea en el html contact. ¡¡QUITAR!!
// document.querySelector('.popup-overlay').addEventListener('click', closePopupOverlayOnclick);



///// star - function para cerrar popup con tecla esc
function closePopupWithKeydownFunction(popupOverlay, classActive) {
    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.keyCode === 27 && popupOverlay != null) {
            ///se puede hacer una function para que cierre todos los popups con ESC
            popupOverlay.classList.remove(classActive);
        }
    };
}
//// end - function para cerrar popup con tecla esc