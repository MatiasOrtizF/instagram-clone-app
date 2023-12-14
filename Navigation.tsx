import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { usePost } from './src/hooks/postContext';
import styles from './src/styles/Styles';

//screens
import Home from "./src/screens/Home";
import Search from "./src/screens/Search";
import Profile from "./src/screens/Profile";
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import EditProfile from './src/screens/EditProfile';
import SearchDetail from './src/screens/SearchDetail';
import SearchUser from './src/screens/SearchUser';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function TabNavigation() {
    const { isSinged , userData } = usePost();
    return (
        isSinged ?
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} options={{
                    headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: ({focused}) => (
                        focused ? 
                        <Image
                            source={require('./assets/icons/home-icon-actived.png')}
                            style={styles.icons} 
                        />
                        :
                        <Image
                            source={require('./assets/icons/home-icon.png')}
                            style={styles.icons} 
                        />
                        )
                }}/>
                <Tab.Screen name="Search" component={Search} options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={require('./assets/icons/search-icon.png')}
                            style={{width: focused ? 28: 25 , height: focused ? 28 : 25 }} 
                        />
                    )
                }}/>
                <Tab.Screen name="Profile" component={Profile}options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={{uri:userData.imageProfile}}
                            style={{width:30 , height:30 , borderRadius:100 , borderWidth:2 , borderColor: focused ? "black" : undefined}}
                        />
                    )
                }}/>
            </Tab.Navigator>
        :
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUp}  options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="TabNavigation" component={TabNavigation} options={{headerShown: false}}/>
                <Stack.Screen name="EditProfile" component={EditProfile}/>
                <Stack.Screen name="SearchDetail" component={SearchDetail} options={{headerTitle: "Explore"}}/>
                <Stack.Screen name="SearchUser" component={SearchUser}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}