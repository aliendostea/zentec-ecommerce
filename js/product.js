/******* 
 //////////// cosas por hacer aqui
 -- arreglar bien la classe para poner todos los productos del json en cada uno de los elementos de product list
 -- hacer una function grande anonima, con toda las functions
******/


const DOMstring = {
    productList: {
        productItem: '#productListWrapper'
    },
    productDetail: {
        productItem: 'test11111-span'
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
        this.setInfo(element);
        this.setImages(element);
    }

    setId(element) {
        this.verifyExists('id', element);
        this.id = element.id;
    }

    setName(element) {
        if (this.verifyExists('name', element)) {
            this.name = element.name;
        } else {
            this.name = undefined;
        }
        // this.verifyExists('name', element);
        // this.name = element.name;
    }

    setSubname(element) {
        if (this.verifyExists('subname', element)) {
            this.subname = element.subname;

        } else {
            this.subname = undefined;
        }
    }

    setNumber(element) {
        this.verifyExists('number', element);
        this.number = element.number;
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

    setInfo(element) {
        if (this.verifyExists('info', element)) {
            this.info = element.info;

        } else {
            this.info = undefined;
        }
        // this.verifyExists('info', element);
        // this.info = element.info;
    }

    setImages(element) {
        this.verifyExists('images', element);
        this.images = element.images;
    }

    verifyExists(field, element) {
        try {
            let exists = this.ifNotExistsThrowError(field, element);
            return exists;
        } catch (error) {
            return false;
        }
    }

    ifNotExistsThrowError(field, element) {
        if (element.hasOwnProperty(field) && element[field] !== null && element[field] !== undefined) {
            return true;
        }
        throw Error('Product property not found: ' + field);
    }

    forLoopVerifyExistsToRender(field) {

        if (this.name !== undefined) {
            htmlChilds += this.getHtmlProductName();
            // this.hasOwnProperty(keys[i])
        }

        for (const current of this22) {
            callback(current, this22);
        }

    }

    validateForRender(valueObj) {
        // valueObj !== undefined ? valueObj = true : valueObj= false;
        if (valueObj !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    renderAsList() {
        let objectEntries, htmlAnchorTag, newHtmlAnchorTag, htmlChilds, newHtmlChilds, valueObj;

        htmlAnchorTag = this.getHtmlAnchorTag();

        newHtmlAnchorTag = htmlAnchorTag.replace('%id%', this.id);
        document.querySelector(DOMstring.productList.productItem).insertAdjacentHTML('beforeend', newHtmlAnchorTag);

        htmlChilds = this.getHtmlProductImage();

        objectEntries = Object.entries(this); 

        objectEntries.forEach((element, index) => {

            switch (element[1]) {
                case this.id:
                    if (this.id !== undefined) {                       
                        // console.log('this.id exist!', this.id);
                    }
                    break;
                case this.name:

                    valueObj = this.validateForRender(this.name);
                    if (valueObj) {
                        htmlChilds += this.getHtmlProductName();

                    } else {
                        // console.log(valueObj);
                        // console.log('this.name DONT exist!', this.name);
                    }
                    
                    break;
                case this.subname:
                    valueObj = this.validateForRender(this.subname);
                    if (valueObj) {
                        // htmlChilds += this.getHtmlProductSubname();
                    } else {
                        // console.log('this.name DONT exist!', this.subname);
                    }
                   
                    break;
                case 'number':
                     if (this.number !== undefined) {                       
                    }
                    break;
                case 'price':
                    if (this.price !== undefined) {                       
                    }
                    break;
                case 'color':
                    if (this.color !== undefined) {                       
                    }
                    break;
                case this.info:
                    let allWatts;
                    valueObj = this.validateForRender(this.info.watt);
                    if (valueObj) {
                        allWatts = this.info.watt.join(' / ');
                        htmlChilds += this.getHtmlProductSubnameList(allWatts);
                    } else {
                        // console.log('this.name DONT exist!', this.info.watt);
                    }
                    break;
                case 'images':
                     if (this.images !== undefined) {                       
                    }
                    break;                
                default:
            }
            
        });

        htmlChilds += this.getHtmlProductPrice();

        newHtmlChilds = htmlChilds.replace('%images%', this.images.productList);
        newHtmlChilds = newHtmlChilds.replace('%name%', this.name);
        newHtmlChilds = newHtmlChilds.replace('%price%', this.price[0]);
                     
        document.querySelector(`#${this.id}`).insertAdjacentHTML('beforeend', newHtmlChilds);

        return this;
    }

    getHtmlAnchorTag() {
        return `<a id="${this.id}" href="electric/product-detail.html?product_id=${this.id}" class="product"></a>`;
    }

    getHtmlProductImage() {
        return `<div class="product__box-img">
                            <img class="product__img" src="/img/%images%" alt="%altImage%">
                </div>`;
    }

    getHtmlProductName() {
        let html = ` <span class="product__title">%name%</span> `;
        return html;
    }

    getHtmlProductSubnameList(subnameList) {   
        return `<span class="product__subtitle">${subnameList}</span>`;
    }
    getHtmlProductSubname() {
        return `<span class="product__subtitle">${this.subname[0]}</span>`;
    }

    getHtmlProductPrice() {
        let html = ` <span class="product__price">$%price%</span> `;
        return html;
    }
    getHtmlProductColor() {
        let html = ` <span class="product__subtitle">%color%</span> `;
        return html;
    }
    getHtmlProducTest() {
        let html = ` <span class="product__subtitle">%color%</span> `;
        return html;
    }

}

function getProductCatalog() {
    const url_products_catalog = '/products_catalog.json';
    const request = new XMLHttpRequest();
    request.open("GET", url_products_catalog);
    request.responseType = 'json';
    /*
    request.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    */
    request.send();
    let products_catalog = [];
    request.onload = function () {
        products_catalog = request.response;
        loadProducts(products_catalog);
    }

}

getProductCatalog();
function loadProducts(products_catalog) {

    products_catalog.cables.forEach((element, index, array) => {
        const product = new Product(element);
        product.renderAsList(index);

    });

    products_catalog.electricity.forEach((element, index, array) => {
        const product = new Product(element);
        product.renderAsList(index);
    });

}
