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

export  const profileInputHandler = (unit) =>{
    const day = document.querySelector('select[name="day"]').value
    const month = document.querySelector('select[name="month"]').value
    const year = document.querySelector('select[name="year"]').value
    let isGender = document.querySelector('input[name="gender"]:checked')
    const gender = isGender == null? false : document.querySelector('input[name="gender"]:checked').value
    let feet, inches, kg, centimeter, pounds

    if(unit == 'imperial'){
        feet = document.querySelector('input[name="feet"]').value
        inches = document.querySelector('input[name="inches"]').value
        kg = document.querySelector('input[name="kg"]').value
    }else{
        centimeter = document.querySelector('input[name="centimeter"]').value
        pounds = document.querySelector('input[name="pounds"]').value
    }
    return [gender, feet, inches, kg, centimeter, pounds, day, month, year]
}