import { Text, View , Image , ScrollView , TextInput , TouchableOpacity, ImageBackground , StyleSheet , Dimensions , TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants'
import styles from '../styles/Styles';
import homeData from '../data/home-data.json'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { usePost } from '../hooks/postContext';
import BottomSheet, { BottomSheetFlatList , BottomSheetModal, BottomSheetModalProvider  } from "@gorhom/bottom-sheet";
import Modal from '../components/Modal';
import React from 'react';
import { Post } from '../types';
import CommentsModal from './CommentsModal';
import { useNavigation } from '@react-navigation/native';

export default React.memo(function PostList({id, user, image, liked, saved, likes, comments, content, createdAt }: Post) {
    const { getAllPosts, setUserNameProfile } = usePost();
    const navigation: any = useNavigation(); 

    useEffect(()=> {
        getAllPosts();
    }, [])

    const bottomSheetModalRef = useRef<BottomSheetModal >(null);
    const snapPoints = ["70%"];

    function handlePresentModal() {
        bottomSheetModalRef.current?.present();
    }

    return (
            <View>
                <TouchableWithoutFeedback onPress={()=> {setUserNameProfile(user.userName), navigation.navigate("UserProfile", {user: user})}}>
                    <View style={{flexDirection:"row" , alignItems:"center" , margin:10, alignSelf: "flex-start"}}>
                        <Image style={{ width: 35, height: 35, borderRadius: 100 }} source={user.imageProfile ? { uri: user.imageProfile } : require('../../assets/icons/image-profile-default-icon.png')} />
                        <Text style={{marginLeft:10 , fontWeight: "700"}}>{user.userName}</Text>
                        <Image style={{width:15 , height:15 , marginLeft:5}} source={require('../../assets/icons/verificado-icon.png')} ></Image>
                    </View>
                    {/* agregar el lugar */}
                </TouchableWithoutFeedback>
                <View>
                    <Image style={{width:"100%" , aspectRatio:1}}  resizeMode="cover" source={image ? {uri:image} : require('../../assets/icons/image-profile-default-icon.png')}></Image>
                </View>
                <View style={{flexDirection:"row", flex: 1, padding:10}}>
                    <View style={{flexDirection:"row" , width:"33%"}}>
                        <TouchableOpacity onPress={()=>console.log(id)}>
                            {liked ?
                                <Image style={{width:27 , height:27}} source={require('../../assets/icons/like-actived-icon.png')}></Image>
                                :
                                <Image style={{width:27 , height:27}} source={require('../../assets/icons/like-icon.png')}></Image>
                            }
                        </TouchableOpacity>
                        <TouchableWithoutFeedback onPress={handlePresentModal}>
                            <Image style={{width:25,height:25 , marginLeft:20}} source={require('../../assets/icons/comentary-icon.png')}></Image>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{alignItems:"center" , width:"33%" , flexDirection:"row" , justifyContent:"center"}}>
                        {/* {post.images.map((img) => (
                            console.log(img)
                        ))} */}
                        {/* <Image style={{width:9 , height:9}} source={require("../../assets/icons/point-actived-icon.png")}></Image> */}
                    </View>
                    <View style={{width:"33%", alignItems:"flex-end"}}>
                        <TouchableOpacity onPress={()=>console.log(id) }>
                            {saved?
                                <Image style={styles.icons} source={require('../../assets/icons/save-actived-icon.png')}></Image>
                                :
                                <Image style={styles.icons} source={require('../../assets/icons/save-icon.png')}></Image>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginHorizontal:10}}>
                    <Text>{liked==true ? "true" : "false"}</Text>
                    <Text style={{fontWeight: "700"}}>{likes} Me gusta</Text>{/*modificar para que se vea asi: (1,123,758)*/}
                    <Text numberOfLines={2} ellipsizeMode='tail'>
                        <Text style={{fontWeight: "700"}}>{user.userName} </Text>
                        <Text>{content}</Text>
                    </Text>
                    {/* Si el largo de coomments es > 1 hace esto:*/}
                    {/*cambiar a modal*/ }
                    <TouchableOpacity onPress={handlePresentModal}>
                            <Text style={{color:"gray"}}>Ver los {comments} comentarios </Text>
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
                    <Text style={{color:"gray"}}>{createdAt.toString()}</Text>
                </View>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                >
                    <CommentsModal postId={id} userName={user.userName}/>
                </BottomSheetModal>
            </View>
    )
});