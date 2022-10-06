import styled from "styled-components";
import { useSelector } from "react-redux";
import { Wrapper, Body, Form, ButtonContainer, AddBtnContainer, useCloseModal} from "./updateModal";
import {FormInputContainer, FormGroup, BPInputContainer, FormButtonContainer, InputGroup} from './containers'
import {Select, Label, Input} from '../core/form/form'
import { useState, useEffect } from "react";
import {getMedicationLevel } from "../../utils/helper";
import { UpdateMedThunk } from "../../utils/thunks";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/reducers/uiReducer";
import {UpdateLoading} from '../core/loading/loading'

const DoseTakenWrapper = styled.div`
    display: flex;
    flex-direction: row;
    cursor: pointer;
`
const CounterBtn = styled.div`
    width: 40px;
    height: 40px;
    background-color: #cccccc;
    border-top-left-radius: ${props=>props.left? '10px' : ''};
    border-bottom-left-radius: ${props=>props.left? '10px' : ''};
    border-top-right-radius: ${props=>props.right? '10px' : ''};
    border-bottom-right-radius: ${props=>props.right? '10px' : ''};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`
const DoseTaken = props =>{
    return(
        <DoseTakenWrapper>
            <CounterBtn left name="minus" onClick={props.click}>-</CounterBtn>
            <Input width="50px" height="40px" onChange={props.change} value={props.value} NoBorderRadius/>
            <CounterBtn right onClick={props.click} name="plus">+</CounterBtn>
        </DoseTakenWrapper>
    )
}

const DosageUpdateModal = props =>{
    //const [sugarLevel, addSugarLevel, error, setError, isLoading, setLoading, readingValidation, errorHide, changeHandler] = useUpdateThree()
    const dispatch = useDispatch()
    const {addShowDosageUpdateModal} = uiAction
    const user = useSelector(state=>state.ui.user) 
    const medList = useSelector(state=>state.data.medicationList)
    const updateLoad = useSelector(state=>state.ui.updateLoad)
    const [list, setList] = useState([])
    const [taken, setTaken] = useState()
    const [drugName, setDrugName] = useState()
    
    
    useEffect(() => {
      if(medList){setList(medlistProcessing())}
    }, [medList])
    
    const closeModalHandler = () =>{
        dispatch(addShowDosageUpdateModal(false))
    }
    const medlistProcessing = () =>{
        let result = []
        medList.map(value=>{ 
            value.reading.map(value=>{
                let alreadyTaken = value.taken? parseInt(value.taken) : 0
                let medLevel = getMedicationLevel(parseInt(value.duration), parseInt(value.dosage), alreadyTaken)
                if(medLevel < 100){
                    //push only drugs that are not finished yet
                    result.push({name: value.drugName, taken: value.taken? parseInt(value.taken) : 0})
                } 
            })
        })
        setTaken(result[0].taken)
        setDrugName(result[0].name)
        return result;
    }
     
    const counter = (e) =>{
        let name = e.target.getAttribute('name')
        if(name == 'minus'){
            if(taken != 0) setTaken(--taken)
        }else{
            setTaken(++taken)
        }
    }
    const selectedDrugNameHandler = (e) =>{
        let value = e.target.value
        list.map(arrValue=>{
            if(arrValue.name == value) {
                setTaken(arrValue.taken)
                setDrugName(value)
            }
        })
    }
    const inputChangeHandler = (e) =>{
        setTaken(e.target.value)
    }

    const clickHandler = () =>{
        let data = {drugName: drugName, taken: taken, userId: user.id, document: 'Medications', alreadyTakenUpdate: true}
        UpdateMedThunk(data, dispatch, closeModalHandler)
    }
    return(
        <Wrapper>
            <Body>
                {updateLoad && <UpdateLoading/>}
                <Form>
                <FormInputContainer>
                    <InputGroup FlexDirection="row">
                        <FormGroup mr="24px">
                            <Label mb="10px">Medication</Label>
                            <Select onChange={selectedDrugNameHandler}>
                                {list.map((value, index)=>{
                                    return <option key={index+value.name}>{value.name}</option>
                                })}
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label mb="10px">Taken</Label>
                            <DoseTaken value={taken} click={counter} change={inputChangeHandler}/>
                        </FormGroup>
                    </InputGroup>                    
                    </FormInputContainer>
                    <ButtonContainer update={clickHandler} cancel={closeModalHandler}/>
                </Form>
            </Body>
        </Wrapper>
    )
}

export default DosageUpdateModal