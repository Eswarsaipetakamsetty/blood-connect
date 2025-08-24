import { Image, StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../context/AuthProvider'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import DefaultProfilePhoto from "../../../assets/user-profile.png"
import Icon from "react-native-vector-icons/MaterialIcons"
import { Button, TextInput } from 'react-native-paper'

const EditProfile = () => {
  const {user, updateUserProfile} = useAuth()
  const [name, setName] = useState(user.name)
  const [image, setImage] = useState(user?.profilePhoto || null)
  const [file, setFile] = useState(null)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    console.log(result)
    if(!result.canceled) {
      setFile(result)
      setImage(result.assets[0].uri)
    }
  }

  const handleClick = () => {
    updateUserProfile(file, name)
  }
  return (
    <View
      style = {styles.Container}
    >
      <Text
        style = {styles.Heading}
        >
          Edit Profile
        </Text>
      {image? <Image style={styles.Image} source={{uri: image}}/> : 
              <Image style = {styles.Image} source={DefaultProfilePhoto}/>}
      <View
        style = {styles.IconWrapper}
      >
        <Icon name = "add-a-photo" onPress={pickImage} size={24} color={"black"}/>
      </View>
      <Button
        mode='contained'
        onPress={handleClick}
        buttonColor='#EB2933'
        style = {styles.Button}
      >
        Save Changes
      </Button>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  Container: {
    paddingTop: 30,
    height: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  Heading: {
    fontSize: 22,
    fontWeight: "900",
  },
  Image: {
    height: 128,
    width: 128,
    margin: 10,
    borderRadius: 64,
    marginTop: 30
  },
  IconWrapper: {
    backgroundColor: "#F5F0F0",
    height: 48,
    width: 48,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  Button: {
    margin: 15,
    borderRadius: 8
  }
})