import styled from "styled-components";
import { useRouter } from "next/router";
const Wrapper = styled.div`
    width: ${props=>props.Swidth||'160px'};
    height: ${props=>props.height||'40px'};
    padding: 10px 30px;
    padding-top: ${props=>props.pt||'10px'};
    padding-bottom: ${props=>props.pb||'10px'};
    padding-left: ${props=>props.pl||'30px'};
    padding-right: ${props=>props.pr||'30px'};
    background-color: ${props=> props.solid? '#024150' : 'transparent'};
    border: ${props=> props.transparent? '2px solid #024150': ''};
    color: ${props=> props.solid? '#ffffff' : '#024150'};
    font-family: ${props=> (props.solid || props.transparent||props.bold)? 'Gilroy-Bold': ''};
    font-size: ${props=>props.fontSize || '16px'};
    cursor: pointer;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: ${props=>props.SjustifyContent||'center'};;
    align-items: center;
    margin-right: ${props=>props.mr||''};
    margin-left: ${props=>props.ml||''};
    margin-top: ${props=>props.mt||''};
    margin-bottom: ${props=>props.mb||''};
    @media screen and (min-width: 768px){
        width: ${props=>props.Lwidth||props.Swidth||'160px'};
        margin-right: ${props=>props.lmr||''};
        margin-left: ${props=>props.lml||''};
        margin-top: ${props=>props.lmt||''};
        margin-bottom: ${props=>props.lmb||''};
        justify-content: ${props=>props.LjustifyContent||props.SjustifyContent||'center'};
        border: ${props=> props.transparent||props.Ltransparent? '2px solid #024150': ''};
    }
`
const Button = ({href, ...props}) =>{
    const router = useRouter();

    const clickHandler = (e) =>{
        if(href){
            router.push(href);
        }
        if(props.click){
            const click = props.click;
            click(e)
        }
        
    }
    return(
        <Wrapper onClick={clickHandler} {...props}/>
    )
}
export default Button;