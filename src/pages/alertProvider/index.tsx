import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import AlertCostum from '../customAlert/index'; // Ajuste o caminho conforme sua estrutura
// Defina os tipos de alerta se ainda não estiverem definidos
export type AlertType = 'erro' | 'sucesso' | 'aviso';

interface AlertContextData {
  showAlert: (type: AlertType, message: string, title?: string) => Promise<void>;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('erro');
  const [alertTitle, setAlertTitle] = useState<string | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState('');
  
  // Para tratar o encerramento da promise
  const promiseResolveRef = useRef<() => void>();

  // Função para exibir o alerta e aguardar o fechamento dele
  const showAlert = (type: AlertType, message: string, title?: string): Promise<void> => {
    return new Promise((resolve) => {
      setAlertType(type);
      setAlertMessage(message);
      setAlertTitle(title);
      setAlertVisible(true);
      promiseResolveRef.current = resolve;
    });
  };

  // Função chamada quando o alerta é fechado (por exemplo, no botão OK)
  const handleCloseAlert = () => {
    setAlertVisible(false);
    // Se houver uma promise pendente, resolva-a
    if (promiseResolveRef.current) {
      promiseResolveRef.current();
      promiseResolveRef.current = undefined;
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
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