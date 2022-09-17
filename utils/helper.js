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
    if(input.length < 1){
        return true;
    }
    return false;
}
export const dashboardPageCheck = (pageList, currentPath) =>{
    let path = false
    pageList.map(value=>{
        if(value == currentPath){
            path = true;
        }
    })
    return path
} 
export const timeConverter = {
    secToMili: function (number){
        return 1000*number;
    },
    nanoToMili: function (number){
        return number/1000000
    }
}
export const getLatestData = (arr) =>{
    let index = 0;
    let latest = new Date(timeConverter.secToMili(arr[0].date.seconds) + timeConverter.nanoToMili(arr[0].date.nanoseconds));
    
    for(let i=1; i<arr.length;i++){
        let firstDate = new Date(timeConverter.secToMili(arr[i].date.seconds) + timeConverter.nanoToMili(arr[i].date.nanoseconds))     
        if(firstDate > latest){
            latest = firstDate
            index = i;
        }
    }
    return arr[index];
}
export const bloodPressureCalculator = (reading) =>{
    //check input before making use of the data
    let condition;
    let result;
    let colorCode = [
        {condition: "Low", color: "#024150"},
        {condition: "Normal", color: "#006216"},
        {condition: "Elevated", color: "#824100"},
        {condition: "High", color: "#820C00"},
        {condition: "Extreme", color: "#820C00"}
    ];
    //let data = reading.split(' ');
    let data = reading.split('/')
    let systolic = parseInt(data[0])
    let diastolic = parseInt(data[1])
    
    if(systolic<80 && diastolic<60){
        condition = "Low"
    }else if((systolic>=80 && systolic<120) && diastolic<80){
        condition = "Normal"
    }else if((systolic>=120 && systolic<130) && diastolic<80){
        condition = "Elevated"
    }else if((systolic>=130 && systolic<140) || (diastolic>=80 && diastolic<90)){
        condition = "High"
    }else if((systolic>=140) || diastolic>=90){
        condition = "Extreme"
    }
    colorCode.map(value=>{
        if(value.condition == condition){
            result = {condition: condition, color: value.color}
        }
    })

    return result;
}
export const sugarLevelCalculator = (reading, classification) =>{
    let condition, result;
    let colorCode = [
        {condition: "Low", color: "#024150"},
        {condition: "Normal", color: "#006216"},
        {condition: "Elevated", color: "#824100"},
        {condition: "High", color: "#820C00"}
    ];
    //let data = reading.split(' ');
    //data = parseInt(data[0]);
    let data = reading

    if(classification == 'fasting'){
        if(data < 70){
            condition = "Low"
        }else if(data >= 70 && data <= 100){
            condition = "Normal"
        }else if(data >= 101 && data <= 125){
            condition = "Elevated"
        }else if(data > 125){
            condition = "High"
        }

    }
    if(classification == 'post-meal'){
        if(data < 70){
            condition = "Low"
        }else if(data >= 70 && data <= 140){
            condition = "Normal"
        }else if(data >= 141 && data <= 200){
            condition = "Elevated"
        }else if(data > 200){
            condition = "High"
        }
    }
    colorCode.map(value=>{
        if(value.condition == condition){
            result = {condition: condition, color: value.color}
        }
    })
    return result;
}
export const bmiCalculator = (height, weight, unit) =>{
    let bmi, condition, result;
    let colorCode = [
        {condition: "Underweight", color: "#024150"},
        {condition: "Normal", color: "#006216"},
        {condition: "Overweight", color: "#824100"},
        {condition: "Obese", color: "#820C00"}
    ];

    if(unit == 'metric'){
        //BMI = weight (kg) / [height (m)]2
        bmi = weight / (height*height);
    }
    if(unit == 'imperial'){
        //BMI = 703 × weight (lbs) / [height (in)]2
        bmi = 703 * (weight / (height*height));
    }

    if(bmi<=18.4){
        condition = 'Underweight'
    }else if(bmi>18.4 && bmi<25){
        condition = 'Normal'
    }
    else if(bmi>=25 && bmi<30){
        condition = 'Overweight'
    }else if(bmi>30){
        condition = 'Obese'
    }

    colorCode.map(value=>{
        if(value.condition == condition){
            result = {condition: condition, color: value.color, reading: Math.round(bmi)}
        }
    })
    return result;
}
const getMedicationLevel = (duration, dosage, taken=0) =>{
    if(!taken) return 0;
    let takenLevel = (taken * 100) / (duration * dosage)
    return Math.floor(takenLevel);
}
export const displayMedicationList = (arr) =>{
    if(!arr) return null;
    let result = []
    arr.map(value=>{
        value.reading.map(innerValue=>{
            let duration = parseInt(innerValue.duration)
            let dosage = parseInt(innerValue.dosage)
            let taken = innerValue.taken? parseInt(innerValue.taken) : 0
            result.push({title: innerValue.drugName, level: getMedicationLevel(duration, dosage, taken) })
        }) 
    })
    return result
}