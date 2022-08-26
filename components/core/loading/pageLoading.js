import styled from "styled-components";
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
`
const Gif = styled.img`
    width: 100px;
    height: auto;
`
const PageLoading = props =>{
    return <Wrapper>
        <Gif src="/images/loader.gif"/>
    </Wrapper>
}
export default PageLoading;