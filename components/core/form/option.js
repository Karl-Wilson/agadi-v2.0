import styled from "styled-components";

const Wrapper = styled.option`
    background-color: #ffffff;
    padding-right: ${props=>props.pr||''};
    padding-left: ${props=>props.pl||''};
    padding-top: ${props=>props.pt||''};
    padding-bottom: ${props=>props.pb||''};
    margin-right: ${props=>props.mr||''};
    margin-left: ${props=>props.ml||''};
    margin-top: ${props=>props.mt||''};
    margin-bottom: ${props=>props.mb||''};
`
const Option = props =>{
    return <Wrapper {...props}/>
}

export default Option;