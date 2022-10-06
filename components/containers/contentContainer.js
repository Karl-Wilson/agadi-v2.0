import { PageLoading } from '../core/loading/loading'
import { useDisplayWindowRouter } from '../../router/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {fetchVitalsThunk} from '../../utils/thunks';
import { useRouter } from 'next/router';
import {userUrlBuilder} from '../../utils/helper'


let firstLoad = true
const ContentContainer = props =>{
    const user = useSelector(state=>state.ui.user)
    const isUpdated = useSelector(state=>state.ui.isUpdated)
    const dispatch = useDispatch()
    const component = useDisplayWindowRouter();

    useEffect(() => {
        if(user && firstLoad){
            firstLoad = false
            fetchVitalsThunk({userId: user.id}, dispatch)
        }   
        if(isUpdated){
            fetchVitalsThunk({userId: user.id}, dispatch)
        }
    }, [user, isUpdated])

    
    if(component){
        return component
    }
    return <PageLoading/>
}

export default ContentContainer;