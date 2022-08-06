import styled from 'styled-components'
import {PageWrapper, Logo, Button} from '../../../components/core/core'
import {FormWrapper, Label} from '../../../components/core/form/form'
import {FormTitleContainer, FormButtonContainer, BPInputContainer, FormInputContainer, FormGroup} from '../../../components/containers/containers'
const Form= styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`
const UpdaterTwo = props =>{
    return(
        <PageWrapper pt="24px" pb="24px">
            <FormWrapper Lwidth="500px">
                <Form>
                    <div>
                        <Logo/>
                        <FormTitleContainer title="What is your blood pressure today?" subtitle="to continue to dashboard"/>
                        <FormInputContainer>
                            <FormGroup>
                                <Label mb="10px">Blood Pressure</Label>
                                <BPInputContainer/>
                            </FormGroup>
                            
                        </FormInputContainer>
                    </div>
                    <FormButtonContainer>
                        <Button Swidth="100%" Lwidth="50px">Back</Button>
                        <Button Swidth="100%" Lwidth="160px" solid>Next</Button>
                    </FormButtonContainer>
                </Form>
            </FormWrapper>
        </PageWrapper>
    )
} 
export default UpdaterTwo;