import styled from 'styled-components'
import {Card} from '../core/core'
import { Header, Body, Title } from './cardContainer'
import {Button} from '../core/core'
import { useDispatch } from 'react-redux'
import { uiAction } from '../../store/reducers/uiReducer'
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
const EditBtn = styled.div`

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
    const dispatch = useDispatch()
    const {addShowDosageUpdateModal} = uiAction
    const clickHandler = () =>{
        dispatch(addShowDosageUpdateModal(true))
    }
    return(
        <Card Swidth="80%" Lwidth="auto">
            <Header>
                <Title>Medications</Title>
                <Button transparent Swidth="80px" height="25px" fontSize="14px" click={clickHandler}>Edit</Button>
            </Header>
            <Body>
                {!props.data || !props.data.length && <NoData><p>No Data</p></NoData>}
                
                {props.data && <Grid>
                    {props.data.map((value, index)=>{
                        if(value.level != 100) return <Drugs key={index+'d'+index} title={value.title} level={value.level}/>
                    }
                    )}
                </Grid>}
                
            </Body>

        </Card>
    )
}
export default MedicationContainer;