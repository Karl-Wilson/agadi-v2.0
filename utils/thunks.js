import { signIn } from "next-auth/react";
import { uiAction } from "../store/reducers/uiReducer";
import { dataAction } from "../store/reducers/dataReducer";
import {getLatestData} from './helper'
export const loginThunk = (data) =>{
    fetch('/api/login', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)}).then(response => {return response.json(); }).then(data => {
          console.log(data)
        });
}
export const registerThunk = async (data) =>{
    const response = await fetch('/api/register', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)})
        
    return response.json()  
}
export const profileUpdaterThunk = (data, dispatch) =>{
    const {addProfileUpdate} = uiAction
    fetch('/api/profileUpdate', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)}).then(response => {return response.json(); }).then(data => {
            if(data.data == 'Updated'){
                //loading
                //redirect
                dispatch(addProfileUpdate(true))
                console.log(data)
            }else if(data.error){
                //display modal
                console.log(data)
            }
        });
 
}
export const fetchVitalsThunk = async (data, dispatch) =>{
    const {addBloodPressure, addSugarLevel, addHeight, addWeight, addUnitMethod} = dataAction
    fetch('/api/vitals', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)}).then(response => {return response.json(); }).then(data => {
            if(data.data){
                let bp = getLatestData(data.data.bloodPressure)
                let sL = getLatestData(data.data.sugarLevel)
                dispatch(addBloodPressure(bp))
                dispatch(addSugarLevel(sL))
                dispatch(addHeight(data.data.height))
                dispatch(addWeight(data.data.weight))
                dispatch(addUnitMethod(data.data.unitMethod))
                //loader
            }      
        });
}
