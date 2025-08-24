import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useAuth } from '../../context/AuthProvider'

const Login = () => {
    const {login} = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        login(email, password)
    }

    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.Heading}
            >
                    Login
            </Text>
            <TextInput
                style={styles.Input}
                textColor='#876363'
                placeholderTextColor={"#876363"}
                mode='flat'
                label={"Email"}
                value={email}
                cursorColor='#876363'
                underlineColor='transparent'
                activeUnderlineColor='#876363'
                onChangeText={(text)=>setEmail(text)}
            />
            <TextInput
                style={styles.Input}
                mode='flat'
                label={"Password"}
                value={password}
                textColor='#876363'
                cursorColor='#876363'
                underlineColor='transparent'
                activeUnderlineColor='#876363'
                onChangeText={(text)=>setPassword(text)}
            />
            <Button
                mode='contained'
                style = {styles.Button}
                buttonColor='#EB2933'
                textColor='#FFFFFF'
                labelStyle = {styles.ButtonText}
                onPress={handleSubmit}
            >
                Login
            </Button>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFFFFF"
    },
    Heading: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "900",
        margin: 20
    },
    Input: {
        backgroundColor: "#F5F0F0",
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 16,
        elevation: 1,
    },
    Dropdown: {
        height: 56,
        width: 358,
        backgroundColor: "#F5F0F0",
        borderRadius: 8,
        alignSelf: "center",
        elevation: 1,
        padding: 15,
        marginHorizontal: 16,
        marginVertical: 16
    },
    DropdownItem: {
        backgroundColor: "#F5F0F0"
    },
    Button: {
        width: 358,
        height: 48,
        alignSelf: "center",
        borderRadius: 8,
        justifyContent: "center",
        marginTop: 20,
    },
    ButtonText: {
        fontSize: 16,
        fontWeight: "900"
    }
})