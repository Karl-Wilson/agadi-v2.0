import styled from "styled-components";
const Wrapper = styled.div`
    width: ${props=>props.width||'100%'};
    padding: 10px;
    box-sizing: box-border;
    background-color: #ED5252;
    border-radius: 10px;
    color: #ffffff;
    margin-top: ${props=>props.mt||'10px'};
    margin-bottom: ${props=>props.mb||'10px'};
`
const FormErrorDisplay = props =>{
    return(
        <Wrapper {...props}/>
    )
}

export default FormErrorDisplay;