import styled from "styled-components";
import {PageWrapper, Logo, Button} from '../../../components/core/core'
import {FormWrapper, Label, Select, Input, FormErrorDisplay} from "../../../components/core/form/form"
import {FormTitleContainer, FormInputContainer, FormGroup, InputGroup, HeightInputContainer, WeightInputContainer, FormButtonContainer} from "../../../components/containers/containers"
import { profileUpdateAction } from "../../../store/reducers/profileUpdateReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { dayGenerator, yearGenerator, profileInputHandler } from "../../../utils/helper";
import { useUnitSwitchHandler, useProfileFormHandler1 } from "../../../utils/hooks";
const Form= styled.form`

`
const UnitSwitch = styled.div`
    width: 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #cccccc;
    border-radius: 10px;
    div{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 5px;
        width: 50%;
        height: 30px;
        cursor: pointer;
        border-radius: 10px;
    }
    .activeSwitch{
        background-color: #cccccc;
    }
`

const UpdaterOne = props =>{
    const day = dayGenerator()
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const year = yearGenerator()
    const dispatch = useDispatch();
    const router = useRouter()
    const dayValue = useSelector(state=>state.profileUpdate.day)
    const monthValue = useSelector(state=>state.profileUpdate.month)
    const yearValue = useSelector(state=>state.profileUpdate.year)
    const genderValue = useSelector(state=>state.profileUpdate.gender)
    const feetValue = useSelector(state=>state.profileUpdate.feet)
    const inchesValue = useSelector(state=>state.profileUpdate.inches)
    const centimeterValue = useSelector(state=>state.profileUpdate.centimeter)
    const kgValue = useSelector(state=>state.profileUpdate.kg)
    const poundsValue = useSelector(state=>state.profileUpdate.pounds)
    const unit = useSelector(state=>state.profileUpdate.unitMethod)
    const UnitSwitchHandler = useUnitSwitchHandler()

    const [error, dayError, monthError, yearError, genderError, heightError, weightError,
        profileFormValidator1, errorHide, errorDisplay, profileInputHandler] = useProfileFormHandler1()

    const {addDay, addMonth, addYear, addGender, addFeet, addInches, addCentimeter, addKg, addPounds} = profileUpdateAction
    
    const changeHandler = (e) =>{
        let name = e.target.getAttribute('name')
        let value = e.target.value
        switch(name){
            case 'day': dispatch(addDay(value))
            break;
            case 'month': dispatch(addMonth(value))
            break;
            case 'year': dispatch(addYear(value))
            break;
            case 'gender': dispatch(addGender(value))
            break;
            case 'feet': dispatch(addFeet(value))
            break;
            case 'inches': dispatch(addInches(value))
            break;
            case 'centimeter': dispatch(addCentimeter(value))
            break;
            case 'kg': dispatch(addKg(value))
            break;
            case 'pounds': dispatch(addPounds(value))
            break;
        }
    }


    const clickHandler = (e) =>{
        e.preventDefault()
        //const [gender, feet, inches, kg, centimeter, pounds, day, month, year] = profileInputHandler(unit);
        const error = profileFormValidator1(genderValue, feetValue, inchesValue, kgValue, centimeterValue, poundsValue, dayValue, monthValue, yearValue, unit)
        if(error.length<=0){
            router.push(`/${props.userUrl}/profile-update/2`)  
        }else{
            errorDisplay(error)
        }
     
    }
    return(
        <PageWrapper pt="24px" pb="24px" height="auto">
            <FormWrapper Lwidth="500px">
                <Form>
                    <Logo/>
                    <FormTitleContainer title="Tell us more about yourself" subtitle="to continue to dashboard"/>
                    <FormInputContainer>
                        {error && <FormErrorDisplay mt="0px" mb="30px"><p>{error}</p></FormErrorDisplay>}
                        <FormGroup mb="24px">
                            <Label mb="10px">Date of Birth</Label>
                            <InputGroup FlexDirection="row">
                                <Select name="day" error={dayError} onClick={errorHide} onChange={changeHandler}>
                                    <option hidden>Day</option>
                                    {day.map(value=>{
                                        return <option>{value}</option>
                                    })}
                                </Select>
                                <Select name="month" error={monthError} onClick={errorHide} onChange={changeHandler}>
                                    <option hidden>Month</option>
                                    {month.map(value=>{
                                        return <option>{value}</option>
                                    })}
                                </Select>
                                <Select name="year" error={yearError} onClick={errorHide} onChange={changeHandler}>
                                    <option hidden>Year</option>
                                    {year.map(value=>{
                                        return <option>{value}</option>
                                    })}
                                </Select>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup mb="24px">
                            <Label mb="10px">Gender</Label>
                            <InputGroup FlexDirection="row" onChange={changeHandler}>
                                <Input type="radio" onClick={errorHide} error={genderError} value="male" name="gender" Smr="10px" width="15px" height="20px"/>
                                <Label mr="20px" >Male</Label>
                                <Input type="radio" onClick={errorHide} error={genderError} value="female" name="gender" Smr="10px" width="15px" height="20px"/>
                                <Label >Female</Label>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup mb="24px" mt="24px">
                            <UnitSwitch>
                                <div onClick={UnitSwitchHandler} id="imperialSwitch" class="activeSwitch">Imperial</div>
                                <div onClick={UnitSwitchHandler} id="baseSwitch">Base</div>
                            </UnitSwitch>
                        </FormGroup>
                        <FormGroup mb="24px">
                            <Label mb="10px">Height</Label>
                            <HeightInputContainer unit={unit} feet={feetValue} inches={inchesValue} centimeter={centimeterValue} error={heightError} onClick={errorHide} change={changeHandler}/>
                        </FormGroup>

                        <FormGroup mb="24px">
                            <Label mb="10px">Weight</Label>
                            <WeightInputContainer unit={unit} error={weightError} onClick={errorHide} change={changeHandler} kg={kgValue} pounds={poundsValue}/>
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