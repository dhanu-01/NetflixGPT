export const validateName = (name) =>{
    if(!name||name?.replace(/ /g,'')===""){return "Name is required"}
    if(name.length<=2){return "Name must be atleast 3 characters"}
    if(name.length>255){return "Name must be less than 255 characters"}
    return ""
}

export const validateEmail = (email) => {
    if(!email){return "Email is required"}
    if(!validateEmailFormat(email)){return "Enter a valid email address"}
    return ""
}

export const validateEmailFormat = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const validatePassword = (password) => {
    if(!password){return "Password is required"}
    if(password.length<=7){return "Password must be atleast 8 characters"}
    if(password.length>16){return "Password should not exceed 16 characters"}
    return ""
}