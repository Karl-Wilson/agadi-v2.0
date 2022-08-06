import { useProfileUpdateRouter } from "../../../router/router";

const ProfileUpdater = props =>{
    const component = useProfileUpdateRouter();
    if(component){
        return component;
    }
    return <div>Loading</div>
}
export default ProfileUpdater;