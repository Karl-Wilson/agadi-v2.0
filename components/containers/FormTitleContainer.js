import styled from "styled-components";
import {FormTitle, FormSubTitle} from "../core/form/form"

const Wrapper = styled.div`
    width: ${props=>props.width||'100%'};
    height: ${props=>props.height||'auto'};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: ${props=>props.mr||''};
    margin-left: ${props=>props.ml||''};
    margin-top: ${props=>props.mt||'24px'};
    margin-bottom: ${props=>props.mb||'24px'};
    @media screen and (min-width: 764px){

    }
`
const FormTitleContainer = props =>{
    return <Wrapper>
        <FormTitle mb="10px">{props.title}</FormTitle>
        <FormSubTitle>{props.subtitle}</FormSubTitle>
    </Wrapper>
}
export default FormTitleContainer;