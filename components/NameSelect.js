import { StyleSheet, Text, View,TouchableOpacity,TextInput} from 'react-native';
import { useState,useEffect } from 'react';
import moment from 'moment'
import { useFonts, Nunito } from '@expo-google-fonts/inter';
import {auth,db} from '../firebase-config'
import { collection, addDoc,setDoc,doc,getDoc,updateDoc  } from "firebase/firestore"; 


function NameSelect(props) {
    let [fontsLoaded] = useFonts({
        'Nuito': require('../resources/Nunito-VariableFont_wght.ttf'),
        'Abril': require('../resources/AbrilFatface-Regular.ttf'),
      });

    const[username,SetName]=useState("")
    async function saveName(){

        updateDoc(doc(db, "users", auth.currentUser.uid), {name:username});
        props.callback(username);   
    }

    return (
      <View style={styles.container}>
        <View>
            <Text style={styles.headerText}>What's your name?</Text>
        </View>
        <View style={styles.textInputContainer}>
            <View>
                    <TextInput
                    style={styles.input}
                    onChangeText={text=>SetName(text)}
                    defaultValue={username}
                    placeholder="Name"
                 />
            </View>
        </View>
        <TouchableOpacity
          style={[styles.buttonLargeContainer]}
          onPress={() => {saveName()}}>
          <Text style={styles.buttonText}>Submit</Text>
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
        fontFamily: "Nuito"
    },
    headerText:{
        fontSize: 30,
        color:"#F4F6F1",
        fontFamily: "Abril"
    },
    headerText2:{
        fontSize: 20,
        color:"#F4F6F1",
        fontFamily: "Nuito"
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

  export default NameSelect