import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions } from 'react-native';
import CounterPage from './components/CounterPage';
import BedtimeSet from './components/BedtimeSet';
import { useState,useEffect } from 'react';
import { collection, addDoc,setDoc,doc,getDoc,updateDoc  } from "firebase/firestore"; 
import SignIn from './components/SignIn';
import { db } from './firebase-config';

export default function App() {

  const[bedTime,SetBedtime]=useState("")
  const[wakeTime,SetWaketime]=useState("")
  const[streak,setStreak]=useState(0)
  const[user, SetUser] = useState(null)

  async function setTimes(bedtime,waketime){
     SetBedtime(bedtime);
     SetWaketime(waketime);
     updateDoc(doc(db, "users", user.uid), {sleeptime: bedtime,
      waketime: waketime});
  }

  async function setStreaks(newstreak){
    setStreak(newstreak)
    updateDoc(doc(db, "users", user.uid), {streak: newstreak});
 }



  function saveUser(){
    setDoc(doc(db, "users", user.uid), {sleeptime: bedTime,
    waketime: wakeTime,streakcount:streak});
  }


  
  function setStreakHandler(streak){
    setStreak(streak)
    console.log(bedTime+", "+wakeTime);
  }


  function setUsers(user)
{
  SetUser(user)
}  

  return (
    <View style={styles.container}>
      {user? bedTime === ""? <BedtimeSet callback={setTimes}/>:<CounterPage streak={streak} callbackStreak={setStreaks}bedtime={bedTime} waketime={wakeTime}/>:<SignIn callbackUser={setUsers} callbackTimes={setTimes} callbackStreak={setStreaks}/>}
    </View>
  );
}
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142232',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
