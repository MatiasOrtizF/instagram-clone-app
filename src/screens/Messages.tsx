import { Text, View , Image , ScrollView , TextInput , TouchableOpacity, ImageBackground , StyleSheet , Dimensions , FlatList } from 'react-native';
import Constants from 'expo-constants'
import styles from '../styles/Styles';
import homeData from '../data/home-data.json'
import { useEffect, useState , useRef } from 'react';
import { usePost } from '../hooks/postContext';
import MessageService from '../service/MessageService';
import { ChatMessage } from '../types';

export default function Messages({navigation: {goBack}}: any) {
    const { userData } = usePost();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const socketRef = useRef(null);

//     useEffect(() => {
//         // URL del servidor WebSocket
//         const socketUrl = 'ws://192.168.0.4:8080/ws';
    
//         // Crear una nueva instancia de WebSocket
//         socketRef.current = new WebSocket(socketUrl);
    
//         // Evento al abrir la conexión
//         socketRef.current.onopen = () => {
//           console.log('Conectado a WebSocket');
//         };
    
//         // Evento al recibir un mensaje
//         socketRef.current.onmessage = (event: any) => {
//             try {
//                 const receivedMessage = JSON.parse(event.data);
//                 console.log('Mensaje recibido:', receivedMessage);
//                setMessages((prevMessages): any => {
//     const newMessages = [...prevMessages, receivedMessage];
//     console.log('Nuevo estado de los mensajes:', newMessages);
//     return newMessages;
// });
//                 console.log('Estado de los mensajes actualizado:', messages);
//             } catch (error) {
//                 console.error('Error al parsear el mensaje:', error);
//             }
//         };
    
//         // Evento al cerrar la conexión
//         socketRef.current.onclose = () => {
//           console.log('Conexión cerrada');
//         };

//         socketRef.current.onerror = (error) => {
//             console.error('Error de WebSocket:', error);
//         };
    
//         // Limpia la conexión al desmontar el componente
//         return () => {
//           if (socketRef.current) {
//             socketRef.current.close();
//           }
//         };

//       }, []);

        useEffect(()=> {
            MessageService.joinRoom("ABC");

            const unsubscribe = MessageService.subscribeToMessages((nuevoMensaje) => {
                setMessages((prevMessages):any => [...prevMessages, nuevoMensaje]);
            });
        }, [])

        const sendMessage = () => {
            const chatMessage: ChatMessage = {
                user: userData.userName,
                message: input,
            }
        MessageService.sendMessages("ABC", chatMessage)
        setInput("");
    }
    
      //   // Enviar el mensaje al servidor usando WebSocket
      //   if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      //     socketRef.current.send(JSON.stringify(message));
      //     console.log("se mando")
      //   }
      // };

    return (
        <View style={{marginTop: Constants.statusBarHeight , backgroundColor:"white" , flex:1}}>
            <View style={{paddingHorizontal:15 , paddingVertical:10 , backgroundColor:"#9D9D9D" , height:55}}>
                <View style={{flexDirection:"row" , alignItems:"center"}}>
                    <TouchableOpacity onPress={()=> goBack()}>
                        <Image source={require('../../assets/icons/back-icon.png')}/>
                    </TouchableOpacity>
                    <View style={{flexDirection:"row" , marginLeft:5}}>
                        {/* image de perfil */}
                        <Image style={{width:35 , height:35 , borderRadius:100 , marginRight:15}} source={{uri: ""}}></Image>
                        <View>
                            <Text style={{fontWeight:"700" , color:"white"}}>name</Text>
                            <Text>user name</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flex:1}}>
                <ScrollView contentOffset={{y:10000}}>
                    {messages.map((chat, index) => (
                        <View key={index} style={{paddingHorizontal:15 , paddingVertical:2 }}>
                            {chat.user == userData.userName?
                                <View style={{backgroundColor:"#6192D7" , alignSelf:"flex-end" , padding:7 , borderRadius:10}}>
                                    <Text style={{color:"white" , margin:5}}>{chat.message}</Text>
                                </View>
                                :
                                <View style={{backgroundColor:"#DBDBDB" , alignSelf:"flex-start" , padding:7 , borderRadius:10}}>
                                    <Text>{chat.message}</Text>
                                </View>
                            }
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={{width:"100%" , height:50}}>
                <View style={{backgroundColor:"#DBDBDB" , flexDirection:"row" , justifyContent:"space-between" , borderRadius:10 , padding:7 , marginHorizontal:15}}>
                    <TextInput
                        style={{width:"79%"}}
                        placeholder='Message...'
                        multiline
                        onChangeText={setInput}
                        value={input}
                    />
                    <View style={{width:"20%" , justifyContent:"flex-end"}}>
                        <TouchableOpacity style={{backgroundColor:"#6192D7" , paddingVertical:7 , borderRadius:7}} onPress={()=> sendMessage()}>
                            <Text style={{color:"white" , alignSelf:"center"}}>
                                Send
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        // <View>
        //     <Text>Mensajes</Text>
        //     {messages?.map((message, index)=> (
        //         <View key={index}>
        //             <Text>{message.user}</Text>
        //             <Text>{message.message}</Text>
        //         </View>
        //     ))}
        //     {/*<FlatList
        //         data={messages}
        //         keyExtractor={(item, index) => index.toString()}
        //         renderItem={({ item }) => (
        //         <View>
        //             <Text>{item.userName}: {item.content}</Text>
        //         </View>
        //         )}
        //     /> */}
        //     <TouchableOpacity onPress={()=> sendMessage()} style={{backgroundColor: "black", alignSelf: "flex-end", padding: 10}}>
        //         <Text style={{color: "white"}}>Send</Text>
        //     </TouchableOpacity>
        // </View>
    );
}