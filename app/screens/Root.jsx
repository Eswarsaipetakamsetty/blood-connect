import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Root } from '../constants/screenConstants'
import DropIcon from "react-native-vector-icons/Entypo"

const RootScreen = () => {
    const navigator = useNavigation()
    return (
        <View
            style={styles.Container}
        >
            <View
                style = {styles.IconWrapper}
            >
                <DropIcon name="drop" size={150} color={"maroon"}/>
                <Text
                    style = {styles.Title}
                >
                    Blood Connect
                </Text>
                <Text
                    style = {styles.Tagline}
                >
                    Connect donors with those in need
                </Text>
            </View>
            <Button
                style = {styles.Button}
                mode='contained'
                buttonColor='#EB2933'
                onPress={()=>{navigator.navigate(Root.SignUp)}}
            >
                SignUp
            </Button>
            <Button
                style = {styles.Button}
                buttonColor='#EB2933'
                mode="contained"
                onPress={()=>{navigator.navigate(Root.Login)}}
            >
                Login
            </Button>
        </View>
    )
}

export default RootScreen

const styles = StyleSheet.create({
    Container: {
        alignItems: "center",
        height: "100%",
        backgroundColor: "#ffffff",
        padding: 30  
    },
    IconWrapper: {
        alignItems: "center",
        padding: 50,
    },
    Title: {
        fontSize: 28,
        fontWeight: "900",
        textAlign: "center",
        padding: 15
    },
    Tagline: {
        fontSize: 16
    },
    Button: {
        width: 358,
        height: 48,
        marginVertical: 10,
        justifyContent: "center",
        fontSize: 20,
        fontWeight: "700"
    }
})