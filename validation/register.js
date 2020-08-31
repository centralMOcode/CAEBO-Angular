/*
Validation for use when registering a new user

This function just checks to make sure the input data is not an empty string,
true match is checked in the router /api/users/register

Isaac Prost March 2020
*/

const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.pass = !isEmpty(data.pass) ? data.pass : "";
    data.pass2 = !isEmpty(data.pass2) ? data.pass2: "";
    
    if (Validator.isEmpty(data.username)){
        errors.username = "Username field is required";
    }

    if (Validator.isEmpty(data.first_name)){
        errors.first_name = "First name field is required";
    }

    if (Validator.isEmpty(data.last_name)){
        errors.last_name = "Last name field is required";
    }

    if (Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }

    if (Validator.isEmpty(data.pass)){
        errors.pass = "Password field is required";
    }

    if (Validator.isEmpty(data.pass2)){
        errors.pass2 = "Confirm password field is required";
    }

    if (!Validator.equals(data.pass, data.pass2)){
        errors.pass2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};