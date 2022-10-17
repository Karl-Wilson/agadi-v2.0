import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { isInputInteger, isInputEmpty, isInputString } from "./helper"
import { useSelector, useDispatch } from "react-redux"
import { profileUpdateAction } from "../store/reducers/profileUpdateReducer"
import {DrugEntry} from  '../components/containers/containers'

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
      }
      return menuHandler;
}

export const useUnitSwitchHandler = (e) =>{
    const {addUnitMethod} = profileUpdateAction
    const dispatch = useDispatch()

//   const [unit, setUnit] = useState('imperial');

  const UnitSwitchHandler = (e) =>{
    let clickedElement = e.target.getAttribute('id')
    if(clickedElement == 'imperialSwitch'){
      document.getElementById('metricSwitch').classList.remove('activeSwitch')
      document.getElementById('imperialSwitch').classList.add('activeSwitch')
      dispatch(addUnitMethod('imperial'))
    //   setUnit('imperial')
    }else{
      document.getElementById('metricSwitch').classList.add('activeSwitch')
      document.getElementById('imperialSwitch').classList.remove('activeSwitch')
      dispatch(addUnitMethod('metric'))
    //   setUnit('base')
    }
  }
  return UnitSwitchHandler;
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
        pounds = document.querySelector('input[name="pounds"]').value
    }else{
        centimeter = document.querySelector('input[name="centimeter"]').value
        kg = document.querySelector('input[name="kg"]').value
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
        if(!feet || !isInputInteger(feet)){
            error.push('feet')
        }
        if(!inches || !isInputInteger(inches)){
            error.push('inches')
        }
        if(!pounds || !isInputInteger(pounds)){
            error.push('pounds')
        }
        
    }else{
        if(!centimeter || !isInputInteger(centimeter)){
            error.push('centimeter')
        }
        if(!kg || !isInputInteger(kg)){
            error.push('kg')
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
            case 'gender': setGenderError(true)
            break;
            case 'feet': setHeightError(true)
            break;
            case 'inches': setHeightError(true)
            break;
            case 'centimeter': setHeightError(true)
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

export const useBackBtn = (UserUrl, pageNumber) =>{
    const router = useRouter()
    const backBtnHandler = () =>{
        router.push(`/${UserUrl}/profile-update/${pageNumber}`)  
    }
    return backBtnHandler;
}

export const useProfileUpdateFields = () =>{
    const day = useSelector(state=>state.profileUpdate.day);
    const month = useSelector(state=>state.profileUpdate.month);
    const year = useSelector(state=>state.profileUpdate.year);
    const gender = useSelector(state=>state.profileUpdate.gender);
    const unitMethod = useSelector(state=>state.profileUpdate.unitMethod);
    const feet = useSelector(state=>state.profileUpdate.feet);
    const inches = useSelector(state=>state.profileUpdate.inches);
    const centimeter = useSelector(state=>state.profileUpdate.centimeter);
    const kg = useSelector(state=>state.profileUpdate.kg);
    const pounds = useSelector(state=>state.profileUpdate.pounds);
    const bloodPressure = useSelector(state=>state.profileUpdate.bloodPressure);
    const sugarLevel = useSelector(state=>state.profileUpdate.sugarLevel);
    const session = useSelector(state=>state.ui.user);
    //const medication = useSelector(state=>state.profileUpdate.medication);
    const DoB = `${day}/${month}/${year}`
    const height = (unitMethod == 'imperial')? {feet: feet, inches: inches} : {centimeter: centimeter};
    const weight = (unitMethod == 'imperial')? {pounds: pounds} : {kg: kg};

    const data = (medication) => {
        let isEmpty = false;
        medication.map(value=>{
            if(value.drugName == '' && value.duration == '' && value.dosage == ''){
                isEmpty = true;
            }else{
                isEmpty = false;
            }
        })

        const data = {
        userId: session.id,
        DoB: DoB,
        gender: gender,
        height: height,
        weight: weight,
        bloodPressure: bloodPressure,
        sugarLevel: sugarLevel,
        unitMethod: unitMethod,
        medication: !isEmpty? medication : []
    }
    return data;
    }
    return data;
}

export const useUpdaterTwo = () =>{
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const bloodPressure = useSelector(state=>state.profileUpdate.bloodPressure)
    const {addBloodPressure} = profileUpdateAction;
    const [error, setError] = useState(false);

    const readingValidation = (BP) =>{
        if(BP){
            let result = BP.split('/')
            if(result.length <= 1 || isNaN(result[0]) || isNaN(result[1])){
                setError('Please enter correct reading, eg 85/120. Also check hint below')
                return false
            }
        
        }else{
            setError('Please enter blood pressure reading')
            return false
        }
        return true
    }
    const errorHide = () =>{
        if(error){
            setError(false);
        }
    }
    const changeHandler = (e) =>{
        let result  = e.target.value
        dispatch(addBloodPressure(result))
    }
 
    return [isLoading, setLoading, bloodPressure, error, setError, readingValidation, errorHide, changeHandler, addBloodPressure]
}
export const useUpdateThree = () =>{
    const sugarLevel = useSelector(state=>state.profileUpdate.sugarLevel)
    const {addSugarLevel} = profileUpdateAction;
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    const readingValidation = (sugarLevel) =>{
        if(sugarLevel){
            if(isNaN(sugarLevel)){
                setError('Please enter correct reading')
                return false
            }
        
        }else{
            setError('Please enter sugar level reading')
            return false
        }
        return true
    }
    const errorHide = () =>{
        if(error){
            setError(false);
        } 
    }
    const changeHandler = (e) =>{
        let result  = e.target.value
        dispatch(addSugarLevel(result))
    }
    return [sugarLevel, addSugarLevel, error, setError, isLoading, setLoading, readingValidation, errorHide, changeHandler]
}

let key = 0;
export const useUpdateFour = () =>{
    const [isLoading, setLoading] = useState(false);
    const [field, setField] = useState([<DrugEntry key={key} serial={key} />]);
    const [fieldValues, setFieldValues] = useState([{serial: "0", drugName: '', duration: '', dosage: ''}]);

    const addHandler = () =>{
        ++key
        let fields = field.concat(<DrugEntry key={key} serial={key} />)
        let fieldValue = fieldValues.concat({serial: `${key}`, drugName: '', duration: '', dosage: ''})
        setField(fields)
        setFieldValues(fieldValue)
    }
    const removeHandler = () =>{
        let [...fields] = field;
        let [...fieldValue] = fieldValues
        if(fields.length>1){
            --key
            //for just fields
            fields.splice(-1, 1);
            setField(fields)
            //for field values
            fieldValue.splice(-1, 1);
            setFieldValues(fieldValue) 
        }
    }
    const changeHandler = (e, fieldValues) =>{
        let serial = e.target.getAttribute('data-serial')
        let name = e.target.getAttribute('name')
        let value = e.target.value
        let [...fieldValue] = fieldValues

        fieldValue.map(valueArray=>{
            if(valueArray.serial == serial){
                if(name == 'drugName'){
                    valueArray.drugName = value
                }else if(name == 'dosage'){
                    valueArray.dosage = value
                }else{
                    valueArray.duration = value
                }
            }
        })
    }
    const formValidator  = (fieldValues, profileSettings=true) =>{
        let error = []
        fieldValues.map(valueArray=>{
            if(profileSettings){
                if(isInputEmpty(valueArray.drugName) && isInputEmpty(valueArray.dosage) && isInputEmpty(valueArray.duration)){
                    return error;
                }
            }

            if(isInputEmpty(valueArray.drugName)){
                error.push({name: 'drugName', serial: valueArray.serial})
            }else if(!isInputString(valueArray.drugName)){
                error.push({name: 'drugName', serial: valueArray.serial})
            }
            if(isInputEmpty(valueArray.dosage)){
                error.push({name: 'dosage', serial: valueArray.serial})
            }
            if(isInputEmpty(valueArray.duration)){
                error.push({name: 'duration', serial: valueArray.serial})
            }else if(!isInputInteger(valueArray.duration)){
                error.push({name: 'duration', serial: valueArray.serial})
            }
        })
        return error;
    }
    const errorDisplay = (error) =>{
        error.map(valueArray=>{
            document.querySelector(`#${valueArray.name}${valueArray.serial}`).style.border = "1px solid red";
        })
        console.log(error)
    }
    const errorHide = (error) =>{
        error.map(valueArray=>{
            document.querySelector(`#${valueArray.name}${valueArray.serial}`).style.border = "1px solid #cccccc";
        })
    }
    const inputClick = () =>{
        let result = formValidator(fieldValues)
        errorHide(result)
    }
    return [isLoading, setLoading, field, setField, fieldValues, setFieldValues, addHandler, removeHandler, changeHandler, formValidator, errorDisplay, errorHide, inputClick]
}