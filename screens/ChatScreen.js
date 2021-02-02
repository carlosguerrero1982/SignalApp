import React,{useLayoutEffect,useState} from 'react';
import { View, Text,StyleSheet,SafeAreaView,StatusBar,KeyboardAvoidingView, Platform,ScrollView,TextInput} from 'react-native';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import {AntDesign,Ionicons,FontAwesome} from "@expo/vector-icons";

const ChatScreen = ({route,navigation}) => {

    const { id, chatName } = route.params;


    const [input, setInput] = useState('');



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


    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}> 
           
           <StatusBar style="light" />
           
           <KeyboardAvoidingView
           
                behavior={Platform.OS==="ios"?"padding":"height"}
                style={styles.container}
                keyboardVerticalOffset={90}
           >

                <>
                    <ScrollView>


                    </ScrollView>

                    <View style={styles.footer}>

                        <TextInput
                        
                        placeholder="Signal Message"
                        style={styles.input}
                        value={input}
                        onChangeText={(text)=>setInput(text)}
                         />

                    </View>

                </>

           </KeyboardAvoidingView>
          
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({

    container:{

    },

    footer:{


    },

    input:{

    }
})


