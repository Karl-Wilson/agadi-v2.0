import styled from "styled-components";
const Wrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: ${props=>props.Smt||''};
    @media screen and (min-width: 764px){
        flex-direction: row;
        margin-top: ${props=>props.Lmt||props.Smt||''};
    }
`
const CardHolder = props =>{
    return(
        <Wrapper {...props}/>
    )
}

export default CardHolder;