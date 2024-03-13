import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { UserInfo } from "../service/model/user";
import { Overlay } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { useLoadingContext } from "./loadingHelper";
import EncryptedStorage from "react-native-encrypted-storage";
import { FlashMessageContext } from "./FlashMessageContext";


export const AuthProvider: React.FC<Children> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const { loading, hideLoading } = useLoadingContext();
  const { showFlashMessage } = useContext(FlashMessageContext);

  const getUserFromStorage = async () => {
    try {
      const user = await EncryptedStorage.getItem('UserInfo');
      if (user) {
        setUser(JSON.parse(user));
      }
    } catch (error: any) {
      showFlashMessage({
        message: "Error",
        description: error.response.data.message,
        type: "danger",
      });
    }
  }
  return <AuthContext.Provider value={{ isLoading, user, setUser, token, setToken, getUserFromStorage }}>{children}
    <Overlay
      overlayStyle={{ backgroundColor: 'transparent', elevation: 0 }}
      style={{ backgroundColor: 'transparent' }}
      isVisible={loading}>
      <ActivityIndicator
        size={'large'}
        color={"#F03974"}
        style={{ backgroundColor: 'transparent' }}
      />
    </Overlay>
  </AuthContext.Provider>;
};