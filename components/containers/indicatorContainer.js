import styled from "styled-components";
import {Card} from '../core/core'
const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: space-between;
height: 100%;
`
const Label = styled.p`
    font-family: Gilroy-Bold;
    font-size: 14px;
    color: #ffffff;
`
const Reading = styled.p`
font-family: Gilroy-Bold;
font-size: 18px;
color: #ffffff;
`
const RDate = styled.p`
font-size: 12px;
color: #ffffff;
`
const RTime = styled.p`
font-size: 12px;
color: #ffffff;
`
const Indicator = styled.p`
font-family: Gilroy-Bold;
font-size: 18px;
color: #ffffff;
`
const HorizontalDivider = styled.div`
    width:  100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const LabelReadingContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const IndicatorContainer = props =>{
    return(
            <Card Smb="24px" Lmb="0px" bgColour={props.color||"#024150"} Swidth="300px" Sheight="110px" shadowless>
                <Wrapper>
                    <HorizontalDivider>
                        <LabelReadingContainer>
                            <Label>{props.label}</Label>
                            <Reading>{props.reading}</Reading>
                        </LabelReadingContainer>
                        <Indicator>{props.indicator}</Indicator>
                    </HorizontalDivider>
                    <HorizontalDivider>
                        <RDate>{props.date}</RDate>
                        <RTime>{props.time}</RTime>
                    </HorizontalDivider>
                </Wrapper>
            </Card>
    )
}
export default IndicatorContainer;