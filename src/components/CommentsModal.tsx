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
import CommentList from './CommentList';
import Hr from './Hr';

export default function CommentsModal({postId, userName}: {postId: number, userName: string}) {
    const {getAllComments, postComment, comments, userData} = usePost();

    useEffect(()=> {
        getAllComments(postId);
    }, [])

    const [input, setInput] = useState<string>("");

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

    const data = useMemo(
        () =>
            Array(100)
                .fill(0)
                .map((_, index) => `index-${index}`),
        []
    );

    // render
    const renderItem = useCallback(
        ({ item }: any) => (
        <View>
            <Text>{item}</Text>
        </View>
        ),
        []
    );

    return (
        <View style={{flex: 1}}>
                <View>
                    <Text style={{alignSelf: "center", fontWeight: "800", fontSize: 18, paddingVertical: 10}}>Comments</Text>
                    <Hr/>
                </View>
        <BottomSheetFlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=> (
                <CommentList {...item}/>
            )}
        />
        <Hr/>
        <View style={{backgroundColor: "white", width: "100%", flexDirection: "row" , alignItems: "center" , justifyContent:"space-between" , marginVertical:7 , padding:15}}>
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
};