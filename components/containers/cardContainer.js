import styled from "styled-components"
import {Select} from '../core/form/form'

export const Title = styled.p`
font-family: Gilroy-Bold;
font-size: 18px;
`

export const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
` 
export const Body = styled.div`

`
export const CardContainer = props =>{

    return(
        <>
            <Header>
                <Title>{props.title}</Title>
                {props.chart && <Select height="30px" padding="5px" onChange={chartDisplayHandler}>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                </Select>}
            </Header>
            <Body>
                {props.children}
            </Body>
        </>
    )

}
