import { Image, View } from "react-native";
import { images } from "../../assets";
import AppText from "./AppText";

export const EmptyList = ({ title }: any) => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 160,
    }}>
    <Image source={images.catImg} />
    <AppText style={{ fontSize: 16, color: '#848688' }}>
      {title}
    </AppText>
  </View>
);