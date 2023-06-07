
import { StyleSheet, Text, View,TouchableOpacity, Easing } from 'react-native';
import moment from 'moment'
import React, { useEffect, useState } from 'react';



function TimeDisplay(props) {
    const today = new Date()
    const [currentTime,setCurrentTime]=useState((moment(today).format('hh:mm:ss')))

    useEffect(() => { const interval = setInterval(() => { setCurrentTime(moment(new Date()).format('HH:mm:ss')); }, 1000); return () => { clearInterval(interval); }; }, []);
    return (
      <View style={styles.timeDiplayContainer}>
        <View style={styles.timesContainer}> 
            <Text style={styles.headerTimeText}>Bed Time:</Text>
            <Text style={styles.sleepyTimeText}>{props.bedtime}</Text>
        </View>
        <Text style={styles.currentTimeText}>{currentTime}</Text>
        <View style={styles.timesContainer}>
            <Text style={styles.headerTimeText}>Wake Up Time:</Text>
            <Text style={styles.sleepyTimeText}>{props.waketime}</Text>
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
        fontSize: 15,
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