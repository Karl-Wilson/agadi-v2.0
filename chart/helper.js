
import { timeConverter } from '../utils/helper';
export const monthlyChartLabels = (length=12) =>{
    let monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let currentMonth = new Date().getMonth()
    let currentYear = new Date().getFullYear()
    let result = []
    let i = currentMonth
    let dataLength = (length<=5)? 5: length;
    result.push({date: new Date(currentYear, currentMonth), remark: ''});

    while(result.length < dataLength){
        i--
        if(i == -1){
            i = monthLabels.length-1;
            currentYear--
            //marks the first month of each year
            result[result.length-1].remark = 'first'
        }
        result.push({date: new Date(currentYear, i), remark: ''})
    }

    return result;
}

export const weeklyChartLabels = (length=12) =>{
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let result = []
    let current  = new Date()
    let newDay = current.getDay()
    let newDate = current.getDate()
    let newMonth = current.getMonth()
    let newYear = current.getFullYear()
    let newLength = (length<=5)? 5: length

    let isLeapYear = (year) =>{
        let date = 29
        let newDate = new Date(year, 1, date)
        if(newDate.getDate() != date && date == 29 ) return false
        return true;
    }

    let isMonthThirtyDays = (year, month) =>{
        if(month == 1) return undefined
        let date = 31
        let newDate = new Date(year, month, date)
        if(newDate.getDate() != date && date == 31 ) return true
        return false;
    }
    //if current day is not a sunday, loop back to sunday and get sunday date which is same as getting the current week
    //ie if today is tuesday 7 aug, loop back to sunday which will be 4th aug because the week starts on sunday
    if(newDay != 0){
        let i = newDay;
        for(let i=newDay; i>0; i--){
            newDate--
        }
    }
    //after getting sunday date, store current week to result, reduce display length by one  for the loop
    result.push({date: new Date(newYear, newMonth, newDate), remark: ''})

    //loop back to get the remaining weeks starting from new date and day which is sunday
    while(result.length < newLength){         
       newDate = newDate - 7 
       //if its a new month, reduce month by one, reset date to reflect the new month date
        if(Math.sign(newDate) == -1 || Math.sign(newDate) == 0){
            newMonth--
            //marks the first sunday of every month
            result[result.length-1]['remark'] = 'first'

            //if its february check if it the year is a leap year
            if(newMonth == 1){
                if(isLeapYear(newYear)){
                    newDate = newDate + 29
                }else{
                    newDate = newDate + 28
                }
            }else{
                //check if the month has 30 days
                if(isMonthThirtyDays(newYear, newMonth)){
                    newDate = newDate + 30
                }else{
                    newDate = newDate + 31
                }
            }     
        }
        //if its a new year, adjust the month to reflect new year month
        if(Math.sign(newMonth) == -1){
            newMonth = newMonth + 12
            newYear--
        }
        
        result.push({date: new Date(newYear, newMonth, newDate), remark: ''})

    }
    return result
}

export const yearlyChartLabels = (length=5) =>{
    let result = []
    let currentDate  = new Date()
    let currentYear = currentDate.getFullYear()

    result.push({date: new Date(currentYear, 0)});

    while(result.length < length){
        result.push({date: new Date(--currentYear, 0)});
    }
    return result;
}

export  const reformatDataTime = (list) =>{
    //changing timestamp dates to javascript dates
    //list format - [{email: '', date: '', reading: ''}, ....]
    if(!list) return null
    let [...newBP] = list
    let result = []
    for(let i=newBP.length-1; i>=0;i--){
        let data = {}
        let newDate = new Date(timeConverter.secToMili(newBP[i].date.seconds) +  timeConverter.nanoToMili(newBP[i].date.nanoseconds)) 
        Object.assign(data, newBP[i])
        data.date = newDate
        result.push(data)
    }
    return result;
}

export const sortData = (list) =>{    
    //insertion sort method
    //used to sort data according to dates from old to recent date, ascending order
     //list format - [{email: '', date: '', reading: ''}, ....]
    if(!list) return null
    let [...arr] = list

    for(var i=1; i<arr.length; i++){
        let current = arr[i]
        for(var j=i-1; j>=0; j--){
            if(arr[j].date > current.date){
                arr[j+1] = arr[j]
            }else{
                break;
            }      
        }
        arr[j+1] = current
    }
    return arr
}
export const prepareVitalsData = (data, label) =>{
    if(!data) return null

    let dataList = data
    let result = []
    let currentDay = new Date()

    for(let i=0; i<label.length;i++){
        let currentWeek = label[i].date
        let remark = label[i]['remark']? label[i]['remark']: ''
        if(dataList.length > 0){
            //while loop loops through dataList array that is why length is always checked to see if the whole
            //list was traversed
            //used this method due to data was sorted
            while(dataList.length > 0){
                    let j = result.length-1;
                    let currentData = dataList.pop()
                    //if currentData is in range
                    if(currentData.date>=currentWeek && currentData.date<currentDay){
                        
                        //avoid duplication of label due to labels with multiple data, 
                        //stores multiple data under one label
                        if(result.length > 0 && result[j].label == currentWeek){
                            result[j].data.push(currentData)
                        }else{
                            result.push({label: currentWeek, data: [currentData], remark: remark})
                        }                        
                    }else{
                        dataList.push(currentData)
                           //if statement prevents adding additional line with null data
                            if(result.length > 0 && result[j].label != currentWeek){
                                result.push({label: currentWeek, data: null, remark: remark}) 
                            }  
                            if(result.length == 0){
                                result.push({label: currentWeek, data: null, remark: remark}) 
                            }                          
                        break;
                    }                     
            }
            currentDay = currentWeek;
        }else{
            result.push({label: currentWeek, data: null,  remark: remark})
        }
    }
    return result;
}
export const dataAveraging = (arr) =>{
    //result from prepareVitalsData()
    
    arr.map(value=>{
        if(value.data != null){
            let totalReading = 0
            value.data.map(innerValue=>{
                totalReading += parseInt(innerValue.reading)
            })
            value.data = totalReading/value.data.length  
        }
    })
    return arr.reverse()
}
export const plotWeeklyChart = (arr) =>{
    let monthLables = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if(!arr) return null
    let result = []
    arr.map(element=>{
        let label = element.remark == 'first'? monthLables[element.label.getMonth()] : element.label.getDate().toString();
        let data = element.data? element.data : 0
        result.push({x: label, y: data})
    })
    return result;
}
export const plotMonthlyChart = (arr) =>{
    if(!arr) return null
    let monthLables = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let result = []
    arr.map(element=>{
        let label = element.remark == 'first'?  element.label.getFullYear().toString() : monthLables[element.label.getMonth()]
        let data = element.data? element.data : 0
        result.push({x: label, y: data})
    })
    return result;
}
export const plotYearlyChart = (arr) =>{
    if(!arr) return null
    let result = []
    arr.map(element=>{
        let label = element.label.getFullYear().toString()
        let data = element.data? element.data : 0
        result.push({x: label, y: data})
    })
    return result;
}

export const getSystolic = (arr) =>{
    if(!arr) return null
    let systolic = []
    arr.map(value=>{
        if(value.reading){
            let reading = value.reading.split('/')
            systolic.push({date: value.date, reading: reading[0], email: value.email})
        }
    })
    return systolic;
}
export const getDiastolic = (arr) =>{
    if(!arr) return null
    let diastolic = []
    arr.map(value=>{
        if(value.reading){
            let reading = value.reading.split('/')
            diastolic.push({date: value.date, reading: reading[1], email: value.email})
        }
    })
    return diastolic;
}
//sperate systolic data and diastolic data

export const plotChart = (arr, chartName, label) =>{
    if(!arr) return null;

    let datasets = []
    let currentLabel
    let plotAxis;

    if(label == 'Monthly'){
        currentLabel = monthlyChartLabels()
        plotAxis = plotMonthlyChart
    }else if(label == 'Yearly'){
        currentLabel = yearlyChartLabels()
        plotAxis = plotYearlyChart
    }else{
        currentLabel = weeklyChartLabels()
        plotAxis = plotWeeklyChart
    }

    if(chartName == 'Blood Pressure'){
        let systolic = plotAxis(dataAveraging(prepareVitalsData(sortData(reformatDataTime(getSystolic(arr))), currentLabel)))
        let diastolic = plotAxis(dataAveraging(prepareVitalsData(sortData(reformatDataTime(getDiastolic(arr))), currentLabel)))
        datasets.push(
            {
                label: 'Systolic',
                data: systolic,
                borderColor: 'rgb(253, 106, 91)',
                backgroundColor: 'rgba(255, 99, 132, 0)',
            }
        )
        datasets.push(
            {
                label: 'Diastolic',
                data: diastolic,
                borderColor: 'rgb(53, 141, 156)',
                backgroundColor: 'rgba(255, 99, 132, 0)',
            }
        )
    }else if(chartName == 'Sugar Level'){
        let sugarLevel = plotAxis(dataAveraging(prepareVitalsData(sortData(reformatDataTime(arr)), currentLabel)))
        datasets.push(
            {
                label: 'Sugar Level',
                data: sugarLevel,
                borderColor: 'rgb(253, 171, 91)',
                backgroundColor: 'rgba(255, 99, 132, 0)',
            }
        )
    }
    return datasets;
}