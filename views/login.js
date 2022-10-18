import styled from "styled-components";
import {PageWrapper, Logo, Button } from '../components/core/core'
import {FormWrapper, Input, FormErrorDisplay} from '../components/core/form/form'
import {FormTitleContainer, FormInputContainer, FormButtonContainer} from "../components/containers/containers"
import {signIn} from 'next-auth/react'
import {FormLoading, PageLoading} from '../components/core/loading/loading'
import { useState } from "react";
import { isInputEmpty, isEmailValid } from "../utils/helper";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const InnerWrapper = styled.form`

`

const Login = props =>{
    //const loginroute = useLoginRouter()
    const router = useRouter();
    const user = useSelector(state=>state.ui.user)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passError, setPassError] = useState(false)
    const validate = (input, input2) =>{
        let isValid = true
        if(isInputEmpty(input) || isInputEmpty(input2)){
            if(isInputEmpty(input)) setEmailError(true)
            if(isInputEmpty(input2)) setPassError(true)
            isValid = false
            setError('Fill in empty fields')
        }
        if(!isEmailValid(input)) {
            isValid = false;
            setEmailError(true)
            setError('Not a valid email');
        }
        return isValid;
    }
    const hideError = () =>{
        setEmailError(false)
        setPassError(false)
        setError(false)
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        setLoading(true)
        let email = document.querySelector('input[name="email"]').value
        let password = document.querySelector('input[name="password"]').value
        let isValid = validate(email, password)
        if(isValid){
            let result = await signIn('login', {redirect: false, email: email, password: password})
            if(result.ok){
                //redirect
                location.reload()
            }else{
                setLoading(false)
                setError('Username or Password is not correct')
            }
        }else{
            setLoading(false)
        }
        
    }
    if(user){
        router.reload();
    }else{
        return(
        <PageWrapper alignItems="center">
            <FormWrapper Lwidth="500px">
                {isLoading && <FormLoading/>}
                <InnerWrapper>
                    <Logo/>
                    <FormTitleContainer title="Login" subtitle="to continue to dashboard"/>
                    {error && <FormErrorDisplay mt="0px" mb="30px">{error}</FormErrorDisplay>}
                    <FormInputContainer>
                        <Input type="text" placeholder="Email" name="email" Smb="10px" error={emailError} onClick={hideError}/>
                        <Input type="password" placeholder="Password" name="password" Smb="10px" error={passError} onClick={hideError}/>
                    </FormInputContainer>
                    <Button bold SjustifyContent="flex-start" Swidth="180px" pl="0px" pr="0px" href="/recovery">Forgot Password?</Button>
                    <FormButtonContainer>
                        <Button bold pl="0px" pr="0px" LjustifyContent="flex-start" Lwidth="90px" Swidth="100%" href="/register">Register</Button>
                        <Button solid Swidth="100%" Lwidth="160px" click={submitHandler}>Login</Button>
                    </FormButtonContainer>
                </InnerWrapper>
            </FormWrapper>
        </PageWrapper>
        )
    }
    return <PageLoading/>
}
export default Login;