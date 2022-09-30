import {collection, query, where, getDocs, addDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
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
// export const profileUpdateUpdater = async(email) =>{
//     let found;
//     const q = query(collection(db, 'user'), where('email', '==', email));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         found = doc.data()
//     });
//     let {profileUpdate} = found
//     return profileUpdate;
// }


export const profileUpdateUpdater = async(email, data) =>{
    let found;
    const q = query(collection(db, 'user'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        found = doc.id
    });
    try{
        const profileRef = doc(db, "user", found);
        updateDoc(profileRef, {
            ...data, 
            profileUpdate: true,
            updated: serverTimestamp()
        });
        return 'Updated';
    }catch(e){
        return "Unable to Update"
    }
}
export const addVitalChecks = async (email, reading, documentName) =>{
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, documentName), {
        email: email,
        reading: reading,
        date: serverTimestamp()
    });
    return docRef.id;
}
export const updateDrugTaken = async (drugName, taken, email) =>{
    // Add a new document with a generated id.
    let result = []
    let indexes = []
    const q = query(collection(db, 'Medications'), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
       result.push(doc.data())
       indexes.push(doc.id)
    });
    let returnedReading, docIdIndex

    result.map((outerElem, index)=>{
        outerElem.reading.map(innerElem=>{
            if(innerElem.drugName == drugName){
                innerElem.taken = taken
                returnedReading = outerElem.reading
                docIdIndex = index
            }
        })
    })

    await updateDoc(doc(db, "Medications", indexes[docIdIndex]), {
        "reading": returnedReading,
    });
    
}

export const getUserVitals = async (email, vitals) =>{
    let latest = [];
    const q = query(collection(db, vitals), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
       latest.push(doc.data())
    });
    return latest;
}
export const getUserInfo = async (email) =>{
    let user;
    const q = query(collection(db, 'user'), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
       user = doc.data()
    });
    return user;
}
