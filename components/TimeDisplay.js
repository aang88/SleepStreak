import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import moment from 'moment'


function TimeDisplay(props) {
    const today = new Date()
    const [currentTime,setCurrentTime]=useState((moment(today).format('LT')))

    useEffect=(()=>{
        setInterval(function(){
            setCurrentTime((moment(today).format('LT')))
         },1000);
    });

 
    return (
      <View style={styles.timeDiplayContainer}>
        <View style={styles.timesContainer}>
            <Text style={styles.headerTimeText}>Wake Up Time:</Text>
            <Text style={styles.sleepyTimeText}>{props.waketime}</Text>
        </View>
        <Text style={styles.currentTimeText}>{currentTime}</Text>
        <View style={styles.timesContainer}> 
            <Text style={styles.headerTimeText}>Bed Time:</Text>
            <Text style={styles.sleepyTimeText}>{props.bedtime}</Text>
        </View>
      </View>
    );
  }

export default TimeDisplay

const styles = StyleSheet.create({
    timeDiplayContainer:{
        marginLeft: 45,
        flex:1,
        flexDirection: "row",
        borderRadius: 20,
        backgroundColor: "#0B495C",
        gap: 30,
    },
    sleepyTimeText: {
      fontSize: 25,
      color:"#F4F6F1",
  
    },
    headerTimeText: {
        fontSize: 10,
        color:"#F4F6F1",
       
      },

    timesContainer:{
        marginTop:70,
        marginRight: 10,
        marginLeft:10,
    },
    currentTimeText: {
        fontSize: 100,
        color:"#F4F6F1",
      },
  });
