import {InputGroup, FormGroup} from './containers'
import {Label, Input, Select} from '../core/form/form'
const DrugEntry = props =>{
    
    return(
        <InputGroup FlexDirection="row">
            <FormGroup>
                <Label mb="10px">Drug Name</Label>
                <Input height="40px" name="drugName" id={`drugName${props.serial}`} data-serial={props.serial}/>
            </FormGroup>
            <FormGroup width="80px" ml="10px">
                <Label mb="10px">Dosage</Label>
                <Select name="dosage" data-serial={props.serial} id={`dosage${props.serial}`}>
                    <option hidden>Dosage</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Select>
            </FormGroup>
            <FormGroup width="80px" ml="10px">
                <Label mb="10px">Duration</Label>
                <Input name="duration" height="40px" data-serial={props.serial} id={`duration${props.serial}`}/>
            </FormGroup>
        </InputGroup>
    )
}

export default DrugEntry;