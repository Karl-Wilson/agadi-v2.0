import { signIn } from "next-auth/react";
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