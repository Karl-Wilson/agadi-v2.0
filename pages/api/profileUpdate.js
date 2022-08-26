import { profileUpdateUpdater, addBloodPressure, addSugarLevel, addMedication } from "../../firebase/builder";

const handler = async (req, res) =>{
    if(req.method == 'POST'){
        const {userEmail, DoB, gender, height, weight, bloodPressure, sugarLevel, medication } = req.body
        const updateData = {DoB: DoB, gender: gender, height: height, weight: weight}
        //validate here
        try{
            let isProfileUpdated = await profileUpdateUpdater(userEmail, updateData)
            let isBloodPressureAdded = await addBloodPressure(userEmail, bloodPressure)
            let isSugarLevelAdded = await addSugarLevel(userEmail, sugarLevel)
            let isMedicationAdded = await addMedication(userEmail, medication)
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