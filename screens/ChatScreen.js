import React,{useLayoutEffect,useState} from 'react';
import { View, Text,StyleSheet,SafeAreaView,StatusBar,KeyboardAvoidingView, Platform,ScrollView,TextInput,Keyboard,TouchableWithoutFeedback} from 'react-native';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import {AntDesign,Ionicons,FontAwesome} from "@expo/vector-icons";
import {auth, db} from '../firebase';
import * as firebase from 'firebase';

const ChatScreen = ({route,navigation}) => {

    const { id, chatName } = route.params;


    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
 

    useLayoutEffect(() => {
       
        navigation.setOptions({

            title:'Chat',
            headerTitleAlign:"left",
            headerBackTitleVisible:false,
          
           headerTitle:()=>(
            <View style={{
                flexDirection:"row",
                alignItems:"center"
            }}>

                <Avatar rounded source={{uri:"https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}} />
                <Text style={{

                    color:'white',
                    marginLeft:10,
                    fontWeight:'700'
                }}>{chatName}</Text>
            </View>

           ),
           headerLeft: () => (

            <View>

                <TouchableOpacity style={{marginLeft:10,}} onPress={()=>{navigation.goBack()}}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            </View>
       ),

       headerRight: () => (

        <View  style={{
            flexDirection:"row",
            justifyContent:"space-between",
            width:80,
            marginRight:20
        }}>

            <TouchableOpacity>
               <FontAwesome name="video-camera" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={{marginLeft:10,}}>
               <Ionicons name="call" size={24} color="white" />
            </TouchableOpacity>


        </View>
   ),


        })

    }, [navigation])


    const sendMessage=()=>{

        Keyboard.dismiss();
        db.collection('chats').doc(id).collection('messages').add({

            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput('')

    }

    useLayoutEffect(() => {
       
        const unsuscribe = db.collection('chats').doc(id).collection('messages')
        .orderBy('timestamp','desc').onSnapshot((snapshot)=>{

            setMessages(snapshot.docs.map(doc=>({

                idx:doc.id,
                data:doc.data()
            })))
        })

        return unsuscribe

    }, [route])

    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}> 
           
           <StatusBar style="light" />
           
           <KeyboardAvoidingView
           
                behavior={Platform.OS==="ios"?"padding":"height"}
                style={styles.container}
                keyboardVerticalOffset={90}
           >

           <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

            <>
                    <ScrollView>

                    {messages.map(({idx,data})=>(

                        data.email===auth.currentUser.email ? (

                              <View key={idx} style={styles.receiver}>

                                <Avatar 
                                rounded
                                size={30}
                                source={{
                                    uri:data.photoURL
                                }}

                                />
                                <Text style={styles.receiverText}>{data.message}</Text>

                              </View>


                        ):(

                            <View style={styles.sender}>
                                
                            <Avatar />
                            <Text style={styles.senderText}>{data.message}</Text>

                            </View>

                        )

                    ))}
                  
                    </ScrollView>

                    <View style={styles.footer}>

                        <TextInput
                        
                        placeholder="Signal Message"
                        style={styles.input}
                        value={input}
                        onChangeText={(text)=>setInput(text)}
                        onSubmitEditing={sendMessage}
                         />

                         <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>

                            <Ionicons name="send" size={24} color="#2B68E6" />

                         </TouchableOpacity>


                    </View>

                    </>
                    </TouchableWithoutFeedback>


           </KeyboardAvoidingView>
          
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({

    container:{
        flex:1
    },

    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15

    },

    input:{

        bottom:0,
       // borderColor:'transparent',
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:'#ECECEC',
        //borderWidth:1,
        padding:10,
        color:'grey',
        borderRadius:30
    },

    receiverText:{


    },

    senderText:{


    },

    receiver:{

        padding:15,
        backgroundColor:'#ECECEC',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'
    },

    sender:{

        padding:15,
        backgroundColor:'#2B68E6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:'80%',
        position:'relative'

    }
})


