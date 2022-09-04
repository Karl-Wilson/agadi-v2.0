import { PageLoading } from '../core/loading/loading'
import { useDisplayWindowRouter } from '../../router/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {fetchVitalsThunk} from '../../utils/thunks'

let firstLoad = true
const ContentContainer = props =>{
    const user = useSelector(state=>state.ui.user)
    const bloodPressure = useSelector(state=>state.data.bloodPressure)
    const sugarLevel = useSelector(state=>state.data.sugarLevel)
    const dispatch = useDispatch()
    useEffect(() => {
        if(user && firstLoad){
            firstLoad = false
            fetchVitalsThunk({email: user.email}, dispatch)
        }
        
    }, [user])
    console.log(bloodPressure)
    console.log(sugarLevel)
    const component = useDisplayWindowRouter();
    if(component){
        return component
    }
    return <PageLoading/>
}
export default ContentContainer;