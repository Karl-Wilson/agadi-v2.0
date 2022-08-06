import styled from "styled-components";
const Wrapper = styled.div`
position: absolute;
left: ${props=>props.left||""};
right: ${props=>props.right||"0"};
top: ${props=>props.top||"0"};
background-color: ${props=>props.backgColor||'#cccccc'};
display: none;
box-shadow: 0px 12px 24px rgba(0,0,0,.5);
&.show{
            display: flex; 
            flex-direction: column;
            align-items: center;
            width: ${props=>props.width||''}; 
            background-color: #eeeeee;
            padding: 20px 0px;
            z-index: 24;
}
`
const Dropdown = props =>{
    return (
        <Wrapper {...props}/>
    )
}
export default Dropdown;