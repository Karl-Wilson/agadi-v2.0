import MyChart from "../../chart/chart";
import {Card} from '../core/core'
import { Header, Body, Title } from "./cardContainer";
import {Select} from '../core/form/form'
import { useState } from "react";
import {plotChart} from '../../chart/helper'
import { useEffect } from "react";


const ChartContainer = props =>{
    const [datasets, setDatasets] = useState()
    const [displaySelect, setDisplaySelect] = useState('Weekly')
    useEffect(() => {
        let data = plotChart(props.data, props.name)
        setDatasets(data)
    }, [props.data])
    
    const chartDisplayHandler = (e)=>{
        let data = plotChart(props.data, props.name, e.target.value)
        setDatasets(data)
        setDisplaySelect(e.target.value)
    }

    return(
        <Card Swidth="90%" Lwidth="50%" Lmr={props.mr} Smt={props.mt}>
            <Header>
                <Title>{props.name}</Title>
                    <Select height="30px" padding="5px" onChange={chartDisplayHandler}>
                        <option default>Weekly</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                    </Select>
            </Header>
            <Body title={props.name} chart>
                <MyChart name={props.name} datasets={datasets} title={displaySelect}/>
            </Body>
        </Card>
    )
}

export default ChartContainer;