import styled from "styled-components";
const Wrapper = styled.div`
    width: ${props=>props.Swidth||''};
    height: ${props=>props.Sheight||'auto'};
    background-color: ${props=>props.bgColour||'#ffffff'};
    padding: ${props=>props.padding||"15px"};
    box-shadow: ${props=>props.shadowless? '': "2px 2px 5px #cccccc"};
    border-radius: 10px;
    margin-left: ${props=>props.Sml||''};
    margin-right: ${props=>props.Smr||''};
    margin-top: ${props=>props.Smt||''};
    margin-bottom: ${props=>props.Smb||''};
    @media screen and (min-width: 992px) {
        width: ${props=>props.Lwidth||props.Swidth||''};
        height: ${props=>props.Lheight || props.Sheight||'auto'};
        margin-left: ${props=>props.Lml || props.Sml ||''};
        margin-right: ${props=>props.Lmr || props.Smr||''};
        margin-top: ${props=>props.Lmt || props.Smt||''};
        margin-bottom: ${props=>props.Lmb || props.Smb||''};
    }
`
const Card = props =>{
    return <Wrapper {...props}/>
}

export default Card;