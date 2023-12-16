import { Text, View , Image , ScrollView , TextInput , TouchableOpacity, ImageBackground , StyleSheet , Dimensions , FlatList } from 'react-native';
import Constants from 'expo-constants'
import styles from '../styles/Styles';
import homeData from '../data/home-data.json'
import { useEffect, useState , useRef } from 'react';
import { usePost } from '../hooks/postContext';
import MessageService from '../service/MessageService';
import { ChatMessage } from '../types';

export default function Messages({navigation}: any) {
    const [messages, setMessages] = useState([]);

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
                user: 'enzojfernandez',
                message: "hola, mensaje de prueba",
            }
        MessageService.sendMessages("ABC", chatMessage)
    }
    
      //   // Enviar el mensaje al servidor usando WebSocket
      //   if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      //     socketRef.current.send(JSON.stringify(message));
      //     console.log("se mando")
      //   }
      // };

    return (
        <View>
            <Text>Mensajes</Text>
            {messages?.map((message, index)=> (
                <Text key={index}>{message.user}</Text>
                <Text key={index}>{message.message}</Text>
            ))}
            {/*<FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                <View>
                    <Text>{item.userName}: {item.content}</Text>
                </View>
                )}
            /> */}
            <TouchableOpacity onPress={()=> sendMessage()} style={{backgroundColor: "black", alignSelf: "flex-end", padding: 10}}>
                <Text style={{color: "white"}}>Send</Text>
            </TouchableOpacity>
        </View>
    );
}