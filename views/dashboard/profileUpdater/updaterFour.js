import styled from 'styled-components'
import { useState, useEffect } from 'react'
import {PageWrapper, Logo, Button} from '../../../components/core/core'
import {FormWrapper, Label, Input, Select} from '../../../components/core/form/form'
import {FormTitleContainer, FormButtonContainer, BPInputContainer, FormInputContainer, FormGroup, InputGroup, DrugEntry} from '../../../components/containers/containers'
import { useBackBtn } from '../../../utils/hooks'
import { isInputInteger, isInputString, isInputEmpty } from '../../../utils/helper'
import { profileUpdateAction } from '../../../store/reducers/profileUpdateReducer'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { profileUpdaterThunk } from '../../../utils/thunks'
import { useProfileUpdateFields } from '../../../utils/hooks'
import {FormLoading} from '../../../components/core/loading/loading'
import { useUpdateFour } from '../../../utils/hooks'
//question to ask when optimizing, if this component develops a problem how do i find the problem
//how do i isolate codes to aid in debugging

const Form= styled.form`
display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`
const AddBtnContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const UpdaterFour = props =>{
    const [isLoading, setLoading, field, setField, fieldValues, setFieldValues, addHandler, removeHandler, changeHandler, formValidator, errorDisplay, errorHide, inputClick] = useUpdateFour()
    const {addMedication} = profileUpdateAction;
    const router = useRouter();
    const dispatch = useDispatch();
    const backBtnHandler = useBackBtn(props.userUrl, 3);
    const data = useProfileUpdateFields()

    const clickHandler = () =>{
        setLoading(true)
        let result = formValidator(fieldValues)
        if(result.length<=0){
            //console.log(data(fieldValues))
            dispatch(addMedication(fieldValues))
            //send to database
           profileUpdaterThunk(data(fieldValues), dispatch)    
        }else{
            errorDisplay(result)
            setLoading(false)
        }
    }

    return(
        <PageWrapper height="auto" pt="24px" pb="24px">
            <FormWrapper Lwidth="500px">
            {isLoading && <FormLoading/>}
                <Form>
                    <div>
                    <Logo/>
                    <FormTitleContainer title="Are you currently on any medication?" subtitle="Do no miss a dose by keeping track of daily medication"/>
                    <FormInputContainer>
                        <span onChange={(e)=>{changeHandler(e, fieldValues)}} onClick={inputClick}>
                        {field}
                        </span>
                    </FormInputContainer>
                    <AddBtnContainer>
                        <Button Swidth="60px" pr="15px" pl="0px" bold click={addHandler}>Add</Button>
                        <Button Swidth="70px" pr="15px" pl="15px" bold click={removeHandler}>Remove</Button>
                    </AddBtnContainer>
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
export default UpdaterFour;