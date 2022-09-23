import styled from "styled-components";
import { keyframes } from "styled-components";
import {Menu, Logo, Button}  from '../core/core'
import {uiAction} from '../../store/reducers/uiReducer'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const slideRight = keyframes`
  from {
    left: -100%
  }
  to {
    left: 0;
  }
`;
const slideLeft = keyframes`
  from {
    left: 0;
  }
  to {
    left:  -100%;
  }
`;
// left: 0;
// z-index: 20;
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    position: fixed;
    overflow-y: auto;
    overflow-x: hidden;
    left: -100%;

    &.showSidebar{
        z-index: 20;
        animation-fill-mode: forwards;
        animation-name: ${slideRight};
        animation-duration: .5s;
    }
    &.hideSidebar{
        z-index: 20;
        animation-fill-mode: forwards;
        animation-name: ${slideLeft};
        animation-duration: .5s;
    }
    @media screen and (min-width: 764px){
        left: 0;
        width: 300px;
    }
`
const InnerWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24px 24px 24px 50px;
`
const UpdateIcon = styled.img`
    width: 20px;
    height: auto;
    margin-right: 10px;
`
const CloseBtnIcon = styled.img`
    width: 35px;
    cursor: pointer;
    @media screen and (min-width: 764px){
        display: none;
    }

`
export const showSidebar = () =>{
    let list  = document.getElementById('sidebar').getAttribute('class')
    let listname = list.split(' ')
    let change = false
    listname.map((value, index)=>{
        if(listname[index] == 'hideSidebar'){
            listname[index] = 'showSidebar'
            change = true
        }else if(listname[index] == 'showSidebar'){
            listname[index] = 'hideSidebar'
            change = true
        }
    })
    if(!change) listname.push('showSidebar')
    document.getElementById('sidebar').className = listname.join(' ')   
}

const Sidebar = props =>{
    const dispatch = useDispatch()
    const {addUpdateModal} = uiAction
    const updateHandler = (e) =>{
        dispatch(addUpdateModal(true))
    }
    useEffect(() => {
        window.addEventListener('resize', function(){
            let screenWidth = window.innerWidth
            if(screenWidth>=992){
                document.getElementById('sidebar').classList.remove('hideSidebar')
            }
        })
      return () => {
        window.removeEventListener('resize', function(){
            let screenWidth = window.innerWidth
            if(screenWidth>=992){
                document.getElementById('sidebar').classList.remove('hideSidebar')
            }
        })
      }
    }, [])
    
    return(
        <Wrapper id="sidebar" >
            <InnerWrapper>
                <Logo/>
                <CloseBtnIcon src="/images/close_btn.svg" onClick={showSidebar}/>
            </InnerWrapper>
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