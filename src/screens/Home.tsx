import { Text, View , Image , ScrollView , TextInput , TouchableOpacity, ImageBackground , StyleSheet , Dimensions } from 'react-native';
import Constants from 'expo-constants'
import styles from '../styles/Styles';
import homeData from '../data/home-data.json'
import { useEffect, useState } from 'react';
import { usePost } from '../hooks/postContext';

export default function Home({navigation} : any) {
    const {getAllPosts, posts} = usePost();

    useEffect(()=> {
        getAllPosts();
    }, [])

    return (
        <View style={{marginTop: Constants.statusBarHeight , flex:1}}>
            <View style={{justifyContent:"space-between", flexDirection:"row" , padding:10}}>
                <Text style={{fontSize:20}}>INSTAGRAM</Text>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Notifications')}>
                        <Image style={styles.icons} source={require('../../assets/icons/notifications-icon.png')}></Image>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=> navigation.navigate('Messages')}>
                        {messagesCount > 0 ?
                            <View style={{position:"absolute" , zIndex:2 , top:-9 , right:-9 , backgroundColor:"red" , borderRadius:100 , width:18 , height:18 , justifyContent:"center" , alignItems:"center"}}>
                                <Text style={{color:"white" , fontWeight:600 , fontSize:12}}>{messagesCount}</Text>
                            </View>
                        :
                        null}
                        <Image style={{marginLeft:20 , width:22,height:22}} source={require('../../../assets/icons/messenger-icon.png')}></Image>
                    </TouchableOpacity> */}
                </View>
            </View>
            <ScrollView>

                

                <View style={{ backgroundColor: 'gray', height: 0.5 }} />

                {/* Post */}
                {posts.map((post, index) => (
                <View key={index}>
                    <View style={{flexDirection:"row" , alignItems:"center" , margin:10}}>
                        <Image style={{width:35 , height:35 , borderRadius:100}} source={{uri:post.user.imageProfile}}></Image>
                        <Text style={{marginLeft:10 , fontWeight: "700"}}>{post.user.userName}</Text>
                        <Image style={{width:15 , height:15 , marginLeft:5}} source={require('../../assets/icons/verificado-icon.png')} ></Image>
                        {/* agregar el lugar */}
                    </View>
                    {/* <View horizontal style={{marginBottom:10}}>
                        <View>
                            {post.labelled.length > 0 ?
                                <TouchableOpacity style={{position:"absolute" , zIndex:3 , bottom:15 , left:15}} onPress={()=> navigation.navigate('Labelled', {postId: post.id})}>
                                    <Image style={{width:22 , height: 22}} source={require('../../assets/icons/user-icon.png')}></Image>
                                </TouchableOpacity>
                                :
                                null
                            }
                            <Image style={{width:"100%" , aspectRatio:1}}  resizeMode="cover" source={{uri:post.image}}></Image>
                        </View>
                    </View> */}
                    <View>
                        <Image style={{width:"100%" , aspectRatio:1}}  resizeMode="cover" source={{uri:post.image}}></Image>
                    </View>
                    <View style={{flexDirection:"row", flex: 1, padding:10}}>
                        <View style={{flexDirection:"row" , width:"33%"}}>
                            <TouchableOpacity onPress={()=>console.log(post.id)}>
                                {/* {post.like ?
                                    <Image style={{width:27 , height:27}} source={require('../../assets/icons/like-actived-icon.png')}></Image>
                                    :
                                    <Image style={{width:27 , height:27}} source={require('../../assets/icons/like-icon.png')}></Image>
                                } */}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> console.log(post.id)}>
                                <Image style={{width:25,height:25 , marginLeft:20}} source={require('../../assets/icons/comentary-icon.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems:"center" , width:"33%" , flexDirection:"row" , justifyContent:"center"}}>
                            {/* {post.images.map((img) => (
                                console.log(img)
                            ))} */}
                            {/* <Image style={{width:9 , height:9}} source={require("../../assets/icons/point-actived-icon.png")}></Image> */}
                        </View>
                        <View style={{width:"33%", alignItems:"flex-end"}}>
                            <TouchableOpacity onPress={()=>console.log(post.id) }>
                                {/* {post.saved?
                                    <Image style={styles.icons} source={require('../../assets/icons/save-actived-icon.png')}></Image>
                                    :
                                    <Image style={styles.icons} source={require('../../assets/icons/save-icon.png')}></Image>
                                } */}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginHorizontal:10}}>
                        <Text style={{fontWeight: "700"}}>{post.likes} Me gusta</Text>{/*modificar para que se vea asi: (1,123,758)*/}
                        <Text numberOfLines={2} ellipsizeMode='tail'>
                            <Text style={{fontWeight: "700"}}>{post.user.userName} </Text>
                            <Text>{post.content}</Text>
                        </Text>
                        {/* Si el largo de coomments es > 1 hace esto:*/}
                        {/*cambiar a modal*/ }
                        <TouchableOpacity onPress={()=> navigation.navigate('Comments', {postId: post.id})}>
                            {/* {post.comments.length > 1 ? 
                                <Text style={{color:"gray"}}>Ver los {post.comments.length} comentarios </Text>
                                :
                                null
                            } */}
                        </TouchableOpacity>
                        {/* {post.comments.length > 1 ?
                            post.comments.slice(0,2).map((comment, index) => (
                                <Text key={index}>
                                    <Text style={{fontWeight:700}}>{comment.userName + " "}</Text>
                                    <Text>{comment.comment}</Text>
                                </Text>
                            )) 
                            :
                            null
                        } */}
                        {/* <Text style={{color:"gray"}}>Ver los {post.comments.length} comentarios </Text>
                            {post.comments.map((comment) => (
                                <Text>
                                    <Text style={{fontWeight:700}}>{comment.userName + " "}</Text>
                                    <Text>{comment.comment}</Text>
                                </Text>
                            ))} */}
                        {/* <Text style={{color:"gray"}}>{post.createdAt.toDateString()}</Text> */}
                    </View>
                </View>
                ))}
                {/* Fin Post */}


                {/* <Labelled/> */}

            </ScrollView>
        </View>
    );
}