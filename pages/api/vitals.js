import {getUserVitals, getUserInfo} from '../../firebase/builder'
const handler = async(req, res) =>{
    if(req.method == 'POST'){
        const {email} = req.body
        try{
            let bloodPressure = await getUserVitals(email, 'BloodPressure')
            let sugarLevel = await getUserVitals(email, 'SugarLevel')
            let userInfo = await getUserInfo(email)
            let {height, weight, unitMethod} = userInfo
            res.status(200).json({data: {bloodPressure: bloodPressure, sugarLevel: sugarLevel, height: height, weight: weight, unitMethod: unitMethod}})
        }catch(e){
            res.status(400).json({error: e.message})
        }
    }else{
        
        
    }
}
export default handler;