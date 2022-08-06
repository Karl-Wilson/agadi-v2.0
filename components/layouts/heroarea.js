import styled from "styled-components";
import HeroareaContent from "../containers/heroareaContent";
import HeroareaImage from "../containers/heroareaImage";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0px;
    height: 100%;
    @media screen and (min-width: 764px){
        height: auto;
        flex-direction: row;
    }

`

const Heroarea = props =>{
    return(
        <Wrapper>
            <HeroareaContent/>
            <HeroareaImage/>
        </Wrapper>
    )
}
export default Heroarea;