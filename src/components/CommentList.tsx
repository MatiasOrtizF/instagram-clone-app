import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { comment } from '../service/CommentService';
import { usePost } from '../hooks/postContext';
import Hr from './Hr';
import { Comment } from '../types';

export default function CommentList ({id, user, content, createdAt, likes, liked}: Comment) {
    return(
        <View style={{paddingHorizontal:15, flex: 0.7}}>
            <View style={{flexDirection:"row" , alignItems:"center" , width:"100%" , marginVertical:10}}>
                <View style={{width:"90%" , flexDirection:"row"}}>
                    <View style={{width:"20%"}}>
                        <Image
                            source={{uri: user.imageProfile}}
                            style={{width:50 , height:50 , borderRadius:100}}
                        />
                    </View>
                    <View style={{width:"79%"}}>
                        <View style={{flexDirection:"row" , alignItems:"center" , width:"90%"}}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{fontWeight:"700"}}>{user.userName}</Text>
                            {user.verified ?
                                <Image style={{width:15 , height:15 , marginLeft:5}} source={require('../../assets/icons/verificado-icon.png')} ></Image>
                                :
                                null
                            }
                        </View>
                        <Text numberOfLines={13} ellipsizeMode='tail' style={{color:"black" , marginBottom:5, fontWeight: "500"}}>{content}</Text>
                        <TouchableOpacity onPress={()=>console.log("reply comment")}>
                            <Text style={{color:"gray" , fontWeight: "500"}}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width:"10%" , alignSelf:"center"}}>
                        <TouchableOpacity onPress={()=> console.log("like comment")}>
                            {liked ?
                                <Image style={{width:20 , height:20 , alignSelf:"center"}} source={require('../../assets/icons/like-actived-icon.png')}></Image>
                            :
                                <Image style={{width:20 , height:20 , alignSelf:"center"}} source={require('../../assets/icons/like-icon.png')}></Image>
                            }
                        </TouchableOpacity>
                    <Text style={{alignSelf:"center"}}>{likes}</Text>
                </View>
            </View>
        </View>
    )
}