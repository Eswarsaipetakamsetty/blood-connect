import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HistoryScreens } from "../../constants/screenConstants";
import Donations from "../../screens/History/Donations";
import Requests from "../../screens/History/Requests";

const Tab = createMaterialTopTabNavigator()

const HistoryNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name={HistoryScreens.Donations} component={Donations}/>
            <Tab.Screen name={HistoryScreens.Requests} component={Requests}/>
        </Tab.Navigator>
    )
}

export default HistoryNavigator