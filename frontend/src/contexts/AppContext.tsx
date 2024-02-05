import React, { useContext } from "react";
import Toast from "../component/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toastMessage, setToastMessage] = React.useState<
    ToastMessage | undefined
  >(undefined);
  // const { isError } = useQuery("validateToken", apiClient.validateToken, {
  //   retry: false,
  // });
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToastMessage(toastMessage);
        },
        isLoggedIn: !isError,
      }}
    >
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
