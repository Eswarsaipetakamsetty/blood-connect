import {supabase} from "../config/supabase"
import * as FileSystem from "expo-file-system"

export const uploadProfileImage = async (userId, file) => {
    try {
        const asset = file.assets ? file.assets[0] : file
        const fileExt = asset.fileName.split('.').pop()
        const filePath = `profile/${asset.fileName}`
        const fileBase64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
        })

        const byteCharacters = atob(fileBase64)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const arrayBuffer = byteArray.buffer

        const {error} = await supabase.storage
        .from('bloodconnect')
        .upload(filePath, arrayBuffer, {
            contentType: asset.mimeType || getMimeType(fileExt),
            upsert: true,
        })

        if(error) throw error

        const {data: publicUrl} = supabase.storage
        .from('bloodconnect')
        .getPublicUrl(filePath)

        console.log("profile photo updated")
        return publicUrl.publicUrl
    } catch (error) {
        console.log("Upload error: ", error)
        throw error
    }
}

const getMimeType = (ext) => {
  switch (ext.toLowerCase()) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    default:
      return "application/octet-stream";
  }
};
