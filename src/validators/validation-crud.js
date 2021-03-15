exports.existsOrError = (value,msg) =>{
    if(!value) throw msg
    if(Array.isArray(value) && (value.length == 0 || value == null)) throw msg
    //if(Array.isArray(value) && value.length) throw msg
    if(typeof value === 'string' && !value.trim()) throw msg
}

exports.notExistsOrError = (value, msg) =>{
    try{
        existsOrError(value,msg)
    }catch(msg){
        return
    }
    throw msg
}

exports.equalsOrError = (v1,v2, msg) => {
    if(v1 !== v2) throw msg
}

exports.isRequired = (value, msg) => {
    if (!value || value.length <= 0){
        throw msg
    }
}

exports.hasMinLen = (value,min,msg) => {
    if (!value || value.length < min){
        throw msg
    }
}

exports.hasMaxLen = (value,max,msg) => {
    if (!value || value.length > min){
        throw msg
    }
}

exports.isNumber = (string) =>{
    return !isNaN(parseInt(string))
}