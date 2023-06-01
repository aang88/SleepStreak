import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions } from 'react-native';
import CounterPage from './components/CounterPage';
import BedtimeSet from './components/BedtimeSet';
import { useState,useEffect } from 'react';


export default function App() {
  const[bedTime,SetBedtime]=useState("")
  const[wakeTime,SetWaketime]=useState("")

  function setTimes(bedtime,waketime){
    SetBedtime(bedtime);
    SetWaketime(waketime);
    console.log(bedTime+", "+wakeTime);
  }

  return (
    <View style={styles.container}>
      {/* {bedTime === "" ? <BedtimeSet callback={setTimes}/>:<CounterPage bedtime={bedTime} waketime={wakeTime}/>} */}
      <CounterPage bedtime={bedTime} waketime={wakeTime}/>
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
