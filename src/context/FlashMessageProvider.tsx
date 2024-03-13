import { useState } from "react";
import FlashMessage from "react-native-flash-message";
import { FlashMessageContext } from "./FlashMessageContext";
import { showMessage, hideMessage } from "react-native-flash-message";
import { SafeAreaView } from "react-native";
const FlashMessageProvider = ({ children }: any) => {

  const showFlashMessage = (message: any) => {
    showMessage(message)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlashMessageContext.Provider value={{ showFlashMessage }}>
        {children}
        <FlashMessage position="top" />
      </FlashMessageContext.Provider>
    </SafeAreaView>
  );
};

export default FlashMessageProvider;