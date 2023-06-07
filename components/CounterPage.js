import { AppState,StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Count from './Count';
import TimeDisplay from './TimeDisplay'
import { useState,useEffect,useRef } from 'react';
import moment from 'moment'




function CounterPage(props) {
    console.log(props.streak)
    const [sleepcount, setCount] = useState(props.streak)
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const today = new Date()
    const [currentTime,setCurrentTime]=useState((moment(today).format('HH:mm')))
    const [sleepState,setSleepState]=useState("")
    const [addPoint,setAddPoint] = useState(false);
    


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
      if(props.bedtime<props.waketime){
        if(currentTime>props.bedtime&&currentTime<props.waketime){
          if(appStateVisible=="active"){
            ResetStreak()
            setAddPoint(false)
          }
          console.log("ZZZZZZZZZ");
        }
        else if(currentTime==props.waketime){
          if(addPoint){
            setCount(sleepcount+1)
          }
          setAddPoint(false)
          console.log("AYAYAYAYAYA")
        }
        else if(currentTime==props.bedtime){
          setAddPoint(true)
          console.log("GN STREAKS")
        }
        else{
          console.log("AWAKE")
        }
      }
      else if(props.bedtime>props.waketime){
        if(currentTime<props.bedtime||currentTime>props.waketime){
          console.log("AWAKE");
        }
        else if(currentTime==props.waketime){
          if(addPoint){
            AddStreak();
          }
          setAddPoint(false)
          console.log("AYAYAYAYAYA")
        }
        else if(currentTime==props.bedtime){
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
            <View style={styles.displayContainer}>
                <TimeDisplay bedtime={props.bedtime} waketime={props.waketime}/>
                <Count style={styles.countButton}count={sleepcount}/>
            </View>
      <View style={styles.buttonsContainer}>

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
    },
    displayContainer:{
        flexDirection:'row',
        marginBottom: 30,
        gap: 50,
        marginLeft:70,
    },
    buttonsContainer:{
        width: 1000,
        flexDirection: 'row',
        marginRight: -800,
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
      }
  });




   