import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {PageWrapper, Logo, Button} from '../../../components/core/core'
import { useBackBtn } from '../../../utils/hooks'
import {FormWrapper, Label, FormErrorDisplay} from '../../../components/core/form/form'
import {FormTitleContainer, FormButtonContainer, BPInputContainer, FormInputContainer, FormGroup} from '../../../components/containers/containers'
import { profileUpdateAction } from '../../../store/reducers/profileUpdateReducer'
import {FormLoading} from '../../../components/core/loading/loading'
import { useUpdateThree } from '../../../utils/hooks'
const Form= styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`
const UpdaterThree = props =>{
    const [sugarLevel, addSugarLevel, error, setError, isLoading, setLoading, readingValidation, errorHide, changeHandler] = useUpdateThree()
    const router = useRouter()
    const dispatch = useDispatch();
    const backBtnHandler = useBackBtn(props.userUrl, 2)
    
    const clickHandler = (e) =>{
        e.preventDefault();
        setLoading(true)
        let isValid = readingValidation(sugarLevel)
        if(isValid){
            dispatch(addSugarLevel(sugarLevel))
            router.push(`/${props.userUrl}/profile-update/4`)  
        } 
        setLoading(false) 
    }
    return(
        <PageWrapper  pt="24px" pb="24px">
            <FormWrapper Lwidth="500px">
            {isLoading && <FormLoading/>}
                <Form>
                    <div>
                        <Logo/>
                        <FormTitleContainer title="What is your Sugar Level today?" subtitle="to continue to dashboard"/>
                        {error && <FormErrorDisplay>{error}</FormErrorDisplay>}
                        <FormInputContainer>
                            <FormGroup>
                                <Label mb="10px">Sugar Level</Label>
                                <BPInputContainer unit="mg/dl" name="sugarLevel" placeholder="Sugar Level" error={error} onClick={errorHide} change={changeHandler} value={sugarLevel}/>
                            </FormGroup>
                            
                        </FormInputContainer>
                    </div>
                    <FormButtonContainer>
                        <Button Swidth="100%" Lwidth="50px" click={backBtnHandler}>Back</Button>
                        <Button Swidth="100%" Lwidth="160px" solid click={clickHandler}>Next</Button>
                    </FormButtonContainer>
                </Form>
            </FormWrapper>
        </PageWrapper>
    )
} 
export default UpdaterThree;