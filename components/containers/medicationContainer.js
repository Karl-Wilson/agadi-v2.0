import {Card} from '../core/core'
import {CardContainer} from './containers'
import styled from 'styled-components'
const DrugWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 140px;
    margin-top: 24px;
    .med-header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10px;
    }
`
const Drugtitle = styled.p`
    font-family: Gilroy-Bold;
    font-size: 12px;
`
const ProgressBar = styled.div`
    width: 100%;
    height: 10px;
    border-radius: 10px;
    background-color: #cccccc;
`
const ProgressIndicator = styled.div`
    width: ${props=>props.width||0};
    background-color: #8543A9;
    height: 10px;
    border-radius: 10px;
`
const ProgressLabel = styled.p`
    font-size: 12px;
    color: #979797;
`
const Grid = styled.div`
    display: grid;
    grid-template-columns: auto;
    column-gap: 40px;
    @media screen and (min-width: 992px){
        grid-template-columns: auto auto;
    }
`
const NoData = styled.div`
    width: 380px;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    p{
        font-size: 12px;
        color: #cccccc;
    }
`
const Drugs = props =>{
    return(
        <DrugWrapper>
            <div className="med-header">
                <Drugtitle>{props.title}</Drugtitle>
                <ProgressLabel>{props.level+'%'}</ProgressLabel>
            </div>
            <div>
                <ProgressBar>
                    <ProgressIndicator width={props.level+'%'}/>
                </ProgressBar>
            </div>
        </DrugWrapper>
    )
}
const MedicationContainer = (props) =>{
    return(
        <Card Swidth="80%" Lwidth="auto">
            <CardContainer title="Medication">
                {!props.data || !props.data.length && <NoData><p>No Data</p></NoData>}
                {props.data && <Grid>
                    {props.data.map(value=>{
                        return <Drugs title={value.title} level={value.level}/>
                    }
                    )}
                </Grid>}
            </CardContainer>

        </Card>
    )
}
export default MedicationContainer;