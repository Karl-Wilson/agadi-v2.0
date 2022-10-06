import styled from "styled-components";
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #F9FAFE;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
`
const Gif = styled.img`
    width: 100px;
    height: auto;
`
const PageLoading = props =>{
    return <Wrapper {...props}>
        <Gif src="/images/loader.svg"/>
    </Wrapper>
}
export default PageLoading;