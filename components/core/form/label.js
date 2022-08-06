import styled from "styled-components";

const Wrapper = styled.label`
    font-family: Gilroy-Bold;
    padding-right: ${props=>props.pr||''};
    padding-left: ${props=>props.pl||''};
    padding-top: ${props=>props.pt||''};
    padding-bottom: ${props=>props.pb||''};
    margin-right: ${props=>props.mr||''};
    margin-left: ${props=>props.ml||''};
    margin-top: ${props=>props.mt||''};
    margin-bottom: ${props=>props.mb||''};
`
const Label = props =>{
    return <Wrapper {...props}/>
}

export default Label;