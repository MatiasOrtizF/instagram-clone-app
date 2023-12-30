import { Text , View , TextInput , TouchableOpacity } from 'react-native';
import { usePost } from '../hooks/postContext';
import { useEffect, useState } from 'react';

export default function SignUp({navigation}: any) {
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const createUser = () => {
        if(password === confirmPassword) {
            alert("Password Mismatch");
        } else {
            const userData: any = ({name, lastName, userName, email, password})
            console.log("create user")
        }
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 20}}>
            <View style={{width: "100%"}}>
                <Text style={{fontSize:20, alignSelf: "center"}}>INSTAGRAM</Text>
                <View style={{rowGap: 12, marginVertical: 20}}>
                    <TextInput
                        style={{backgroundColor: "#dfdfdf", color: "black", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10}}
                        placeholder='Name'
                        onChangeText={setName}
                        onSubmitEditing={createUser}
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={{backgroundColor: "#dfdfdf", color: "black", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10}}
                        placeholder='Last Name'
                        onChangeText={setLastName}
                        onSubmitEditing={createUser}
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={{backgroundColor: "#dfdfdf", color: "black", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10}}
                        placeholder='Username'
                        onChangeText={setUserName}
                        onSubmitEditing={createUser}
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={{backgroundColor: "#dfdfdf", color: "black", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10}}
                        placeholder='Email'
                        onChangeText={setEmail}
                        onSubmitEditing={createUser}
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={{backgroundColor: "#dfdfdf", color: "black", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10}}
                        placeholder='Password'
                        onChangeText={setPassword}
                        onSubmitEditing={createUser}
                        autoCapitalize='none'
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={{backgroundColor: "#dfdfdf", color: "black", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10}}
                        placeholder='Confirm Password'
                        onChangeText={setConfirmPassword}
                        onSubmitEditing={createUser}
                        autoCapitalize='none'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={()=> createUser()} style={{backgroundColor: "blue", padding: 10, borderRadius: 10}}> 
                        <Text style={{alignSelf: "center", color: "white"}}>Create user</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{alignSelf: "center"}}>Already have an account ? <Text style={{color: "blue"}} onPress={()=> navigation.navigate('Login')}>Sign In.</Text></Text>
            </View>
        </View>
    );
}