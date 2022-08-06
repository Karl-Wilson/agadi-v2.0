import styled from "styled-components";
const Wrapper = styled.div`
    width: ${props=>props.width||'100%'};
    height: ${props=>props.height||'auto'};
    display: flex;
    flex-direction: ${props=>props.FlexDirection||'column'};
    justify-content: flex-start;
    align-items: center;
    padding-right: ${props=>props.Spr||''};
    padding-left: ${props=>props.Spl||''};
    padding-top: ${props=>props.Spt||''};
    padding-bottom: ${props=>props.Spb||''};
    margin-right: ${props=>props.Smr||''};
    margin-left: ${props=>props.Sml||''};
    margin-top: ${props=>props.Smt||''};
    margin-bottom: ${props=>props.Smb||''};
    @media screen and (min-width: 764px){
        padding-right: ${props=>props.Lpr||''};
        padding-left: ${props=>props.Lpl||''};
        padding-top: ${props=>props.Lpt||''};
        padding-bottom: ${props=>props.Lpb||''};
        margin-right: ${props=>props.Lmr||''};
        margin-left: ${props=>props.Lml||''};
        margin-top: ${props=>props.Lmt||''};
        margin-bottom: ${props=>props.Lmb||''};
        flex-direction: row;
    }
`
const InputGroup = props =>{
    return <Wrapper {...props}/>
}
export default InputGroup;