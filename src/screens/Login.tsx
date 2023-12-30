import { Text , View , TextInput , TouchableOpacity , KeyboardAvoidingView } from 'react-native';
import { usePost } from '../hooks/postContext';
import { useState } from 'react';
import { UserLoginData } from '../types';
import { login } from '../service/LoginService';

export default function Login({navigation}: any) {
    const { setConfig , setIsSinged , setUserData , getAllMyPosts} = usePost();

    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const validationLogin = () => {
        const userLoginData: UserLoginData = {userName, password}
        login.validationCredentials(userLoginData).then(response=> {
            setConfig({
                headers: {
                    'Authorization': response.data.token
                }
            })
            setIsSinged(true);
            setUserData(response.data.user);
        }).catch(error=> {
            if (error.response.status === 401) {
                alert(error.response.data);
            } else if(error.response.status === 400) {
                alert(error.response.data);
            } 
            console.error("Error:", error);
        })
    }

    return (
        <>
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 20}}>
            <View style={{width: "100%"}}>
                <Text style={{fontSize:20, alignSelf: "center"}}>INSTAGRAM</Text>
                <View style={{rowGap: 12, marginVertical: 20}}>
                    <TextInput
                        style={{backgroundColor: "#dfdfdf", color: "black", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10}}
                        placeholder='Username'
                        onChangeText={setUserName}
                        onSubmitEditing={validationLogin}
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={{backgroundColor: "#dfdfdf", color: "black", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10}}
                        placeholder='Password'
                        onChangeText={setPassword}
                        onSubmitEditing={validationLogin}
                        autoCapitalize='none'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={()=> validationLogin()} style={{backgroundColor: "blue", padding: 10, borderRadius: 10}}> 
                        <Text style={{alignSelf: "center", color: "white"}}>Log in</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{alignSelf: "center"}}>Don`t have an account ? <Text style={{color: "blue"}} onPress={()=> console.log("hola")}>Sign Up.</Text></Text>
            </View>
        </View>
        </>
    );
}