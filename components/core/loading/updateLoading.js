import styled from "styled-components";
import { useSelector } from "react-redux";
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    p{
        margin-top: 10px;
    }
`
const Img = styled.img`
    width: 80px;
`
const UpdateLoading = props =>{
    const isUpdateSuccessful = useSelector(state=>state.ui.isUpdateSuccessful)
    //display updating when update is not successful and no error
    //display error when update is not succeful and there is error
    return(
        <Wrapper>
            {!isUpdateSuccessful && <>
                <Img src="/images/update_loader.svg"/>
                <p>Updating</p>
            </>}
            {isUpdateSuccessful && <>
                <p>Updated</p>
            </>}
            
        </Wrapper>
    )
}
export default UpdateLoading;