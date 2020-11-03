const form=document.getElementById('form');
const username=document.getElementById('username');
const email=document.getElementById('email');
const password=document.getElementById('password');
const password2=document.getElementById('password2');

//Show error
function showError(input,message){
    const formControl=input.parentElement;
    formControl.className='form-control error';
    const small=formControl.querySelector('small');
    small.innerText=message;
}

//Show Success
function showSuccess(input){
    const formControl=input.parentElement;
    formControl.className='form-control success';
}

//FeildName with first letter as uppercase
function getFieldName(input){
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

//Check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim()===''){
            showError(input,`${getFieldName(input)} is req`);
        }
        else{
            showSuccess(input);
        }
    });
}

//Check input length
function checkLength(input,min,max){
    if(input.value.length<min){
        showError(input,`${getFieldName(input)} must be atleast ${min} characters`)
    }
    else if(input.value.length>max){
        showError(input,`${getFieldName(input)} must be less than ${max} characters`)
    }else{
        showSuccess(input);
    }
}

//Check email
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    }else{
        showError(input,'Email is not valid');
    }
}

//Check Password validations
function checkPassword(input) { 
    var passw=  /^[A-Za-z]\w{7,14}$/;
    if(input.value.match(passw)) { 
        showSuccess(input);
    }else{
        showError(input,'Password must have atleast 1 Uppercase letter, 1 Lowercase letter and 1 Numeric letter');
    }
}

//Check passwords match
function checkPasswordMatch(input1,input2){
    if(input1.value!==input2.value){
        showError(input2,'Passwords do not match');
    }else{
        showSuccess(input2);
    }
}

//Event Listener
form.addEventListener('submit',function(event){
    event.preventDefault();
    
    checkRequired([username,email,password,password2]);
    checkLength(username,3,20);
    checkLength(password,6,20);
    checkEmail(email);
    checkPassword(password);
    checkPasswordMatch(password,password2);
})