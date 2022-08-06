export const userUrlBuilder = (name) =>{
    if(name){
        let smallLetters = name.toLowerCase()
        let splitted = smallLetters.split(" ")
        return splitted.join("-")
    }
    return 
}
export const userNameSeparator = (name, separator) =>{
    if(name){
        let splitted = name.split(" ")
        if(separator == 'lastname'){
            return splitted[1]
        }
        return splitted[0]
    }
    return ;
}