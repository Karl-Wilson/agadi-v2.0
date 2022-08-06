import styled from "styled-components";
const Wrapper = styled.div`
    width: ${props=>props.Swidth||''};
    height: ${props=>props.Sheight||'auto'};
    background-color: ${props=>props.bgColour||'#ffffff'};
    padding: ${props=>props.padding||"15px"};
    box-shadow: ${props=>props.shadowless? '': "2px 2px 5px #cccccc"};
    border-radius: 10px;
`
const Card = props =>{
    return <Wrapper {...props}/>
}

export default Card;