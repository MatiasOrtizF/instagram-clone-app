import { Text, View , Image , ScrollView , TextInput , TouchableOpacity, ImageBackground , StyleSheet , Dimensions } from 'react-native';
import Constants from 'expo-constants'
import styles from '../styles/Styles';
import homeData from '../data/home-data.json'
import { useEffect, useRef, useState } from 'react';
import { usePost } from '../hooks/postContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Modal from '../components/Modal';
import { FlatList } from 'react-native-gesture-handler';
import PostList from '../components/PostList';
import { Post } from '../types';
import Hr from '../components/Hr';

export default function Home({navigation}: any) {
    const {getAllPosts, posts} = usePost();

    useEffect(()=> {
        getAllPosts();
    }, [])

    return (
        <BottomSheetModalProvider>
            <View style={{marginTop: Constants.statusBarHeight , flex:1}}>
                <View style={{justifyContent:"space-between", flexDirection:"row" , padding:10}}>
                    <Text style={{fontSize:20}}>INSTAGRAM</Text>
                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity onPress={()=> navigation.navigate('Notifications')}>
                            <Image style={styles.icons} source={require('../../assets/icons/notifications-icon.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> navigation.navigate('Messages')}>
                            {/* {messagesCount > 0 ? */}
                                {/* <View style={{position:"absolute" , zIndex:2 , top:-9 , right:-9 , backgroundColor:"red" , borderRadius:100 , width:18 , height:18 , justifyContent:"center" , alignItems:"center"}}>
                                    <Text style={{color:"white" , fontWeight: "600" , fontSize:12}}>{messagesCount}</Text>
                                </View> */}
                            {/*:
                            null*/}
                            <Image style={{marginLeft:20 , width:22,height:22}} source={require('../../assets/icons/messenger-icon.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>

                    <Hr/>
                    <FlatList
                        data={posts}
                        renderItem={( {item}: {item: Post})=> (
                            <PostList {...item} />
                        )}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item=> item.id.toString()}
                    />
            </View>
        </BottomSheetModalProvider>
    );
}