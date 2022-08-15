import styled from 'styled-components'
import { useState } from 'react'
import {PageWrapper, Logo, Button} from '../../../components/core/core'
import {FormWrapper, Label, Input, Select} from '../../../components/core/form/form'
import {FormTitleContainer, FormButtonContainer, BPInputContainer, FormInputContainer, FormGroup, InputGroup, DrugEntry} from '../../../components/containers/containers'
import { useBackBtn } from '../../../utils/hooks'
const Form= styled.form`
display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`
const AddBtnContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const UpdaterFour = props =>{
    const backBtnHandler = useBackBtn(props.userUrl, 3)
    const [field, setField] = useState([<DrugEntry/>])
    const addHandler = () =>{
        let fields = field.concat(<DrugEntry/>)
        setField(fields)
        console.log(fields)
    }
    const removeHandler = () =>{
        let [...fields] = field;
        if(fields.length>1){
            fields.splice(-1, 1);
            setField(fields)
            console.log(fields)
        }
        
    }
    return(
        <PageWrapper height="auto" pt="24px" pb="24px">
            <FormWrapper Lwidth="500px">
                <Form>
                    <div>
                    <Logo/>
                    <FormTitleContainer title="Are you currently on any medication?" subtitle="Do no miss a dose by keeping track of daily medication"/>
                    <FormInputContainer>
                        {field}
                    </FormInputContainer>
                    <AddBtnContainer>
                        <Button Swidth="60px" pr="15px" pl="0px" bold click={addHandler}>Add</Button>
                        <Button Swidth="70px" pr="15px" pl="15px" bold click={removeHandler}>Remove</Button>
                    </AddBtnContainer>
                    </div>
                    <FormButtonContainer>
                        <Button Swidth="100%" Lwidth="50px" click={backBtnHandler}>Back</Button>
                        <Button solid>Next</Button>
                    </FormButtonContainer>
                </Form>
            </FormWrapper>
        </PageWrapper>
    )
} 
export default UpdaterFour;