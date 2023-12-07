import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import styles from './src/styles/Styles';
import { usePost } from './src/hooks/postContext';

//screens
import Home from "./src/screens/Home";
import Search from "./src/screens/Search";
import Profile from "./src/screens/Profile";
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';

const Tab = createBottomTabNavigator();
const Stack = createBottomTabNavigator();

function TabNavigation() {
    const { isSinged } = usePost();
    return (
        <NavigationContainer>
            {isSinged ?
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
                        // tabBarIcon: ({focused}) => (
                        // // <Image
                        // //     source={{uri:userData[0].imageProfile}}
                        // //     style={{width:30 , height:30 , borderRadius:100 , borderWidth:2 , borderColor: focused ? "black" : null}}
                        // // >
                        // )
                    }}/>
                </Tab.Navigator>
                :
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="SignUp" component={SignUp}/>
                </Stack.Navigator>
            }
        </NavigationContainer>
    )
}

export default function Navigation() {
    const { isSinged , userData } = usePost();
    return (
        <NavigationContainer>
            {isSinged ?
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
                <Login/>
            }
            <Stack.Screen name="SignUp" component={SignUp}/>
            {/* <Stack.Screen name="Configuration" component={Configuration}/> */}
        </NavigationContainer>
    );
}