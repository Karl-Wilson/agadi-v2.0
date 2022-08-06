import styled from "styled-components";
const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media screen and (min-width: 764px){
        flex-direction: row;
    }
`
const CardHolder = props =>{
    return(
        <Wrapper {...props}/>
    )
}

export default CardHolder;