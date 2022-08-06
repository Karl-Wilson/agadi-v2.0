import styled from "styled-components";
const Wrapper = styled.p`
    font-family: Gilroy-Bold;
    font-size: ${props=>props.fontSize||'24px'};
    padding-right: ${props=>props.pr||''};
    padding-left: ${props=>props.pl||''};
    padding-top: ${props=>props.pt||''};
    padding-bottom: ${props=>props.pb||''};
    margin-right: ${props=>props.mr||''};
    margin-left: ${props=>props.ml||''};
    margin-top: ${props=>props.mt||''};
    margin-bottom: ${props=>props.mb||''};
`
const FormTitle = props =>{
    return <Wrapper {...props}/>
}
export default FormTitle;