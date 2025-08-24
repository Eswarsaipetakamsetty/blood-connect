import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useAuth } from '../../context/AuthProvider'
import { Dropdown } from 'react-native-element-dropdown'

const SignUp = () => {
    const {signup} = useAuth()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [bloodGroup, setBloodGroup] = useState(null)

    const data = [
        { label: 'A +ve', value: 'A +ve' },
        { label: 'B +ve', value: 'B +ve' },
        { label: 'AB +ve', value: 'AB +ve' },
        { label: 'O +ve', value: 'O +ve' },
        { label: 'A -ve', value: 'A -ve' },
        { label: 'B -ve', value: 'B -ve' },
        { label: 'AB -ve', value: 'AB -ve' },
        { label: 'O -ve', value: 'O -ve' },
    ]
    const handleSubmit = () => {
        signup(email, password, name, bloodGroup)
    } 
    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.Heading}
            >
                    Sign Up
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
            <TextInput
                style={styles.Input}
                mode='flat'
                label={"Name"}
                value={name}
                textColor='#876363'
                cursorColor='#876363'
                underlineColor='transparent'
                activeUnderlineColor='#876363'
                onChangeText={(text)=>setName(text)}
            />
            <Dropdown 
                style = {styles.Dropdown}
                itemContainerStyle = {styles.DropdownItem}
                data={data}
                labelField="label"
                valueField="value"
                placeholder='Select Blood Group'
                value={bloodGroup}
                onChange={item => setBloodGroup(item.value)}
            />
            <Button
                mode='contained'
                style = {styles.Button}
                buttonColor='#EB2933'
                textColor='#FFFFFF'
                labelStyle = {styles.ButtonText}
                onPress={handleSubmit}
            >
                Sign Up
            </Button>
        </View>
    )
}

export default SignUp

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