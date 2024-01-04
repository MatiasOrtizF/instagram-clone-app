import { Text, View , Image , ScrollView , FlatList , TouchableOpacity, ImageBackground , StyleSheet , Dimensions , TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import Constants from 'expo-constants'
import styles from '../styles/Styles';
import homeData from '../data/home-data.json'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { usePost } from '../hooks/postContext';
import BottomSheet, { BottomSheetFlatList , BottomSheetModal, BottomSheetModalProvider  } from "@gorhom/bottom-sheet";
import Modal from '../components/Modal';
import React from 'react';
import { Post } from '../types';
import Loading from '../components/Loading';
import { useNavigation } from '@react-navigation/native';

export default function Liked() {
    const { getAllLikes, allLikes, loading } = usePost();

    const navigation: any = useNavigation();

    useEffect(()=> {
        getAllLikes();
    }, [])

    return (
        <View style={{flex: 1}}>
            <Text>Liked</Text>
            <FlatList
                data={allLikes}
                renderItem={({item: post})=> (
                    loading ?
                        <Loading/>
                    :
                    <TouchableHighlight style={{width:"32.93%", margin: "0.2%"}} onPress={()=> navigation.navigate('SearchDetail' , {post})}>
                        <Image style={{height:100}} source={{uri:post.post.image}}></Image>
                    </TouchableHighlight>
                )}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                keyExtractor={item=> item.id.toString()}
            />
        </View>
    )
};