const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    // If field is empty, convert to empty string so we can use Validator.
    data.email = !isEmpty(data.email) ? data.email : "";
    data.pass = !isEmpty(data.pass) ? data.pass : "";

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field required";
    }

    if (Validator.isEmpty(data.pass)) {
        errors.pass = "Password field required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};