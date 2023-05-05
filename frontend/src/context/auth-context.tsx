import {createContext, ReactNode, useEffect, useState,} from "react";
import {AUTH_TYPE} from "../@types";
import {useAuth} from "../hooks";

export const AuthenticationContext = createContext<AUTH_TYPE | null>(null);

export const AuthenticationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { loading, login } = useAuth();
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("email");

    if (storedUser !== undefined && storedUser !== null && token) {
      setUser(storedUser);
    }
  }, []);

  const onLogin = async (payload: {
    email: string;
    password: string;
  }): Promise<unknown> => {
    const response = await login(payload);
    if (response) {
      // 응답이 null 이 아닌 경우 sessionStorage 에 토큰, 이메일, 아이디를 저장한다.
      sessionStorage.setItem("token", response?.token);
      sessionStorage.setItem("email", response?.email);
      sessionStorage.setItem("id", response?.id);

      setUser(response?.email);
      // 로그인 성공 시 dashboard 로 이동한다.
      return (window.location.href = "/dashboard");
    }
  };

  const onLogout = (): any => {
    // 로그아웃 시 sessionStorage 에 저장된 토큰, 이메일, 아이디를 삭제한다.
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("id");
    // 로그아웃 시 landing page 로 이동한다.
    return (window.location.href = "/");
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        loading,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
