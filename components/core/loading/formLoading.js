import styled, { keyframes } from "styled-components";
const Wrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 10px;
    background-color: #cccccc;
    overflow: hidden;

    @media screen and (min-width: 764px){    
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }
`
const Anime = keyframes`
    from {
        left: -45%;
    }

    to {
        left: 105%;
    }
`
const Loading = styled.div`
    width: 40%;
    height: 10px;
    background-color: #091A58;
    position: relative;
    animation-name: ${Anime};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
`
const FormLoading = props =>{
    return <Wrapper>
        <Loading/>
    </Wrapper>
}
export default FormLoading;