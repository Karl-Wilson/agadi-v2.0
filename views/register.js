import styled from "styled-components";
import { useState } from "react";
import {FormWrapper, Input} from "../components/core/form/form"
import {Button, Logo, PageWrapper} from '../components/core/core'
import {FormButtonContainer, FormInputContainer, FormTitleContainer, InputGroup} from '../components/containers/containers'
import { registerThunk } from "../utils/thunks";
import {FormLoading} from '../components/core/loading/loading'
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
    const [isLoading, setLoading] = useState(false)
    const submitHandler = (e) =>{
        e.preventDefault();
        setLoading(true);
        let firstname = document.querySelector('input[name="firstname"]').value
        let lastname = document.querySelector('input[name="lastname"]').value
        let email = document.querySelector('input[name="email"]').value
        let password = document.querySelector('input[name="password"]').value
        let confirm_pass = document.querySelector('input[name="confirm_pass"]').value
        registerThunk({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            confirm_pass: confirm_pass
        })
    }
    return(
        <PageWrapper alignItems="center">
                <FormWrapper Lwidth="800px" dFlex="flex" justifyContent="space-between" alignItems="center">
                    {isLoading && <FormLoading/>}
                    <InnerWrapper>
                        <Logo/>
                        <FormTitleContainer title="Create your Account" subtitle="to continue to dashboard" mt="35px"/>
                        <FormInputContainer>
                            <InputGroup>
                                <Input type="text" placeholder="First name" name="firstname" Smb="10px" Lmr="10px"/>
                                <Input type="text" placeholder="Last name" name="lastname" Smb="10px"/>
                            </InputGroup>
                            <Input placeholder="Email" name="email" Smb="10px"/>
                            <InputGroup>
                                <Input type="password" placeholder="Password" name="password" Smb="10px" Lmr="10px"/>
                                <Input type="password" placeholder="Confirm Password" name="confirm_pass" Smb="10px"/>
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
export default Register;