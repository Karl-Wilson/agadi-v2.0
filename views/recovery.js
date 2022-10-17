import styled from "styled-components";
import {PageWrapper, Logo, Button } from '../components/core/core'
import {FormWrapper, Input, FormErrorDisplay} from '../components/core/form/form'
import {FormTitleContainer, FormInputContainer, FormButtonContainer} from "../components/containers/containers"
import {signIn} from 'next-auth/react'
import {FormLoading, PageLoading} from '../components/core/loading/loading'
import { useState } from "react";
import { isInputEmpty } from "../utils/helper";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const InnerWrapper = styled.form`

`

const Recovery = props =>{
    //const loginroute = useLoginRouter()
    const router = useRouter();
    const user = useSelector(state=>state.ui.user)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const validate = (input) =>{
        let isValid = true
        if(isInputEmpty(input) || isInputEmpty(input2)){
            if(isInputEmpty(input)) setEmailError(true)
            isValid = false
            setError('Fill in empty fields')
        }
        return isValid;
    }
    const hideError = () =>{
        setEmailError(false)
        setError(false)
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        setLoading(true)
        let email = document.querySelector('input[name="email"]').value
        let isValid = validate(email)
        if(isValid){
            let result = await signIn('login', {redirect: false, email: email, password: password})
            if(result.ok){
                //redirect
                location.reload()
            }else{
                setLoading(false)
                setError('Email is not correct')
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
                    <FormTitleContainer title="Recover your password" subtitle="Enter your email to recover password"/>
                    {error && <FormErrorDisplay mt="0px" mb="30px">{error}</FormErrorDisplay>}
                    <FormInputContainer>
                        <Input type="text" placeholder="Email" name="email" Smb="10px" error={emailError} onClick={hideError}/>
                    </FormInputContainer>
                    <FormButtonContainer>
                        <Button solid Swidth="100%" Lwidth="160px">Recover</Button>
                    </FormButtonContainer>
                </InnerWrapper>
            </FormWrapper>
        </PageWrapper>
        )
    }
    return <PageLoading/>
}
export default Recovery;