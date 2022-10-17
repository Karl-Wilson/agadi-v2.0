import styled from "styled-components";
import {Button} from "../core/core"
import { useRouter } from "next/router";
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
    font-size: 54px;
    margin-bottom: 24px;
    line-height: 54px;
`

const Subtitle = styled.p`
    margin-bottom: 48px;
    font-size: 20px;
    line-height: 27px;
`
const HeroareaContent = props =>{
    const router = useRouter();
    const clickHandler = () =>{
        router.push("/about");
    }
    return(
        <Wrapper>
            <Title>Health Tracker For The Elderly</Title>
            <Subtitle>This app helps you take care of the aged easily by keeping track of their blood pressure,
                        Sugar level and their medications.</Subtitle>
            <Button solid click={clickHandler}>Learn more</Button>
        </Wrapper>
    )
}

export default HeroareaContent;