import { StyleSheet, Text, View,TouchableOpacity,TextInput} from 'react-native';
import { useState,useEffect } from 'react';
import moment from 'moment'


function BedtimeSet(props) {


    const[bedTime,SetBedtime]=useState("")
    const[wakeTime,SetWaketime]=useState("")

    function timeCallBack(){
        var pattern = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
        var match1 = bedTime.match(pattern)
        var match2 = wakeTime.match(pattern)
        console.log(bedTime)
        console.log(match1)
        console.log(match2)
        if(match1&&match2){
            props.callback(bedTime,wakeTime)
        }else{
           alert("Must be in format 00:00 AM/PM")
        }
       
    }

    return (
      <View style={styles.container}>
        <View>
            <Text style={styles.headerText}>Set your bed time and wake up time</Text>
        </View>

        <View style={styles.textInputContainer}>
            <View>
                <Text style={styles.headerText2}>Bed time</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={text=>SetBedtime(text)}
                    defaultValue={bedTime}
                    placeholder="Bedtime 🌙"
                    
                 />
            </View>
            <View>
                <Text style={styles.headerText2}>Wake Time</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text=>SetWaketime(text)}
                    defaultValue={wakeTime}
                    placeholder="Waketime ☀️"
                  
                />
            </View>
        </View>

        <TouchableOpacity
          style={[styles.buttonLargeContainer]}
          onPress={() => {timeCallBack()}}>
          <Text style={styles.buttonText}>Set Time</Text>
       </TouchableOpacity>

      </View>
    );
  }



const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer:{
        width: 1000,
        flexDirection: 'row',
        marginRight: -800,
        gap: 10,
        marginTop: 10,
      },
    buttonLargeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#2C99B7',
        borderRadius: 10,
        margin:20
      },
    buttonText:{
        color: "#F4F6F1",
    },
    headerText:{
        fontSize: 30,
        color:"#F4F6F1",
    },
    headerText2:{
        fontSize: 20,
        color:"#F4F6F1",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: "#F4F6F1",
        borderRadius: 20,
        color: "#F4F6F1",
      },
     textInputContainer:{
        justifyContent: 'center',
        flexDirection:"row",
        margin: 10,
        alignItems: 'center',

     }
  });

  export default BedtimeSet