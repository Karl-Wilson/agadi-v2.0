import styled from "styled-components";
import {CardHolder, IndicatorContainer} from '../containers/containers'
const Wrapper = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    top: 88px;
    z-index: 1;
`
const InnerWrapper = styled.div`
    height: 1000px;
`
const DisplayWindow = props =>{
    return (
        <Wrapper>
            <CardHolder>
                <IndicatorContainer label="Blood Pressure" reading="85/65 mmHg" indicator="Normal" date="12/07/2022" time="10:00AM"/>
                <IndicatorContainer label="Blood Pressure" reading="85/65 mmHg" indicator="Normal" date="12/07/2022" time="10:00AM"/>
                <IndicatorContainer label="Blood Pressure" reading="85/65 mmHg" indicator="Normal" date="12/07/2022" time="10:00AM"/>
            </CardHolder>

        </Wrapper>
    )
}
export default DisplayWindow;