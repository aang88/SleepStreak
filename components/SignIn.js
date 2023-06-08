import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native';
import { initializeApp } from 'firebase/app';
import {firebaseConfig} from '../firebase-config'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth'
import { useState,useEffect } from 'react';
import {auth,db} from '../firebase-config'
import { collection, addDoc,setDoc,doc,getDoc  } from "firebase/firestore"; 



function SignIn(props) {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [userid,setUserID] = useState('')

    
const handleCreateAccount = async () =>{
    await createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        console.log('Account Created!')
        props.callbackUser(userCredential.user)
        setDoc(doc(db, "users", userCredential.user.uid), {sleeptime: "",
        waketime: "",
        streak: 0});
    })
    .catch(error=>{
        console.log(error);
    })
}

const handleSignIn = () =>{
    signInWithEmailAndPassword(auth,email,password).then(async (userCredential)=>{
        console.log("Signed In!")
        var useruid = userCredential.user.userUid;
    
        props.callbackUser(userCredential.user)
    
        const docSnap = await getDoc(doc(db, "users", userCredential.user.uid));
        console.log(docSnap.data())
        
        const wakeTime = docSnap.get("waketime")
        const sleepTime = docSnap.get("sleeptime")
        const streak = docSnap.get("streak")

        
        
        props.callbackTimes(sleepTime,wakeTime)
        props.callbackStreak(streak)

    })
}
    return (
        <View style={styles.container}>
            <View>
                <Text>Email</Text>
                <TextInput
                    onChangeText={text=>setEmail(text)}
                    style={[styles.buttonLargeContainer]}
                    placeholder="Email"
                />
            </View>
            <View>
                <Text>Password:</Text>
                <TextInput
                    onChangeText={text=>setPassword(text)}
                    style={[styles.buttonLargeContainer]}
                    placeholder="Password"
                />
            </View>

            <TouchableOpacity
                style={[styles.buttonLargeContainer]}
                onPress={() => {handleSignIn()}}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.buttonLargeContainer]}
                onPress={() => {handleCreateAccount()}}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>


            
        </View>
    );
  }

export default SignIn

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer:{
        width: 1000,
        flexDirection: 'row',
        marginRight: -800,
        gap: 10,
        marginTop: 10,
      },
    buttonLargeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#2C99B7',
        borderRadius: 10,
        margin:20
      },
    buttonText:{
        color: "#F4F6F1"
    },
    headerText:{
        fontSize: 30,
        color:"#F4F6F1",
    },
    headerText2:{
        fontSize: 20,
        color:"#F4F6F1",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: "#F4F6F1",
        borderRadius: 20,
        color: "#F4F6F1",
      },
     textInputContainer:{
        justifyContent: 'center',
        flexDirection:"row",
        margin: 10,
        alignItems: 'center',
        color: "#F4F6F1"
     }
  
  });