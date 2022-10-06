import styled from "styled-components";
import {CardContainer, CardHolder, FormGroup, InputGroup, HeightInputContainer, WeightInputContainer, FormButtonContainer} from '../../../components/containers/containers'
import {Card, Button} from '../../../components/core/core'
import {Label, Input, Select} from '../../../components/core/form/form'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dayGenerator, yearGenerator, isInputEmpty, isInputInteger, isInputString } from "../../../utils/helper";
import { updateProfilethunk } from "../../../utils/thunks";
import { useRouter } from "next/router";
const Form = styled.form``
const FormGroup2 = styled(FormGroup)`
    margin-bottom: 40px;
    width: 100%;
    @media screen and (min-width: 992px){    
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
`
const Card2 = styled(Card)`
@media screen and (min-width: 992px){
    padding: 30px 60px;
}
`
const LabelWrapper = styled.div`
    margin-bottom: 10px;
@media screen and (min-width: 992px){
    width: 300px;
}
`

const Input2 = styled(Input)`
@media screen and (min-width: 992px){
  
}
`
const Title = styled.p`
    font-size: 24px;
    color: #824100;
    margin-bottom: 20px;
`
const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`
//useState to store values
//input values from database to state values
//Setup error messages for the form
//on  submit, validate changed inputs, compare to database data and see which one changed, and check if it has the 
//right input

const ProfileContent = props =>{
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector(state=>state.ui.user)
    const unitMethod = useSelector(state=>state.data.unitMethod)
    const DoB = useSelector(state=>state.data.DoB)
    const genderData = useSelector(state=>state.data.gender)
    const heightData = useSelector(state=>state.data.height)
    const weightData = useSelector(state=>state.data.weight)
    const lastProfileUpdate = useSelector(state=>state.data.lastProfileUpdate)
    const [firstName, setFirstname] = useState()
    const [lastName, setLastname] = useState()
    const [email, setEmail] = useState()
    const [gender, setGender] = useState()
    const [day, setDay] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [feet, setFeet] = useState()
    const [inches, setInches] = useState()
    const [Kg, setKg] = useState()
    const [pounds, setPounds] = useState()
    const [Cm, setCm] = useState()
    const [height, setHeight] = useState()
    const FormDay = dayGenerator()
    const FormMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const FormYear = yearGenerator()

    const [error, setError] = useState()
    const [firstNameError,  setFirstnameError] = useState()
    const [lastNameError,  setLastnameError] = useState()
    const [emailError,  setEmailError] = useState()
    const [heightError,  setHeightError] = useState()
    const [weightError,  setWeightError] = useState()
    
    const DoBsplitter = (dob) =>{
        let data = dob.split('/')
        return data
    }
    const userFullnamesplitter = (name) =>{
        let data = name.split(' ')
        return data
    }
    
    useEffect(() => {
        if(user && DoB && genderData && lastProfileUpdate && unitMethod && heightData && weightData ){
            console.log(user)
            setFirstname(userFullnamesplitter(user.name)[0])
            setLastname(userFullnamesplitter(user.name)[1])
            setEmail(user.email)
            setGender(genderData)
            setDay(parseInt(DoBsplitter(DoB)[0]))
            setMonth(DoBsplitter(DoB)[1])
            setYear(parseInt(DoBsplitter(DoB)[2]))
            if(genderData == "female"){
                document.querySelector('input[data-name="female-gender"]').checked = true;
            }else{
                document.querySelector('input[data-name="male-gender"]').checked = true;
            }
            if(unitMethod == 'metric'){
                setCm(heightData.centimeter)
                setKg(weightData.kg)
            }else{
                setFeet(heightData.feet)
                setInches(heightData.inches)
                setPounds(weightData.pounds)
            }
        }
    }, [DoB, genderData, lastProfileUpdate, unitMethod, heightData, weightData, user])
    
    const changeHandler = (e) =>{
        let name = e.target.getAttribute('name')
        let value = e.target.value
        console.log(name)
        switch(name){
            case 'firstname': setFirstname(value)
            break;
            case 'lastname': setLastname(value)
            break;
            case 'email': setEmail(value)
            break;
            case 'month': setMonth(value)
            break;
            case 'year': setYear(value)
            break;
            case 'gender': setGender(value)
            break;
            case 'feet': setFeet(value)
            break;
            case 'inches': setInches(value)
            break;
            case 'centimeter': setCm(value)
            break;
            case 'kg': setKg(value)
            break;
            case 'pounds': setPounds(value)
            break;
        }
    }
    const validator = () =>{
        let error = [];
        if(!firstName){
            error.push('firstname')
        }
        if(!lastName){
            error.push('lastname')
        }
        if(!email){
            error.push('email')
        }
        if(unitMethod == 'imperial'){
            if(!feet || !isInputInteger(feet)){
                error.push('feet')
            }
            if(!inches || !isInputInteger(inches)){
                error.push('inches')
            }
            if(!pounds || !isInputInteger(pounds)){
                error.push('pounds')
            }
            
        }else{
            if(!Cm || !isInputInteger(Cm)){
                error.push('centimeter')
            }
            if(!Kg || !isInputInteger(Kg)){
                error.push('kg')
            }
        }
        return error;
    }
    const errorDisplay = (error) =>{
        setError(true)
        error.map(value=>{
            if(value == 'firstname'){
                setFirstnameError(true)
            }
            if(value == 'lastname'){
                setLastnameError(true)
            }
            if(value == 'email'){
                setEmailError(true)
            }
            if(unitMethod == 'imperial'){
                if(value == 'feet'){
                    setHeightError(true)
                }
                if(value == 'inches'){
                    setHeightError(true)
                }
                if(value == 'pounds'){
                    setWeightError(true)
                }
                
            }else{
                if(value == 'centimeter'){
                    setHeightError(true)
                }
                if(value == 'kg'){
                    setWeightError(true)
                }   
            }
        })
    }
    const errorHide = () =>{
        if(error){
            setFirstnameError(false);
            setLastnameError(false)
            setEmailError(false)
            setHeightError(false)
            setWeightError(false)
        }
        
    }
    const compareData = (DoB) =>{
        let result = {}
        let NewDate = {day: null, month: null, year: null}
        let NewHeight = {}
        let NewWeight = {}

        if(userFullnamesplitter(user.name)[0] != firstName){
            result = Object.assign(result, {firstname: firstName})
        }
        if(userFullnamesplitter(user.name)[1] != lastName){
            result = Object.assign(result, {lastname: lastName})
        }
        if(user.email != email){
            result = Object.assign(result, {email: email})
        }
        //record changed data
        if(parseInt(DoBsplitter(DoB)[0]) !== day){
            NewDate.day = day
        }
        if(DoBsplitter(DoB)[1] != month){
            NewDate.month = month
        }
        if(parseInt(DoBsplitter(DoB)[2]) != year){
            NewDate.year = year
        }
        if(genderData != gender){
            result = Object.assign(result, {gender: gender})
        }
        if(unitMethod == 'imperial'){
            if(heightData.feet != feet){
                NewHeight = Object.assign(NewHeight, {feet: feet});
            }
            if(heightData.inches != inches){
                NewHeight = Object.assign(NewHeight, {inches: inches});
            }
            if(weightData.pounds){
                NewWeight = Object.assign(NewWeight, {pounds: pounds});
            }
        }else{
            if(heightData.centimeter != Cm){
                NewHeight = Object.assign(NewHeight, {centimeter: Cm});
            }
            if(weightData.kg != Kg){
                NewWeight = Object.assign(NewWeight, {kg: Kg});
            }
        }
        //check if there is new input, then store in new object
        let newotherDate = {}
        if(NewDate.day){
            newotherDate = Object.assign(newotherDate, {day: NewDate.day})
        }else{
            newotherDate = Object.assign(newotherDate, {day: parseInt(DoBsplitter(DoB)[0])})
        }
        if(NewDate.month){
            newotherDate = Object.assign(newotherDate, {month: NewDate.month})
        }else{
            newotherDate = Object.assign(newotherDate, {month: DoBsplitter(DoB)[1]})
        }
        if(NewDate.year){
            newotherDate = Object.assign(newotherDate, {year: NewDate.year})
        }else{
            newotherDate = Object.assign(newotherDate, {year: parseInt(DoBsplitter(DoB)[2])})
        }
        let newotherHeight = {}
        let newotherWeight = {}
        if(unitMethod == 'imperial'){
            if(NewHeight.feet){
                newotherHeight = Object.assign(newotherHeight, {feet: NewHeight.feet})
            }else{
                newotherHeight = Object.assign(newotherHeight, {feet: heightData.feet})
            }

            if(NewHeight.inches){
                newotherHeight = Object.assign(newotherHeight, {inches: NewHeight.inches})
            }else{
                newotherHeight = Object.assign(newotherHeight, {inches: heightData.inches})
            }

            if(NewWeight.pounds){
                newotherWeight = Object.assign(newotherWeight, {pounds: NewWeight.pounds})
            }else{
                newotherWeight = Object.assign(newotherWeight, {pounds: weightData.pounds})
            }
        }else{
            if(NewHeight.centimeter){
                newotherHeight = Object.assign(newotherHeight, {centimeter: NewHeight.centimeter})
            }else{
                newotherHeight = Object.assign(newotherHeight, {centimeter: heightData.centimeter})
            }

            if(NewWeight.kg){
                newotherWeight = Object.assign(newotherWeight, {kg: NewWeight.kg})
            }else{
                newotherWeight = Object.assign(newotherWeight, {kg: weightData.kg})
            }
        }

        if(NewDate.day || NewDate.month || NewDate.year ){
            let newDoB = `${newotherDate.day}/${newotherDate.month}/${newotherDate.year}`
            result = Object.assign(result, {DoB: newDoB})
        }
        if(Object.keys(NewHeight).length != 0){
            result = Object.assign(result, {height: newotherHeight})
        }
        if(Object.keys(NewWeight).length != 0){
            result = Object.assign(result, {weight: newotherWeight})
        }
        return result;
    }
    const saveHandler = (e) =>{
        e.preventDefault()
        let validated = validator()
        if(validated.length <= 0){
            let data = compareData(DoB)
            if(Object.keys(data).length != 0){
                //send to database
                    data = Object.assign(data, {userId: user.id})
                updateProfilethunk(data, dispatch, router)
            }
        }else{
           errorDisplay(validated)
        }
    }
    return <>
        <CardHolder> 
            <Card2>
                <CardContainer title="profile">
                        <Form>
                            <FormGroup2>
                                <LabelWrapper><Label mr="40px">Firstname</Label></LabelWrapper>
                                <Input2 value={firstName} onChange={changeHandler} onClick={errorHide} error={firstNameError} name="firstname"/>
                            </FormGroup2>
                            <FormGroup2>
                                <LabelWrapper><Label mr="40px">Lastname</Label></LabelWrapper>
                                <Input2 value={lastName} onChange={changeHandler} onClick={errorHide} error={lastNameError} name="lastname"/>
                            </FormGroup2>
                            <FormGroup2>
                                <LabelWrapper><Label mr="40px">Email</Label></LabelWrapper>
                                <Input2 value={email} onChange={changeHandler}  onClick={errorHide} error={emailError} name="email"/>
                            </FormGroup2>
                            <FormGroup2>
                                <LabelWrapper><Label mr="40px">Date of Birth</Label></LabelWrapper>
                            <InputGroup FlexDirection="row">
                                <Select name="day" onChange={changeHandler}>
                                    {FormDay.map((value, index)=>{
                                        if(value == day){
                                            return <option selected  key={index+value+'days'}>{value}</option>
                                        }
                                        return <option key={index+value+'days'}>{value}</option>
                                    })}
                                </Select>
                                <Select name="month" onChange={changeHandler}>
                                    {FormMonth.map((value, index)=>{
                                        if(value == month){
                                            return <option selected key={index+value+'month'}>{value}</option>
                                        }
                                        return <option key={index+value+'month'}>{value}</option>
                                    })}
                                </Select>
                                <Select name="year" onChange={changeHandler}>
                                    
                                    {FormYear.map((value, index)=>{
                                        if(value == year){
                                            return <option selected key={index+'year'+value}>{value}</option>
                                        }
                                        return <option key={index+'year'+value}>{value}</option>
                                    })}
                                </Select>
                            </InputGroup>
                        </FormGroup2>

                            <FormGroup2>
                            <LabelWrapper><Label mr="40px">Gender</Label></LabelWrapper>
                            <InputGroup FlexDirection="row" onChange={changeHandler}>
                                <Input type="radio" value="male" name="gender" Smr="10px" width="15px" height="20px" data-name="male-gender"/>
                                <Label mr="20px" >Male</Label>
                                <Input type="radio" value="female" name="gender" Smr="10px" width="15px" height="20px" data-name="female-gender"/>
                                <Label >Female</Label>
                            </InputGroup>
                        </FormGroup2>
                        <FormGroup2>
                            <LabelWrapper><Label mr="40px">Height</Label></LabelWrapper>
                            <InputWrapper><HeightInputContainer unit={unitMethod} feet={feet} inches={inches} centimeter={Cm} change={changeHandler} onClick={errorHide} error={heightError}/></InputWrapper>
                        </FormGroup2>
                        <FormGroup2>
                            <LabelWrapper><Label mr="40px">Weight</Label></LabelWrapper>
                            <InputWrapper><WeightInputContainer unit={unitMethod} kg={Kg} pounds={pounds} change={changeHandler} error={weightError} onClick={errorHide}/></InputWrapper>
                        </FormGroup2>
                        <FormButtonContainer>
                        <div></div>
                        <Button solid click={saveHandler}>Save</Button>
                    </FormButtonContainer>
                        </Form>
                </CardContainer>
            </Card2>
        </CardHolder>
    </>
}
export default ProfileContent;