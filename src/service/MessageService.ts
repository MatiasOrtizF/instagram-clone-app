import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { ChatMessage } from "../types";

class ChatService {
    private stompClient: any
    private messageCallbacks: ((message: ChatMessage) => void)[] = [];

    constructor() {
        this.stompClient = null;
    }

    initConnectionSocket(): Promise<void> {
        const url = "//localhost:3000/chat-socket";
        const socket = new SockJS(url);
        this.stompClient = Stomp.over(socket);
    
        return new Promise((resolve, reject) => {
          this.stompClient.connect({}, () => {
            console.log('Stomp client initialized:', this.stompClient);
            resolve();
          }, (error: any) => {
            console.error('Error during connection:', error);
            reject(error);
          });
        });
      }
      async joinRoom(roomId: string) {
        try {
          await this.initConnectionSocket();
          this.stompClient.subscribe(`/topic/${roomId}`, (messages: any) => {
            try {
              const messageContent = JSON.parse(messages.body);
              console.log(messageContent);
                 // Llamar a los callbacks registrados cuando llega un nuevo mensaje
            this.messageCallbacks.forEach((callback) => {
                callback(messageContent);
                console.log("mira esto:" + messageContent)
              });
            } catch (error) {
              console.error('Error parsing message body:', error);
            }
          });
        } catch (error) {
          console.error('Failed to initialize Stomp client:', error);
        }
      }
    
      subscribeToMessages(callback: (message: ChatMessage) => void) {
        // Registra el callback para ser llamado cuando llegue un nuevo mensaje
        this.messageCallbacks.push(callback);
      }

    sendMessages(roomId: string, chatMessage: ChatMessage) {
        this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
    }
} 

export default new ChatService();