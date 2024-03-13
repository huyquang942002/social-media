import { createContext } from "react";

export const FlashMessageContext = createContext({
    showFlashMessage: (message: any) => {},
  });