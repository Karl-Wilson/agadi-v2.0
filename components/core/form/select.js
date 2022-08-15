import styled from "styled-components";

const Wrapper = styled.select`
    width: ${props=>props.width||''};
    height: 40px;
    padding: 10px;
    border-radius: 10px;
    background-color: transparent;
    border: ${props=> props.error? '1px solid red':'1px solid #cccccc'};
    margin-right: ${props=>props.mr||''};
    margin-left: ${props=>props.ml||''};
    margin-top: ${props=>props.mt||''};
    margin-bottom: ${props=>props.mb||''};
`
const Select = props =>{
    return <Wrapper {...props}/>
}

export default Select;