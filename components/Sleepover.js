
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faBed, faSun } from '@fortawesome/free-solid-svg-icons'
import { useFonts, Nunito } from '@expo-google-fonts/inter';
import { auth, db } from '../firebase-config'
import { collection, addDoc, setDoc, doc, getDoc,updateDoc,arrayUnion } from "firebase/firestore";
import { useEffect, useState } from 'react';



function Sleepover(props) {
  const [leaderID, setLeaderID] = useState("");
  const [members, setMembers] = useState([]);
  const [times, setTimes] = useState([]);
  const [inviteID, setInviteID] = useState("");
  const [name,SetName] = useState("");
  const sleepoverID = props.sleepoverid;

  async function SendInvite(){
    const docSnap = await getDoc(doc(db, "users", inviteID));
    const inviteUserSleepover = await docSnap.get("sleepover");
    if(inviteUserSleepover!==""){
      alert("Invited user already in a sleepover!");
      return;
    }
    updateDoc(doc(db, "users", inviteID), {requests:arrayUnion(props.sleepoverid)});
  }


  useEffect(()=>{
    async function getSleepover() {
      const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
      
      //Get user info
      const currentSleepOverID = await docSnap.get("sleepover")
      const sleepoverDocSnap = await getDoc(doc(db, "sleepovers", currentSleepOverID));
      setLeaderID(await sleepoverDocSnap.get("leader"));
      SetName(await getDoc(doc(db, "users", leaderID)));
      setMembers(await sleepoverDocSnap.get("members"))
      setTimes(await sleepoverDocSnap.get("times"));
  
     
  
    }
    getSleepover();
  },[members,name]);

  let [fontsLoaded] = useFonts({
    'Abril': require('../resources/AbrilFatface-Regular.ttf'),
  });
  return (
    <ImageBackground source={require("../resources/noise3.png")} style={styles.container} resizeMode={'repeat'}>
      <Text style={styles.headerText}> {name}'s Sleepover</Text>
      <View>
        <FontAwesomeIcon style={styles.icon} icon={faBed} />
        <Text style={styles.sleepyTimeText}>{times[0]}</Text>
        <FontAwesomeIcon style={styles.icon} icon={faSun} />
        <Text style={styles.sleepyTimeText}>{times[1]}</Text>
      </View>

      <FontAwesomeIcon style={styles.headerText} icon={faMoon} />
      <View style={styles.inputContainers}>
        {/* <Text style={styles.headerText}>Password:</Text> */}

        <TextInput
          onChangeText={text => setInviteID(text)}
          style={[styles.textInputContainer]}
          placeholder="UserID"
        />
        <TouchableOpacity
          style={[styles.buttonLargeContainer]}
          onPress={()=>{SendInvite()}}>
  
          <Text style={styles.buttonText}>Invite User</Text>
        </TouchableOpacity>
      </View>
      {
         console.log(members)
      }
      {Array.isArray(members)&&members.map((member) => {
        return (
          <View>
            <Text>{member}</Text>
          </View>
        );
      })} 

    </ImageBackground>
  );
}

export default Sleepover

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
    flexDirection: 'column',
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
    width: "80%",
    borderRadius: 10, shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,

  }

});