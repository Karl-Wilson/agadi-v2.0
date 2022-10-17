import PageContainer from "../components/containers/pageContainer"
import {Nav, Heroarea} from "../components/layouts/layouts";
import styled from "styled-components";
const Text = styled.p`
    font-size: 18px;
    margin-bottom: 24px;
    line-height: 35px;
`
const Body = styled.div`
    margin-top: 24px;
    @media screen and (min-width: 992px){
        width: 800px;
        margin-right: auto;
        margin-left: auto;
    }
`

const Aboutpage = props =>{
    return(
        <PageContainer>
            <Nav/>
            <Body>
                <Text>In West Africa, elderly home care is uncommon, so we end up taking care of our elderly 
                    ones in our homes. Some of them are suffering from dementia and some of them are too weak 
                    to take care of themselves. On the other hand, most of us are busy with work or business 
                    or taking up one responsibility or the other. With so many things on our mind, we tend to 
                    forget about the elderly ones at home. Sometimes we forget what medication they are on, 
                    how many times they have taken their medication and sometimes we forget to monitor their 
                    blood pressure and sugar level. When we loose track of all these things we put our elderly 
                    ones in danger. We need to keep track of all these things for better treatment or well being 
                    of the elderly ones. The question, how to do best manage and track the overall well being of 
                    our elderly ones?</Text>
                <Text>Agadi app is built specifically to help us take care of our elderly ones. It helps keep 
                    track of things like blood pressure, sugar level and the medications of the elderly ones 
                    thereby eliminating the potential danger faced by the elderly ones. It shows us when last 
                    their blood pressure, sugar level and medication was taken. it also reminds us when to take 
                    give our  elderly ones their medication. It also shows us the summary of their blood pressure 
                    and sugar level over time thereby helping see how good or bad their condition is. Agadi app 
                    helps in better treatment and in total well being of our elderly ones by keeping track of 
                    their medication, blood pressure and sugar level. </Text>
            </Body>
        </PageContainer>
    )
}
export default Aboutpage;