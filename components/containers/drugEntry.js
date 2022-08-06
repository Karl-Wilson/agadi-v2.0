import {InputGroup, FormGroup} from './containers'
import {Label, Input, Select} from '../core/form/form'
const DrugEntry = props =>{
    return(
        <InputGroup>
            <FormGroup>
                <Label mb="10px">Drug Name</Label>
                <Input height="40px"/>
            </FormGroup>
            <FormGroup width="80px" ml="10px">
                <Label mb="10px">Dosage</Label>
                <Select >
                    <option></option>
                </Select>
            </FormGroup>
            <FormGroup width="80px" ml="10px">
                <Label mb="10px">Duration</Label>
                <Select >
                    <option></option>
                </Select>
            </FormGroup>
        </InputGroup>
    )
}

export default DrugEntry;