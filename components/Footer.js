import { StyleSheet, Text, View,TouchableOpacity,ImageBackground } from 'react-native';


function Footer() {
    return (
        <ImageBackground source={require("../resources/noise3.png")}style={styles.container} resizeMode={'repeat'}/> 
    );
  }

export default Footer

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#0B495C",
        borderColor:"#F4F6F1",
        width:"100%",

        height:50
       
    }
 
  });