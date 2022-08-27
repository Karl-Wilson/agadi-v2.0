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
let key = 0;
const UpdaterFour = props =>{
    const {addMedication} = profileUpdateAction;
    const router = useRouter();
    const dispatch = useDispatch();
    const backBtnHandler = useBackBtn(props.userUrl, 3);
    const [isLoading, setLoading] = useState(false);
    const [field, setField] = useState([<DrugEntry key={key} serial={key} />]);
    const [fieldValues, setFieldValues] = useState([{serial: "0", drugName: '', duration: '', dosage: ''}]);
    const data = useProfileUpdateFields()

    const addHandler = () =>{
        ++key
        let fields = field.concat(<DrugEntry key={key} serial={key} />)
        let fieldValue = fieldValues.concat({serial: `${key}`, drugName: '', duration: '', dosage: ''})
        setField(fields)
        setFieldValues(fieldValue)
        console.log(fields)
        console.log(fieldValue)
    }
    const removeHandler = () =>{
        let [...fields] = field;
        let [...fieldValue] = fieldValues
        if(fields.length>1){
            --key
            //for just fields
            fields.splice(-1, 1);
            setField(fields)
            console.log(fields)
            console.log(key)
            //for field values
            fieldValue.splice(-1, 1);
            setFieldValues(fieldValue)
            console.log(fieldValue)   
        }
        
    }
     
    const changeHandler = (e, fieldValues) =>{
        let serial = e.target.getAttribute('data-serial')
        let name = e.target.getAttribute('name')
        let value = e.target.value
        let [...fieldValue] = fieldValues

        fieldValue.map(valueArray=>{
            if(valueArray.serial == serial){
                if(name == 'drugName'){
                    valueArray.drugName = value
                }else if(name == 'dosage'){
                    valueArray.dosage = value
                }else{
                    valueArray.duration = value
                }

            }
        })
    }
    const formValidator  = (fieldValues) =>{
        let error = []
        fieldValues.map(valueArray=>{
            if(isInputEmpty(valueArray.drugName)){
                error.push({name: 'drugName', serial: valueArray.serial})
            }else if(!isInputString(valueArray.drugName)){
                error.push({name: 'drugName', serial: valueArray.serial})
            }
            if(isInputEmpty(valueArray.dosage)){
                error.push({name: 'dosage', serial: valueArray.serial})
            }
            if(isInputEmpty(valueArray.duration)){
                error.push({name: 'duration', serial: valueArray.serial})
            }else if(!isInputInteger(valueArray.duration)){
                error.push({name: 'duration', serial: valueArray.serial})
            }
        })
        return error;
    }
    const errorDisplay = (error) =>{
        error.map(valueArray=>{
            document.querySelector(`#${valueArray.name}${valueArray.serial}`).style.border = "1px solid red";
        })
    }
    const errorHide = (error) =>{
        error.map(valueArray=>{
            document.querySelector(`#${valueArray.name}${valueArray.serial}`).style.border = "1px solid #cccccc";
        })
    }
    const inputClick = () =>{
        let result = formValidator(fieldValues)
        errorHide(result)
    }
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
                        <Button solid click={clickHandler}>Next</Button>
                    </FormButtonContainer>
                </Form>
            </FormWrapper>
        </PageWrapper>
    )
} 
export default UpdaterFour;