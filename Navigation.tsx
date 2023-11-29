import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
import Home from "./src/screens/Home";
import Search from "./src/screens/Search";
import Profile from "./src/screens/Profile";
import { NavigationContainer } from '@react-navigation/native';
import styles from './src/styles/Styles';

const Tab = createBottomTabNavigator();


export default function Navigation() {
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
}