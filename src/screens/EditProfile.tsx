import { Text, View , Image , ScrollView , TextInput , TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'
// import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { usePost } from '../hooks/postContext';

export default function EditProfile() {

    const { userData } = usePost();

    const [image, setImage] = useState(userData?.imageProfile);
    const [nameInput , setNameInput] = useState(userData?.name)
    const [userNameInput , setUserNameInput] = useState(userData?.userName)
    const [bioInput , setBioput] = useState(userData?.description)
    const [linkInput , setLinkInput] = useState(userData?.link)

    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });
    
    //     console.log(result);
    
    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //     }
    // };


    return (
        <ScrollView>
            <View style={{marginTop: Constants.statusBarHeight}}>
                    <View style={{alignItems:"center" , margin:5}}>
                        <Image style={{width:75,height:75 , borderRadius:100 , marginBottom:5}} source={{uri:image}}></Image>
                        <TouchableOpacity onPress={()=> console.log("pickImage")}>
                            <Text style={{fontSize:15 , color:"blue"}}>Edit picture or avatar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{padding:10}}>
                        <Text style={{fontSize:15 , fontWeight: "500"}}>Name</Text>
                        <TextInput 
                            placeholder='Add Name'
                            defaultValue={nameInput}
                            onChangeText={setNameInput}
                        />
                        <View style={{ backgroundColor: 'black', height: 1 , marginBottom:7 }} />

                        <Text style={{fontSize:15 , fontWeight: "500"}}>UserName</Text>
                        <TextInput 
                            placeholder='Add User Name'
                            defaultValue={userNameInput}
                            onChangeText={setUserNameInput}
                        />
                        <View style={{ backgroundColor: 'black', height: 1 , marginBottom:7 }} />

                        <Text style={{fontSize:15 , fontWeight: "500"}}>Bio</Text>
                        <TextInput 
                            placeholder='Add Bio'
                            defaultValue={bioInput}
                            onChangeText={setBioput}
                        />
                        <View style={{ backgroundColor: 'black', height: 1 , marginBottom:7 }} />

                        <Text style={{fontSize:15 , fontWeight: "500"}}>Link</Text>
                        <TextInput 
                            placeholder='Add Link'
                            defaultValue={linkInput}
                            onChangeText={setLinkInput}
                        />
                        <View style={{ backgroundColor: 'black', height: 1 , marginBottom:7 }} />
                        <TouchableOpacity onPress={()=> console.log("editDataProfile: " + image, userNameInput, nameInput, bioInput, linkInput)} style={{backgroundColor:"blue" , alignSelf:"flex-end" , paddingVertical:7 , paddingHorizontal:15 , borderRadius:7 , marginTop:10}}>
                            <Text style={{color:"#fff" , fontSize:15}}>Save</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </ScrollView>
    );
}
