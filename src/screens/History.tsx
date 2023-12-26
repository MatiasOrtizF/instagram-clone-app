import { View , Image , ScrollView , TextInput , FlatList , TouchableHighlight, Text , TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'
import { usePost } from '../hooks/postContext';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import HistoryUserList from '../components/HistoryUserList';
// import data from '../../data/search-data.json'

export default function History() {
    const { getAllHistory , historyUserSearch } = usePost();

    const navigation:any = useNavigation(); 

    useEffect(()=> {
        getAllHistory();
    }, [])

    return (
            <View style={{padding:10, flex:1}}>
                <TextInput
                    onPressIn={()=> navigation.navigate('SearchUser')}
                    style={{backgroundColor:"#DADADA" , paddingVertical:5 , paddingHorizontal:10 , borderRadius:10}}
                    placeholder='Buscar'
                />
                <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 5}}>
                    <Text style={{fontWeight: "800", fontSize: 17}}>Recent</Text>
                    <TouchableOpacity>
                        <Text style={{color: "blue"}}>See all</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={historyUserSearch}
                    renderItem={( {item}: {item: any})=> (
                        <HistoryUserList {...item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item=> item.id.toString()}
                />
            </View>
    );
}