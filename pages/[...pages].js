import {Homepage, Login, Register, Dashboard} from "../views/viewIndex"
import { useRouter } from 'next/router';
import {getSession} from 'next-auth/react'
import { useDispatch } from "react-redux";
import { uiAction } from "../store/reducers/uiReducer";
import { useEffect } from "react";
import { userUrlBuilder } from "../utils/helper";
import { profileUpdateChecker, getBasicUserInfo } from "../firebase/builder";
import {PageLoading} from '../components/core/loading/loading'
import { useSelector } from "react-redux";
import { useState } from "react";

const PageRouter = props =>{
    const router = useRouter();
    const dispatch = useDispatch()
    const path = router.query;    
    let [user, setUser] = useState();
    const {addUser, addProfileUpdate, addUserProfileUpdate} = uiAction;
    const userDataFromRedux = useSelector(state=>state.ui.user)
    const userProfileUpdate = useSelector(state=>state.ui.userProfileUpdate)
    
    useEffect(() => {
        if(!userDataFromRedux){
            setUser(userUrlBuilder(props.session.name))
            dispatch(addUser(props.session))    
            dispatch(addProfileUpdate(props.isProfileUpdated))
        }else{
            if(userProfileUpdate){
                router.replace(`/${userUrlBuilder(userDataFromRedux.name)}/profile`)
                setUser(userUrlBuilder(userDataFromRedux.name))
                dispatch(addUserProfileUpdate(false));
            } 
        }
    }, [userDataFromRedux])

    
    if(path.pages){
           switch(path.pages[0]){
            case "index": return <Homepage/>;
            break;
            case "home": return <Homepage/>;
            break;
            case "register": return <Register/>;
            break;
            case "login": return <Login/>; 
            break;
            case user: return <Dashboard/>;
            break;
            case '404': return <div>404 page</div>;
            break;
            default: return <PageLoading/>;
            } 
    }else{
        return <PageLoading/>
    } 
}
export default PageRouter;

export async function getServerSideProps(context) {
     //must pass context param to getSession else it wont work
    let session = await getSession(context)
    const url = context.req.url
    let user, profileUpdate, basicUserInfo, userId;
    if(session){
        userId = session.user.name
        basicUserInfo = await getBasicUserInfo(userId);
        user = {...basicUserInfo, id: userId};
        profileUpdate = await profileUpdateChecker(userId)
    }else{
        user = ''
        profileUpdate = ''
    }

    if(url == '/login' || url == "/register"){
        if(session){
            return {
                redirect: {
                destination: `/${userUrlBuilder(user.name)}`,
                permanent: false,
                }
            }
        }
    }     

        
    return {
        props: {
            session: user,
            isProfileUpdated: profileUpdate
        } // will be passed to the page component as props
    }
  }
  