import { Pressable, View, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"


const IconButton = ({iconName, label, onPress}) => {
    //only MaterialIcons icon names are allowed
    return (
        <Pressable
          style = {styles.Pressable}
          onPress={onPress}
        >
          <View
            style = {styles.ButtonWrapper}
          >
            <Icon style = {styles.ButtonIcon} name={iconName} size={24}/>
          </View>
          <Text
            style = {styles.ButtonText}
          >
            {label}
          </Text>
        </Pressable>
    )
}

export default IconButton

const styles = StyleSheet.create({
    Pressable: {
    padding: 15,
    flexDirection: "row",
    gap: 10,
  },
  ButtonWrapper: {
    backgroundColor: "#F5F0F0",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
  ButtonIcon: {
    alignSelf: "center"
  },
  ButtonText: {
    fontSize: 16,
    color: "#171212",
    fontWeight: "regular",
    padding: 10
  }
})