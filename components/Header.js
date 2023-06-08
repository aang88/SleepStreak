import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { useFonts, Nunito } from '@expo-google-fonts/inter';



function Header() {
    let [fontsLoaded] = useFonts({
        'Abril': require('../resources/AbrilFatface-Regular.ttf'),
      });
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>SleepStreak</Text>
            <FontAwesomeIcon style={styles.headerText} icon={faMoon} />
        </View>
    );
  }

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#0B495C",
        borderColor:"#F4F6F1",
        width:"100%",
        height:"8%",
        alignItems: 'center',
        justifyContent: 'center',
        color: "white",
        flexDirection: 'row',
        gap: 5,
    },
    headerText:{
        fontFamily: 'Abril',
        fontSize: 40,
        color: "white"
    }
 
  });