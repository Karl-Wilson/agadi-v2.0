import { checkEmail, createUser } from '../../firebase/builder';

const handler = async (req, res) =>{
    if(req.method == 'POST'){
        const {email, password, firstname, lastname} = req.body;
        let foundUser;
        //check email
        try{
            foundUser = await checkEmail(email);
            if(foundUser){
                throw 'User already exists'
            }else{
                 //create user
                try{
                    let docRef = createUser(firstname, lastname, email, password)
                    res.status(200).json({data: {email: email, password: password, userId: docRef.id}})
                }
                catch(e){
                res.status(400).json({error: 'Unable to add user, Try again'})
                } 
            }
        }
        catch(e){
            res.status(400).json({error: e})
        }
           
    }

}
export default handler;