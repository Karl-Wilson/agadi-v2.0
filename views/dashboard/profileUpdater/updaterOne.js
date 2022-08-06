import styled from "styled-components";
import {PageWrapper, Logo, Button} from '../../../components/core/core'
import {FormWrapper, Label, Select, Input} from "../../../components/core/form/form"
import {FormTitleContainer, FormInputContainer, FormGroup, InputGroup, HeightInputContainer, WeightInputContainer, FormButtonContainer} from "../../../components/containers/containers"

const Form= styled.form`

`


const UpdaterOne = props =>{
    const clickHandler = (e) =>{
        e.preventDefault()
        const gender = document.querySelector('input[name="gender"]:checked').value
        
    }
    return(
        <PageWrapper pt="24px" pb="24px" height="auto">
            <FormWrapper Lwidth="500px">
                <Form>
                    <Logo/>
                    <FormTitleContainer title="Tell us more about yourself" subtitle="to continue to dashboard"/>
                    <FormInputContainer>

                        <FormGroup mb="24px">
                            <Label mb="10px">Date of Birth</Label>
                            <InputGroup FlexDirection="row">
                                <Select>
                                    <option>Day</option>
                                </Select>
                                <Select>
                                    <option>Month</option>
                                </Select>
                                <Select>
                                    <option>Year</option>
                                </Select>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup mb="24px">
                            <Label mb="10px">Gender</Label>
                            <InputGroup FlexDirection="row">
                                <Input type="radio" value="male" name="gender" Smr="10px" width="15px" height="20px"/>
                                <Label mr="20px">Male</Label>
                                <Input type="radio" value="female" name="gender" Smr="10px" width="15px" height="20px"/>
                                <Label>Female</Label>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup mb="24px">
                            <Label mb="10px">Height</Label>
                            <HeightInputContainer/>
                        </FormGroup>

                        <FormGroup mb="24px">
                            <Label mb="10px">Weight</Label>
                            <WeightInputContainer/>
                        </FormGroup>
                    </FormInputContainer>
                    <FormButtonContainer>
                        <div></div>
                        <Button solid click={clickHandler}>Next</Button>
                    </FormButtonContainer>
                </Form>
            </FormWrapper>
        </PageWrapper>
    )
}

export default UpdaterOne;