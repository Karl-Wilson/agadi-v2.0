import styled from "styled-components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { dashboardPageCheck } from "../../utils/helper";
const Wrapper = styled.div`
    width:  100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-left: 50px;
    cursor: pointer;
    &.menuActive{
        background-color: #cccccc;    
        border-right: 4px solid #333333;
    }
    &:hover{
        background-color: #cccccc;
        border-right: 4px solid #333333;
    }
`
const IconHolder = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 12px;
`
const MenuName = styled.p`
    font-family: Gilroy-Bold;
    font-size: 18px;
`
const Menu = props =>{
    const router = useRouter();
    const dashboardPages = useSelector(state=>state.ui.dashboardPages)
    const url = router.query.pages
    const [active, setActive] = useState()

    useEffect(() => {
        addActive()
    }, [url])
 
    const clickHandler = () =>{
        if(props.name=="Dashboard"){
            router.push(`/${url[0]}`) 
        }else{
            let page = props.name.toLowerCase()
            router.push(`/${url[0]}/${page}`)       
        }

    }   
    const capitalizeFirstLetter = (word) =>{
        let uppercase, lowercase, result;
        uppercase = word.slice(0, 1)
        lowercase = word.slice(1, word.length)
        uppercase = uppercase.toUpperCase();
        result = uppercase + lowercase
        return result;
    }
    const addActive = () =>{
        if(active){
            document.getElementById(active).classList.remove('menuActive')
        }
        if(url.length>1){ 
            if(dashboardPageCheck(dashboardPages, url[1]) == false ){

            }else{
                let result = capitalizeFirstLetter(url[1]);
                document.getElementById(`${result}Menu`).classList.add('menuActive')
                setActive(result +'Menu');
            }       

        }else{
            document.getElementById('DashboardMenu').classList.add('menuActive')
            setActive('DashboardMenu');
        }   
    }
    return(
        <Wrapper onClick={clickHandler} id={`${props.name}Menu`}>
            <IconHolder src={props.icon}/>
            <MenuName>{props.name}</MenuName>
        </Wrapper>
    )
}
export default Menu;