import {getUserVitals, getUserInfo, addVitalChecks} from '../../firebase/builder'
const handler = async(req, res) =>{
    if(req.method == 'POST'){
        const {email} = req.body
        try{
            let bloodPressure = await getUserVitals(email, 'BloodPressure')
            let sugarLevel = await getUserVitals(email, 'SugarLevel')
            let medications = await getUserVitals(email, 'Medications')
            let userInfo = await getUserInfo(email)
            let {height, weight, unitMethod} = userInfo
            res.status(200).json({data: {bloodPressure: bloodPressure, sugarLevel: sugarLevel, height: height, weight: weight, unitMethod: unitMethod, medications: medications}})
        }catch(e){
            res.status(400).json({error: e.message})
        }
    }
    
    if(req.method == 'PUT'){
        const {reading, email, document} = req.body
        try{
            let result = await addVitalChecks(email, reading, document)
            res.status(200).json({data: 'success'})
        }catch(e){
            res.status(400).json({error: e.message})
        }        
    }
}
export default handler;