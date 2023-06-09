import { StyleSheet, Text, View,TouchableOpacity,ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed,faSun } from '@fortawesome/free-solid-svg-icons';

function SetTimeDisplay(props) {
    
    
    return (
        <ImageBackground source={require("../resources/uuundulate.png")}style={styles.timesContainer}resizeMode={'stretch'}> 
            {props.icon==='faBed'?<FontAwesomeIcon style={styles.icon} icon={faBed}/>:<FontAwesomeIcon style={styles.icon} icon={faSun}/>}
            <Text style={styles.headerTimeText}>{props.text}</Text>
            <Text style={styles.sleepyTimeText}>{props.time}</Text>
        </ImageBackground>
    );
  }

export default SetTimeDisplay

const styles = StyleSheet.create({
    sleepyTimeText: {
        fontSize: 25,
        color:"#F4F6F1",
        fontFamily: "Abril",
        marginLeft:15,
        marginTop:-5
      },
      headerTimeText: {
          fontSize: 15,
          color:"#F4F6F1",
          fontFamily: "Nuito",
          marginLeft:15,
        },
        icon:{
            fontSize: 25,
            color:"#F4F6F1",
        },
  
      timesContainer:{
          height:100,
          width:100,
          borderRadius: 20,
          backgroundColor: "#0B495C",
          alignContent:'center',
          justifyContent:'center',
          shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 3,

      },
 
  });