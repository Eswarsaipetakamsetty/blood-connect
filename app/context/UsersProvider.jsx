import {getDocs, collection} from "firebase/firestore"
import {db} from "../config/firebase"
import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthProvider"
import { getDistanceFromLatLonInKm } from "../utils/getDistanceFromLatLonInKm"

const maxDistanceInKm = 5
const UsersContext = createContext({
    users: [],
    fetchNearbyUsers: async () => {}
})

export const useUsers = () => useContext(UsersContext)

const UsersProvider = ({children}) => {
    const {user} = useAuth()
    const [users, setUsers] = useState([])
    
    const getNearbyUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"))
        let nearbyUsers = []
        querySnapshot.forEach((doc) => {
            if(doc.id !== user.id) {
                const userData = doc.data()
                if(userData.location.latitude && userData.location.longitude) {
                    const distance = getDistanceFromLatLonInKm(
                        user.location.latitude,
                        user.location.longitude,
                        userData.location.latitude,
                        userData.location.longitude
                    )
                    if(distance <= 5) {
                        nearbyUsers.push({id: doc.id, ...userData, distance})
                    }
                }
            }
        })

        nearbyUsers.sort((a, b) => a.distance - b.distance)
        return nearbyUsers
    }

    const fetchNearbyUsers = async () => {
        try {
            const nearbyUsers = await getNearbyUsers()
            setUsers(nearbyUsers)
        } catch (error) {
            console.log("Error fetching users", error)
        }
    }

    useEffect(()=>{
        fetchNearbyUsers()
    }, [user])
    return (
        <UsersContext.Provider
            value={{
                users,
                fetchNearbyUsers
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}

export default UsersProvider