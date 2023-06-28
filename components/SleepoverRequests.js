
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faBed, faSun } from '@fortawesome/free-solid-svg-icons'
import { useFonts, Nunito } from '@expo-google-fonts/inter';
import { auth, db } from '../firebase-config'
import { collection, addDoc, setDoc, doc, getDoc,updateDoc,arrayUnion } from "firebase/firestore";
import { useState } from 'react';



function SleepoverRequests(props) {
  const [requests, setRequests] = useState([]);


  async function AcceptInvite(request){
    updateDoc(doc(db, "users",auth.currentUser.uid), {sleepover:request});
    updateDoc(doc(db, "sleepovers",request), {members:arrayUnion(auth.currentUser.uid)});
  }
  async function getRequests() {
    const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
    //Get user info
    setRequests(await docSnap.get("requests"));
  }
  getRequests()

  let [fontsLoaded] = useFonts({
    'Abril': require('../resources/AbrilFatface-Regular.ttf'),
  });
  return (
    <ImageBackground source={require("../resources/noise3.png")} style={styles.container} resizeMode={'repeat'}>
      <Text>Requests:</Text>
      {requests.map((requests) => {
        return (
          <View>
            <Text>{requests}</Text>
            <TouchableOpacity
                style={[styles.buttonLargeContainer]}
                onPress={() => { AcceptInvite(requests) }}>
                <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ImageBackground>
  );
}

export default SleepoverRequests

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0B495C",
    borderColor: "#F4F6F1",
    width: 250,
    height: 250,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: "white",
    flexDirection: 'row',
    gap: 5,
  },
  headerText: {
    fontFamily: 'Abril',
    fontSize: 20,
    color: "white"
  }, sleepyTimeText: {
    fontSize: 25,
    color: "#F4F6F1",
    fontFamily: "Abril",
    marginLeft: 15,
    marginTop: -5
  }, buttonLargeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "50%",
    height: 35,
    backgroundColor: "#0B495C",
    borderColor: "#0B495C",
    borderWidth: 1,
    borderColor: "#F4F6F1",
    borderRadius: 10,
    margin: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  buttonText: {
    color: "#F4F6F1",
    fontFamily: "Nuito",
  }, textInputContainer: {
    justifyContent: 'center',
    flexDirection: "row",
    margin: 5,
    alignItems: 'center',
    color: "#F4F6F1",
    fontFamily: "Nuito",
    borderColor: "#0B495C",
    borderWidth: 1,
    borderBottomColor: "#F4F6F1",
    height: 30,
    width: "180%",
    borderRadius: 10, shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,

  }

});