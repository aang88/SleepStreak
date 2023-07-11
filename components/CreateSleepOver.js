import { BackgroundImage, StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config'
import { collection, addDoc, setDoc, doc, getDoc,updateDoc } from "firebase/firestore";
import { useFonts, Nunito } from '@expo-google-fonts/inter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'



//Sleepover creation
function CreateSleepOver(props) {
  const [userID, setUserID] = useState(props.userId)
  useEffect(() => {
            setUserID(props.userId)
  }, [props.userId]);

  const createSleepover = async () => {
    if (userID != "") {
      //Get User Id
      

      const docSnap = await getDoc(doc(db, "users", userID));
      //Get user info
      const currentSleepOverID = docSnap.get("sleepover")
      const wakeTime = docSnap.get("waketime")
      const sleepTime = docSnap.get("sleeptime")
      //Check for current sleepover
      if (currentSleepOverID !== "") {
        alert("Already In a Sleepover!")
        return;
      }
      //add a sleepover info to db.
      const docRef = await addDoc(collection(db, "sleepovers"), {
        leader: userID,
        members: [],
        times: [wakeTime, sleepTime],
      });
      //save sleepover id accossiaited with user.

      updateDoc(doc(db, "users", userID), { sleepover: await(docRef).id });

    } else {
      console.log("not found");
    }



  }
  return (
    <TouchableOpacity
      style={[styles.buttonLargeContainer]}
      onPress={() => { createSleepover() }}>
      <Text style={styles.buttonText}>Create A New Sleepover</Text>
    </TouchableOpacity>
  );
}

export default CreateSleepOver

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0B495C",
    borderColor: "#F4F6F1",
    borderRadius: 20,
    flexDirection: "column",
    height: 100,
    width: "20%",
    color: "white",

    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  buttonLargeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "32%",
    height: 35,
    backgroundColor: "#0B495C",
    borderColor: "#0B495C",
    borderWidth: 1,
    borderColor: "#F4F6F1",
    borderRadius: 10,
    color: "white",
    margin: 10,
    fontFamily: 'Abril',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText:{
    color: "white",
    fontFamily: 'Nuito'
  }

});