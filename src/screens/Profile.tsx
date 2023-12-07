import { Text , View , SafeAreaView , Platform , ScrollView , Image , TouchableOpacity } from 'react-native';
import { usePost } from '../hooks/postContext';
import { useEffect } from 'react';
import Constants from 'expo-constants'
export default function Profile() {
  const {userData} = usePost();

  useEffect(()=> {
    console.log(userData);
  }, [])


  return (
    <SafeAreaView>
      <View style={{marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0 }}>
      <ScrollView>
                <View>
                    
                <View style={{padding: 10}}>
                    <View style={{flexDirection:"row" , justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{fontWeight:"bold" , fontSize:20}}>{userData.userName}</Text>
                            <Image style={{width:14 , height:14 , marginLeft:5 , alignSelf:"center"}} source={require('../../assets/icons/verificado-icon.png')} ></Image>
                            {/* <TouchableOpacity style={{alignSelf:"center"}}> 
                                <Image style={{width:20 , height:20 , marginLeft:5}} source={require('../../assets/icons/arrow-down-icon.png')} ></Image>
                            </TouchableOpacity>                     */}
                        </View>
                        <View style={{flexDirection:"row"}}>
                            {/* <Image style={{width:20, height:20 , alignSelf:"center" , marginRight:20}} source={require('../../assets/icons/add-profile-icon.png')}></Image> */}
                            <Image source={require('../../assets/icons/menu-burger-icon.png')}></Image>
                        </View>
                    </View>
                </View>


                <View style={{paddingHorizontal: 10}}>

                    <View>
                        <View style={{flexDirection:"row" , alignItems:"center" , justifyContent:"space-between"}}>
                            <View>
                                <Image style={{width: 85,height: 85 , borderRadius: 100}} source={{uri:userData.imageProfile}}></Image>
                                <Text style={{fontWeight: "600"}}>{userData.name}</Text>
                            </View>
                            <View>
                                <Text style={{alignSelf:"center" , fontWeight:"bold" , fontSize:17}}>{userData.numberPost}</Text>
                                <Text>Posts</Text>
                            </View>
                            <TouchableOpacity onPress={()=> console.log('Followers')}>
                                <Text style={{alignSelf:"center" , fontWeight:"bold" , fontSize:17}}>{userData.numberFollowers}</Text>
                                <Text>Followers</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> console.log('Following')}>
                                <Text style={{alignSelf:"center" , fontWeight:"bold" , fontSize:17}}>{userData.numberFollowing}</Text>
                                <Text>Following</Text>
                            </TouchableOpacity>
                        </View>
                        <Text>{userData.description}</Text>
                        <View style={{flexDirection:"row"}}>
                            <Image style={{width:17 , height: 17 , marginRight:5}} source={require('../../assets/icons/link-icon.png')}></Image>
                            <TouchableOpacity onPress={()=> console.log(userData.link)}>
                                <Text style={{color:"blue"}}>themessistore.com</Text>   
                            </TouchableOpacity> 
                        </View>
                        {/* <Text style={{color:"blue"}}>Paris, France</Text> */}
                    </View>
                    <View style={{flexDirection:"row" , justifyContent:"space-between" , width:"100%" , marginVertical:10}}>
                        <TouchableOpacity style={{backgroundColor:"#DADADA" , width:"44%" , padding:5 , borderRadius:7}}onPress={()=> console.log('EditProfile')}>
                            <Text style={{alignSelf:"center" , fontWeight:"bold"}}>Edit profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:"#DADADA" , width:"44%" , padding:5 , borderRadius:7}}>
                            <Text style={{alignSelf:"center" , fontWeight:"bold"}}>Share profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:"#DADADA" , width:"9%" , padding:5 , borderRadius:7}}>
                            <Image style={{width:20 , height:20 , alignSelf:"center"}} source={require('../../assets/icons/add-icon.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                    {/* <View style={{flexDirection:"row" , width:"100%" , marginTop:20}}>
                        <View style={{width:"50%" , alignItems:"center"}}>
                            <Image style={{width:30 , height:30}} source={require('../../assets/icons/publicaciones-icon.png')}></Image>
                        </View>
                        <View style={{width:"50%" , alignItems:"center"}}>
                            <Image source={require('../../assets/icons/etiquetado-icon.png')}></Image>
                        </View>
                    </View>
                    <View style={{width:"100%", justifyContent:"space-between" , flexDirection:"row" , marginTop:5}}>
                        <View style={{ backgroundColor: 'gray', height: 1 , width:"50%" , alignSelf:"flex-start" }} />
                        <View style={{ backgroundColor: 'gray', height: 0.5 , width:"50%"}} />
                    </View> */}
                </View>
                {/* <View>
                        <Tab.Navigator style={{height:(102*ceilLengthPost)+50}}>
                                <Tab.Screen
                                name="PostProfile"
                                component={PostProfile}
                                options={{
                                    tabBarShowLabel: false,
                                    tabBarIcon: ({focused}) => (
                                        <Image style={{width:30 , height:30}} source={require('../../assets/icons/publicaciones-icon.png')}></Image>
                                    )
                                }}>
                                </Tab.Screen>
                                
    
                                <Tab.Screen
                                name="Etiqueta"
                                component={Etiqueta}
                                options={{
                                    tabBarShowLabel: false,
                                    tabBarIcon: ({focused}) => (
                                        <Image source={require('../../assets/icons/etiquetado-icon.png')}></Image>
                                    )
                                }}
                                />
                        </Tab.Navigator>
                </View> */}
            </ScrollView>
      </View>
    </SafeAreaView>
  );
}