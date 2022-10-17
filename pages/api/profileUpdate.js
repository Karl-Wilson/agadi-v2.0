import { profileUpdateUpdater, addVitalChecks } from "../../firebase/builder";

const handler = async (req, res) =>{
    if(req.method == 'POST'){
        const {userId, DoB, gender, height, weight, bloodPressure, sugarLevel, medication, unitMethod } = req.body
        const updateData = {DoB: DoB, gender: gender, height: height, weight: weight, unitMethod: unitMethod}
        //validate here
        try{
            let isProfileUpdated = await profileUpdateUpdater(userId, updateData)
            let isBloodPressureAdded = await addVitalChecks(userId, bloodPressure, 'BloodPressure')
            let isSugarLevelAdded = await addVitalChecks(userId, sugarLevel, 'SugarLevel')
            let isMedicationAdded = medication.length > 0? await addVitalChecks(userId, medication, 'Medications') : true; 
            if(isProfileUpdated && isBloodPressureAdded && isSugarLevelAdded && isMedicationAdded){
                res.status(200).json({data: 'Updated'})
            }else{
                throw 'Unable to update'
            }                        
        }catch(e){
            res.status(400).json({error: e.message})
        }
    }
}
export default handler;