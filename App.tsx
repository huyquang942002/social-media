import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthProvider';
import Routes from './src/navigation/Routes';
import React from 'react';
import FlashMessageProvider from './src/context/FlashMessageProvider';
import { LoadingProvider } from './src/context/loadingHelper';





function App(): JSX.Element {
  return (
    <FlashMessageProvider>
      <LoadingProvider>
        <AuthProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={'transparent'} />
            <Routes />
          </SafeAreaView>
        </AuthProvider>
      </LoadingProvider>
    </FlashMessageProvider>
  );
}


export default App;
