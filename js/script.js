const otherTitle = document.querySelector('#other-title');
const colorsSelectElement = document.querySelector('#color');
const setOfColorOptions = document.querySelectorAll('#color option');
const themeSelectElement = document.querySelector('#design');
const themeDefaultOptionElement = themeSelectElement.querySelector('#design option');
const checkboxElementsSection = document.querySelector('.activities');
const setOfCheckboxes = checkboxElementsSection.querySelectorAll('input');
let setOfThemeOptionElements;
let optionNode = document.createElement('option');

//focused on the first input element
document.querySelector('input').focus();

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

checkboxElementsSection.addEventListener('change', function(e){
    for(let i=0; i<setOfCheckboxes.length; i++){
        if(setOfCheckboxes[i].getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time') & setOfCheckboxes[i] !== e.target){           
            if(e.target.checked){
                setOfCheckboxes[i].setAttribute('disabled','diabled');
                setOfCheckboxes[i].parentElement.style.color = '#999';
            }
            else{
                setOfCheckboxes[i].removeAttribute('disabled');
                setOfCheckboxes[i].parentElement.style.color = '#000';
            }
        }
    }
});
themeSelectElement.addEventListener('change',function(e){
    toggleColorOptions(e);
});
