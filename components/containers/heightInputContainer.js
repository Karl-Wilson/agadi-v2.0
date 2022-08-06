import { useState } from "react";
import styled from "styled-components";
import {Select, Input} from '../core/form/form'
const Wrapper = styled.div`
    width: ${props=>props.width||'100%'};
    height: auto;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center; 
    border: 1px solid #cccccc;
    height: 50px;
`
const InputContainer = styled.div`
    margin-right: 5px;
    border-radius: 10px;
`
const InputSelect = styled.div`
    border-left: 1px solid #cccccc;
    padding: 0px 20px;
`
const FeetWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const FeetForm = props =>{
    return(
        <FeetWrapper>
            <Input borderless type="text" name="feet" placeholder="Feet" height="48px"/>
            <Input borderless type="text" name="inches" placeholder="Inches" height="48px"/>
        </FeetWrapper>
    )
}
const CentimeterForm = props =>{
    return(
        <div>
            <Input borderless type="text" name="centimeter" placeholder="Centimeter"/>
        </div>
    )
}
export const HeightInputContainer = props =>{
    const [selected, setSelect] = useState('imperial');

    return(
        <Wrapper width="300px">
            <InputContainer>
            {(selected == "imperial") && <FeetForm/>}
            {(selected == "base") && <CentimeterForm/>}
            </InputContainer>
            <InputSelect>
                {(selected == "imperial") && <p>Feet</p>}
                {(selected == "base") && <p>Centimeter</p>}
            </InputSelect>
        </Wrapper>
    )
}

export const WeightInputContainer = props =>{
    const [selected, setSelect] = useState('imperial');

    return(
        <Wrapper width="200px">
            <InputContainer>
            {(selected == "imperial") && <Input borderless type="text" name="kg" placeholder="Kilogram" height="48px"/>}
            {(selected == "base") && <Input borderless type="text" name="pounds" placeholder="Pounds" height="48px"/>}
            </InputContainer>
            <InputSelect>
                {(selected == "imperial") && <p>Kg</p>}
                {(selected == "base") && <p>Lbs</p>}
            </InputSelect>
        </Wrapper>
    )
}

export const BPInputContainer = props =>{
    return(
        <Wrapper width="300px">
            <InputContainer>
                <Input borderless type="text" name="bp" placeholder="Blood Pressure" height="48px"/>
            </InputContainer>
            <InputSelect>
                <p>mmHg</p>
            </InputSelect>
        </Wrapper>
    )
}