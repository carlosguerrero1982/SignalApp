import React,{useLayoutEffect,useState} from 'react';
import { View, Text,StyleSheet } from 'react-native';
import {Button,Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {db} from '../firebase';

const AddChatScreen = ({navigation}) => {

    const createChat= async ()=>{

        await db.collection('chats').add({

            chatName:input
        }).then(()=>{

            navigation.goBack()
        }).catch(error=>alert(error.message))

    }


    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        
        navigation.setOptions({

            title:'Add a new chat',
            headerBackTitle:"chats",
           headerStyle:{
               backgroundColor:"#fff"
           },
           headerTitleStyle:{color:"black"},
           headerTintColor:"black",

        })
    }, [navigation])


    return (
        <View style={styles.container}>
        
            <Input placeholder="Enter a chat name"
            value={input} onChangeText={(text)=>{setInput(text)}}
            leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="black"/>
            }
            onSubmitEditing={createChat}
             />

             <Button onPress={createChat} title="Create a chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({

    container:{

        backgroundColor:"white",
        padding:30,
        height:"100%",

    },

})
