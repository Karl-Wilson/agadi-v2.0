import styled from "styled-components";
import { useDispatch } from "react-redux";
import { uiAction} from '../../store/reducers/uiReducer'
const FixedDiv = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    @media screen and  (min-width: 992px){
        width: calc(100% - 300px); 
        left: 300px;
    } 
`
const Wrapper = styled(FixedDiv)`
    z-index: 55; 
    overflow-y: auto; 
    background-color: transparent;
`
const InnerWrapper = styled.div`
    width: 100%;
    height: 100%;  
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 768px){
        padding: 100px;
    }
`
const Background = styled(FixedDiv)`
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 50;
`
const ModalWrapper = styled.div`
    background-color: #ffffff;
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-sizing: border-box;
    z-index: 56;
    @media screen and (min-width: 768px){
        width: auto;
    }
`
const Modal = props =>{
    const dispatch = useDispatch()
    const {addUpdateModal} = uiAction
    const closeModalHandler = () =>{
        dispatch(addUpdateModal(false))
    }

    return(
        <Wrapper>
            <Background onClick={closeModalHandler}/>
                <InnerWrapper id="modalWrapper">
                    <ModalWrapper id="modal">
                        {props.children}
                    </ModalWrapper> 
                </InnerWrapper>
        </Wrapper>
    )
}
export default Modal;