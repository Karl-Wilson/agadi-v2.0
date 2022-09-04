import {getUserVitals} from '../../firebase/builder'
const handler = async(req, res) =>{
    if(req.method == 'POST'){
        const {email} = req.body
        try{
            let bloodPressure = await getUserVitals(email, 'BloodPressure')
            let sugarLevel = await getUserVitals(email, 'SugarLevel')
            res.status(200).json({data: {bloodPressure: bloodPressure, sugarLevel: sugarLevel}})
        }catch(e){
            res.status(400).json({error: e.message})
        }
    }else{
        
        
    }
}
export default handler;