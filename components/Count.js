import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';


function Count(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.streakText}>Streak:</Text>
            <Text style={styles.countText}>{props.count}</Text>
        </View>
    );
  }

export default Count

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#0B495C",
        borderColor:"#F4F6F1",
        borderRadius: 20,
        justifyContent: "center",
        alignContent: "center",
    },
    streakText:{
        justifyContent: "center",
        alignContent: "center",
        fontSize: 20,
        margin: 10,
        color:"#F4F6F1",
    },
    countText: {
      fontSize: 100,
      color:"#F4F6F1",
      marginTop:-15,
      marginLeft:15,
      marginRight:15,
    },
  });