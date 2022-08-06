import styled from "styled-components";
import {Button, Logo} from "../core/core"
import { useMenuDropdown } from "../../utils/hooks";
const Wrapper = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0px;
    position: relative;
`
const LogoWrapper = styled.div`
`
const ButtonWrapper = styled.div`
        display: none;
        position: absolute;
        top: 70px;
        left: 0;
        
        &.show{
            display: flex; 
            flex-direction: column;
            align-items: center;
            width: 100%; 
            background-color: #eeeeee;
            padding: 20px 0px;
            z-index: 14;
        }
    
    @media screen and (min-width: 768px) {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        top: 0px;
    }
`
const MenuContainer = styled.div`
    width: 50px;
    height: 50px;
`
const Menu = styled.img`
    display: block;
    cursor: pointer;
    @media screen and (min-width: 768px) {
        display: none;
    } 
`

const Nav = props =>{
    const menuHandler = useMenuDropdown('btnWrapper');
    return(
        <Wrapper>
            <LogoWrapper><Logo/></LogoWrapper>
            <MenuContainer onClick={menuHandler}><Menu src="/images/menu_black_48dp.svg" /></MenuContainer>
            <ButtonWrapper id="btnWrapper">
                <Button solid href="/login" lmr="10px" mb="10px" lmb="0px">Login</Button>
                <Button transparent href="/register">Register</Button>
            </ButtonWrapper>
        </Wrapper>
    )
}
export default Nav;