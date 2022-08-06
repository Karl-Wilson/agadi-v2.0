import styled from "styled-components";
import {Button} from "../core/core"
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    order: 2;
    @media screen and (min-width: 768px){
        width: 400px;
        order: 1;
    }
    @media screen and (min-width: 992px){
        width: 500px;
    }
`
const Title = styled.p`
    font-family: Gilroy-Bold;
    font-size: 48px;
    margin-bottom: 24px;
`

const Subtitle = styled.p`
    margin-bottom: 24px;
`
const HeroareaContent = props =>{
    return(
        <Wrapper>
            <Title>Keep up with Health of the Elderly</Title>
            <Subtitle>Take good care of the elderly by keeping track of their health</Subtitle>
            <Button solid>Learn more</Button>
        </Wrapper>
    )
}

export default HeroareaContent;