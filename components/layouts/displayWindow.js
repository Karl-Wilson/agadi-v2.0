import styled from "styled-components";
import {ContentContainer} from '../containers/containers'

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
        <Wrapper id="displayWindow">
            <ContentContainer/>
        </Wrapper>
    )
}
export default DisplayWindow;