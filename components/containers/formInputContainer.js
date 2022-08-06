import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 764px){
        
    }
`
const FormInputContainer = props =>{
    return(
        <Wrapper {...props}/>
    )
}
export default FormInputContainer;