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
import { useNavigation } from '@react-navigation/native';

export default function ConfigModal() {
    const { logOut } = usePost();

    const navigation: any = useNavigation();

    const menu = [
        {title: "Settings", image: require('../../assets/icons/settings-icon.png')},
        {title: "Saved", image: require('../../assets/icons/save-icon.png')},
        {title: "Liked", image: require('../../assets/icons/like-icon.png')},
        {title: "LogOut", image: require('../../assets/icons/logout-icon.png')}
    ]

    return (
        <View style={{flex: 1}}>
        <View style={{backgroundColor: "white", width: "100%", padding:15}}>
            {menu.map((elem, index)=> (
                <TouchableOpacity onPress={()=> {elem.title === "LogOut" ? logOut() :  navigation.navigate(elem.title)}} key={index}>
                    <View style={{flexDirection: "row", marginVertical: 4}}>
                        <Image 
                            style={{width: 20, height: 20, marginRight: 5}} 
                            source={elem.image}
                            />
                        <Text>{elem.title}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
        </View>
    )
};