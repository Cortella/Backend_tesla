let errors = []

function ValidationContract() {
    errors = []
}

ValidationContract.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message })
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message })
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message })
}

ValidationContract.prototype.isFixedLen = (value, len, message) => {
    if (value.length != len)
        errors.push({ message: message })
}

ValidationContract.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message })
}

ValidationContract.prototype.existsOrError = (value, message) => {
    if(!value){
        errors.push({ message: message })
    }
    if(Array.isArray(value) && value.lenght === 0){
        errors.push({ message: message })
    }
    if(typeof value === 'string' && !value.trim()){
        errors.push({ message: message })
    }
    if(value === null){
        errors.push({ message: message })
    }
}
ValidationContract.prototype.equalsOrError = (value1,value2, msg) => {
    if(value1 !== value2){
        errors.push({ message: message })
    }
}

ValidationContract.prototype.errors = () => { 
    return errors;
}

ValidationContract.prototype.clear = () => {
    errors = []
}

ValidationContract.prototype.isValid = () => {
    return errors.length == 0
}



module.exports = ValidationContract