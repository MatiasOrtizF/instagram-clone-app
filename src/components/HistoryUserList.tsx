import { Text, View , Image , ScrollView , TextInput , TouchableOpacity, ImageBackground , StyleSheet , Dimensions } from 'react-native';
import Constants from 'expo-constants'
import styles from '../styles/Styles';
import homeData from '../data/home-data.json'
import { useEffect, useRef, useState } from 'react';
import { usePost } from '../hooks/postContext';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Modal from '../components/Modal';
import React from 'react';
import { Post } from '../types';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default React.memo(function HistoryUserList({ searchedUser }: any) {
    const navigation: any = useNavigation(); 

    return (
            <View style={{flexDirection: "row", alignItems: "center", marginVertical: 5, justifyContent: "space-between"}}>
                <TouchableOpacity onPress={()=> navigation.navigate('UserProfile')} style={{flexDirection: "row", alignItems: "center"}}>
                    <Image style={{width: 50, height: 50, borderRadius: 50}} source={{uri: searchedUser.imageProfile}} />
                    <View style={{paddingHorizontal: 10}}>
                        <Text style={{fontWeight: "700"}}>{searchedUser.userName}</Text>
                        <Text style={{color: "gray"}}>{searchedUser.name + searchedUser.lastName}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> console.log(searchedUser.id)}>
                    <Image style={{width: 20, height: 20}} source={require('../../assets/icons/delete-icon.png')} />
                </TouchableOpacity>
            </View>
    )
});