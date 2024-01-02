import { View , Image , ScrollView , TextInput , FlatList , TouchableHighlight, Text , TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'
import { usePost } from '../hooks/postContext';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import HistoryUserList from '../components/HistoryUserList';
import { user } from '../service/UserService';
import { UserDataSearch } from '../types/index';
// import data from '../../data/search-data.json'

export default function History() {
    const { getAllHistorySearch, historyUserSearch, config } = usePost();

    const navigation:any = useNavigation(); 

    const [usersSearch, setUsersSearch] = useState<UserDataSearch[]>([]);
    const [input, setInput] = useState<string>("");
    const [searching, setSearching] = useState<boolean>(false);

    useEffect(()=> {
        getAllHistorySearch();
    }, [])

    const searchUser = (word: any) => {
        if(word.trim()) {
            setSearching(true);
            user.searchUserByUserName(config, word).then(response=> {
                setUsersSearch(response.data);
            }).catch(error=> {
                console.log(error);
            })
        } else {
            setSearching(false);
        }
    }

    useEffect(()=> {
        console.log("usuarios actualizados:", usersSearch.length);
    }, [usersSearch])

    return (
            <View style={{padding:10, flex:1}}>
                <TextInput
                    // onPressIn={()=> navigation.navigate('SearchUser')}
                    style={{backgroundColor:"#DADADA" , paddingVertical:5 , paddingHorizontal:10 , borderRadius:10}}
                    placeholder='Buscar'
                    onChangeText={(text)=> {
                        searchUser(text);
                    }}
                    // onSubmitEditing={()=> searchUser(input)}
                    autoCapitalize='none'
                />
                {!searching ? 
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 5}}>
                        <Text style={{fontWeight: "800", fontSize: 17}}>Recent</Text>
                        <TouchableOpacity onPress={()=> console.log("delete all")}>
                            <Text style={{color: "blue"}}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
                <FlatList
                    data={searching ? usersSearch : historyUserSearch}
                    renderItem={( {item}: {item: UserDataSearch})=> (
                        <HistoryUserList searchedUser={item} searching={searching} />
                    )}
                    contentContainerStyle={{marginTop: 5, flex:1}}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item=> item.id.toString()}
                />
            </View>
    );
}