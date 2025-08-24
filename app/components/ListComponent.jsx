import { Image, StyleSheet, Text, View } from 'react-native'
import DefaultUserProfilePhoto from "../../assets/user-profile.png"

const ListComponent = ({id, email, bloodGroup, name, profilePhoto, location}) => {
  return (
    <View
        style = {styles.Card}
    >
        <View>
            <Image 
                source={profilePhoto ? {uri: profilePhoto} : DefaultUserProfilePhoto}
                style = {styles.Image}
            />
            <View
                style = {styles.TextWrapper}
            >
                <Text
                    style = {styles.Name}
                >
                    {name}
                </Text>
                <Text
                    style = {styles.BloodGroup}
                >
                    {bloodGroup}
                </Text>
            </View>
        </View>
    </View>
  )
}

export default ListComponent

const styles = StyleSheet.create({
    Card: {
        paddingHorizontal: 10
    },
    Image: {
        height: 128,
        width: 128,
        borderRadius: 64,
        padding: 10
    },
    TextWrapper: {
        alignItems: "center",
        padding: 10
    },
    Name: {
        fontSize: 16,
        fontWeight: "700"
    },
    BloodGroup: {
        fontSize: 14,
        color: "#876363",
        fontWeight: "200"
    }
})