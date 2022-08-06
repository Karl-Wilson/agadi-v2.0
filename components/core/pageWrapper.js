import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: ${props=>props.height||"100vh"};
    display: flex;
    flex-direction: row;
    justify-content: ${props=>props.justifyContent||'center'};
    align-items: ${props=>props.alignItems||''};
    overflow-x: hidden;
    padding-top: ${props=>props.pt||''};
    padding-bottom: ${props=>props.pb||''};
    overflow: ${props=>props.overflow||''};
`

const PageWrapper = props =>{
    return <Wrapper id="pageWrapper" {...props}/>
}

export default PageWrapper;