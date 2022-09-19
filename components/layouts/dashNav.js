import styled from "styled-components";
import {SearchBar} from '../containers/containers'
import {Dropdown} from '../core/core'
import {useMenuDropdown} from '../../utils/hooks'
import {Button} from '../core/core'
import {signOut} from 'next-auth/react'
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { userNameSeparator } from "../../utils/helper";
import { useState } from "react";
const Wrapper = styled.nav`
    width: calc(100% - 40px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0px;
    position: fixed;
    z-index: 14;
    @media screen and (min-width: 764px){
        width: calc(100% - 300px);
        padding: 24px 50px;
        margin-left: -50px;
    }
`
const Greeting = styled.div`
    p{
        font-family: Gilroy-Bold;
        font-size: 18px;
    }
`
const RightContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const AccountIcon = styled.img`
    cursor: pointer;
`
const DropdownWrapper = styled.div`
    position: relative;
`
const GreetingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const Menu = styled.img`
    display: block;
    cursor: pointer;
    margin-right: 10px;
    @media screen and (min-width: 768px) {
        display: none;
    } 
`
const Username = styled.p`
 font-family: Gilroy-Bold;
 font-size: 18px;
 padding-bottom: 10px;
 border-bottom: 1px solid #cccccc;
`

const DashNav = props =>{
    const router = useRouter()
    const user = useSelector(state=> state.ui.user)
    const menuClick = useMenuDropdown('accountDropdown')

    function scrollFunction(){
            let scrolled = document.getElementById('mainPage').scrollTop
            if(scrolled>10){
                document.getElementById('dashNav').style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
            }else{
                document.getElementById('dashNav').style.backgroundColor = 'transparent'
            }
    }
    
    useEffect(() => {
        //to track scroll, you have to find the scroll element that makes it scroll and attach event
        document.getElementById('mainPage').addEventListener("scroll", scrollFunction);
        
      return () => {
        document.getElementById('mainPage').removeEventListener("scroll", scrollFunction);
      }
    }, [])
    
    const showSidebar = () =>{
        document.getElementById('sidebar').classList.toggle('showSidebar');
    }
    const signoutHandler = () =>{
        signOut({redirect: false});
        router.push('/login')
    }
    return(
        <Wrapper id="dashNav">
            <GreetingWrapper>
                <Menu src="/images/menu_black_48dp.svg" onClick={showSidebar}/>
                <Greeting>
                    <p>Hi, {user? userNameSeparator(user.name): ''}</p>
                </Greeting>
                
            </GreetingWrapper>
            
            <RightContainer>
                <SearchBar/>
                
                <DropdownWrapper>
                    <AccountIcon onClick={menuClick} src="/images/account_circle.svg"/>
                    <Dropdown id="accountDropdown" width="300px" top="50px">
                        <Username>{user? user.email : ''}</Username>
                        <Button transparent mt="20px" click={signoutHandler}>Logout</Button>
                    </Dropdown>
                </DropdownWrapper>
            </RightContainer>
        </Wrapper>
    )
}
export default DashNav;