import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions,ImageBackground} from 'react-native';
import CounterPage from './components/CounterPage';
import BedtimeSet from './components/BedtimeSet';
import { useState,useEffect } from 'react';
import { collection, addDoc,setDoc,doc,getDoc,updateDoc  } from "firebase/firestore"; 
import Svg, {Image,Rect,Defs,Mask} from 'react-native-svg';
import SignIn from './components/SignIn';
import { db } from './firebase-config';
import Header from './components/Header';
import Footer from './components/Footer';
import Particles from 'react-tsparticles';
import particlesConfig from './components/particles-config';


export default function App() {

  var options = {
    animate: true,
    patternWidth: 100,
    patternHeight: 100,
    grainOpacity: 0.05,
    grainDensity: 1,
    grainWidth: 1,
    grainHeight: 1
};

  const[bedTime,SetBedtime]=useState("")
  const[wakeTime,SetWaketime]=useState("")
  const[streak,setStreak]=useState(0)
  const[user, SetUser] = useState(null)
  const[userId, SetUserID] = useState("")


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


  function setUsers(user,useruid)
  {
    console.log("User"+ user.uid)
    SetUserID(user.uid)
    SetUser(user)
  }  

  return (

    <ImageBackground style={styles.container}resizeMode={'stretch'}> 
   
      <Header></Header>
     
      {user? bedTime === ""? <BedtimeSet callback={setTimes}/>:<CounterPage streak={streak} callbackStreak={setStreaks}bedtime={bedTime} waketime={wakeTime} userId={userId}/>:<SignIn callbackUser={setUsers} callbackTimes={setTimes} callbackStreak={setStreaks}/>}
      <Footer></Footer>
     
    </ImageBackground>
  );
}
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'hsla(212,42%,13%,1)',
    backgroundImage: "url(./resources/testimg.png),radial-gradient(at 75% 85%, hsla(83,21%,95%,1) 0px, transparent 50%), radial-gradient(at 12% 95%, hsla(194,78%,20%,1) 0px, transparent 50%),radial-gradient(at 80% 100%, hsla(192,61%,44%,1) 0px, transparent 50%),radial-gradient(at 0% 0%, hsla(178,59%,55%,1) 0px, transparent 50%)",
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {

    justifyContent: 'center',
  },
});
