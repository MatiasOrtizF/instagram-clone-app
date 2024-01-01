import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { comment } from '../service/CommentService';
import { usePost } from '../hooks/postContext';
import Hr from './Hr';

export default function Modal ({postId, userName, currentPosition}: {postId: number, userName: string, currentPosition: number}) {
    const {getAllComments, postComment, comments, userData} = usePost();
    
    const [input, setInput] = useState<string>("");

    useEffect(()=> {
        getAllComments(postId);
    }, [])

    useEffect(()=> {
        console.log(currentPosition);
    }, [currentPosition])

    const sendComment = () => {
        if(input.trim()) {
            const commentData = {        
                post: {
                    id: postId
                },
                content: input,
            }
            postComment(commentData, postId);
            setInput("");
        }
    }

    return(
        <View style={{flex: currentPosition === 1 ? 1 : 0.7}}>
            <Text style={{alignSelf: "center", fontWeight: "800", fontSize: 18, paddingVertical: 10}}>Comments</Text>
            <Hr/>
            <ScrollView showsVerticalScrollIndicator={false} >

            {comments.map((comment, index) => 
                <View key={index} style={{paddingHorizontal:15}}>
                    <View style={{flexDirection:"row" , alignItems:"center" , width:"100%" , marginVertical:10}}>
                        <View style={{width:"90%" , flexDirection:"row"}}>
                            <View style={{width:"20%"}}>
                                <Image
                                    source={{uri:comment.user.imageProfile}}
                                    style={{width:50 , height:50 , borderRadius:100}}
                                />
                            </View>
                            <View style={{width:"79%"}}>
                                <View style={{flexDirection:"row" , alignItems:"center" , width:"90%"}}>
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontWeight:"700"}}>{comment.user.userName}</Text>
                                    {comment.user.verified ?
                                        <Image style={{width:15 , height:15 , marginLeft:5}} source={require('../../assets/icons/verificado-icon.png')} ></Image>
                                        :
                                        null
                                    }
                                </View>
                                <Text numberOfLines={13} ellipsizeMode='tail' style={{color:"black" , marginBottom:5, fontWeight: "500"}}>{comment.content}</Text>
                                <TouchableOpacity onPress={()=>console.log("reply comment")}>
                                    <Text style={{color:"gray" , fontWeight: "500"}}>Reply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{width:"10%" , alignSelf:"center"}}>
                                <TouchableOpacity onPress={()=> console.log("like comment")}>
                                    {comment.liked ?
                                        <Image style={{width:20 , height:20 , alignSelf:"center"}} source={require('../../assets/icons/like-actived-icon.png')}></Image>
                                    :
                                        <Image style={{width:20 , height:20 , alignSelf:"center"}} source={require('../../assets/icons/like-icon.png')}></Image>
                                    }
                                </TouchableOpacity>
                            <Text style={{alignSelf:"center"}}>{comment.likes}</Text>
                        </View>
                    </View>
                </View>
            )}
            </ScrollView>
            <View style={{width: "100%", flexDirection: "row" , alignItems: "center" , justifyContent:"space-between" , marginVertical:7 , paddingHorizontal:15}}>
                <Image
                    source={{uri: userData.imageProfile}}
                    style={{width:40 , height:40 , borderRadius:100 , alignSelf:"flex-end"}}
                />
                <TextInput 
                    style={{ flex: 1, paddingLeft: 10 }}
                    placeholder={"Add a coment for " + userName + "..."}
                    // defaultValue={hDataPost[postNumber].userName} --> hacer esto cuando replico
                    multiline
                    onChangeText={setInput}
                />
                <TouchableOpacity style={{width:"10%"}} onPress={()=> sendComment()}>
                    <Text style={{color:"#6192D7" , fontSize:17 , fontWeight: "500"}}>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}