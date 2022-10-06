import styled from "styled-components"


export const Title = styled.p`
font-family: Gilroy-Bold;
font-size: ${props=>props.titleSize || "18px"};
color: ${props=>props.titleColor || ''};
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
            </Header>
            <Body>
                {props.children}
            </Body>
        </>
    )

}
