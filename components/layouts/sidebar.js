import styled from "styled-components";
import {Menu, Logo}  from '../core/core'
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
const LogoWrapper = styled.div`
    width: 100%;
    display: flex;
    padding: 24px 50px;
`
const Sidebar = props =>{
    return(
        <Wrapper id="sidebar">
            <LogoWrapper><Logo/></LogoWrapper>
            <Menu name="Dashboard" icon="/images/dashboard_black.svg"/>
            <Menu name="Profile" icon="/images/dashboard_black.svg"/>
            <Menu name="Settings" icon="/images/dashboard_black.svg"/>

        </Wrapper>
    )
}

export default Sidebar;