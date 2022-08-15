import { useRouter } from "next/router";
import ProfileUpdater from "../views/dashboard/profileUpdater/profileUpdater";
import UpdaterOne from "../views/dashboard/profileUpdater/updaterOne";
import UpdaterTwo from "../views/dashboard/profileUpdater/updaterTwo";
import UpdaterThree from "../views/dashboard/profileUpdater/updaterThree";
import UpdaterFour from "../views/dashboard/profileUpdater/updaterFour";
import { useSelector } from "react-redux";
import { userUrlBuilder } from "../utils/helper";
import { useEffect } from "react";
//any component with router must return <Loading/> component as default

export const useDashboardRouter = () =>{
    const router = useRouter()
    const user = useSelector(state=>state.ui.user)
    const userUrl = user? userUrlBuilder(user.name): false
    const isProfileUpdated = useSelector(state=>state.ui.profileUpdate)
    useEffect(() => {
        if(isProfileUpdated){
            //stop loading
        }
        if(!isProfileUpdated && userUrl){
            router.replace(`/${userUrl}/profile-update`)
        }
    }, [userUrl])
    
    switch(router.query.pages[1]){
        case "profile-update": return <ProfileUpdater/>;
    }
}

export const useProfileUpdateRouter = () =>{
    const router = useRouter();
    const user = useSelector(state=>state.ui.user)
    const userUrl = user? userUrlBuilder(user.name): false
    const path = router.query
    const isProfileUpdated = useSelector(state=>state.ui.profileUpdate)

    useEffect(() => {
        if(isProfileUpdated && userUrl){
            //stop loading
            router.replace(`/${userUrl}`)
        }
            if(path.pages.length <=2 && path.pages[0] == userUrl && path.pages[1] == "profile-update"){
                router.replace(`/${userUrl}/profile-update/1`)
            }
    }, [userUrl, isProfileUpdated])
    
    
    switch(path.pages[2]){
        case '1': return <UpdaterOne userUrl={userUrl}/>;
        break;
        case '2': return <UpdaterTwo userUrl={userUrl}/>;
        break;
        case '3': return <UpdaterThree userUrl={userUrl}/>;
        break;
        case '4': return <UpdaterFour/>;
        break;
        }

}