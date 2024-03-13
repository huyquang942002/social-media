import { TouchableOpacity, View } from "react-native"
import AppText from "./AppText"

export const MoreDialog = ({ deletePost, editPost }: any) => {
  return (
    <View style={{
      position: 'absolute',
      top: 20, right: 30,
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 5,
      justifyContent: 'center',
      alignContent: 'center',
      padding: 5,
      width: 60,
    }}>
      <TouchableOpacity onPress={editPost}>
        <AppText style={{ fontSize: 12 }}>Edit</AppText>
      </TouchableOpacity>
      <View style={{ height: 10 }} />
      <TouchableOpacity onPress={deletePost}>
        <AppText style={{ fontSize: 12 }}>Delete</AppText>
      </TouchableOpacity>
    </View>
  )
}