import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { BottomTabScreens, Root } from "../constants/screenConstants"
import HistoryNavigator from "./History/history-navigator"
import ProfileStack from "./Profile/profile-navigation"
import HomeNavigator from "./Home/home-navigator"
import Icon from "react-native-vector-icons/Feather"
import HistoryIcon from "react-native-vector-icons/Octicons"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignUp from "../screens/Auth/SignUp"
import Login from "../screens/Auth/Login"
import RootScreen from "../screens/Root"
import { useAuth } from "../context/AuthProvider"
import { useEffect } from "react"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()
const RootNavigator = () => {
    const {isLoggedIn} = useAuth()
    useEffect(()=>{}, [isLoggedIn])
    if(!isLoggedIn) {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name={Root.Root} component={RootScreen} />
                    <Stack.Screen name={Root.SignUp} component={SignUp} />
                    <Stack.Screen name={Root.Login} component={Login} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown:false,
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "#876363",
                }}
            >
                <Tab.Screen 
                    options={{
                        tabBarIcon: (props)=>(
                            <Icon name="home" {...props} size={20}/>
                        )
                    }}
                    name={BottomTabScreens.Home} 
                    component={HomeNavigator}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: (props)=>(
                            <Icon name="user" {...props} size={20} />
                        )
                    }}
                    name={BottomTabScreens.Profile} 
                    component={ProfileStack} />
                <Tab.Screen 
                    options={{
                        tabBarIcon: (props)=>(
                            <HistoryIcon name="history" {...props} size={20}/>
                        )
                    }}
                    name={BottomTabScreens.History} 
                    component={HistoryNavigator} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator