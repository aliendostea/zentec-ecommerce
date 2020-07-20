console.log('product!!! 11');
/******* 
 //////////// cosas por hacer aqui
 -- arreglar bien la classe para poner todos los productos del json en cada uno de los elementos de product list
 -- images reales
 -- data real
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
            // console.log(' 11111', this.name);
        }
        // this.verifyExists('name', element);
        // this.name = element.name;
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
            // console.log(' 11111', this.color);
        }
    }

    setInfo(element) {
        this.verifyExists('info', element);
        this.info = element.info;
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

        // console.log(Object.values(this));
        // console.log(objectEntries);

        objectEntries.forEach((element, index) => {
            //  console.log('23423', this.name);
            //  console.log('key', element[0]);
            // console.log('value', element[1]);
            //  console.log('name', this.name);
            // console.log(Object.keys(this));
            // console.log(element[0], this.hasOwnProperty(element[index]));
         

            switch (element[1]) {
                case this.id:
                    if (this.id !== undefined) {                       
                        // console.log('this.id exist!', this.id);
                    }
                    break;
                case this.name:
                    // console.log('this.name', this.name);

                    valueObj = this.validateForRender(this.name);
                    if (valueObj) {
                        // console.log(valueObj);
                        htmlChilds += this.getHtmlProductName();
                        // console.log('this.name exist!', this.name);

                    } else {
                        // console.log(valueObj);
                        // console.log('this.name DONT exist!', this.name);


                        
                    }
                    /*
                    if (this.name !== undefined) {
                        console.log('this.name exist!', this.name);
                        htmlChilds += this.getHtmlProductName();
                        console.log('--------------------,',htmlChilds);
                        
                    } else{
                        console.log('this.name DONT exist!', this.name);
                    }
                    */

                    
                    break;
                case this.subname:
                    valueObj = this.validateForRender(this.subname);
                    if (valueObj) {
                        // console.log(valueObj);
                        htmlChilds += this.getHtmlProductSubname();
                        // console.log('this.name exist!', this.subname);

                    } else {
                        //  console.log(valueObj);
                        // console.log('this.name DONT exist!', this.subname);
                    }
                   
                    break;
                case 'number':
                     if (this.number !== undefined) {                       
                        //  console.log('this.id exist!', this.number);
                    }
                    break;
                case 'price':
                    if (this.price !== undefined) {                       
                        // console.log('this.id exist!', this.price);
                    }
                    break;
                case 'color':
                    if (this.color !== undefined) {                       
                        // console.log('this.id exist!', this.color);
                    }
                    break;
                case 'info':
                     if (this.info !== undefined) {                       
                        // console.log('this.id exist!', this.info);
                    }
                    break;
                case 'images':
                     if (this.images !== undefined) {                       
                        // console.log('this.id exist!', this.images);
                    }
                    break;                
                default:
            }

            
            
        });


        
        // let element = products_catalog.filter(obj => obj.id === params.product_id);

        
        /*
        if (this.name !== undefined) {
            htmlChilds += this.getHtmlProductName();
            // this.hasOwnProperty(keys[i])
        }
        */


        htmlChilds += this.getHtmlProductPrice();

        // htmlChilds += this.getHtmlProductColor();


        newHtmlChilds = htmlChilds.replace('%images%', this.images.productList);
        newHtmlChilds = newHtmlChilds.replace('%name%', this.name);
        newHtmlChilds = newHtmlChilds.replace('%price%', this.price[0]);
        // newHtmlChilds = newHtmlChilds.replace('%color%', Object.keys(this.color));

        // console.log(newHtmlChilds);                    


        document.querySelector(`#${this.id}`).insertAdjacentHTML('beforeend', newHtmlChilds);

        // newHtmlChilds = newHtmlChilds.replace('%number%', this.number);
        // newHtmlChilds = newHtmlChilds.replace('%color%', Object.values(this.color));
        // newHtmlChilds = newHtmlChilds.replace('%color2%', Object.keys(this.color)[1]);
        // newHtmlChilds = newHtmlChilds.replace('%info%', Object.values(this.info));
        // newHtmlChilds = newHtmlChilds.replace('%info1%', Object.values(this.info)[1] );

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
        // this.forLoopVerifyExistsToRender(this);
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
        // console.log(products_catalog);
        loadProducts(products_catalog);
    }
    // console.log(products_catalog);


}

getProductCatalog();
function loadProducts(products_catalog) {
    // console.log('---------------------------' , products_catalog);

    products_catalog.cables.forEach((element, index, array) => {
        // console.log('cables ---------------------------' + index);
        const product = new Product(element);
        // console.log('---------------------------' , element);
        product.renderAsList(index);

    });

    products_catalog.electricity.forEach((element, index, array) => {
        // console.log('bombillos ---------------------------' + index);
        const product = new Product(element);
        // console.log('---------------------------' , element);
        product.renderAsList(index);

    });

}

const testPCambiar = {

    "cables": [
        {
            "id": "CAB_0001",
            "name": "Cable de Instalación AWG",
            "subname": [
                "test-688AV (9w)"
            ],
            "number": "16",
            "price": [
                "20.14"
            ],
            "color": {
                "CAB-IN1601": "Negro",
                "CAB-IN1802": "Blanco",
                "CAB-IN1803": "Rojo"
            },
            "info": {
                "description": "(7 pelos) CU PVC 105 °C 600V",
                "size": "Rollo de 100 mts",
                "brand": "CABEL"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "CAB_0002",
            "name": "Cable de Instalación AWG",
            "number": "18",
            "price": [
                "12.60"
            ],
            "color": {
                "CAB-IN1604": "Negro",
                "CAB-IN1805": "Blanco",
                "CAB-IN1806": "Rojo"
            },
            "info": {
                "description": "(7 pelos) CU PVC 105 °C 600V",
                "size": "Rollo de 100 mts",
                "brand": "CABEL"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "CAB_0003",
            "name": "Cable de THW",
            "number": [
                "08"
            ],
            "price": "161.96",
            "color": {
                "CAB-THW0816": "Negro",
                "CAB-THW0817": "Blanco",
                "CAB-THW0818": "Rojo"
            },
            "info": {
                "description": "(7 pelos) CU PVC 105 °C 600V",
                "size": "Rollo de 100 mts",
                "brand": "CABEL"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "CAB_0004",
            "name": "Cable de THW",
            "number": [
                "10"
            ],
            "price": "80.85",
            "color": {
                "CAB-THW0813": "Negro",
                "CAB-THW0814": "Blanco",
                "CAB-THW0815": "Rojo"
            },
            "info": {
                "description": "(7 pelos) CU PVC 105 °C 600V",
                "size": "Rollo de 100 mts",
                "brand": "CABEL"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "CAB_0005",
            "name": "Cable de THW",
            "number": "12",
            "price": [
                "49.84"
            ],
            "color": {
                "CAB-THW0810": "Negro",
                "CAB-THW0811": "Blanco",
                "CAB-THW0812": "Rojo"
            },
            "info": {
                "description": "(7 pelos) CU PVC 105 °C 600V",
                "size": "Rollo de 100 mts",
                "brand": "CABEL"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "CAB_0006",
            "name": "Cable de THW",
            "number": "14",
            "price": [
                "30.80"
            ],
            "color": {
                "CAB-THW0807": "Negro",
                "CAB-THW0808": "Blanco",
                "CAB-THW0809": "Rojo"
            },
            "info": {
                "description": "(7 pelos) CU PVC 105 °C 600V",
                "size": "Rollo de 100 mts",
                "brand": "CABEL"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        }
    ],
    "electricity": [
        {
            "id": "BOM_0001",
            "name": "Bombillo LED tipo bulbo",
            "subname": [
                "BOM-688AV (9w)",
                "BOM-689AV (12w)"
            ],
            "price": [
                "1.36",
                "1.60"
            ],
            "color": [],
            "info": {
                "description": "",
                "lifetime": "25.000 horas / 5 años",
                "typeLight": "blanca",
                "voltage": "85-265V",
                "conection": "E27",
                "brand": "ILUM-VEN"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "BOM_0002",
            "name": "Bombillo LED de emergencia (9w)",
            "subname": [
                "BOM-685AV (9w)"
            ],
            "price": [
                "4.09"
            ],
            "color": [],
            "info": {
                "description": "Bombillo recargable que enciende automaticamente al irse la luz general.",
                "size": "12,2 alto / 6 ancho",
                "duration": "4 - 6 horas",
                "lifetime": "20.000 horas",
                "typeLight": "blanca",
                "voltage": "85V-265V",
                "conection": "E27",
                "brand": ""
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "BOM_0003",
            "name": "Bombillo LED ojo de wey (3w)",
            "subname": [
                "BOM-621AV (3w)"
            ],
            "price": [
                "2.12"
            ],
            "color": [],
            "info": {
                "description": "",
                "size": "6cm alto / 4,8 ancho",
                "lifetime": "35.000 horas / 5 años",
                "typeLight": "blanca",
                "voltage": "85-265V",
                "conection": "GU5.3",
                "brand": "ILUM-VEN"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "BOM_0004",
            "name": "Bombillo ahorrador espiral (12w)",
            "subname": [
                "BOM-690AV (12w)"
            ],
            "price": [
                "2.27"
            ],
            "color": [],
            "info": {
                "description": "",
                "size": "14,2 alto / 4,3 ancho",
                "lifetime": "8.000 horas / 2 años",
                "voltage": "110V",
                "conection": "E27",
                "brand": "ILUM-VEN"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "BOM_0005",
            "name": "Bombillo ahorrador espiral (21w)",
            "subname": [
                "BOM-691AV (21w)"
            ],
            "price": [
                "2.49"
            ],
            "color": [],
            "info": {
                "description": "",
                "size": "14,5 alto / 4,5 ancho",
                "lifetime": "8.000 horas / 2 años",
                "typeLight": "blanca",
                "voltage": "110V",
                "conection": "E27",
                "brand": "ILUM-VEN"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "BOM_0006",
            "name": "Bombillo LED espiral luz blanca (20w)",
            "subname": [
                "BOM-684AV (20w)"
            ],
            "price": [
                "2.78"
            ],
            "color": [],
            "info": {
                "description": "",
                "size": "15,5 cm alto / 6,5 cm ancho",
                "lifetime": "25.000 horas / 5 años",
                "typeLight": "blanca",
                "voltage": "85-265V",
                "conection": "E27",
                "brand": "ILUM-VEN"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "BOM_0007",
            "name": "Bombillo LED tipo Vela (5w)",
            "subname": [
                "BOM-703AV (5w)"
            ],
            "price": [
                "1.29"
            ],
            "color": [],
            "info": {
                "description": "",
                "size": "10 cm alto / 4,5 cm ancho",
                "lifetime": "25.000 horas / 5 años",
                "typeLight": "",
                "voltage": "85-265V",
                "conection": "E14",
                "brand": "ILUM-VEN"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "LAM_0001",
            "name": "Lámpara LED redonda (Empotrar)",
            "subname": [
                "LAM-630AV (3w)",
                "LAM-633AV (18w)"
            ],
            "price": [
                "1.82",
                "4.37"
            ],
            "color": [],
            "info": {
                "description": "",
                "size": "10 cm alto / 4,5 cm ancho",
                "lifetime": "35.000 horas / 5 años",
                "typeLight": "blanca",
                "voltage": "85-265V",
                "conection": "cable",
                "brand": "ILUM-VEN"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "LAM_0002",
            "name": "Lámpara LED cuadrada (Empotrar)",
            "subname": [
                "LAM-649AV (3w)"
            ],
            "price": [
                "1.97"
            ],
            "color": [],
            "info": {
                "description": "",
                "size": "2,5",
                "lifetime": "35.000 horas / 5 años",
                "typeLight": "blanca",
                "voltage": "85-265V",
                "conection": "cable",
                "brand": "ILUM-VEN"
            },
            "images": {
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "LAM_0003",
            "name": "Lámpara LED redonda (superficial)",
            "subname": [
                "LAM-709AV (9w)",
                "LAM-710AV (15w)",
                "LAM-711AV (21w)"
            ],
            "price": [
                "4.97",
                "6.39",
                "8.80"
            ],
            "color": [],
            "info": {
                "description": "",
                "size": "",
                "lifetime": "35.000 horas / 5 años",
                "typeLight": "blanca",
                "voltage": "85-265V",
                "conection": "cable",
                "brand": "ILUM-VEN"
            },
            "images": {
                "aquiVaDiferente": "photo1.png",
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        },
        {
            "id": "LAM_0004",
            "name": "Lámpara LED panel plafón",
            "subname": [
                "BOM-705AV (50w)"
            ],
            "price": [
                "9.49"
            ],
            "color": [],
            "info": {
                "description": "",
                "size": "2.5 cm x 7.6 cm x 121.5 cm",
                "lifetime": "25.000 horas / 5 años",
                "typeLight": "blanca",
                "voltage": "85-265V",
                "conection": "cable",
                "brand": "ILUM-VEN"
            },
            "images": {
                "aquiVaDiferente": "photo1.png",
                "productList": "photo1.png",
                "productDetail01": "photo2.png",
                "productDetail02": "photo2.png",
                "productDetail03": "photo2.png"
            }
        }
    ]
}

/*

testPCambiar.cables.forEach(element => {
    const productCables = new Product(element);
    // console.log('---------------------------' , element);
    productCables.renderAsList();
    
});

testPCambiar.electricity.forEach(element => {
    const productElectricity = new Product(element);
    // console.log('---------------------------' , element);
    productElectricity.renderAsList();

});

*/