import styled from "styled-components";
import {Button} from "../core/core"
import { useRouter } from "next/router";
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    order: 2;
    margin-top: 100px;
    @media screen and (min-width: 768px){
        width: 400px;
        order: 1;
    }
    @media screen and (min-width: 992px){
        width: 500px;
    }
`
export const Title = styled.p`
    font-family: Gilroy-Bold;
    font-size: 42px;
    margin-bottom: 24px;
    line-height: 42px;
    @media screen and (min-width: 768px){
        font-size: 54px;
        line-height: 54px;
    }
`

export const Subtitle = styled.p`
    margin-bottom: 48px;
    font-size: 16px;
    line-height: 23px;
    @media screen and (min-width: 768px){
        font-size: 20px;
        line-height: 27px;
    }
`
const HeroareaContent = props =>{
    const router = useRouter();
    const clickHandler = () =>{
        router.push("/about");
    }
    return(
        <Wrapper>
            <Title>Health Tracker For The Elderly</Title>
            <Subtitle>This app helps you take care of the elderly ones easily by keeping track of their blood pressure,
                        sugar level and their medications.</Subtitle>
            <Button solid click={clickHandler}>Learn more</Button>
        </Wrapper>
    )
}

export default HeroareaContent;