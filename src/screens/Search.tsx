import { View , Image , ScrollView , TextInput , FlatList , TouchableHighlight } from 'react-native';
import Constants from 'expo-constants'
import { usePost } from '../hooks/postContext';
import { useNavigation } from '@react-navigation/native';
// import data from '../../data/search-data.json'

export default function Search() {
    const { posts } = usePost();

    const navigation:any = useNavigation(); 

    return (
      //agregar un header a flatlist
            <View style={{marginTop: Constants.statusBarHeight , flex:1}}>
                <View style={{padding:10}}>
                    <TextInput
                        onPressIn={()=> navigation.navigate('History')}
                        style={{backgroundColor:"#DADADA" , paddingVertical:5 , paddingHorizontal:10 , borderRadius:10}}
                        placeholder='Buscar'
                    />
                </View>
                <ScrollView>
                    <FlatList
                        data={posts}
                        renderItem={({item: post}) => (
                            <TouchableHighlight style={{width:"33%" , margin:1}} onPress={()=> navigation.navigate('SearchDetail' , {post})}>
                                <Image style={{height:100}} source={{uri:post.image}}></Image>
                            </TouchableHighlight>
                        )}
                        numColumns={3}
                        scrollEnabled={false}
                    />
                </ScrollView>
            </View>
    );
}