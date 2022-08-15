import { useEffect, useState } from "react"
export const useMenuDropdown = (id) =>{
    useEffect(() => {
        window.addEventListener('resize', function(){
          if(window.innerWidth > 768){
              document.getElementById(id).classList.remove('show')
          }
        })
      
        return () => {
          window.removeEventListener('resize', function(){
              if(window.innerWidth > 768){
                  document.getElementById(id).classList.remove('show')
              }
            })
        }
      }, [])
      const menuHandler = () =>{
          document.getElementById(id).classList.toggle('show')
          console.log('clicked')
      }
      return menuHandler;
}

export const useUnitSwitchHandler = (e) =>{
  const [unit, setUnit] = useState('imperial');

  const UnitSwitchHandler = (e) =>{
    let clickedElement = e.target.getAttribute('id')
    if(clickedElement == 'imperialSwitch'){
      document.getElementById('baseSwitch').classList.remove('activeSwitch')
      document.getElementById('imperialSwitch').classList.add('activeSwitch')
      setUnit('imperial')
    }else{
      document.getElementById('baseSwitch').classList.add('activeSwitch')
      document.getElementById('imperialSwitch').classList.remove('activeSwitch')
      setUnit('base')
    }
  }
  return [UnitSwitchHandler, unit];
}

export const useProfileFormHandler1 = () => {
  const [error, setError] = useState(false)
  const [dayError, setDayError] = useState(false)
  const [monthError, setMonthError] = useState(false)
  const [yearError, setYearError] = useState(false)
  const [genderError, setGenderError] = useState(false)
  const [heightError, setHeightError] = useState(false)
  const [weightError, setWeightError] = useState(false)

  const profileInputHandler = (unit) =>{
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

  const profileFormValidator1 = (gender, feet, inches, kg, centimeter, pounds, day, month, year, unit) =>{
    let error = [];
    if(!day){
        error.push('day')
    }
    if(!month){
        error.push('month')
    }
    if(!year){
        error.push('year')
    }
    if(!gender){
        error.push('gender')
    }
    if(unit == 'imperial'){
        if(!feet){
            error.push('feet')
        }
        if(!inches){
            error.push('inches')
        }
        if(!kg){
            error.push('kg')
        }
    }else{
        if(!centimeter){
            error.push('centimeter')
        }
        if(!pounds){
            error.push('pounds')
        }
    }
    return error;
}
const errorHide = () =>{
    if(error){
        setError(false);
        setDayError(false)
        setMonthError(false)
        setGenderError(false)
        setYearError(false)
        setHeightError(false)
        setWeightError(false)
    }
    
}
const errorDisplay = (error) =>{
    if(error.length>0){
        setError('Fill in missing field(s)')
    }
    error.map(value=>{
        switch(value){
            case 'day':  setDayError(true)
            break;
            case 'month':  setMonthError(true)
            break;
            case 'year':  setYearError(true)
            break;
            case 'feet': setHeightError(true)
            break;
            case 'inches': setHeightError(true)
            break;
            case 'cm': setHeightError(true)
            break;
            case 'kg': setWeightError(true)
            break;
            case 'pounds': setWeightError(true)
            break;
        }
    })
}
return [error, dayError, monthError, yearError, genderError, heightError, weightError,
  profileFormValidator1, errorHide, errorDisplay, profileInputHandler]
}