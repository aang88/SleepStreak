import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Count from './Count';
import TimeDisplay from './TimeDisplay'
import { useState,useEffect } from 'react';
import moment from 'moment'



function CounterPage(props) {
    const [sleepcount, setCount] = useState(0)




    function AddCount(){
      setCount(sleepcount+1)
    }
    function ResetStreak(){
      setCount(0)
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
          onPress={() => {setCount(sleepcount+1)}}>
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




   