import { PageLoading } from '../core/loading/loading'
import { useDisplayWindowRouter } from '../../router/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {fetchVitalsThunk} from '../../utils/thunks'

let firstLoad = true
const ContentContainer = props =>{
    const user = useSelector(state=>state.ui.user)
    const isUpdated = useSelector(state=>state.ui.isUpdated)
    const dispatch = useDispatch()
    const component = useDisplayWindowRouter();

    useEffect(() => {
        if(user && firstLoad){
            firstLoad = false
            fetchVitalsThunk({email: user.email}, dispatch)
        }   
        if(isUpdated){
            fetchVitalsThunk({email: user.email}, dispatch)
        }
    }, [user, isUpdated])

    
    if(component){
        return component
    }
    return <PageLoading/>
}

export default ContentContainer;