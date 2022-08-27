import styled from 'styled-components'
import {PageWrapper, Logo, Button} from '../../../components/core/core'
import {FormWrapper, Label, FormErrorDisplay} from '../../../components/core/form/form'
import { useRouter } from 'next/router'
import {FormTitleContainer, FormButtonContainer, BPInputContainer, FormInputContainer, FormGroup} from '../../../components/containers/containers'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profileUpdateAction } from '../../../store/reducers/profileUpdateReducer'
import { useBackBtn } from '../../../utils/hooks'
import {FormLoading} from '../../../components/core/loading/loading'
const Form= styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`
const Hint = styled.p`
 font-size: 14px;
 margin-top: 10px;
`

//reminder add onchange handler incase one decides to go back 

const UpdaterTwo = props =>{
    const [isLoading, setLoading] = useState(false);
    const router  = useRouter()
    const dispatch = useDispatch();
    const bloodPressure = useSelector(state=>state.profileUpdate.bloodPressure)
    const {addBloodPressure} = profileUpdateAction;
    const [error, setError] = useState(false);
    const backBtnHandler = useBackBtn(props.userUrl, 1)

    const readingValidation = (BP) =>{
        if(BP){
            let result = BP.split('/')
            if(result.length <= 1 || isNaN(result[0]) || isNaN(result[1])){
                setError('Please enter correct reading, eg 85/120. Also check hint below')
                return false
            }
        
        }else{
            setError('Please enter blood pressure reading')
            return false
        }
        return true
    }
    const errorHide = () =>{
        if(error){
            setError(false);
        }
        
    }
    const changeHandler = (e) =>{
        let result  = e.target.value
        dispatch(addBloodPressure(result))
        console.log(result)
    }
    const clickHandler = () =>{
        setLoading(true)
        //const bloodPressure = document.querySelector('input[name="bp"]').value
        let isValid = readingValidation(bloodPressure)
        if(isValid){
            dispatch(addBloodPressure(bloodPressure))
            router.push(`/${props.userUrl}/profile-update/3`)  
        }  
        setLoading(false)
    }
    return(
        <PageWrapper pt="24px" pb="24px">
            <FormWrapper Lwidth="500px">
            {isLoading && <FormLoading/>}
                <Form>
                    <div>
                        <Logo/>
                        <FormTitleContainer title="What is your blood pressure today?" subtitle="to continue to dashboard"/>
                        {error && <FormErrorDisplay mt="0px" mb="30px">{error}</FormErrorDisplay>}
                        <FormInputContainer>
                            <FormGroup>
                                <Label mb="10px">Blood Pressure</Label>
                                <BPInputContainer unit="mmHg" name="bp" placeholder="Blood Pressure" error={error} onClick={errorHide} change={changeHandler} value={bloodPressure}/>
                                <Hint>Hint : systolic/diastolic</Hint>
                            </FormGroup>
                            
                        </FormInputContainer>
                    </div>
                    <FormButtonContainer>
                        <Button Swidth="100%" Lwidth="50px" click={backBtnHandler}>Back</Button>
                        <Button Swidth="100%" Lwidth="160px" solid click={clickHandler}>Next</Button>
                    </FormButtonContainer>
                </Form>
            </FormWrapper>
        </PageWrapper>
    )
} 
export default UpdaterTwo;