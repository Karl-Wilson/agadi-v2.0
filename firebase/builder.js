import {collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import db from './config';
export const loginBuilder = async (email, password) =>{
    let user;
    const q = query(collection(db, "user"), where("email", "==", email), where('password', "==", password));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
       user = doc.data()
    });
    return user;
}
export const checkEmail = async (email) =>{
    let found;
    const q = query(collection(db, 'user'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        found = {userId: doc.id, userData: doc.data()}
    });
   
    return found;
}
export const createUser = async (firstname, lastname, email, password) =>{
    const docRef = await addDoc(collection(db, 'user'), {
        firstname: firstname, 
        lastname: lastname,
        email: email,
        password: password,
        profileUpdate: false
    });
    console.log('user created')
    return {id: docRef.id};
}

export const profileUpdateChecker = async(email) =>{
    let found;
    const q = query(collection(db, 'user'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        found = doc.data()
    });
    let {profileUpdate} = found
    return profileUpdate;
}
export const profileUpdateUpdater = async(email) =>{
    let found;
    const q = query(collection(db, 'user'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        found = doc.data()
    });
    let {profileUpdate} = found
    return profileUpdate;
}