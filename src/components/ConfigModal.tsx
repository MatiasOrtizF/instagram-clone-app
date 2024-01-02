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

export default function ConfigModal() {
    const menu = [
        {title: "Settings"},
        {title: "Saved"},
        {title: "Liked"},
        {title: "LogOut"}
    ]
    return (
        <View style={{flex: 1}}>
        <View style={{backgroundColor: "white", width: "100%", padding:15}}>
            {menu.map((elem, index)=> (
                <Text key={index}>{elem.title}</Text>
            ))}
        </View>
        </View>
    )
};