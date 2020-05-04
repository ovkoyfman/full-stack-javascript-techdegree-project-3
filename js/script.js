const form = document.querySelector('form');
const emailInput = document.querySelector('#mail');
const emailRegex = /\S+@\S+\.\S+/;
const otherTitle = document.querySelector('#other-title');
const colorsSelectElement = document.querySelector('#color');
const setOfColorOptions = colorsSelectElement.querySelectorAll('option');
const themeSelectElement = document.querySelector('#design');
const themeDefaultOptionElement = themeSelectElement.querySelector('option');
const colorSelectGroup = document.querySelector('#colors-js-puns');
const checkboxElementsSection = document.querySelector('.activities');
const optionNode = document.createElement('option');
const creditCardErrorDiv = document.createElement('div');
creditCardErrorDiv.className = 'error-message';
const emailErrorDiv = document.createElement('div');
emailErrorDiv.className = 'error-message';
let activitiesTotal = 0;
const paymentSelectElement = document.querySelector('#payment');
const paymentDefaultOptionElement = paymentSelectElement.querySelector('option');
const creditCardDiv = document.querySelector('#credit-card');
const creditCardNumberInput = creditCardDiv.querySelector('#cc-num');

//focused on the first input element
document.querySelector('input').focus();

colorSelectGroup.style.display = 'none';
paymentDefaultOptionElement.remove();
hideAllPaymentsAndShow('credit-card');
//to show/hide text input for other option on Job Role
otherTitle.style.display = 'none';
document.querySelector('#title').addEventListener('change',(e) => {
    if (e.target.value === 'other'){
        otherTitle.style.display = "block";
    }
    else{
        otherTitle.style.display = "none";
    }
});

//hid t-shirt color options till user select theme
for(i = 0;i < setOfColorOptions.length; i++){
    setOfColorOptions[i].style.display = 'none';
}

//created temp option-placeholder till user select theme
optionNode.textContent = 'Please select a T-shirt color';
optionNode.setAttribute('selected','selected');
optionNode.className = 'color';
colorsSelectElement.insertBefore(optionNode, colorsSelectElement.children[0]);

//remove 'Select Theme' option on click event and show t-shirt options
themeSelectElement.addEventListener('click',function(e){
    let setOfThemeOptionElements = themeSelectElement.querySelectorAll('option');
    themeDefaultOptionElement.remove();
    setOfThemeOptionElements = themeSelectElement.querySelectorAll('option');
    if(!document.querySelector('.color')){
        colorsSelectElement.insertBefore(optionNode, colorsSelectElement.children[0]);
    }
    colorSelectGroup.style.display = 'block';
    toggleColorOptions(e); 
});
colorsSelectElement.addEventListener('click',function(){
    optionNode.remove;
});
//function to toggle display of color options
function toggleColorOptions(e){
    if(e.target.value === 'js puns') {
        for(i=0; i<3;i++){
            setOfColorOptions[i].style.display = 'block';
        } 
        for(i=3; i<6;i++){
            setOfColorOptions[i].style.display = 'none';     
        } 
        colorsSelectElement.selectedIndex = 0;
    } 
    else {
        for(i=0; i<3;i++){
            setOfColorOptions[i].style.display = 'none';
        } 
        for(i=3; i<6;i++){
            setOfColorOptions[i].style.display = 'block';
        }
        colorsSelectElement.selectedIndex = 0;
    }
}
//checkboxes selection interaction
checkboxElementsSection.addEventListener('change', function(e){
    const activitiesTotalSpanElement = document.createElement('span');
    activitiesTotalSpanElement.className = "cost";
    const setOfCheckboxes = checkboxElementsSection.querySelectorAll('input');
    for(let i=0; i<setOfCheckboxes.length; i++){
        //handled events that scheduled at the same time
        if(setOfCheckboxes[i].getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time') & setOfCheckboxes[i] !== e.target){           
            if(e.target.checked){
                setOfCheckboxes[i].setAttribute('disabled','diabled');
                setOfCheckboxes[i].parentElement.style.color = '#999';            }
            else{
                setOfCheckboxes[i].removeAttribute('disabled');
                setOfCheckboxes[i].parentElement.style.color = '#000';                
            }
        }
    }
    //calculated total cost for events
    if(e.target.checked){
        activitiesTotal += parseInt(e.target.getAttribute('data-cost'));
    }
    else{
        activitiesTotal -= parseInt(e.target.getAttribute('data-cost'));
    }
    //based on totalCost adding or removing total span from html
    if (activitiesTotal){
        if(!document.querySelector('.cost')){
            checkboxElementsSection.appendChild(activitiesTotalSpanElement);
        }
        document.querySelector('.cost').innerText = `Total: $${activitiesTotal}`;
    }
    else {
        console.log(activitiesTotalSpanElement);
        document.querySelector('.cost').innerText = '';
    }
});

//toggling options in Color section
themeSelectElement.addEventListener('change',function(e){
    toggleColorOptions(e);
});
colorSelectGroup.addEventListener('change',function(e){
    optionNode.remove();
});

//hide/show payments
paymentSelectElement.addEventListener('change',function(e){
    hideAllPaymentsAndShow(e.target.value.replace(' ','-'));
});

form.addEventListener('submit',function(e){
    if (!formIsValid()){
        e.preventDefault();
        document.querySelector('.error').focus();
    }
});
emailInput.addEventListener('keyup', function(){
    if(!elementIsValid(emailInput,emailRegex)){
        applyErrorStyle(emailInput);
        displayEmailError();
    }
    else{
        emailErrorDiv.remove();
    }
})
//form validation function
function formIsValid(){
    let formIsValid = true;
    const nameDomElement = document.querySelector('#name');
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const creditCardRegex = /^[0-9]{13,16}$/;
    const zipCodeDomElement = document.querySelector('#zip');
    const zipCodeRegex= /^[0-9]{5}$/;
    const cvvNumberDomElement = document.querySelector('#cvv');
    const cvvRegex = /^[0-9]{3}$/;

    //to allow all form inputs to be validated and accordingly styled before errors displayed on the page
    if (!elementIsValid(nameDomElement,nameRegex)) formIsValid = false;
    if (!elementIsValid(emailInput,emailRegex)) {
        displayEmailError();
        formIsValid = false;
    }
    if (paymentSelectElement.value === "credit card"){
        if(!elementIsValid(creditCardNumberInput,creditCardRegex)) {
            displayCreditCardError(); 
            formIsValid = false;
        }
        if(!elementIsValid(zipCodeDomElement,zipCodeRegex)) formIsValid = false;
        if(!elementIsValid(cvvNumberDomElement,cvvRegex)) formIsValid = false;
    }
    if (!activitiesTotal) {
        formIsValid = false;
        //added error class to the first activities input element to force focus on it after form submition if all errors before it cleared
        checkboxElementsSection.querySelector('input').className = "error";
        checkboxElementsSection.querySelector('legend').style.color = "red";
    }
    else{
        checkboxElementsSection.querySelector('input').className = "";
        checkboxElementsSection.querySelector('legend').removeAttribute('style');
    }
    return formIsValid;
}

//general function for individual form inputs validation
function elementIsValid(element, regex){
    if (regex.test(element.value)){
        resetErrorsStyle(element);
        return true;
    }
    else{
        applyErrorStyle(element);
        return false;
    }
}

//function to reset error style
function resetErrorsStyle(element){
    element.style.cssText = '';
    element.previousElementSibling.style.cssText = '';
    element.className = "";
}
//function to apply error style
function applyErrorStyle(element){
    element.style.borderColor = 'red';
    element.style.borderWidth = '2px';
    element.style.borderStyle = 'solid';
    element.className = "error";
    element.previousElementSibling.style.color = 'red';
}
//function to hide payments
function hideAllPaymentsAndShow(id){
    document.querySelector('#credit-card').style.display = 'none';
    document.querySelector('#paypal').style.display = 'none';
    document.querySelector('#bitcoin').style.display = 'none';
    document.getElementById(id).style.display = 'block';
}
function displayCreditCardError(){
    if(!creditCardNumberInput.value.length){
        creditCardErrorDiv.innerText = 'Please enter a credit card number.';
    }
    else if(creditCardNumberInput.value.length < 13 || creditCardNumberInput.value.length > 16){
        creditCardErrorDiv.innerText = 'Please enter a number that is between 13 and 16 digits long.';
    }
    creditCardDiv.children[0].appendChild(creditCardErrorDiv);
    creditCardNumberInput.addEventListener('blur', function(){creditCardErrorDiv.remove();});
}
function displayEmailError(){
    emailErrorDiv.innerText = "Please enter valid email";
    emailInput.parentElement.insertBefore(emailErrorDiv, emailInput.nextElementSibling);
}
