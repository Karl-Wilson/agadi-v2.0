import { PageLoading } from '../core/loading/loading'
import { useDisplayWindowRouter } from '../../router/router';
const ContentContainer = props =>{
    const component = useDisplayWindowRouter();
    if(component){
        return component
    }
    return <PageLoading/>
}
export default ContentContainer;