import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from 'react';
import AlertCostum from '../customAlert';
import { AlertType } from '../customAlert'; // Importe o tipo se necessário

export type AlertTypeExtended = AlertType | 'confirmacao';

interface AlertContextData {
  showAlert: (type: AlertType, message: string, title?: string) => Promise<void>;
  showConfirmAlert: (message: string, title?: string) => Promise<boolean>;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertTypeExtended>('erro');
  const [alertTitle, setAlertTitle] = useState<string | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState('');
  
  const promiseResolveRef = useRef<any>();

  const showAlert = (
    type: AlertType,
    message: string,
    title?: string
  ): Promise<void> => {
    return new Promise((resolve) => {
      setAlertType(type);
      setAlertMessage(message);
      setAlertTitle(title);
      setAlertVisible(true);
      promiseResolveRef.current = resolve;
    });
  };

  const showConfirmAlert = (
    message: string,
    title?: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setAlertType('confirmacao');
      setAlertMessage(message);
      setAlertTitle(title);
      setAlertVisible(true);
      promiseResolveRef.current = resolve;
    });
  };

  const handleCloseAlert = (confirmed: boolean) => {
    setAlertVisible(false);
    
    if (promiseResolveRef.current) {
      if (alertType === 'confirmacao') {
        promiseResolveRef.current(confirmed);
      } else {
        promiseResolveRef.current();
      }
      promiseResolveRef.current = null;
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, showConfirmAlert }}>
      {children}
      <AlertCostum
        visible={alertVisible}
        type={alertType}
        title={alertTitle}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
