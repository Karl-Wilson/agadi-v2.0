import styled from "styled-components";
import { useState } from "react";
import {FormWrapper, Input, FormErrorDisplay} from "../components/core/form/form"
import {Button, Logo, PageWrapper} from '../components/core/core'
import {FormButtonContainer, FormInputContainer, FormTitleContainer, InputGroup} from '../components/containers/containers'
import { registerThunk } from "../utils/thunks";
import {FormLoading, PageLoading} from '../components/core/loading/loading'
import { isInputEmpty, isEmailValid } from "../utils/helper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const Wrapper = styled.div`
    width: 100%;
`
const InnerWrapper = styled.form`

`
const Img = styled.img`
    display: none;
    @media screen and (min-width: 764px){
        display: block;
    }
`
const Register = props =>{
    const router = useRouter();
    const user = useSelector(state=>state.ui.user)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [FnameError, setFnameError] = useState(false)
    const [LnameError, setLnameError] = useState(false)
    const [EmailError, setEmailError] = useState(false)
    const [PassError, setPassError] = useState(false)
    const [ConfirmError, setConfirmError] = useState(false)

    const validate = (input, input2, input3, input4, input5) =>{
        let isValid = true
        if(isInputEmpty(input) || isInputEmpty(input2) || isInputEmpty(input3) || isInputEmpty(input4) || isInputEmpty(input5)){
            if(isInputEmpty(input)) setFnameError(true)
            if(isInputEmpty(input2)) setLnameError(true)
            if(isInputEmpty(input3)) setEmailError(true)
            if(isInputEmpty(input4)) setPassError(true)
            if(isInputEmpty(input5)) setConfirmError(true)
            setError('Fill in empty fields')
            isValid = false
        }else if(input4 && input5){
            if(input4 != input5){
                setPassError(true)
                setConfirmError(true)
                setError('Password does not match')
                isValid = false
            } 

        }
        if(!isEmailValid(input3)) {
            isValid = false;
            setEmailError(true)
            setError('Not a valid email');
        }
        return isValid;
    }
    const hideError = () =>{
        setFnameError(false)
        setLnameError(false)
        setEmailError(false)
        setPassError(false)
        setConfirmError(false)
        setError(false)
    }
    const submitHandler = async (e) =>{
        e.preventDefault();
        setLoading(true);
        let firstname = document.querySelector('input[name="firstname"]').value
        let lastname = document.querySelector('input[name="lastname"]').value
        let email = document.querySelector('input[name="email"]').value
        let password = document.querySelector('input[name="password"]').value
        let confirm_pass = document.querySelector('input[name="confirm_pass"]').value
        let isValid = validate(firstname, lastname, email, password, confirm_pass)
        if(isValid){
            registerThunk({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                confirm_pass: confirm_pass
            }).then(async data => {
                if(data.error){
                    //display modal
                    setLoading(false)
                    setError(data.error)
                }
                if(data.data){
                    let result = await signIn('login', {redirect: false, email: data.data.email, password: data.data.password})
                    if(result.ok){
                        //redirect
                        location.reload()
                    }else{
                        setLoading(false)
                        setError('An error occured. Try again later')
                    }
                }      
            });

        }else{
            setLoading(false)
        }
        
    }
    if(user){
        router.reload();
    }else{
    return(
        <PageWrapper alignItems="center">
                <FormWrapper Lwidth="800px" dFlex="flex" justifyContent="space-between" alignItems="center">
                    {isLoading && <FormLoading/>}
                    <InnerWrapper>
                        <Logo/>
                        <FormTitleContainer title="Create your Account" subtitle="to continue to dashboard" mt="35px"/>
                        {error && <FormErrorDisplay mt="0px" mb="30px">{error}</FormErrorDisplay>}
                        <FormInputContainer>
                            <InputGroup>
                                <Input type="text" placeholder="First name" name="firstname" Smb="10px" Lmr="10px" error={FnameError} onClick={hideError}/>
                                <Input type="text" placeholder="Last name" name="lastname" Smb="10px" error={LnameError} onClick={hideError}/>
                            </InputGroup>
                            <Input placeholder="Email" name="email" Smb="10px" error={EmailError} onClick={hideError}/>
                            <InputGroup>
                                <Input type="password" placeholder="Password" name="password" Smb="10px" Lmr="10px" error={PassError} onClick={hideError}/>
                                <Input type="password" placeholder="Confirm Password" name="confirm_pass" Smb="10px" error={ConfirmError} onClick={hideError}/>
                            </InputGroup>
                        </FormInputContainer>
                        <FormButtonContainer>
                            <Button bold href="/login" Swidth="100%" Lwidth="160px" pl="0px" pr="0px" LjustifyContent="flex-start">Login instead</Button>
                            <Button solid Swidth="100%" Lwidth="160px" click={submitHandler}>Register</Button>
                        </FormButtonContainer>
                    </InnerWrapper>
                    <Img src="/images/secure logo.svg"/>
                </FormWrapper>
        </PageWrapper>
    )
    }
    return <PageLoading/>
}
export default Register;