import {collection, query, where, getDocs, addDoc, doc, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore'
import db from './config';
export const loginBuilder = async (email, password) =>{
    let userInfo, userid;
    const q = query(collection(db, "user"), where("email", "==", email), where('password', "==", password));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
       //userInfo = doc.data()
       userid = doc.id
    });
    return  userid;
}
export const getBasicUserInfo = async (userid)=>{
    //baic info is firstname, lastname, email
    let info = null;
    const docRef = doc(db, "user", userid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        info = docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    if(info){
         let {firstname, lastname, email} = info;
        let fullname = firstname+' '+lastname;
        info = {name: fullname, email: email};
    }
   
    return info;
}

export const profileUpdateChecker = async(userid) =>{
    let found = null;
    const docRef = doc(db, "user", userid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        found = docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    if(found){
        let {profileUpdate} = found
        return profileUpdate;
    }

    return null;
    
    

    // let found;
    // const q = query(collection(db, 'user'), where('email', '==', email));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //     found = doc.data()
    // });
    // let {profileUpdate} = found
    // return profileUpdate;
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

export const profileUpdateUpdater = async(userid, data) =>{
      try{
        const profileRef = doc(db, "user", userid);
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

export const addVitalChecks = async (userid, reading, documentName) =>{
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, documentName), {
        userId: userid,
        reading: reading,
        date: serverTimestamp()
    });
    return docRef.id;
}
export const updateDrugTaken = async (drugName, taken, userid) =>{
    // Add a new document with a generated id.
    let result = []
    let indexes = []
    const q = query(collection(db, 'Medications'), where("userId", "==", userid));
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

export const getUserVitals = async (userid, vitals) =>{
    let latest = [];
    const q = query(collection(db, vitals), where("userId", "==", userid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
       latest.push(doc.data())
    });
    return latest;
}
export const getUserInfo = async (userid) =>{
    let user;
    const docRef = doc(db, "user", userid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        user = docSnap.data();
        let {firstname, lastname, email, DoB, gender, height, unitMethod, updated, weight} = user;
        let name = firstname+ ' '+lastname
        let basicUserInfo = {name: name, email: email, id: userid}
        user = {DoB: DoB, gender: gender, height: height, unitMethod: unitMethod, updated: updated, weight: weight, user: basicUserInfo}
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    return user;
}
export const updateUserInfo = async (data) =>{
    let {userId, ...updateData} = data;
    let userid;
    await updateDoc(doc(db, "user", userId), {
     ...updateData,
     updated: serverTimestamp(),
    })
}