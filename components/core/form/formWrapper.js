import styled from "styled-components";

const Wrapper = styled.div`
    width: ${props=>props.Swidth||'100%'};
    height: ${props=>props.Sheight||''}; 
    padding: 30px;
    margin-right: ${props=>props.mr||''};
    margin-left: ${props=>props.ml||''};
    margin-top: ${props=>props.mt||''};
    margin-bottom: ${props=>props.mb||''};
    display: ${props=>props.dFlex||''};
    flex-direction: ${props=>props.SflexDirection||'column'};
    justify-content: ${props=>props.SjustifyContent||''};
    align-items: ${props=>props.SalignItems||''};
   
    @media screen and (min-width: 764px){
        width: ${props=>props.Lwidth||''};
        height: ${props=>props.Lheight||''};
        flex-direction: ${props=>props.flexDirection||'row'};
        justify-content: ${props=>props.justifyContent||''};
        align-items: ${props=>props.alignItems||''};
        padding: 50px;
        border-radius: 10px;
        border: 1px solid #cccccc; 
        position: relative;
    }
`

const FormWrapper = props =>{
    return(
        <Wrapper {...props}/>
    )
}

export default FormWrapper;