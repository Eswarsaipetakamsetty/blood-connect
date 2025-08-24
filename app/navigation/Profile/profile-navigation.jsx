import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabScreens, ProfileScreens } from "../../constants/screenConstants";
import EditProfile from "../../screens/Profile/EditProfile";
import HistoryNavigator from "../History/history-navigator";
import Settings from "../../screens/Profile/Settings";
import Profile from "../../screens/Profile/Profile";

const Stack = createNativeStackNavigator()

const ProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={ProfileScreens.Profile}
            screenOptions={{
                headerShown:false
            }}
        >
            <Stack.Screen name={ProfileScreens.Profile} component={Profile} />
            <Stack.Screen name={ProfileScreens.EditProfile} component={EditProfile} />
            <Stack.Screen name={BottomTabScreens.History} component={HistoryNavigator} />
            <Stack.Screen name={ProfileScreens.Settings} component={Settings} />
        </Stack.Navigator>
    )
}

export default ProfileStack