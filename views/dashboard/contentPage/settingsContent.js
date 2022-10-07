import styled from "styled-components";
import {Button} from '../../../components/core/core'
import {Select, Label} from '../../../components/core/form/form'
import { FormGroup2, Card2, Input2, LabelWrapper } from "./profileContent";
import {CardContainer, CardHolder, FormGroup, InputGroup, HeightInputContainer, WeightInputContainer, FormButtonContainer} from '../../../components/containers/containers'
const Form = styled.form``
const SettingsContent = props =>{
    const changeHandler = () =>{

    }
    const saveHandler =()=>{

    }
    return(
        <CardHolder> 
        <Card2>
            <CardContainer title="Settings"  mb="24px" titleSize="24px" titleColor="#824100">
                    <Form>
                        <FormGroup2>
                            <LabelWrapper><Label mr="40px">Theme</Label></LabelWrapper>
                        <InputGroup FlexDirection="row">
                            <Select name="day" onChange={changeHandler}>
                                <option>Light</option>
                                <option>Dark</option>
                            </Select>
                        </InputGroup>
                    </FormGroup2>
                    <FormButtonContainer>
                    <div></div>
                    <Button solid click={saveHandler}>Save</Button>
                </FormButtonContainer>
                    </Form>
            </CardContainer>
        </Card2>
    </CardHolder>
    )
}
export default SettingsContent;