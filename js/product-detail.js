console.log('start product detail,js');

 const DOMstring = {       
        productDetail: {
            parentDetail: '#parentDetail',
            name: 'nameProduct',
            number: 'numberProduct',
            category:{
                ID: {
                    cables: 'CAB',
                    bulb: 'BOM',
                    lamp: 'LAM'
                }
            },
            color: {
                parent: '#productInfoColor',
                childText: 'productInfoColorText',
                colorActive: 'product-detail__color-item--active',
                color1: '%infoColor-1%',
                color2: '%infoColor-2%',
                color3: '%infoColor-3%',
                id:{
                    CAB: 'CAB',
                    BOM: 'BOM',
                    other: '----1',
                }
            },
            price: 'priceProduct',
            info: {
                itemsInfoParent: '#itemsInfoParent',
                parentDescription: '#infoDescriptionParent',
                description: 'infoDescription',
                size: 'infoSize',
                watt: {                    
                    parent: '#productInfoWatt', 
                    wattActive: 'product-detail__watt-item--active'
                }
            },
            images: {
                primaryParent:'#primaryImgParent',
                primary: 'imagePrimary',
                secundaryParent: 'secundaryImgParent',
                secundary:[
                    'imageSecundary',
                    'imageTertiary',
                    'imageQuarter',
                    'imageFifth',
                ]
            },
            navtopLinkCurrent: '#navtopLinkCurrent'
        }
    }

    class Product {
        constructor(element) {
            this.setId(element);
            this.setName(element);
            this.setSubname(element);
            this.setNumber(element);
            this.setPrice(element);
            this.setColor(element);
            this.setWatt(element);
            this.setInfo(element);
            this.setImages(element);
        }

        setId(element) {
            this.verifyExists('id', element);
            this.id = element.id;
        }

        setName(element) {
            this.verifyExists('name', element);
            this.name = element.name;
        }

        setSubname(element) {
            if (this.verifyExists('subname', element)) {
                this.subname = element.subname;

            } else {
                this.subname = undefined;
                // console.log(' 11111', this.name);
            }
        }

        setNumber(element) {
            if (this.verifyExists('number', element)) {
                this.number = element.number;
            } else {
                this.number = null;
            }
            // this.verifyExists('number', element);
            // this.number = element.number;
        }

        setPrice(element) {
            this.verifyExists('price', element);
            this.price = element.price;
        }

        setColor(element) {
            if (this.verifyExists('color', element)) {
                this.color = element.color;
            } else {
                this.color = undefined;  
            }
        }
        setWatt(element) {
            if (this.verifyExists('watt', element.info)) {
                this.watt = element.info.watt;
            } else {
                this.watt = undefined;
            }
        }

        setInfo(element) {
            this.verifyExists('info', element);
            this.info = element.info;
        }
        setDescription(element) {
            if (this.verifyExists('brand', element.info)) {
                this.description = element.info.description;
            } else {
                this.description = 'No description';
            }
        }        

        setImages(element) {
            this.verifyExists('images', element);
            this.images = element.images;
        }

        verifyExists(field, element) {
            try {
                // console.log('ifNotExistsThrowError ' + field);
                let exists = this.ifNotExistsThrowError(field, element);
                // console.log(exists);
                return exists;
            } catch (error) {
                // console.log(false);
                return false;
            }
        }
        ifNotExistsThrowError(field, element) {
            if (element.hasOwnProperty(field) && element[field] !== undefined && element[field] !== null && element[field] !== "" && element[field] !== []) {
                return true;
            }
            throw Error('Product property not found: ' + field);
        }
        validateForRender(valueObj) {
            if (valueObj !== undefined && valueObj !== null && valueObj !== '' && valueObj !== []) {
                return true;
            } else {
                return false;
            }
        }
        functionChangeColorOnclick(e) {
            if (e.target.id.startsWith(DOMstring.productDetail.color.id.CAB)) {
                document.querySelector(`.${DOMstring.productDetail.color.colorActive}`).classList.remove(DOMstring.productDetail.color.colorActive);
                e.target.classList.add(DOMstring.productDetail.color.colorActive);
                document.querySelector(`#${DOMstring.productDetail.color.childText}`).innerHTML = e.target.id;
            }
        }
        functionChangeCirclesOnclick(e, classActiveElement) {
            let dataIndex;

             ////// si el ID empieza con CAB o BOM o LAM entra en el if
             if (e.target.id.startsWith(DOMstring.productDetail.category.ID.lamp) || e.target.id.startsWith(DOMstring.productDetail.category.ID.bulb) || e.target.id.startsWith(DOMstring.productDetail.category.ID.cables)) {

                /// se agarra el data-index del e.target 
                dataIndex = e.target.getAttribute("data-index");
                /// se remueve la clase classActiveElement del elemento
                document.querySelector(`.${classActiveElement}`).classList.remove(classActiveElement);
                /// se añade la clase classActiveElement al elemento donde se le dio click
                e.target.classList.add(classActiveElement);

                /// queryselector al number, price, color para hacer un innerHtml de la data real del object producto
                            /////hay que cambiar el productDetail.number por subname, es confuso    
                if (this.subname !== undefined && this.subname !== null) document.querySelector(`#${DOMstring.productDetail.number}`).innerHTML = this.subname[dataIndex];
                document.querySelector(`#${DOMstring.productDetail.price}`).innerHTML = '$'+this.price[dataIndex];

                //// si this.color existe se llama a la function validateColorForRender para que imprima,cambie los colores con la data nueva del onclick
                this.validateColorForRender(dataIndex);
             }
        }
        callAddEventListenerForButtons(htmlParentElement, classActiveElement) {
            let thisElementObject = this;
            htmlParentElement.addEventListener('click', function (e) {                
                thisElementObject.functionChangeCirclesOnclick(e, classActiveElement);
            }, false); 
        }
        validateWattForRender() {
            // let thisWatts = this.watt;
            let classActiveElement = DOMstring.productDetail.info.watt.wattActive;
            let htmlWattParent = document.querySelector(DOMstring.productDetail.info.watt.parent);
            let htmlTitleWatt, htmlWatt, newHtmlWatt;

                if (this.watt !== undefined && Array.isArray(this.watt) && this.watt !== '') {
               
                    htmlWattParent.classList.add('product-detail__watt');

                    htmlTitleWatt = this.getHtmlDetailTitleWatt();
                    htmlWattParent.insertAdjacentHTML('beforeend', htmlTitleWatt);

                    this.watt.forEach((element, index) => {

                         htmlWatt = this.getHtmlDetailNewWatt(index);
                         newHtmlWatt = htmlWatt.replace(`%watt-${index}%`, this.watt[index]);

                         /// este ID se inserta separado por espacios
                         newHtmlWatt = newHtmlWatt.replace(`%itemWatt-${index}%`, this.subname[index]); 
                         htmlWattParent.insertAdjacentHTML('beforeend', newHtmlWatt);
                    });
                            
                    htmlWattParent.children[1].classList.add(classActiveElement);   
                    
                    //// llame al padre con un addEventListener on click 
                    this.callAddEventListenerForButtons(htmlWattParent, classActiveElement);
                }
        }
        validateNumberCableForRender() {
            // Array.isArray(this.number)
                
                //// se verifica si existe el object con el if
            if (this.number !== undefined && this.number !== null && this.number !== '') {
                //// se declaran las variables a usar y el padre del elemento para insertar el html
                let htmlTitleElement, htmlElementCircle, newHtmlCircle;
                let htmlParentElement = document.querySelector('.product-detail__cableNum');
                let classActiveElement = DOMstring.productDetail.info.watt.wattActive;

                /// se llama a la function que hace el return con el titulo del elemento
                htmlTitleElement = this.getHtmlDetailCableNumber();
                /// se inserta el html el titulo en el padre 
                htmlParentElement.insertAdjacentHTML('beforeend', htmlTitleElement);
                /// foreach con el array/object para sacar cada elemento 
                this.number.forEach((element, index) => {

                    /// llamamos a la function que hace el return del html
                    htmlElementCircle = this.getHtmlDetailNewCableNumber(index);
                    /// genera un replace con index y con datos reales del object del producto
                    newHtmlCircle = htmlElementCircle.replace(`%itemObj-${index}%`, this.number[index]);

                    /// este ID se inserta separado por espacios
                    newHtmlCircle = newHtmlCircle.replace(`%itemID-${index}%`, `${this.id}-span${index}`);
                    htmlParentElement.insertAdjacentHTML('beforeend', newHtmlCircle);
                });

                /// se le agrega la clase active al elemento circle
                htmlParentElement.children[1].classList.add(classActiveElement);   

                //// llame al padre con un addEventListener on click 
                this.callAddEventListenerForButtons(htmlParentElement, classActiveElement);
            }
        }
        
        validateColorForRender(iColorPositionInArray) {
            
            //// valida si existe el object color            
            if (this.color.length !== 0 && this.color[0] !== undefined && this.color !== undefined && Array.isArray(this.color) && this.color !== null) {
                /// declara las variables a utilizar
                let htmlColor, newHtmlColor, elementParentHtml;

                /// declara el parent element de los elementos, donde se insertaran los elementos childs
                elementParentHtml =  document.querySelector(DOMstring.productDetail.color.parent);

                ///// si existen elementos childs dentro del padre div, se eliminan
                if (elementParentHtml.children.length >= 1) {
                    Array.from(elementParentHtml.children).forEach(element => {
                        elementParentHtml.removeChild(element);
                    });
                }

                /// añade la clase al div padre (antes estaba el div vacio)
                elementParentHtml.classList.add('product-detail__color');

                /// busca el titulo y los span circles html
                htmlColor = this.getHtmlDetailColor();

                /// si la variable es undefined se declara 0. Esta variable viene cuando se le da click al los circulos de number del object product
                if (iColorPositionInArray === undefined) iColorPositionInArray = 0;

                /// reemplaza, añade la data real del object color 
                 newHtmlColor = htmlColor.replace('%thisColor%', Object.keys(this.color[iColorPositionInArray])[0]);
                 newHtmlColor = newHtmlColor.replace('%infoColor-1%', Object.keys(this.color[iColorPositionInArray])[0]);
                 newHtmlColor = newHtmlColor.replace('%infoColor-2%', Object.keys(this.color[iColorPositionInArray])[1]);
                 newHtmlColor = newHtmlColor.replace('%infoColor-3%', Object.keys(this.color[iColorPositionInArray])[2]);

                /// inserta el html con la data en el padre
                 elementParentHtml.insertAdjacentHTML('beforeend', newHtmlColor);
                 /// añade un eventelistener al padre para el onclick de los circle
                 elementParentHtml.addEventListener("click", this.functionChangeColorOnclick);
            }

        }
        validateInfoForRender() {
             let objectInfoEntries, valueObj, htmlBtn,htmlInfoDescription, htmlInfoChilds;

             htmlInfoDescription = '';
             htmlInfoChilds = '';

             objectInfoEntries = Object.entries(this.info);
             
             objectInfoEntries.forEach(element => {
                switch (element[1]) {
                    case this.info.description:
                        valueObj = this.validateForRender(this.info.description);
                        if (valueObj) { htmlInfoDescription = this.getHtmlDetailInfoDescription(); } 
                        break;

                    case this.info.size:                        
                        valueObj = this.validateForRender(this.info.size);
                        if (valueObj) { htmlInfoChilds += this.getHtmlDetailInfoSize(); }
                        break;

                    case this.info.conection:
                        valueObj = this.validateForRender(this.info.conection);
                        if (valueObj) { htmlInfoChilds += this.getHtmlDetailInfoConection(); }
                        break;

                    case this.info.voltage:
                        valueObj = this.validateForRender(this.info.voltage);
                        if (valueObj) { htmlInfoChilds += this.getHtmlDetailInfoVoltage(); }
                        break;

                    case this.info.lifetime:
                        valueObj = this.validateForRender(this.info.lifetime);
                        if (valueObj) { htmlInfoChilds += this.getHtmlDetailInfoLifetime(); }
                        break;

                    case this.info.typeLight:
                        valueObj = this.validateForRender(this.info.typeLight);
                        if (valueObj) { htmlInfoChilds += this.getHtmlDetailInfoTypeLight(); }
                        break;

                    case this.info.brand:
                        valueObj = this.validateForRender(this.info.brand);
                        if (valueObj) { htmlInfoChilds += this.getHtmlDetailInfoBrand(); }
                        break;
                    default:
                        break;
                }
             });

            document.querySelector(DOMstring.productDetail.info.itemsInfoParent).insertAdjacentHTML('beforeend', htmlInfoChilds);
                        
            htmlBtn = this.getHtmlDetailBuyBtn();

            document.querySelector(DOMstring.productDetail.info.itemsInfoParent).insertAdjacentHTML('beforeend', htmlBtn);
            document.querySelector(DOMstring.productDetail.info.parentDescription).insertAdjacentHTML('beforeend', htmlInfoDescription);

           
            /*
            this.description
            this.size
            this.lifetime
            this.typeLight 
            this.voltage
            this.conection
            this.brand

           
             */
        }

        renderAsDetail() {
            let objectEntries, valueObj, htmlChilds, htmlImg, htmlInfoDescription, newHtmlChilds;

            
            this.validateWattForRender();
            this.validateInfoForRender();

            this.validateNumberCableForRender();
            this.validateColorForRender();

            objectEntries = Object.entries(this);
            objectEntries.forEach(element => {
                // console.log(element[0], element[1]);
                // console.log('------ 0',this.number);

                switch (element[1]) {
                  case this.name:
                    valueObj = this.validateForRender(this.name);
                    if (valueObj) {
                      htmlChilds = this.getHtmlDetailName();
                    }
                    break;
                  case this.subname:
                    valueObj = this.validateForRender(this.subname);
                    if (valueObj) {
                      htmlChilds += this.getHtmlDetailSubname();
                    }
                    break;
                  case this.number:
                    valueObj = this.validateForRender(this.number);
                    console.log("------ 0", this.number);
                    //  if (valueObj) {   htmlChilds += this.getHtmlDetailNumber();}
                    break;
                  case this.price:
                    valueObj = this.validateForRender(this.price);
                    if (valueObj) {
                      htmlChilds += this.getHtmlDetailPrice();
                    }
                    break;
                  case this.images:
                    valueObj = this.validateForRender(this.images);
                    if (valueObj) {
                      htmlImg = this.getHtmlDetailImage();
                    }
                    break;
                  case this.color:
                      valueObj = this.validateForRender(this.number);
                      if (valueObj) {
                        console.log('11------------',valueObj);
                        // htmlImg = this.validateColorForRender();
                    }
                    break;

                  default:
                }
            });

            /*
            ///// por hacer
            // crear productos relacionados dependiendo de la categoria del producto. Se puede ser algo aleatorio
            */

            document.querySelector(DOMstring.productDetail.navtopLinkCurrent).insertAdjacentHTML('beforeend', this.getHtmlDetailNavtopLinkCurrent());
            document.querySelector(DOMstring.productDetail.parentDetail).insertAdjacentHTML('beforeend', htmlChilds);
            document.querySelector(DOMstring.productDetail.images.primaryParent).insertAdjacentHTML('beforeend', htmlImg);
        }  
        
        getHtmlDetailNavtopLinkCurrent() {            
            return `<a class="nav-top__link nav-top__link--current" href="/products/electric/product-detail.html?product_id=${this.id}">${this.name}</a>`;
        }
        getHtmlDetailImage() {
            return `<img id="imagePrimary" class="product-detail__photo" src="/img/${this.images.productDetail01}" alt="${this.name}">`;
        }
        getHtmlDetailName() {
            return `<h1 class="product-detail__title heading heading--medium heading--medium--color-sec">${this.name}</h1> `;
        }
        getHtmlDetailSubname() {
            return `<h2 id="numberProduct" class="product-detail__subtitle">${this.subname[0]}</h2> `;
        }
        getHtmlDetailNumber() {
            return `<h2 id="numberProduct" class="product-detail__subtitle">Num: ${this.number}</h2> `;
        }
        getHtmlDetailPrice() {
            return `<span id="priceProduct" class="product-detail__price">$${this.price[0]}</span>`;
        }
        getHtmlDetailColor() {
            return ` <p class="product-detail__color-name">Color:  <span id="${DOMstring.productDetail.color.childText}">%thisColor%</span></p>
                    <span id="${DOMstring.productDetail.color.color1}" class="product-detail__color-item product-detail__color-item--1 product-detail__color-item--active"></span>
                    <span id="${DOMstring.productDetail.color.color2}" class="product-detail__color-item product-detail__color-item--2"></span>
                    <span id="${DOMstring.productDetail.color.color3}" class="product-detail__color-item product-detail__color-item--3"></span>`;
        }
        getHtmlDetailCableNumber() {
            return ` <p class="product-detail__watt-name">Número:</p>
                      `;
        }
        getHtmlDetailNewCableNumber(index) {
            return `<span id="%itemID-${index}%" data-index="${index}" class="product-detail__watt-item">%itemObj-${index}%</span>`;
        }
        getHtmlDetailTitleWatt() {
            return ` <p class="product-detail__watt-name">Potencia (Watt):</p>
                      `;
        }
        getHtmlDetailNewWatt(index) {
            return `<span id="%itemWatt-${index}%" data-index="${index}" class="product-detail__watt-item">%watt-${index}%</span>`;
        }
        getHtmlDetailInfoSize() {
            return `<p id="infoSize" class="product-detail__size">Medidas:<span> ${this.info.size}</span></p>`;
        }
        getHtmlDetailInfoConection() {
            return `<p class="product-detail__connection">Conexión: <span>${this.info.conection}</span></p>`;
        }
        getHtmlDetailInfoVoltage() {
            return `<p class="product-detail__voltage">Voltaje: <span>${this.info.voltage}</span></p> `;
        }
        getHtmlDetailInfoLifetime() {
            return `<p class="product-detail__longevity">Vida: <span>${this.info.lifetime}</span></p> `;
        }
        getHtmlDetailInfoDescription() {
            return `<p id="infoDescription" class="paragraph"> ${this.info.description} </p> `;
        }
        getHtmlDetailInfoTypeLight() {
            return `<p class="product-detail__typelight">Tipo de luz: <span>${this.info.typeLight}</span></p> `;
        }
        getHtmlDetailInfoBrand() {
            return `<p class="product-detail__brand">Marca: <span>${this.info.brand}</span></p> `;
        }
        getHtmlDetailBuyBtn() {
            return ` <a class="btn" href="/contact.html"><button class="btn btn-big product-detail__btn">Contactar</button> </a> `;
        }
    }

    let getParams = function (url) {
            var params = {};
            var parser = document.createElement('a');
            parser.href = url;
            var query = parser.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                // console.log(pair);

                params[pair[0]] = decodeURIComponent(pair[1]);
            }
            return params;
    };

    let params = getParams(window.location.href);

    function getProductCatalog() {
        const url_products_catalog = '/products_catalog.json';
        const request = new XMLHttpRequest();
        request.open("GET", url_products_catalog);
        request.responseType = 'json';

        request.send();
        let products_catalog = [];
        request.onload = function () {
            products_catalog = request.response;
            // console.log(products_catalog);
            loadProducts(products_catalog);

        }

    }
    getProductCatalog();

    function loadProducts(products_catalog) {
        let elementCategoryProduct, elementProduct;

        // console.log(Object.entries(products_catalog));
        const objectEntriesCatalog = Object.entries(products_catalog);

        objectEntriesCatalog.forEach(element => {

            elementCategoryProduct = element[1].filter(obj => obj.id === params.product_id);
            
            // elementProduct = elementCategoryProduct.filter(obj => console.log(obj));
            if (elementCategoryProduct[0] !== undefined) {
                const product = new Product(elementCategoryProduct[0]);
                product.renderAsDetail();
            }
            
        });

        /*
        //// --------- asi lo hacia antes

        let element = products_catalog.cables.filter(obj => obj.id === params.product_id); 
        const product = new Product(element[0]);
        product.renderAsDetail();   
        */
        

    }