import styled from "styled-components"
import {Wrapper, Body} from './updateModal'
const Message = styled.p`

`
const SignoutModal = props =>{
    return(
        <Wrapper>
            <Body>
                <Message>Please login for changes to take effect</Message>
            </Body>
        </Wrapper>
    )
}

export default SignoutModal;