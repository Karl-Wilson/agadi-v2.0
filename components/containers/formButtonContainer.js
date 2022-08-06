import styled from "styled-components";
import {Button} from "../core/core"

const Wrapper = styled.div`
    width: ${props=>props.width||'100%'};
    height: ${props=>props.height||'auto'};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: ${props=>props.pr||''};
    padding-left: ${props=>props.pl||''};
    padding-top: ${props=>props.pt||''};
    padding-bottom: ${props=>props.pb||''};
    margin-right: ${props=>props.mr||''};
    margin-left: ${props=>props.ml||''};
    margin-top: ${props=>props.mt||'30px'};
    margin-bottom: ${props=>props.mb||''};
    @media screen and (min-width: 764px){
        flex-direction: row;
        justify-content: space-between;
    }
`
const FormButtonContainer = props =>{
    return <Wrapper {...props}/>
}
export default FormButtonContainer;