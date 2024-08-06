class Validator {
    static required(value) {
        try {
            const isValid = value !== undefined && value !== null && value !== '';
            console.log(isValid ? 'Validation passed: Field is required.' : 'Validation failed: Field is required.');
            return isValid;
        } catch (error) {
            console.error('Required validation error:', error);
            return false;
        }
    }

    static email(value) {
        try {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;              //eslint-disable-line
            const isValid = pattern.test(value);
            console.log(isValid ? 'Validation passed: Email is valid.' : 'Validation failed: Email is invalid.');
            return isValid;
        } catch (error) {
            console.error('Email validation error:', error);
            return false;
        }
    }
    static isValidName(value) {
        const pattern = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
        const isValid = pattern.test(value);
        console.log(isValid ? "Validation passed: Valid name." : "Validation failed: Invalid name.");
        
        return isValid;
    }


}

export default Validator;

