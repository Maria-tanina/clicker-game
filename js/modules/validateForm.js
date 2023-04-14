    //Validation of form
    const isRequired = value => value === '' ? false : true;
    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    const isBetween = (length, min, max) => length < min || length > max ? false : true;
   export const checkNickname = (nickname) => {

        let valid = false;
        const min = 3,
        max = 10;
        const username = nickname.value.trim();
    
        if (!isRequired(username)) {
            showError(nickname, 'Nickname cannot be blank.');
        } else if (!isBetween(username.length, min, max)) {
            showError(nickname, `Username must be between ${min} and ${max} characters.`)
        } else {
            showSuccess(nickname);
            valid = true;
        }
        return valid;
    }
   export const checkUsername = (name) => {

        let valid = false;
        const username = name.value.trim();
    
        if (!isRequired(username)) {
            showError(name, 'Username cannot be blank.');
        }  else {
            showSuccess(name);
            valid = true;
        }
        return valid;
    }
    export const checkEmail = (email) => {

        let valid = false;
        const emailValue = email.value.trim();
        if (!isRequired(emailValue)) {
            showError(email, 'Email cannot be blank.');
        } else if (!isEmailValid(emailValue)) {
            showError(email, 'Email is not valid.')
        } else {
            showSuccess(email);
            valid = true;
        }
        return valid;
    }



export const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    input.classList.remove('success');
    input.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

export const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    input.classList.remove('error');
    input.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}