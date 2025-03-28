import axios, { AxiosInstance } from "axios";
import { createContext, useContext } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface AxiosContextInterface {
  publicAxios: AxiosInstance;
}

const axiosContextDefaults: AxiosContextInterface = {
  publicAxios: axios.create({
    baseURL: API_URL,
  }),
};

const AxiosContext = createContext<AxiosContextInterface>(axiosContextDefaults);
const { Provider } = AxiosContext;
const AxiosProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const publicAxios = axios.create({
    baseURL: API_URL,
  });

  return (
    <Provider
      value={{
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export const useAxiosContext = () => {
  useContext(AxiosContext);
};

export { AxiosContext, AxiosProvider };
