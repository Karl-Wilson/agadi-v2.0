import { useRouter } from "next/router";
import ProfileUpdater from "../views/dashboard/profileUpdater/profileUpdater";
import UpdaterOne from "../views/dashboard/profileUpdater/updaterOne";
import UpdaterTwo from "../views/dashboard/profileUpdater/updaterTwo";
import UpdaterThree from "../views/dashboard/profileUpdater/updaterThree";
import UpdaterFour from "../views/dashboard/profileUpdater/updaterFour";
import DashboardContent from "../views/dashboard/contentPage/dashboardContent";
import ProfileContent from "../views/dashboard/contentPage/profileContent";
import SettingsContent from "../views/dashboard/contentPage/settingsContent";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {PageLoading} from '../components/core/loading/loading'
import { dashboardPageCheck, userUrlBuilder } from "../utils/helper";
import { useDispatch } from "react-redux";
import { fetchVitalsThunk } from "../utils/thunks";
//any component with router must return <Loading/> component as default
//to get reroute without displaying the current url components, decalre a variable outside the component to help track first time load

export const useDashboardRouter = () =>{
    const router = useRouter()
    const dispatch = useDispatch();
    const user = useSelector(state=>state.ui.user)
    const userUrl = user? userUrlBuilder(user.name): false
    const isProfileUpdated = useSelector(state=>state.ui.profileUpdate)
    const path = router.query
    const pageList = useSelector(state=>state.ui.dashboardPages)


    useEffect(() => {
        if(isProfileUpdated){
            //if loading, stop loading
            fetchVitalsThunk({userId: user.id}, dispatch)
        }
        if(!isProfileUpdated && userUrl){
            router.replace(`/${userUrl}/profile-update`)
        }
        if(path.pages.length > 2 && path.pages[1] == 'profile'){
            router.replace(`/${userUrl}/profile`)
        }
        if(path.pages.length > 2 && path.pages[1] == 'settings'){
            router.replace(`/${userUrl}/settings`)
        }
        if(dashboardPageCheck(pageList, path.pages[1]) == false && path.pages.length == 2 && userUrl){
            router.replace(`/${userUrl}`)
        }
    }, [userUrl, isProfileUpdated])
    
    
    switch(router.query.pages[1]){
        case "profile-update": return <ProfileUpdater/>;
        break;
        default: return false;
    }
}

let first = true;
export const useProfileUpdateRouter = () =>{
    const router = useRouter();
    const user = useSelector(state=>state.ui.user)
    const userUrl = user? userUrlBuilder(user.name): false
    const path = router.query
    const isProfileUpdated = useSelector(state=>state.ui.profileUpdate)
    

    useEffect(() => {
        if(isProfileUpdated && userUrl){
            //if loading, stop loading
            router.replace(`/${userUrl}`)
        }
            //handles all url routing
            //note: added isProfileUpdated because without setting it, when router reroutes to dashboard, it glitches
            //it doesn;t reroute smoothly, because in a function, after setting router, it doesnt reflect immediately
            //till it runs the function completely thereby retaining old values till after running function
            if(!isProfileUpdated && (path.pages.length == 2 || path.pages.length == 3 || path.pages.length > 3) && path.pages[0] == userUrl && path.pages[1] == "profile-update"){
                router.replace(`/${userUrl}/profile-update/1`)
                first = false
            }
    }, [userUrl, isProfileUpdated])
//to prevent current url on first load to display its component, declare first variable outsidde of the component 
//to track first time load inorder to display loading when redirection is ongoing due to delay in rerouting 
//when using useRouter();

    if(first){  
        return <PageLoading/>
    }else{
        switch(path.pages[2]){
        case '1': return <UpdaterOne userUrl={userUrl}/>;
        break;
        case '2': return <UpdaterTwo userUrl={userUrl}/>;
        break;
        case '3': return <UpdaterThree userUrl={userUrl}/>;
        break;
        case '4': return <UpdaterFour userUrl={userUrl}/>;
        break;
        }
    }
}

export const useDisplayWindowRouter = () =>{
    const router = useRouter();
    const user = useSelector(state=>state.ui.user)
    const userUrl = user? userUrlBuilder(user.name): false
    const path = router.query

    switch(path.pages[1]){
        case 'profile': return <ProfileContent/>;
        break;
        case 'settings': return <SettingsContent/>;
        break;
        default: return <DashboardContent/>;
    }
}
