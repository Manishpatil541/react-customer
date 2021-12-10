import { createContext, useCallback, useRef } from "react";
import { Toast } from "primereact/toast";

export const ToastContext = createContext(null);

const ToastProvider = ({ children }) => {
  const toast = useRef(null);

  const showSuccess = useCallback((summary, detail = "") => {
    toast.current.show({
      severity: "success",
      summary: summary,
      detail: detail,
    });
  }, []);

  const showInfo = useCallback((summary, detail = "") => {
    toast.current.show({ severity: "info", summary: summary, detail: detail });
  }, []);

  const showWarning = useCallback((summary, detail = "") => {
    toast.current.show({ severity: "warn", summary: summary, detail: detail });
  }, []);

  const showError = useCallback((summary, detail = "") => {
    toast.current.show({ severity: "error", summary: summary, detail: detail });
  }, []);

  return (
    <ToastContext.Provider
      value={{ showSuccess, showInfo, showWarning, showError }}
    >
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
