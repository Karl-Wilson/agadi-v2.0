import styled from "styled-components"
import {Card} from '../core/core'
const Wrapper = styled.div`

`

const Title = styled.p`
font-family: Gilroy-Bold;
font-size: 18px;
`

const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
` 
const Body = styled.div`

`
const CardContainer = ({children, ...props}) =>{
    return(
        <Card>
            <Header>
                <Title>{props.title}</Title>
                {children[0]}
            </Header>
            <Body>
                {children[1]}
            </Body>
        </Card>
    )

}
export default CardContainer;