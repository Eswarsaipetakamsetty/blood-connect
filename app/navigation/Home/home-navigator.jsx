import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreens } from "../../constants/screenConstants";
import Feed from "../../screens/Home/Feed";
import RequestBlood from "../../screens/Home/RequestBlood";

const Stack = createNativeStackNavigator()

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <Stack.Screen name={HomeScreens.Feed} component={Feed} />
            <Stack.Screen name={HomeScreens.RequestBlood} component={RequestBlood} />
        </Stack.Navigator>
    )
}

export default HomeNavigator