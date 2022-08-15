import styled from "styled-components";
import {PageWrapper, Logo, Button} from '../../../components/core/core'
import {FormWrapper, Label, Select, Input, FormErrorDisplay} from "../../../components/core/form/form"
import {FormTitleContainer, FormInputContainer, FormGroup, InputGroup, HeightInputContainer, WeightInputContainer, FormButtonContainer} from "../../../components/containers/containers"
import { profileUpdateAction } from "../../../store/reducers/profileUpdateReducer";
import { useDispatch } from "react-redux";
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
    const [UnitSwitchHandler, unit] = useUnitSwitchHandler()
    const [error, dayError, monthError, yearError, genderError, heightError, weightError,
        profileFormValidator1, errorHide, errorDisplay, profileInputHandler] = useProfileFormHandler1()

    const {addDoB, addGender, addUnitMethod, addHeight,addWeight} = profileUpdateAction
    const day = dayGenerator()
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const year = yearGenerator()
    const dispatch = useDispatch();
    const router = useRouter()



    
    const clickHandler = (e) =>{
        e.preventDefault()
        const [gender, feet, inches, kg, centimeter, pounds, day, month, year] = profileInputHandler(unit);
        const error = profileFormValidator1(gender, feet, inches, kg, centimeter, pounds, day, month, year, unit)
        if(error.length<=0){
            let DoB = `${day}/${month}/${year}`;
            console.log(DoB)
            dispatch(addDoB(DoB))
            dispatch(addGender(gender))
            if(unit == 'imperial'){
                dispatch(addUnitMethod('imperial'))
                dispatch(addHeight({feet: feet, inches: inches}))
                dispatch(addWeight({kg: kg}))
            }else{
                dispatch(addUnitMethod('base'))
                dispatch(addHeight({centimeter: centimeter}))
                dispatch(addWeight({pounds: pounds}))
            }
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
                                <Select name="day" error={dayError} onClick={errorHide}>
                                    <option hidden>Day</option>
                                    {day.map(value=>{
                                        return <option>{value}</option>
                                    })}
                                </Select>
                                <Select name="month" error={monthError} onClick={errorHide}>
                                    <option hidden>Month</option>
                                    {month.map(value=>{
                                        return <option>{value}</option>
                                    })}
                                </Select>
                                <Select name="year" error={yearError} onClick={errorHide}>
                                    <option hidden>Year</option>
                                    {year.map(value=>{
                                        return <option>{value}</option>
                                    })}
                                </Select>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup mb="24px">
                            <Label mb="10px">Gender</Label>
                            <InputGroup FlexDirection="row">
                                <Input type="radio" error={genderError} onClick={errorHide} value="male" name="gender" Smr="10px" width="15px" height="20px"/>
                                <Label mr="20px">Male</Label>
                                <Input type="radio" error={genderError} onClick={errorHide} value="female" name="gender" Smr="10px" width="15px" height="20px"/>
                                <Label>Female</Label>
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
                            <HeightInputContainer unit={unit} error={heightError} onClick={errorHide}/>
                        </FormGroup>

                        <FormGroup mb="24px">
                            <Label mb="10px">Weight</Label>
                            <WeightInputContainer unit={unit} error={weightError} onClick={errorHide}/>
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