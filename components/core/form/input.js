import styled from "styled-components";
const Wrapper = styled.input`
    width: ${props=>props.width||'100%'};
    height: ${props=>props.height||'50px'};
    padding: 15px;
    border: ${props=>{
        if(props.borderless){
            return '0px'
        }
        if(props.error){
            return '1px solid red'
        }
        return '1px solid #cccccc'}
    };
    border-radius: ${props=>props.NoBorderRadius? '': '10px'};
    font-family: Gilroy-Light;
    margin-right: ${props=>props.Smr||''};
    margin-left: ${props=>props.Sml||''};
    margin-top: ${props=>props.Smt||''};
    margin-bottom: ${props=>props.Smb||''};
    @media screen and (min-width: 764px){
        margin-right: ${props=>props.Lmr||props.Smr||''};
        margin-left: ${props=>props.Lml||props.Sml||''};
        margin-top: ${props=>props.Lmt||props.Smt||''};
        margin-bottom: ${props=>props.Lmb||props.Smb||''};
    }
`
const Input = props =>{
    return <Wrapper {...props}/>
}
export default Input;