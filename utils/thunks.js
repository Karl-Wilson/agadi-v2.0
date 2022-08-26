import { signIn } from "next-auth/react";
import { uiAction } from "../store/reducers/uiReducer";
export const loginThunk = (data) =>{
    fetch('/api/login', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)}).then(response => {return response.json(); }).then(data => {
          console.log(data)
        });
}
export const registerThunk = async (data) =>{
    fetch('/api/register', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)}).then(response => {return response.json(); }).then(data => {
            console.log(data)
            if(data.error){

            }
            if(data.data){
                let result = signIn('login', {redirect: true, email: data.data.email, password: data.data.password})
            }      
        });
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