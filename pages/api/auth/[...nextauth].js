import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginBuilder } from "../../../firebase/builder";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'login',
            name: 'login-page',
            async authorize(credentials) {
                const {email, password} = credentials      
                let user, details;
                //sanitize input
                
                //login
                details = await loginBuilder(email, password);
                let fullname = details.firstname+' '+details.lastname
                user = {name: fullname, email: details.email}
                // If no error and we have user data, return it
                if (user) {
                  return user
                }
                // Return null if user data could not be retrieved
                return null
              }
        })
    ]
})