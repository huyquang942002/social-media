import { API_URL } from '@env';
import axios from 'axios';
import { useContext, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { UserInfo } from '../service/model/user';
import { AuthContext } from './AuthContext';
import { FlashMessageContext } from './FlashMessageContext';
import { UserContext } from './UserContext';
import { useLoadingContext } from './loadingHelper';
import { validateEmail } from '../config/util';
export const UserProvider: React.FC<any> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { user, setUser, setToken, token } = useContext(AuthContext);
  const { showFlashMessage } = useContext(FlashMessageContext);
  const { showLoading, hideLoading } = useLoadingContext();
  const createAccount = async () => {
    if (email == '' || password == '' || name == '') {
      showFlashMessage({
        message: "Error",
        description: "Please fill all fields",
        type: "danger",
      });
      return;
    }
    if (password.length < 6) {
      showFlashMessage({
        message: "Error",
        description: "Password must be at least 6 characters",
        type: "danger",
      });
      return;
    }
    if (name.length < 6) {
      showFlashMessage({
        message: "Error",
        description: "Name must be at least 6 characters",
        type: "danger",
      });
      return;
    }
    if (validateEmail(email) == false) {
      showFlashMessage({
        message: "Error",
        description: "Email is invalid",
        type: "danger",
      });
      return;
    }
    try {
      showLoading();
      axios.post(`${API_URL}/users/register-account`, {
        email: email,
        password: password,
        username: name,
      }).then(async (response) => {
        hideLoading();
        showFlashMessage({
          message: "Account Created",
          description: "Your account has been created successfully",
          type: "success",
        });
      });
    } catch (error: any) {
      hideLoading();
      showFlashMessage({
        message: "Error",
        description: error.response.data.message,
        type: "danger",
      });
    }
  };

  const signIn = async () => {
    if (email == '' || password == '') {
      showFlashMessage({
        message: "Error",
        description: "Please fill all fields",
        type: "danger",
      });
      return;
    }
    if (password.length < 6) {
      showFlashMessage({
        message: "Error",
        description: "Password must be at least 6 characters",
        type: "danger",
      });
      return;
    }
    if (validateEmail(email) == false) {
      showFlashMessage({
        message: "Error",
        description: "Email is invalid",
        type: "danger",
      });
      return;
    }
    try {
      showLoading();
      axios.post(`${API_URL}/authentication/login`, {
        email: email,
        password: password,
      }).then(async (response) => {
        hideLoading();
        await setToken(response.data.access_token);
        await EncryptedStorage.setItem('secure_token', response.data.access_token);
        getUser();
      }).catch((error) => {
        hideLoading();
        showFlashMessage({
          message: "Error",
          description: error.response.data.message,
          type: "danger",
        });
      });

    } catch (error: any) {
      hideLoading();
      showFlashMessage({
        message: "Error",
        description: error.response.data.message,
        type: "danger",
      });
    }
  };

  const getUser = async () => {
    try {
      showLoading();
      const access_token = await EncryptedStorage.getItem('secure_token');
      await axios.get(`${API_URL}/users`, {
        headers: { "Authorization": `Bearer ${access_token}` }
      }).then(async (response) => {
        hideLoading();

        const user: UserInfo = response.data as UserInfo;
        setUser(user);
        await EncryptedStorage.setItem('UserInfo', JSON.stringify(user));
      });
    } catch (error: any) {
      hideLoading();
      showFlashMessage({
        message: "Error",
        description: error.response.data.message,
        type: "danger",
      });
    }
  };

  

  const signOut = async () => {
    // try {
    //   showLoading();
    //   await axios.post(`${API_URL}/users/logout`, {}, {
    //     headers: { "Authorization": `Bearer ${token}` }
    //   }).then(async (response) => {
    //     hideLoading();
    //     setUser(null);
    //   });
    // } catch (error: any) {
    //   hideLoading();
    //   showFlashMessage({
    //     message: "Error",
    //     description: error.response.data.message,
    //     type: "danger",
    //   });
    // }
    setUser(null);
    if (user) {
      await EncryptedStorage.removeItem('UserInfo');
    }
  };


  return (
    <UserContext.Provider
      value={{
        email,
        password,
        setEmail,
        setPassword,
        createAccount,
        signIn,
        signOut,
        name,
        setName,
        getUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};
