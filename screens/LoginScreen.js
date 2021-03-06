import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet,KeyboardAvoidingView } from 'react-native';
import {Button,Input,Image} from 'react-native-elements';
import {StatusBar} from 'expo-status-bar';
import {auth} from '../firebase';


const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    useEffect(() => {
      
    const unsuscribe =auth.onAuthStateChanged((authUser)=>{

            if(authUser){
                navigation.replace("Home");
             console.log(authUser);
              //  console.log(authUser.photoURL);
            }
        })

        return unsuscribe;
    }, []);


  const  signin = () =>{

    auth.signInWithEmailAndPassword(email,password)
    .catch(error=>alert(error.message))
  
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar style="light" />

            <Image source={{

                uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",

            }}
            style={{width:200,height:200}}
            
             />

             <View style={styles.inputContainer}>

                <Input placeholder="Email" autoFocus type="email" value={email} 
                
                onChangeText={text => setEmail(text)}
                 />
                
                <Input placeholder="Password" type="password" secureTextEntry value={password}
                onChangeText={text => setPassword(text)} onSubmitEditing={signin}
                 />


             </View>

             <Button containerStyle={styles.button} title='Login' onPress={signin} />
             <Button onPress={()=>navigation.navigate("Register")} containerStyle={styles.button} type='outline'  title='Register' />

            <View style={{height:100}} />

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    
    inputContainer: {
        
        width:300,

        
    },
    
    button:{

        width:200,
        marginTop:10,


    },

    container:{
        flex:1, 
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'

    }
})
