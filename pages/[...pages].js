import {Homepage, Login, Register, Dashboard} from "../views/viewIndex"
import { useRouter } from 'next/router';
import {getSession} from 'next-auth/react'
import { useDispatch } from "react-redux";
import { uiAction } from "../store/reducers/uiReducer";
import { useEffect } from "react";
import { userUrlBuilder } from "../utils/helper";
import { profileUpdateChecker } from "../firebase/builder";

const PageRouter = props =>{
    const router = useRouter();
    const dispatch = useDispatch()
    const path = router.query;    
    let user = userUrlBuilder(props.session.name);
    const {addUser, addProfileUpdate} = uiAction;
    useEffect(() => {
        dispatch(addUser(props.session))    
        dispatch(addProfileUpdate(props.isProfileUpdated))
    }, [])
    
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
            default: return <div>404 page</div>;
            } 
    }else{
        return <div>loading</div>
    } 
}
export default PageRouter;

export async function getServerSideProps(context) {
     //must pass context param to getSession else it wont work
    let session = await getSession(context)
    const url = context.req.url
    let user, profileUpdate;
    if(session){
        user = session.user
        profileUpdate = await profileUpdateChecker(session.user.email)
    }else{
        user = ''
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
  