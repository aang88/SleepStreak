import { StyleSheet, Text, View,TouchableOpacity,ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons';

function Count(props) {
    return (
      <ImageBackground source={require("../resources/noise3.png")}style={styles.container}resizeMode={'repeat'}> 
           <Text style={styles.streakText}>Current Streak:</Text>
          <View style={styles.streaks}>
            <FontAwesomeIcon style={styles.iconText} icon={faFire}/>
            <Text style={styles.countText}>{props.count}</Text>
          </View>
           
           
        </ImageBackground>
    );
  }

export default Count

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#0B495C",
        borderColor:"#F4F6F1",
        borderRadius: 20,
       
        flexDirection: "column",
        height:100,
        width:360,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 3,

    },
    streaks:{
      gap:20,
      flexDirection:'row'
    },
    streakText:{
        justifyContent: "center",
        alignContent: "center",
        fontSize: 15,
        marginLeft:10,
        marginTop:5,
        margin: 5,
        fontFamily:"Nuito",
        color:"#F4F6F1",
    },
    
    countText: {
      fontSize: 75,
      color:"#F4F6F1",
      marginTop:-25,
      fontFamily:"Abril",
      marginRight:15,
    },
    iconText: {
      fontSize: 50,
      color:"#F4F6F1",
      marginLeft:15,
     
    },
  });