import {CardHolder, IndicatorContainer, MedicationContainer} from '../../../components/containers/containers'
import { bloodPressureCalculator, timeConverter, sugarLevelCalculator, bmiCalculator, displayMedicationList } from '../../../utils/helper';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ChartContainer from '../../../components/containers/chartContainer';
const DashboardContent = props =>{
    const bloodPressure = useSelector(state=>state.data.bloodPressure)
    const sugarLevel = useSelector(state=>state.data.sugarLevel)
    const bloodPressureList = useSelector(state=>state.data.bloodPressureList)
    const sugarLevelList = useSelector(state=>state.data.sugarLevelList)
    const medicaitonList = useSelector(state=>state.data.medicationList)
    const unitMethod = useSelector(state=>state.data.unitMethod)
    const height = useSelector(state=>state.data.height)
    const weight = useSelector(state=>state.data.weight)
    const [bpDate, setBPdate] = useState()
    const [bpReading, setBP] = useState()
    const [bpTime, setBPtime] = useState()
    const [bpIndicator, setBPindicator] = useState()
    const [slDate, setSLdate] = useState()
    const [slReading, setSL] = useState()
    const [slTime, setSLtime] = useState()
    const [slIndicator, setSLindicator] = useState()
    const [BMI, setBMI] = useState()

    const unitMethodSelector = (height, weight, unitMethod) =>{
        let newHeight, newWeight;
        if(unitMethod == 'imperial'){
            let {feet, inches} = height
            let {pounds} = weight
            newHeight = (parseInt(feet)*12) + parseInt(inches)
            newWeight = parseInt(pounds)

        }else{
            let {centimeter} = height
            let {kg} = weight
            newHeight = parseInt(centimeter)/100
            newWeight = parseInt(kg)
        } 
        
        return [newHeight, newWeight]
    }
    useEffect(() => {
        if(bloodPressure){   
            setBP(bloodPressure.reading)
            setBPindicator(bloodPressureCalculator(bloodPressure.reading))
            let newTime = new Date(timeConverter.secToMili(bloodPressure.date.seconds) + timeConverter.nanoToMili(bloodPressure.date.nanoseconds))
            setBPdate(newTime.toLocaleDateString())
            setBPtime(newTime.toLocaleTimeString())
        }
        if(sugarLevel){
            setSL(sugarLevel.reading)
            setSLindicator(sugarLevelCalculator(sugarLevel.reading, 'fasting'))
            let newTime = new Date(timeConverter.secToMili(sugarLevel.date.seconds) + timeConverter.nanoToMili(sugarLevel.date.nanoseconds))
            setSLdate(newTime.toLocaleDateString())
            setSLtime(newTime.toLocaleTimeString())
        }
        if(height && weight && unitMethod){
            let [newHeight, newWeight] = unitMethodSelector(height, weight, unitMethod)
            setBMI(bmiCalculator(newHeight, newWeight, unitMethod))
        }
    }, [bloodPressure, sugarLevel])

    return(
        <>
            <CardHolder>
                <IndicatorContainer label="Blood Pressure" reading={`${bpReading? bpReading: ''} mmHg`} indicator={bpIndicator? bpIndicator.condition : ''} color={bpIndicator? bpIndicator.color : ''} date={bpDate} time={bpTime}/>
                <IndicatorContainer label="Sugar Level" reading={`${slReading? slReading:''} mm/dl`} indicator={slIndicator? slIndicator.condition : ''} color={slIndicator? slIndicator.color : ''} date={slDate} time={slTime}/>
                <IndicatorContainer label="BMI" reading={BMI? BMI.reading: ''} indicator={BMI? BMI.condition: ''} color={BMI? BMI.color : ''} date="12/07/2022" time="10:00AM"/>
            </CardHolder>
            <CardHolder Lmt="24px">
                <ChartContainer name="Blood Pressure" data={bloodPressureList} mr="24px" mt="24px"/>
                <ChartContainer name="Sugar Level" data={sugarLevelList} mt="24px"/>
            </CardHolder>
            <CardHolder Smt="24px">
                <MedicationContainer data={displayMedicationList(medicaitonList)}/>
            </CardHolder>
        </>
    )
}
export default DashboardContent;