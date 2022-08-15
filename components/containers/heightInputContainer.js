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
    border: ${props=>props.error? '1px solid red': '1px solid #cccccc'};
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
            <Input borderless type="text" name="centimeter" placeholder="Centimeter" height="48px" error={props.error}/>
        </div>
    )
}
export const HeightInputContainer = props =>{
    return(
        <Wrapper width="300px"  error={props.error} onClick={props.onClick}>
            <InputContainer>
            {(props.unit == "imperial") && <FeetForm/>}
            {(props.unit == "base") && <CentimeterForm />}
            </InputContainer>
            <InputSelect>
                {(props.unit == "imperial") && <p>Feet</p>}
                {(props.unit == "base") && <p>Centimeter</p>}
            </InputSelect>
        </Wrapper>
    )
}

export const WeightInputContainer = props =>{
    return(
        <Wrapper width="200px"  error={props.error} onClick={props.onClick}>
            <InputContainer>
            {(props.unit == "imperial") && <Input borderless type="text" name="kg" placeholder="Kilogram" height="48px" />}
            {(props.unit == "base") && <Input borderless type="text" name="pounds" placeholder="Pounds" height="48px"/>}
            </InputContainer>
            <InputSelect>
                {(props.unit == "imperial") && <p>Kg</p>}
                {(props.unit == "base") && <p>Lbs</p>}
            </InputSelect>
        </Wrapper>
    )
}

export const BPInputContainer = props =>{
    return(
        <Wrapper width="300px" error={props.error} onClick={props.onClick}>
            <InputContainer>
                <Input borderless type="text" name={props.name} placeholder={props.placeholder} onChange={props.change} value={props.value} height="48px"/>
            </InputContainer>
            <InputSelect>
                <p>{props.unit}</p>
            </InputSelect>
        </Wrapper>
    )
}