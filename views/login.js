import styled from "styled-components";
import {PageWrapper, Logo, Button } from '../components/core/core'
import {FormWrapper, Input, FormErrorDisplay} from '../components/core/form/form'
import {FormTitleContainer, FormInputContainer, FormButtonContainer} from "../components/containers/containers"
import {signIn} from 'next-auth/react'
import {FormLoading, PageLoading} from '../components/core/loading/loading'
import { useState } from "react";
const InnerWrapper = styled.form`

`

const Login = props =>{
    const [isLoading, setLoading] = useState(false)
    const submitHandler = async (e) =>{
        e.preventDefault();
        setLoading(true)
        let email = document.querySelector('input[name="email"]').value
        let password = document.querySelector('input[name="password"]').value
        let result = await signIn('login', {redirect: true, email: email, password: password})
    }

        return(
        <PageWrapper alignItems="center">
            <FormWrapper Lwidth="500px">
                {isLoading && <FormLoading/>}
                <InnerWrapper>
                    <Logo/>
                    <FormTitleContainer title="Login" subtitle="to continue to dashboard"/>
                    <FormInputContainer>
                        <Input type="text" placeholder="Email" name="email" Smb="10px"/>
                        <Input type="password" placeholder="Password" name="password" Smb="10px"/>
                    </FormInputContainer>
                    <Button bold SjustifyContent="flex-start" Swidth="180px" pl="0px" pr="0px" href="/reset">Forgot Passowrd?</Button>
                    <FormButtonContainer>
                        <Button bold pl="0px" pr="0px" LjustifyContent="flex-start" Lwidth="90px" Swidth="100%" href="/register">Register</Button>
                        <Button solid Swidth="100%" Lwidth="160px" click={submitHandler}>Login</Button>
                    </FormButtonContainer>
                </InnerWrapper>
            </FormWrapper>
        </PageWrapper>
        )
    
}
export default Login;