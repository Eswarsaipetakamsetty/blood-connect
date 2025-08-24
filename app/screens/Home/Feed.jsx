import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { useUsers } from '../../context/UsersProvider'
import ListComponent from '../../components/ListComponent'
import { FAB } from 'react-native-paper'

const Feed = () => {
  const {users} = useUsers()
  return (
    <View
      style = {styles.container}
    >
      <Text
        style = {styles.Title}
      >
        BloodConnect
      </Text>
      <View>
        <Text
          style = {styles.NearbyDonors}
        >
          Nearby Donors
        </Text>
        <FlatList 
          data = {users}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <ListComponent {...item}/>
          )}
        />
      </View>
      <FAB
        icon={"plus"}
        label='Request Blood'
        backgroundColor='#EB2933'
        color='#ffffff'
        style={styles.Fab}
        onPress={() => console.log('Pressed')}
      />
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
    height: Dimensions.get("window").height,
  },
  Title: {
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 30,
    color: "#171212"
  },
  NearbyDonors: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "left",
    padding: 20
  },
  Fab: {
    position: 'absolute',
    bottom: 100,
    right: 20,
  }
})