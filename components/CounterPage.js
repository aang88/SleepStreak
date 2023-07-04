import { AppState,StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Count from './Count';
import TimeDisplay from './TimeDisplay'
import SetTimeDisplay from './SetTimeDisplay';
import { useState,useEffect,useRef } from 'react';
import moment from 'moment'
import { useFonts, Nunito } from '@expo-google-fonts/inter';
import { faBed } from '@fortawesome/free-solid-svg-icons'
import CreateSleepOver from './CreateSleepOver';
import Sleepover from './Sleepover';
import {auth,db} from '../firebase-config'
import { collection, addDoc,setDoc,doc,getDoc} from "firebase/firestore"; 
import SleepoverRequest from './SleepoverRequests';




 function CounterPage(props) {
    console.log(props.streak)
    const [sleepcount, setCount] = useState(props.streak)
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const today = new Date()
    const [currentTime,setCurrentTime]=useState((moment(today).format('HH:mm')))
    const [sleepState,setSleepState]=useState("")
    const [addPoint,setAddPoint] = useState(false);
    const [sleepover,setSleepOver]=useState("");
    const [bedTime, SetBedtime] = useState("");
    const [wakeTime,SetWaketime] = useState("");
    const [name, SetName]=useState("");

   
//   useEffect(() => {
//     SetBedtime(props.bedtime)
//     SetWaketime(props.waketime)

//  }, []);
  

    
    useEffect(async () => {
      const docSnap = await getDoc(doc(db, "users",auth.currentUser.uid ));
      //console.log(await docSnap.get("sleepover"));
      setSleepOver(await docSnap.get("sleepover"))
      SetBedtime(await docSnap.get("waketime"))
      setSleepOver(await docSnap.get("sleeptime"))
      SetWaketime(props.waketime)
      SetName(await docSnap.get("name"))

    }, []);

//Check AppState
   useEffect(() => {
     const subscription = AppState.addEventListener('change', nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log('AppState', appState.current);
      });

    return () => {
      subscription.remove();
    };
  }, []);


  //Date Updating, why it's here idk why lol 
  useEffect(() => { 
    const interval = setInterval(() => { 
      setCurrentTime(moment(new Date()).format('HH:mm')); 
      console.log(currentTime)
      BedTimeLogic()
     }, 1000); 
       return () => 
       { clearInterval(interval);}; 
    }, [currentTime]);

    function AddStreak(){
      setCount(sleepcount+1)
      props.callbackStreak(sleepcount+1)
    }
    function ResetStreak(){
      console.log(appStateVisible)
      setCount(0)
      props.callbackStreak(0)
    }

    function BedTimeLogic(){
      if(bedTime<wakeTime){
        if(currentTime>bedTime&&currentTime<wakeTime){
          if(appStateVisible=="active"){
            ResetStreak()
            setAddPoint(false)
          }
          console.log("ZZZZZZZZZ");
        }
        else if(currentTime==wakeTime){
          if(addPoint){
            setCount(sleepcount+1)
          }
          setAddPoint(false)
          console.log("AYAYAYAYAYA")
        }
        else if(currentTime==wakeTime){
          setAddPoint(true)
          console.log("GN STREAKS")
        }
        else{
          console.log("AWAKE")
        }
      }
      else if(bedTime>wakeTime){
        if(currentTime<bedTime||currentTime>wakeTime){
          console.log("AWAKE");
        }
        else if(currentTime==wakeTime){
          if(addPoint){
            AddStreak();
          }
          setAddPoint(false)
          console.log("AYAYAYAYAYA")
        }
        else if(currentTime==bedTime){
          setAddPoint(true)
          console.log("GN STREAKS")
        }
        else{
          console.log("ZZZZZZZZZ")
          if(appStateVisible=="active"){
            ResetStreak()
            setAddPoint(false)
          }
        }
      }

    }




    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Hello, {name}.</Text>
            <View style={styles.displayContainer}>
                <TimeDisplay bedtime={bedTime} waketime={wakeTime}/>
                <View style={styles.stats}>
                <SetTimeDisplay  icon='faBed' text="Bed Time:" time={bedTime}/>
                <SetTimeDisplay time={wakeTime} icon='faSun' text="Wake Time:"/>
                <Count style={styles.countButton}count={sleepcount}/>
               
                </View>
            </View>
      <View style={styles.buttonsContainer}>
      <CreateSleepOver userId={props.userId}/>
        <TouchableOpacity
          style={[styles.buttonLargeContainer]}
          onPress={() => {AddStreak()}}>
          <Text style={styles.buttonText}>Add Count</Text>
       </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonLargeContainer]}
          onPress={() => {ResetStreak()}}>
          <Text style={styles.buttonText}>Reset Count</Text>
        </TouchableOpacity>

        {sleepover===""? <SleepoverRequest/>:<Sleepover userId={props.userId} sleepoverid={sleepover}/>}
        

      </View>

        </View>
    
    );
  }

export default CounterPage

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Nuito',
    },
    stats:{
      flexDirection:"row",
      gap:10,
      marginLeft:-50
    },
    displayContainer:{
        flexDirection:'column',
        fontFamily: 'Nuito',
        marginBottom: 30,
        gap: 10,
        marginLeft:70,
    },
    buttonsContainer:{
        width: 1000,
        flexDirection: 'row',
        marginRight: -100,
        gap: 10,
      },
      buttonLargeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '10%',
        height: 50,
        backgroundColor: '#2C99B7',
        borderRadius: 10,
      },
      buttonText:{

        color: "#F4F6F1",
      },textHeader:{
        fontSize: 100,
        color:"#F4F6F1",
        fontFamily: "Abril",
        margin:50,
        marginLeft:100,
        marginRight:100,
      }
  });




   