import styled from "styled-components";
const Wrapper = styled.div`
    width: ${props=>props.width||'100%'};
    height: ${props=>props.height||'auto'};
    display: flex;
    flex-direction: ${props=>props.SFlexDirection||'column'};
    padding-right: ${props=>props.pr||''};
    padding-left: ${props=>props.pl||''};
    padding-top: ${props=>props.pt||''};
    padding-bottom: ${props=>props.pb||''};
    margin-right: ${props=>props.mr||''};
    margin-left: ${props=>props.ml||''};
    margin-top: ${props=>props.mt||''};
    margin-bottom: ${props=>props.mb||''};

    @media screen and (min-width: 764px){
        flex-direction: ${props=>props.LFlexDirection||props.SFlexDirection||'column'};
    }
`
const FormGroup = props =>{
    return <Wrapper {...props}/>
}
export default FormGroup;