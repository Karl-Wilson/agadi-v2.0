import styled from "styled-components";
import {Menu, Logo, Button}  from '../core/core'
import {uiAction} from '../../store/reducers/uiReducer'
import { useDispatch } from "react-redux";
const Wrapper = styled.div`
    width: 300px;
    height: 100%;
    background-color: #ffffff;
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    left: -300px;
    transition: .5s left;
    &.showSidebar{
        left: 0;
        z-index: 20;
    }
    @media screen and (min-width: 764px){
        left: 0;
    }
`
const InnerWrapper = styled.div`
    width: 100%;
    display: flex;
    padding: 24px 50px;
`
const UpdateIcon = styled.img`
    width: 20px;
    height: auto;
    margin-right: 20px;
`

const Sidebar = props =>{
    const dispatch = useDispatch()
    const {addUpdateModal} = uiAction
    const updateHandler = (e) =>{
        dispatch(addUpdateModal(true))
    }
    return(
        <Wrapper id="sidebar">
            <InnerWrapper><Logo/></InnerWrapper>
            <InnerWrapper>
                <Button solid click={updateHandler} height="60px">
                    <UpdateIcon src="/images/edit.svg"/>
                    Update
                </Button>
            </InnerWrapper>
            <Menu name="Dashboard" icon="/images/dashboard_black.svg"/>
            <Menu name="Profile" icon="/images/dashboard_black.svg"/>
            <Menu name="Settings" icon="/images/dashboard_black.svg"/>

        </Wrapper>
    )
}

export default Sidebar;