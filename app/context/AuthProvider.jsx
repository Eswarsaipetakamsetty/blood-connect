import { createContext, useContext, useEffect, useState } from "react";
import {auth, db} from "../config/firebase"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"
import { Alert } from "react-native";
import { setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { uploadProfileImage } from "../storage/supabaseStorage";
import * as Location from "expo-location"

const AuthContext = createContext({
    user: null,
    isLoggedIn: false,
    login: async (email, password) => {},
    signup: async (email, password, name, bloodGroup) => {},
    logout: async () => {},
    updateUserProfile: async (file, name) => {},
    getCurrentLocation: async () => {}
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [location, setLocation] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const signup = async (email, password, name, bloodGroup) => {
        console.log("signing up user with email: ", email)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const currentUser = userCredential.user

            await setDoc(doc(db, "users", currentUser.uid), {
                name,
                email,
                bloodGroup,
                location: null,
                profilePhoto: null
            })

            Alert.alert("Signup Successful!")
            setUser({id: currentUser.uid, name, email, bloodGroup, location: null, profilePhoto: null})
            setIsLoggedIn(true)
        } catch(error) {
            console.log("SignUp error: ", error)
            Alert.alert("Error", error?.FirebaseError?.Firebase?.Error || "")
        }
    }
    const login = async (email, password) => {
        console.log("Logging in user with email: ", email)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const currentUser = userCredential.user

            const docRef = doc(db, "users", currentUser.uid)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                const userData = docSnap.data()
                setUser({id: currentUser.uid, ...userData})
                setIsLoggedIn(true)
            } else {
                console.log("user data not found")
                Alert.alert("Error", "User data not found")
            }

        } catch (error) {
            console.log("Login Error: ", error)
            Alert.alert("Error", error?.FirebaseError?.Firebase?.Error || "")
        }
    } 

    const logout = async () => {
        try {
            await signOut(auth)
            setUser(null)
            setIsLoggedIn(false)
        } catch(error) {
            Alert.alert("Error", error?.FirebaseError?.Firebase?.Error || "")
        }
    }

    const updateUserProfile = async (file, name) => {
        try {
            let imageUrl = null
            if(file) {
                imageUrl = await uploadProfileImage(user.id, file)
            }

            const userRef = doc(db, 'users', user.id)
            await updateDoc(userRef, {
                ...(name && {name}),
                ...(imageUrl && {profilePhoto: imageUrl})
            })

            setUser({...user, profilePhoto: imageUrl, name: name})
            Alert.alert("Message", "Profile saved successfully")
        } catch (error) {
            console.log("Error while updating profile", error)
            throw error
        }
    }

    const getCurrentLocation = async () => {
        try {
            let {status} = await Location.requestForegroundPermissionsAsync()
            if(status !== 'granted') {
                alert("Permissions denined")
                return
            }

            let loc = await Location.getCurrentPositionAsync({})
            const coords = {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
            }
            setLocation(coords)
            const userRef = doc(db, 'users', user.id)
            await updateDoc(userRef, {
                location: coords
            })
            setUser({...user, location: coords})
        } catch (error) {
            console.log("Error updating location: ", error)
        }
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            if(user) {
                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()) {
                    setUser({id: user.uid, ...docSnap.data()})
                    setIsLoggedIn(true)
                }
            } else {
                setUser(null)
                setIsLoggedIn(false)
            }
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        getCurrentLocation()
    }, [user])
    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                signup,
                login,
                logout,
                updateUserProfile,
                getCurrentLocation
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider