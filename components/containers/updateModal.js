import styled from "styled-components"
import {FormInputContainer, FormGroup, BPInputContainer, FormButtonContainer, DrugEntry} from './containers'
import {Label} from '../core/form/form'
import {Button} from "../core/core"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {uiAction} from '../../store/reducers/uiReducer'
import { useUpdaterTwo, useUpdateThree, useUpdateFour } from "../../utils/hooks"
import { UpdateVitalsThunk } from "../../utils/thunks"
import {UpdateLoading} from '../core/loading/loading'
import { clearUpdateModalForm } from "../../utils/helper"

export const Wrapper = styled.div`
    width: 100%;
    height: auto;
    @media screen and (min-width: 768px){
        width: 500px;
        height: auto;
    }
`
export const Header = styled.div`
    width: 100%;
    height: 60px;
    background-color: #024150;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    padding: 0px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 768px){
        padding: 0px 50px;
    }
`
const InnerHeader = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    aling-items: center;
    position: relative;
    z-index: 20;
`
export const NavButtons = styled.p`
    font-family: Gilroy-Bold;
    font-size: 20px;
    color: #ffffff;
    cursor: pointer;
    position: relative;
    padding-left: ${props=>props.pl||''};
    z-index: 25;
    &.activeModalTab{
        color: #024150;
    }
`
const ActiveNav = styled.div`
    width: 100px;
    height: 35px;
    border-radius: 10px;
    margin: 2.5px 0px;
    background-color: #ffffff;
    position: absolute;
    left: 0;
    top:0;
    transition: left 0.5s;
    z-index: 20;

`
export const Body = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    @media screen and (min-width: 768px){
        padding: 50px;
    }
    
`
export const Form= styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`
const Hint = styled.p`
 font-size: 14px;
 margin-top: 10px;
`
export const AddBtnContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const useCloseModal = () =>{
    const dispatch = useDispatch()
    const {addUpdateModal} = uiAction
    const closeModalHandler = () =>{
        dispatch(addUpdateModal(false))
        clearUpdateModalForm(dispatch)
    }
    return [closeModalHandler, dispatch]
}
export const ButtonContainer = props =>{
        return(
        <FormButtonContainer>
            <Button Swidth="100%" Lwidth="50px" click={props.cancel}>Cancel</Button>
            <Button Swidth="100%" Lwidth="160px" solid click={props.update}>Update</Button>
        </FormButtonContainer>
    )
}
const BPForm = props =>{
    const [isLoading, setLoading, bloodPressure, error, setError, readingValidation, errorHide, changeHandler, addBloodPressure] = useUpdaterTwo()
    const [closeModalHandler, dispatch] = useCloseModal()
    const user = useSelector(state=>state.ui.user)  
    const clickHandler = () =>{
        let isValid = readingValidation(bloodPressure)
        if(isValid){
            let data = {reading: bloodPressure, userId: user.id, document: 'BloodPressure'}
            UpdateVitalsThunk(data, dispatch, closeModalHandler)
        }  
    }

    return(
        <Form>
            <FormInputContainer>
                <FormGroup>
                    <Label mb="10px">Blood Pressure</Label>
                    <BPInputContainer unit="mmHg" name="bp" placeholder="Blood Pressure" error={error} onClick={errorHide} change={changeHandler} value={bloodPressure}/>
                    <Hint>Hint : systolic/diastolic</Hint>
                </FormGroup>                    
            </FormInputContainer>
            <ButtonContainer update={clickHandler} cancel={closeModalHandler}/>
        </Form>
    )
}
const SugarForm = props =>{
    const [sugarLevel, addSugarLevel, error, setError, isLoading, setLoading, readingValidation, errorHide, changeHandler] = useUpdateThree()
    const [closeModalHandler, dispatch] = useCloseModal()
    const user = useSelector(state=>state.ui.user)  
    const clickHandler = () =>{
        let isValid = readingValidation(sugarLevel)
        if(isValid){
            let data = {reading: sugarLevel, userId: user.id, document: 'SugarLevel'}
            UpdateVitalsThunk(data, dispatch, closeModalHandler)
        } 
    }
    return(
        <Form>
            <FormInputContainer>
                <FormGroup>
                    <Label mb="10px">Sugar Level</Label>
                    <BPInputContainer unit="mg/dl" name="sugarLevel" placeholder="Sugar Level" error={error} onClick={errorHide} change={changeHandler} value={sugarLevel}/>
                </FormGroup>                    
            </FormInputContainer>
            <ButtonContainer update={clickHandler} cancel={closeModalHandler}/>
        </Form>
    )
}

const MedForm = props =>{
    const [isLoading, setLoading, field, setField, fieldValues, setFieldValues, addHandler, removeHandler, changeHandler, formValidator, errorDisplay, errorHide, inputClick] = useUpdateFour()
    const [closeModalHandler, dispatch] = useCloseModal()
    const user = useSelector(state=>state.ui.user)  
    const clickHandler = () =>{
        let result = formValidator(fieldValues)
        if(result.length<=0){
           let data = {reading: fieldValues, userId: user.id, document: 'Medications'}
           UpdateVitalsThunk(data, dispatch, closeModalHandler)
        }else{
            errorDisplay(result)
        }
    }

    return(
        <div>
            <FormInputContainer>
                <span onChange={(e)=>{changeHandler(e, fieldValues)}} onClick={inputClick}>
                {field}
                </span>
            </FormInputContainer>
            <AddBtnContainer>
                <Button Swidth="60px" pr="15px" pl="0px" bold click={addHandler}>Add</Button>
                <Button Swidth="70px" pr="15px" pl="15px" bold click={removeHandler}>Remove</Button>
            </AddBtnContainer>
            <ButtonContainer update={clickHandler} cancel={closeModalHandler}/>
        </div>
    )
}

const UpdateModal = props =>{
    const updateLoad = useSelector(state=>state.ui.updateLoad)
    const [activeTab, setActive] = useState('BP')
    const clickedHandler = (e) =>{ 
        setTimeout(function(){
            document.querySelector('.activeModalTab').classList.remove('activeModalTab')
        }, 50);
        setTimeout(function(){
            e.target.classList.add('activeModalTab')
        }, 200);
        let name = e.target.innerText
        let result = e.target.offsetLeft
        document.getElementById('slider').style.left = `${result}px`
        setActive(name)
    }
    return(
        <Wrapper>
            <Header>
                <InnerHeader>
                    <NavButtons  pl="39px" className="activeModalTab" onClick={clickedHandler}>BP</NavButtons>
                    <NavButtons  pl="23px" onClick={clickedHandler}>Sugar</NavButtons>
                    <NavButtons  pl="26px" onClick={clickedHandler}>Meds</NavButtons>
                    <ActiveNav id="slider"/>
                </InnerHeader>
            </Header>
            <Body id="modalBody">
                {updateLoad && <UpdateLoading/>}
                {activeTab == 'BP' && <BPForm/>}
                {activeTab == 'Sugar' &&  <SugarForm/>}
                {activeTab == 'Meds' &&  <MedForm/>}
            </Body>
        </Wrapper>
    )
}
export default UpdateModal