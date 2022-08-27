import { useProfileUpdateRouter } from "../../../router/router";
import {PageLoading} from '../../../components/core/loading/loading'

const ProfileUpdater = props =>{
    const component = useProfileUpdateRouter();
    if(component){
        return component;
    }
    return <PageLoading/>
}
export default ProfileUpdater;