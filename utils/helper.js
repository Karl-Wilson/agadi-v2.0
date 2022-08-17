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
export const dayGenerator = () =>{
    let result = []
    let i = 1;
  while(i<=31){
    result.push(i);
    i++;
  }
  return result;
}
export const yearGenerator = () =>{
    let result = [];
    let d = new Date()
    let currentYear = d.getFullYear()
    let endYear = currentYear - 50 // starting from 50 years and above
    for(let i=0;i<=50;i++){
        result.push(endYear-i)
    }
    console.log('fired')
    return result;
}

export const isInputString = (str) => {
    if(isNaN(str)){
        return true
    }
    return false;
}
export const isInputInteger = (int) => {
    if(isNaN(int)){
        return false
    }
    return true;
}
export const isInputEmpty = (input) =>{
    if(input){
        return false;
    }
    return true;
}