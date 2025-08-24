import * as Location from 'expo-location'

export const getAddressFromCoords = async (latitude, longitude) => {
    try {
        let [address] = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
        });

        if (address) {
            return `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.postalCode}, ${address.country}`;
        } else {
            return "Unknown Location";
        }
    } catch (error) {
        console.error("Error in reverse geocoding:", error);
        return "Error getting location";
    }
}