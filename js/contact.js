

// GLOBAL APP CONTROLLER
let controller = (function () {

    const dataUser = {
        id: [],
        name: [],
        number: [],
        email: [],
        message: []
    };

    const DOMstrings = {
        inputTag: 'input',
        textareaTag: 'textarea',
        inputUserName: '#user-name',
        nextBtn: '#contact-next-btn',
        previousBtn: '#contact-btn-previous',
        headerNav: '#header-nav',
        pTagHtmlPopupUser: 'popup-user',
        formBoxParent: '.form__box',
        btnSendForm: '#sendFormBtn',
    };

    const inputsStringsProp = {
        step:{
            1: {
                input: {
                    id: 'user-name',
                    type: 'text',
                    class: 'form__textarea fade-in',
                    name: 'user-name',
                    placeholder: 'Escribe tu nombre y apellido',
                    localStorageData: 'userName'
                },
                label: {
                    class: 'form__label fade-in',
                    for: 'user-name',
                    description: '¿Cuál es tu nombre y apellido?'
                }
            },
            2: {
                input: {
                    id: 'user-number',
                    type: 'number',
                    class: 'form__textarea fade-in',
                    name: 'user-number',
                    placeholder: 'Escribe tu número',
                    localStorageData: 'userNumber'
                },
                label: {
                    class: 'form__label fade-in',
                    for: 'user-number',
                    description: '¿A qué número podemos contactar?'
                }
        
            },
            3: {
                input: {
                    id: 'user-email',
                    type: 'email',
                    class: 'form__textarea fade-in',
                    name: 'user-email',
                    placeholder: 'Escribe tu Email',
                    localStorageData: 'userEmail'
                },
                label: {
                    class: 'form__label fade-in',
                    for: 'user-email',
                    description: '¿A qué email podemos escribirte?'
                }
            },
            4: {
                input: {
                    id: 'user-message',
                    type: 'text',
                    class: 'form__textarea form__textarea--medium fade-in',
                    name: 'user-message',
                    placeholder: 'Escribe tu mensaje',
                    localStorageData: 'userMessage'
                },
                label: {
                    class: 'form__label fade-in',
                    for: 'user-message',
                    description: '¿Cuál es tu mensaje?'
                }

            }
        }
       
    };

    const CSSstrings = {
        displayNoneImportant: 'display-none-important',
        formLabelError: 'form__label--error',
        formLTextareaError: 'form__textarea--error',
    };

    const errorMessages = {
        es: {
            required: {
                empty: 'Por favor, rellena este campo antes de avanzar',
                incorrect: 'Incorrect value'
            },           
            min: {
                empty: 'Enter more',
                incorrect: 'Enter more'
            },
            max: {
                empty: 'Enter less',
                incorrect: 'Enter less'
            },
            between: {
                empty: 'Enter the between {0}-{1}',
                incorrect: 'Enter the between {0}-{1}'
            },
            name: {
                empty: 'Please, enter your name',
                incorrect: 'Incorrect name'
            },
            lastname: {
                empty: 'Please, enter your lastname',
                incorrect: 'Incorrect lastname'
            },
            phone: {
                empty: 'Please, enter the phone number',
                incorrect: 'Incorrect phone number'
            },
            email: {
                empty: 'Please, enter your email address',
                incorrect: 'Incorrect email address'
            }           
        }
    };

    
    /*
    varsFunction = () => {
        return {
            vars: function () {
                const numberOfSteps1 = 4;
                const minorOfSteps1 = 2;
                let currentStep1 = 1
            }
        }
    };
    */


   /// variables steps page. currentStep variable se usa en handleStepNumberPage   
    const numberOfSteps = 5;
    const penultimateOfStep = 4
    const minorOfSteps = 2;
    let currentStep = 1;

    let setupEventListeners = function () { 

        document.querySelector(DOMstrings.btnSendForm).addEventListener('click', handleSendUsersForm);
        document.querySelector(DOMstrings.nextBtn).addEventListener('click', handleNextStep);
        document.querySelector(DOMstrings.previousBtn).addEventListener('click', handlePreviousStep);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                handleNextStep(event);                
            }
        });
        
    };

    getInput = () => {
        /// Get the field input data or textarea data 
        if (document.querySelector(DOMstrings.inputTag) === null) {
            return document.querySelector(DOMstrings.textareaTag);            
        } else {
            return document.querySelector(DOMstrings.inputTag);            
        }
    };

    /// maneja el onclick del btn nextstep
    function handleNextStep(e) {
        e.preventDefault();
        /// Get the field input data ||
        let inputData = getInput();

        /// se declara una variable de return para ver si hay error o no
        let errorForm = checkIfExistErrorsForm(inputData);
        
        /// se verifica si hay error o no en el input
        if (errorForm === false) {

             /// se le suma +1 al currentStep hasta el 4
            if (currentStep !== numberOfSteps) {
                currentStep += 1;
            }

             /// si currentStep es mayor que 2 se quita la clase al btn previous
            if (currentStep >= minorOfSteps) {
                document.querySelector(DOMstrings.previousBtn).classList.remove(CSSstrings.displayNoneImportant);
            }

            /// si es igual o menor que numberOfSteps entra en la function
            if (currentStep <= numberOfSteps) {
                /// se le pasa a la function el input + el currentStep
                handleInputUserData(inputData, currentStep);  
            }     
        }
    }

    /// maneja el onclick del btn previous, suma o resta al currentStep
    function handlePreviousStep(e) {
        e.preventDefault();

        /// si es igual o mayor a 1 le resta
        if (currentStep >= minorOfSteps) {
            currentStep -= 1;
            /// si es igual a penultimateOfStep le resta 1
            if (currentStep === penultimateOfStep) {
                currentStep -= 1;
            }
        }
        
        /// si currentStep es menor que 1 se añade la clase al btn previous para esconderlo
        if (currentStep < minorOfSteps) {
            document.querySelector(DOMstrings.previousBtn).classList.add(CSSstrings.displayNoneImportant);
        }

        getHtmlInput(currentStep);
    }
    
    //// inserta en el popup final todos los datos del usuario que ha escrito
    function insertAllDataInPopup() {
        let nodesAllHtmlParag, allParagArray, name, email, number, message;

        const arryLocalStorage = [];

        //// queryselectorall de todos los elements ID que empiezan con popup-user
        nodesAllHtmlParag = document.querySelectorAll(`[id^='${DOMstrings.pTagHtmlPopupUser}']`);
        allParagArray = Array.prototype.slice.call(nodesAllHtmlParag);

        //// se toman los datos existentes en el localStorage con getItem
        name = localStorage.getItem('userName');
        email = localStorage.getItem('userEmail');
        number = localStorage.getItem('userNumber');
        message = localStorage.getItem('userMessage');

        arryLocalStorage.push(name, email, number, message);

        //// se le añaden a los elementos html p tag la data del localstorage con un foreach 
        allParagArray.forEach((element, index) => {
            element.innerHTML = arryLocalStorage[index];
        });

    }

    /// chequea si hay errores
    checkIfExistErrorsForm = (inputData) => {
        let errorForm;

        /// 2. verificar que no este vacio 
        if (inputData.value !== "" || inputData.value > 0) { 
            return errorForm = false;
        } else {
            /// en caso de error, se le pasa a la function el current input
            userErrorInput(inputData);
            return errorForm = true;
        } 
    };


    function handleInputUserData(inputData,stepNumberPage) {        
            /// 3. verifica que dato ha pasado el usuario: name, number, email, texto
            switch (inputData.id) {
            /// 4. añadir datos de user en localStorage 
                case 'user-name':
                    dataUser.name.push(inputData.value);
                    localStorage.setItem('userName', inputData.value); 
                    getHtmlInput(stepNumberPage);
                    break;
                case 'user-number':
                    dataUser.number.push(inputData.value);
                    localStorage.setItem('userNumber', inputData.value);
                    getHtmlInput(stepNumberPage);
                    break;
                case 'user-email':
                    dataUser.email.push(inputData.value);
                    localStorage.setItem('userEmail', inputData.value);
                    getHtmlInput(stepNumberPage);
                    break;
                case 'user-message':
                    dataUser.message.push(inputData.value);
                    
                    localStorage.setItem('userMessage', inputData.value);
                    stepNumberPage = stepNumberPage-1;
                    getHtmlInput(stepNumberPage);
                    insertAllDataInPopup();
                    openPopupOverlay();
                    break;
                default:
                    break;
            }    
    };
   
    getHtmlInput = (stepNumberPage) => {
        /// esta function entra el "stepNumberPage" (numero del current page donde esta el usuario) dependiendo de qué boton la llame
        let labelClass, labelFor, labelDescription
            , inputID, inputType, inputClass, inputName, inputPlaceholder, inputValue, htmlNextOrPrevious;

        /// se declaran las variables con data real, con stepNumberPage, este numero define que label y input se muestre exactamente 
        labelClass = inputsStringsProp.step[stepNumberPage].label.class;
        labelFor = inputsStringsProp.step[stepNumberPage].label.for;
        labelDescription = inputsStringsProp.step[stepNumberPage].label.description;
        inputID = inputsStringsProp.step[stepNumberPage].input.id;
        inputType = inputsStringsProp.step[stepNumberPage].input.type;
        inputClass = inputsStringsProp.step[stepNumberPage].input.class;
        inputName = inputsStringsProp.step[stepNumberPage].input.name;
        inputPlaceholder = inputsStringsProp.step[stepNumberPage].input.placeholder;
        // inputValue = Object.values(dataUser)[stepNumberPage][0];

        ///// este es para el local storage, mas adelante se puede hacer
        inputValue = localStorage.getItem(inputsStringsProp.step[stepNumberPage].input.localStorageData);
        if (inputValue === null || inputValue === undefined) {
            inputValue = ''; //////////////// esto hay que arreglarlo! es algo con el localStorage y el stringhify cuando esta vacio
        }

        if (stepNumberPage > 3) {
            /// se insertan las variables en el html del paso 4 (un textarea diferente que el input de los otros)
            htmlNextOrPrevious = ` <label class="${labelClass}" for="${labelFor}">${labelDescription}</label>
            <textarea id="${inputID}" type="${inputType}" class="${inputClass}" name="${inputName}" placeholder="${inputPlaceholder}" value="${inputValue}" wrap="on">${inputValue}</textarea>
            <span class="form__step">Paso <span <span id="span-form-step" class="form_step__number">${stepNumberPage}</span> de 4</span>`;
        } else { 
            /// se insertan las variables en el html de los pasos 1,2 y 3
            htmlNextOrPrevious = ` <label class="${labelClass}" for="${labelFor}">${labelDescription}</label>
            <input id="${inputID}" type="${inputType}" class="${inputClass}" name="${inputName}" placeholder="${inputPlaceholder}" value="${inputValue}">
            <span class="form__step">Paso <span <span id="span-form-step" class="form_step__number">${stepNumberPage}</span> de 4</span>`;
        }
        
        /// se insertan en el html real con innerHTML en el padre del form
        document.querySelector(DOMstrings.formBoxParent).innerHTML = htmlNextOrPrevious;

    };

    /// en caso de error, pasar error al usuario en el currentInput
    function userErrorInput(currentInput) {
        let errorHtml;
        console.log('user errors!!!');

        currentInput.previousElementSibling.classList.add(CSSstrings.formLabelError);
        currentInput.classList.add(CSSstrings.formLTextareaError);

        errorHtml = getHtmlSpanError();
        document.querySelector(DOMstrings.formBoxParent).insertAdjacentHTML('beforeend', errorHtml);
    }
   
    getHtmlSpanError = () => {
        return ` <span class="form__errors fade-in--2"><img src="img/icon-alert-error.svg" alt="">${errorMessages.es.required.empty}</span> `;
    };  

    //// se le envia al backend los datos del usuario con un XMLHttpRequest
    handleSendUsersForm = () => {
        console.log('send!', localStorage.getItem('userMessage'));

        console.log('staaaart!!');
        // const formData = new FormData();

        // formData.append("userMessage", localStorage.getItem('userMessage'));

        const dataSendUserForm = {
                     userMessage: localStorage.getItem('userMessage'),
                     userNumber: localStorage.getItem('userNumber'),
                     userEmail: localStorage.getItem('userEmail'),
                     userName: localStorage.getItem('userName') 
        };

        const req = new XMLHttpRequest();
        req.open('POST', 'https://cqo93zhm9k.execute-api.us-east-1.amazonaws.com/dev/contactUS', true);
        req.onreadystatechange = function (aEvt) {
            console.log(req.readyState);
            if (req.readyState == 4) {
                if (req.status == 200){
                    console.log(req.responseText);
                    console.log('http://127.0.0.1:5500/contact.html 200 ------------------');  
                }
                else {
                    console.log("Error loading page\n");
                }
            } else{
                console.log('sending...');
            }
        };
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(dataSendUserForm));
        // req.send(formData); 

        // var req = new XMLHttpRequest();
        // req.onprogress = onProgress;
        // req.onload = onLoad;
        // req.onerror = onError;
        // req.open("GET", url, true);
        // req.send(null);
    };  
   
    return {
        init: function () {
            setupEventListeners();
        }
    };
})();

controller.init();