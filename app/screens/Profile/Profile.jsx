import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import UserDefaultProfileImage from '../../../assets/user-profile.png'
import { useAuth } from '../../context/AuthProvider'
import IconButton from '../../components/IconButton'
import { useNavigation } from '@react-navigation/native'
import { BottomTabScreens, ProfileScreens } from '../../constants/screenConstants'
import { getAddressFromCoords } from '../../utils/getAddressFromCoords'

const Profile = () => {
  const {user, getCurrentLocation, logout} = useAuth()
  const navigator = useNavigation()
  const getLocation = async () => {
    const locationString = await getAddressFromCoords(user.location.latitude, user.location.longitude)
    return locationString
  }
  const handleLogOut = async () => {
    await logout()
  }
  return (
    <View
      style = {styles.Container}
    >
      <Text
        style = {styles.Title}
      > 
        Profile
      </Text>
      <View
        style = {styles.ProfilePhotoContainer}
      >
        <Image
          style = {styles.Icon} 
          source={user.profilePhoto ? {uri: user.profilePhoto} : UserDefaultProfileImage}
        />
        <Text
          style = {styles.Name}
        >
          {user.name}
        </Text>
        <Text
          style = {styles.Description}
        >
          Blood Type:  {user.bloodGroup}
        </Text>
        <Text
          style = {styles.Description}
        >
          Location:  {user.location ? getLocation() : "Not Added"}
        </Text>
      </View>
      <View
        style = {styles.ActionContainer}
      >
        <Text
          style = {styles.Actions}
        >
          Actions
        </Text>
        <IconButton 
          iconName={'edit'} 
          label={'Edit Profile'} 
          onPress={()=>navigator.navigate(ProfileScreens.EditProfile)}
        />
        <IconButton 
          iconName={'my-location'} 
          label={'Add Location'}
          onPress={()=> {getCurrentLocation()}}  
        />
        <IconButton 
          iconName={'history'} 
          label={'Donation History'}
          onPress={()=>navigator.navigate(BottomTabScreens.History)}
        />
        <IconButton 
          iconName={'settings'} 
          label={'Settings'}
          onPress={()=>navigator.navigate(ProfileScreens.Settings)}
        />
        <IconButton 
          iconName={'logout'} 
          label={'Log Out'}
          onPress={handleLogOut}
        />
      </View>
    </View>
  )
}

export default Profile

export const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    paddingTop: 30
  },
  Title: {
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 10,
    color: "#171212"
  },
  ProfilePhotoContainer: {
    justifyContent: "center",
    marginBottom: 20
  },
  Icon: {
    height: 128,
    width: 128,
    alignSelf: "center",
    borderRadius: 64
  },
  Name: {
    fontSize: 22,
    color: "#171212",
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
    marginTop: 10
  },
  Description: {
    fontSize: 16,
    fontWeight: "200",
    color: "#876363",
    textAlign: "center"
  },
  ActionContainer: {

  },
  Actions: {
    fontSize: 18,
    color: "#171212",
    fontWeight: "900",
    textAlign: "left",
    padding: 15
  },
})