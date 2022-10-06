import {getUserInfo, updateUserInfo} from '../../firebase/builder'
const handler = async (req, res) =>{
   if(req.method == 'PUT'){
        let {...updateData} = req.body
        try{
            await updateUserInfo(updateData)
            res.status(200).json({data: 'success'})
        }catch(e){
            res.status(400).json({error: e.message})
        }
    }
}
export default handler;