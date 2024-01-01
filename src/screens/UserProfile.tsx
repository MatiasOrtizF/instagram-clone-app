import { Text , View , SafeAreaView , Platform , ScrollView , Image , TouchableOpacity , FlatList, ImageBackground , TouchableHighlight} from 'react-native';
import { usePost } from '../hooks/postContext';
import { useEffect } from 'react';
import Constants from 'expo-constants'
import { Post } from '../types';
import Loading from '../components/Loading';

export default function UserProfile({ route, navigation }: any) {
    const { userData , AllPostsByUserName , logOut, getAllPostsByUserName, loading } = usePost();
    const { user } = route.params;

    useEffect(()=> {
        getAllPostsByUserName(user.userName);
    }, [])


    return (
        <SafeAreaView style={{flex: 1}}>
            { loading ? 
                <Loading/>
            :
                <FlatList
                    data={AllPostsByUserName}
                    renderItem={({item: post})=> (
                        <TouchableHighlight style={{width:"32.93%", margin: "0.2%"}} onPress={()=> navigation.navigate('SearchDetail' , {post})}>
                            <Image style={{height:100}} source={{uri: post.image}}></Image>
                        </TouchableHighlight>
                    )}
                    ListHeaderComponent={  
                        <View style={{paddingHorizontal: 10, paddingTop: 10}}>
                            <View>
                                <View style={{flexDirection:"row" , alignItems:"center" , justifyContent:"space-between"}}>
                                    <View>
                                        <Image style={{width: 85,height: 85 , borderRadius: 100}} source={{uri:user.imageProfile}}></Image>
                                        <Text style={{fontWeight: "600"}}>{user.name + " " + user.lastName}</Text>
                                    </View>
                                    <View>
                                        <Text style={{alignSelf:"center" , fontWeight:"bold" , fontSize:17}}>{user.numberPost}</Text>
                                        <Text>Posts</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=> console.log('Followers')}>
                                        <Text style={{alignSelf:"center" , fontWeight:"bold" , fontSize:17}}>{user.numberFollowers}</Text>
                                        <Text>Followers</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=> console.log('Following')}>
                                        <Text style={{alignSelf:"center" , fontWeight:"bold" , fontSize:17}}>{user.numberFollowing}</Text>
                                        <Text>Following</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text>{user.description}</Text>
                                {user.link ? 
                                    <View style={{flexDirection:"row"}}>
                                        <Image style={{width:17 , height: 17 , marginRight:5}} source={require('../../assets/icons/link-icon.png')}></Image>
                                            <TouchableOpacity onPress={()=> console.log(user.link)}>
                                                <Text style={{color:"blue"}}>{user.link}</Text>   
                                            </TouchableOpacity> 
                                    </View>
                                :
                                    null
                                }
                                {/* <Text style={{color:"blue"}}>Paris, France</Text> */}
                            </View>
                            <View style={{flexDirection:"row" , justifyContent:"space-between" , width:"100%" , marginVertical:10}}>
                                <TouchableOpacity style={{backgroundColor:"#DADADA" , width:"44%" , padding:5 , borderRadius:7}} onPress={()=> console.log("seguir")}>
                                    <Text style={{alignSelf:"center" , fontWeight:"bold"}}>{user.userName === userData.userName ? "Edit profile" : "Follow"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> logOut()} style={{backgroundColor:"#DADADA" , width:"44%" , padding:5 , borderRadius:7}}>
                                    <Text style={{alignSelf:"center" , fontWeight:"bold"}}>{user.userName === userData.userName ? "Share profile": "Message" }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:"#DADADA" , width:"9%" , padding:5 , borderRadius:7}}>
                                    <Image style={{width:20 , height:20 , alignSelf:"center"}} source={require('../../assets/icons/add-icon.png')}></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    keyExtractor={item=> item.id.toString()}
                />
            }
        </SafeAreaView>
    );
}