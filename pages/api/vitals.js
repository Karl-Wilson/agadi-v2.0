import {getUserVitals, getUserInfo, addVitalChecks, updateDrugTaken} from '../../firebase/builder'
const handler = async(req, res) =>{
    if(req.method == 'POST'){
        const {userId} = req.body
        try{
            let bloodPressure = await getUserVitals(userId, 'BloodPressure')
            let sugarLevel = await getUserVitals(userId, 'SugarLevel')
            let medications = await getUserVitals(userId, 'Medications')
            let userInfo = await getUserInfo(userId)
            res.status(200).json({data: {bloodPressure: bloodPressure, sugarLevel: sugarLevel, medications: medications, userInfo: userInfo}})
        }catch(e){
            res.status(400).json({error: e.message})
        }
    }
    
    if(req.method == 'PUT'){
        if(req.body.alreadyTakenUpdate){
            const {drugName, taken, userId} = req.body
            try{
                await updateDrugTaken(drugName, taken, userId)
                res.status(200).json({data: 'success'})
            }catch(e){
                res.status(400).json({error: e.message})
            }  
        }else{
            const {reading, userId, document} = req.body
            try{
                let result = await addVitalChecks(userId, reading, document)
                res.status(200).json({data: 'success'})
            }catch(e){
                res.status(400).json({error: e.message})
            }  
        }         
    }
}
export default handler;