import { BackgroundImage,StyleSheet, Text, View,TouchableOpacity,TextInput,ImageBackground   } from 'react-native';
import { initializeApp } from 'firebase/app';
import {firebaseConfig} from '../firebase-config'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth'
import { useState,useEffect } from 'react';
import {auth,db} from '../firebase-config'
import { collection, addDoc,setDoc,doc,getDoc  } from "firebase/firestore"; 
import { useFonts, Nunito } from '@expo-google-fonts/inter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faMoon } from '@fortawesome/free-solid-svg-icons'






function SignIn(props) {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [userid,setUserID] = useState('')
    let [fontsLoaded] = useFonts({
        'Slabo': require('../resources/Slabo27px-Regular.ttf'),
        'Abril': require('../resources/AbrilFatface-Regular.ttf'),
        'Nuito': require('../resources/Nunito-VariableFont_wght.ttf'),
      });

    
const handleCreateAccount = async () =>{
    await createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        console.log('Account Created!')
        props.callbackUser(userCredential.user)
        setDoc(doc(db, "users", userCredential.user.uid), {sleeptime: "",
        waketime: "",
        streak: 0,
        requests:[],
        sleepover:""
    });
    })
    .catch(error=>{
        console.log(error);
    })
}

const handleSignIn = () =>{
    const{user}=signInWithEmailAndPassword(auth,email,password).then(async (userCredential)=>{
        console.log("Signed In!")
    
        
    
        const docSnap = await getDoc(doc(db, "users", userCredential.user.uid));
        // console.log(docSnap.data())
        console.log(userCredential.user.uid)
        setUserID(userCredential.user.uid);
        const wakeTime = docSnap.get("waketime")
        const sleepTime = docSnap.get("sleeptime")
        const streak = docSnap.get("streak")
        console.log(userid)
        props.callbackUser(userCredential.user,userid)
        props.callbackTimes(sleepTime,wakeTime)
        props.callbackStreak(streak)

    })
}
    return (
        
        <ImageBackground source={require("../resources/noise3.png")}style={styles.container}resizeMode={'repeat'}>           
            <Text  style={styles.welcomeText}>Welcome</Text>
            
            <View style={styles.inputContainers}> 
          
                {/* <Text style={styles.headerText}>Email</Text> */}
                <TextInput
                    onChangeText={text=>setEmail(text)}
                    style={styles.textInputContainer}
                    placeholder="Email"
                />
            </View>
            <View style={styles.inputContainers}>
                {/* <Text style={styles.headerText}>Password:</Text> */}

                <TextInput
                    onChangeText={text=>setPassword(text)}
                    style={[styles.textInputContainer]}
                    placeholder="Password"
                />
            </View>

           <View style={styles.buttonGroup}>
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
          
        </ImageBackground>
    );
  }

export default SignIn

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0B495C",
        margin: 40,
        width: 600,
        borderRadius: 30,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },  
    inputContainers:{
        gap: 2,
        marginLeft: -125,
    },
    buttonGroup:{
        marginTop:100,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: 20,
        borderRadius: 10,
        margin:10
    },
    buttonLargeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "50%",
        height: 35,
        backgroundColor: "#0B495C",
        borderColor:  "#0B495C",
        borderWidth: 1,
        borderColor: "#F4F6F1",
        borderRadius: 10,
        margin:10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    
    buttonText:{
        color: "#F4F6F1",
        fontFamily: "Nuito",
    },
    headerText:{
        fontSize: 20,
        fontFamily: "Slabo",
        color:"#F4F6F1",
    },
     textInputContainer:{
        justifyContent: 'center',
        flexDirection:"row",
        margin: 5,
        alignItems: 'center',
        color: "#F4F6F1",
        fontFamily: "Nuito",
        borderColor:  "#0B495C",
        borderWidth: 1,
        borderBottomColor: "#F4F6F1",
        height: 30,
        width:"180%",
        borderRadius:10, shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 3,

     },
     welcomeText:{
        color: "#F4F6F1",
        fontFamily: "Abril",
        fontSize: 50,
        margin:50,
        marginTop:-100
     }
  
  });