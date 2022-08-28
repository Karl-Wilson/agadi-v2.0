import {CardHolder, IndicatorContainer} from '../../../components/containers/containers'
const DashboardContent = props =>{
    return(
        <>
            <CardHolder>
                <IndicatorContainer label="Blood Pressure" reading="85/65 mmHg" indicator="Normal" date="12/07/2022" time="10:00AM"/>
                <IndicatorContainer label="Blood Pressure" reading="85/65 mmHg" indicator="Normal" date="12/07/2022" time="10:00AM"/>
                <IndicatorContainer label="Blood Pressure" reading="85/65 mmHg" indicator="Normal" date="12/07/2022" time="10:00AM"/>
            </CardHolder>
        </>
    )
}
export default DashboardContent;