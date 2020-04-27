const otherTitle = document.querySelector('#other-title');
const colorsSelectElement = document.querySelector('#color');
const setOfColorOptions = colorsSelectElement.querySelectorAll('option');
const themeSelectElement = document.querySelector('#design');
const themeDefaultOptionElement = themeSelectElement.querySelector('option');
const checkboxElementsSection = document.querySelector('.activities');
const optionNode = document.createElement('option');
let activitiesTotal = 0;
const paymentSelectElement = document.querySelector('#payment');
const paymentDefaultOptionElement = paymentSelectElement.querySelector('option');
const form = document.querySelector('form');

//focused on the first input element
document.querySelector('input').focus();

hidePayments();

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
optionNode.textContent = 'Please select a T-shirt theme';
optionNode.setAttribute('selected','selected');
colorsSelectElement.appendChild(optionNode);

//remove 'Select Theme' option on click event and show t-shirt options
themeSelectElement.addEventListener('click',function(){
    let setOfThemeOptionElements = themeSelectElement.querySelectorAll('option');
    themeDefaultOptionElement.remove();
    setOfThemeOptionElements = themeSelectElement.querySelectorAll('option');
    for(i=0; i<3;i++){
        setOfColorOptions[i].style.display = 'block';
    }  
    optionNode.remove();  
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
        setOfColorOptions[3].removeAttribute('selected');
        setOfColorOptions[0].setAttribute('selected','selected');
    } 
    else {
        for(i=0; i<3;i++){
            setOfColorOptions[i].style.display = 'none';
        } 
        for(i=3; i<6;i++){
            setOfColorOptions[i].style.display = 'block';
        }
        setOfColorOptions[0].removeAttribute('selected');
        setOfColorOptions[3].setAttribute('selected','selected');
    }
}
//checkboxes selection interaction
checkboxElementsSection.addEventListener('change', function(e){
    const activitiesTotatSpanElement = document.createElement('span');
    activitiesTotatSpanElement.className = "cost";
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
            document.querySelector('form').insertBefore(activitiesTotatSpanElement, document.querySelectorAll('fieldset')[3]);
        }
        document.querySelector('.cost').innerText = `Total: $${activitiesTotal}`;
    }
    else {
        activitiesTotatSpanElement.remove();
    }
});

//toggling options in Color section
themeSelectElement.addEventListener('change',function(e){
    toggleColorOptions(e);
});

//hide default option
paymentSelectElement.addEventListener('click',function(e){
    paymentDefaultOptionElement.remove();
});

//hide/show payments
paymentSelectElement.addEventListener('change',function(e){
    hidePayments();
    document.getElementById(e.target.value.replace(' ','-')).style.display = 'block';
});

form.addEventListener('submit',function(e){
    if (!formIsValid()){
        e.preventDefault();
    }
});

//form validation function
function formIsValid(){
    let formIsValid = true;
    const nameDomElement = document.querySelector('#name');
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailDomElement = document.querySelector('#mail');
    const emailRegex = /\S+@\S+\.\S+/;
    const creditCardDomElement = document.querySelector('#cc-num');
    const creditCardRegex = /^[0-9]{13,16}$/;
    const zipCodeDomElement = document.querySelector('#zip');
    const zipCodeRegex= /^[0-9]{5}$/;
    const cvvNumberDomElement = document.querySelector('#cvv');
    const cvvRegex = /^[0-9]{3}$/;

    //to allow all form inputs to be validated and accordingly styled before errors displayed on the page
    if (!elementIsValid(nameDomElement,nameRegex)) formIsValid = false;
    if (!elementIsValid(emailDomElement,emailRegex)) formIsValid = false;
    if (paymentSelectElement.value === "credit card"){
        if(!elementIsValid(creditCardDomElement,creditCardRegex)) formIsValid = false;
        if(!elementIsValid(zipCodeDomElement,zipCodeRegex)) formIsValid = false;
        if(!elementIsValid(cvvNumberDomElement,cvvRegex)) formIsValid = false;
    }
    if (!activitiesTotal) {
        formIsValid = false;
        checkboxElementsSection.style.color = "red";
    }
    else{
        checkboxElementsSection.style.cssText = '';
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
}
//function to apply error style
function applyErrorStyle(element){
    element.style.borderColor = 'red';
    element.style.borderWidth = '2px';
    element.style.borderStyle = 'solid';
    element.previousElementSibling.style.color = 'red';
}
//function to hide payments
function hidePayments(){
    document.querySelector('#credit-card').style.display = 'none';
    document.querySelector('#paypal').style.display = 'none';
    document.querySelector('#bitcoin').style.display = 'none';
}
