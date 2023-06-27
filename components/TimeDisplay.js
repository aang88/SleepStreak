
import { StyleSheet, Text, View,TouchableOpacity, Easing ,ImageBackground } from 'react-native';
import moment from 'moment'
import React, { useEffect, useState } from 'react';
import { useFonts, Nunito } from '@expo-google-fonts/inter';





function TimeDisplay(props) {
    const today = new Date()
    const [currentTime,setCurrentTime]=useState((moment(today).format('hh:mm:ss')))
    let [fontsLoaded] = useFonts({
      'Nuito': require('../resources/Nunito-VariableFont_wght.ttf'),
      'Abril': require('../resources/AbrilFatface-Regular.ttf'),
    });


    useEffect(() => { const interval = setInterval(() => { setCurrentTime(moment(new Date()).format('HH:mm:ss')); }, 1000); return () => { clearInterval(interval); }; }, []);
    return (
       <ImageBackground source={require("../resources/noise3.png")}style={styles.timeDiplayContainer}resizeMode={'repeat'}> 
       
        <Text style={styles.currentTimeText}>{currentTime}</Text>
     
      
      </ImageBackground>
    );
  }

export default TimeDisplay

const styles = StyleSheet.create({
    timeDiplayContainer:{
        marginLeft: -45,
        flex:1,
        width:575,
        flexDirection: "row",
        borderRadius: 20,
        backgroundColor: "#0B495C",
        gap: 30,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 6},
        shadowOpacity: 0.5,
        shadowRadius: 3,

        
    },
    currentTimeText: {
        fontSize: 100,
        color:"#F4F6F1",
        fontFamily: "Abril",
        margin:50,
        marginLeft:100,
        marginRight:100,

      },
  });