import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    height: auto;
    padding: 0px 20px;
    @media screen and (min-width: 992px) {
        padding:0px;
    }
`

const PageInnerWrapper = props =>{
    return <Wrapper {...props}/>
}

export default PageInnerWrapper;