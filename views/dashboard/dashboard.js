import { useDashboardRouter } from "../../router/router";
import {PageWrapper, Modal} from '../../components/core/core'
import {Sidebar, DashNav, DisplayWindow} from '../../components/layouts/layouts'
import { useSelector } from "react-redux";
import  {PageLoading} from '../../components/core/loading/loading'
import {UpdateModal} from '../../components/containers/containers'
import styled from "styled-components";
const MainPage = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding: 0px 20px;
    background-color: #F9FAFE;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    @media screen and (min-width: 764px){
        left: 300px;
        width: calc(100% - 300px);
        padding: 0px 50px;
    }
`
const Dashboard = props =>{
    const isLoading = useSelector(state=>state.ui.loading)
    const showModal = useSelector(state=>state.ui.updateModal)
    const component = useDashboardRouter();
    if(component){
        return component
    }
    return(
        <PageWrapper justifyContent="flex-start">
            <Sidebar/>
            <MainPage id="mainPage">
                <DashNav/>
                {isLoading && <PageLoading/>}
                <DisplayWindow/>
                {showModal && <Modal><UpdateModal/></Modal>}
            </MainPage>
        </PageWrapper>
    )
}
export default Dashboard;